# Endpoints

- **POST `/items`:**

Endpoint to create a new item. Send a JSON body with name, description, units, price and seller.

Example curl request:
```bash
curl --location --request POST 'http://localhost/items' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "ABC",
    "description": "Test Description",
    "units": 100,
    "price": 10,
    "seller": "XYZ"
}'
```

- **GET `/items`:**

Endpoint to get a list of all the non deleted items.

Example curl request:
```bash
curl --location --request GET 'http://localhost/items'
```

- **GET `/items/deleted`:**

Endpoint to get a list of all the deleted items.

Example curl request:
```bash
curl --location --request GET 'http://localhost/items/deleted'
```

- **GET `/items/:id`:**

Endpoint to get a single item. You can get the id of an item from the responses of the previous two endpoints.
Example curl request:
```bash
curl --location --request GET 'http://localhost/items/<id>'
```

- **PATCH `/items/:id`:**

Endpoint to edit an item. You can get the id of an item from the responses of the previous two endpoints.
You need to send the updates as JSON in the body.

Example curl request:
```bash
curl --location --request PATCH 'http://localhost/items/<id>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "description": "New description",
    "price": 200
}'
```

- **DELETE `/items/:id`:**

Endpoint to delete an item. You can get the id of an item from the responses of the previous two endpoints.
Send a request to the same endpoint to delete the item permanently.

Example curl request:
```bash
curl --location --request DELETE 'http://localhost/items/<id>'
```

- **POST `/items/undelete/:id`:**

Endpoint to undelete an item. You can get the id of an item from the responses of the previous two endpoints.

Example curl request:
```bash
curl --location --request POST 'http://localhost/items/undelete/<id>'
```
