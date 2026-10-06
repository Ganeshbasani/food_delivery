# BiteFlow API Contract

Base URL: `/api/v1`

## Response convention

Successful requests use:

```json
{
  "success": true,
  "data": {}
}
```

Errors use:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password."
  }
}
```

Every response includes `x-request-id` for operational correlation.

## Authentication

Preferred header:

```text
Authorization: Bearer <jwt>
```

The legacy `token` header is retained for compatibility.

## Catalog

`GET /food/list?page=1&limit=24&search=burger&category=Salad`

Returns catalog data plus pagination metadata.

## Authentication endpoints

`POST /user/register`

```json
{"name":"Ada Lovelace","email":"ada@example.com","password":"example123"}
```

`POST /user/login`

```json
{"email":"ada@example.com","password":"example123"}
```

## Cart

`GET /cart/`

`POST /cart/add`

```json
{"itemId":"<foodObjectId>"}
```

`POST /cart/remove`

```json
{"itemId":"<foodObjectId>"}
```

## Orders

`POST /order/place`

```json
{
  "items":[{"foodId":"<foodObjectId>","quantity":2}],
  "address":{
    "firstName":"Ada",
    "lastName":"Lovelace",
    "email":"ada@example.com",
    "street":"Example Street",
    "city":"Hyderabad",
    "state":"Telangana",
    "country":"India",
    "zipcode":"500001",
    "phone":"9000000000"
  }
}
```

The API fetches product prices from MongoDB and calculates the authoritative amount.

`GET /order/user`

Returns the authenticated user's order history.

`GET /order/payment/:orderId`

Returns the current payment and fulfillment status for an order owned by the authenticated user.

## Admin

`POST /food/add` — multipart upload

`PATCH /food/:id` — update catalog properties and optionally replace the image

`DELETE /food/:id` — archive a product by setting `active=false`

`GET /order/list?page=1&limit=25&status=PREPARING`

`PATCH /order/:orderId/status`

```json
{"status":"OUT_FOR_DELIVERY"}
```
