import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { api, API_URL, authHeaders } from "../api/client";

export const StoreContext = createContext(null);

const demoFoods = Array.from({ length: 17 }, (_, i) => ({
  _id: `demo-${i + 1}`,
  name: ["Greek Garden Salad","Veggie Power Bowl","Clover Salad","Chicken Protein Salad","Lasagna Rolls","Peri Peri Rolls","Chicken Rolls","Veggie Rolls","Ripple Ice Cream","Fruit Ice Cream","Jar Ice Cream","Vanilla Ice Cream","Chicken Sandwich","Vegan Sandwich","Grilled Sandwich","Bread Sandwich","Cup Cake"][i],
  price: [12,18,16,24,14,12,20,15,14,22,10,12,12,18,16,24,14][i],
  description: "Freshly prepared and packed for a reliable BiteFlow delivery experience.",
  category: ["Salad","Salad","Salad","Salad","Rolls","Rolls","Rolls","Rolls","Deserts","Deserts","Deserts","Deserts","Sandwich","Sandwich","Sandwich","Sandwich","Cake"][i],
  image: `/food/food_${i + 1}.png`,
}));

const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("biteflow_token") || "");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("biteflow_user") || "null"));
  const [foodList, setFoodList] = useState([]);
  const [cart, setCart] = useState({});
  const [authOpen, setAuthOpen] = useState(false);
  const [loadingFoods, setLoadingFoods] = useState(true);

  const signOut = useCallback(() => {
    localStorage.removeItem("biteflow_token");
    localStorage.removeItem("biteflow_user");
    setToken("");
    setUser(null);
    setCart({});
  }, []);

  const fetchFood = useCallback(async ({ search = "", category = "All" } = {}) => {
    setLoadingFoods(true);
    try {
      const params = { limit: 100 };
      if (search) params.search = search;
      if (category !== "All") params.category = category;
      const response = await api.get("/food/list", { params });
      if (response.data.success) setFoodList(response.data.data.map((food) => ({ ...food, image: `${API_URL}/images/${food.image}` })));
    } catch {
      setFoodList(demoFoods);
    } finally {
      setLoadingFoods(false);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    if (!token) return setCart({});
    try {
      const response = await api.get("/cart", { headers: authHeaders(token) });
      if (response.data.success) setCart(response.data.cartData || {});
    } catch (error) {
      if (error.response?.status === 401) signOut();
    }
  }, [token, signOut]);

  useEffect(() => { fetchFood(); }, [fetchFood]);
  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = async (foodId) => {
    if (!token) return setAuthOpen(true);
    const response = await api.post("/cart/add", { itemId: foodId }, { headers: authHeaders(token) });
    setCart(response.data.cartData || {});
  };

  const removeFromCart = async (foodId) => {
    if (!token) return;
    const response = await api.post("/cart/remove", { itemId: foodId }, { headers: authHeaders(token) });
    setCart(response.data.cartData || {});
  };

  const cartItems = useMemo(() => Object.entries(cart)
    .map(([id, quantity]) => {
      const item = foodList.find((food) => String(food._id) === String(id));
      return item ? { ...item, quantity: Number(quantity) } : null;
    })
    .filter(Boolean), [cart, foodList]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const setSession = (nextToken, nextUser) => {
    localStorage.setItem("biteflow_token", nextToken);
    localStorage.setItem("biteflow_user", JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
    setAuthOpen(false);
  };

  const value = {
    token, user, foodList, cart, cartItems, cartTotal, loadingFoods, authOpen,
    setAuthOpen, addToCart, removeFromCart, fetchFood, signOut, setSession,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;
