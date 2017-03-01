# Users

<span class="api method post">POST</span> <span class="api label">/v1/users</span>

Create a user.

###### body

```json
{
    "username": "johnlenon",
    "firstname": "John",
    "lastname": "Lenon",
    "email": "john.lenon@opencompute.org",
    "password": "Dlf0K3mBp"
}
```

###### Response

```json
{
    "id": "587e2ceeccb8b2921b3c6e2b",
    "username": "johnlenon",
    "firstname": "John",
    "lastname": "Lenon",
    "email": "john.lenon@opencompute.org",
    "createdAt": "1940-10-08T10:43:26.730Z",
    "updatedAt": "1980-12-09T04:07:00.000Z"
}
```

###### Parameters

Name           | In    | Type     | Required | Description
---------------|-------|----------|----------|-----------------------------------
`email`        | body  | string   | Yes      | Email address for the user
`firstname`    | body  | string   | Yes      | Firstname for the user
`lastname`     | body  | string   | Yes      | Lastname for the user
`company`      | body  | string   | No       | Company name for the user

###### Response codes

Code   | Name             | Description
-------|------------------|---------------------------------------------------
`201`  | `Created`        | User has been correctly created
`409`  | `Conflict`       | A user already exists with the same email address
`400`  | `Bad Request`    | Request is either malformed or incomplete

___

<span class="api method get">GET</span> <span class="api label">/v1/users</span>

Get all users.

###### Response

```json
[
    {
        "id": "587e2ceeccb8b2921b3c6e2b",
        "username": "johnlenon",
        "firstname": "John",
        "lastname": "Lenon",
        "email": "john.lenon@opencompute.org",
        "createdAt": "1940-10-08T10:43:26.730Z",
        "updatedAt": "1980-12-09T04:07:00.000Z"
    },
    {
        "id": "587e2ef6ccb8b2921b3c6e2f",
        "username": "paulmccartney",
        "firstname": "Paul",
        "lastname": "McCartney",
        "email": "paul.mccartney@opencompute.org",
        "createdAt": "1942-06-18T14:40:46.760Z",
        "updatedAt": "2017-01-17T14:40:46.130Z"
    }
]
```

###### Response codes

Code   | Name             | Description
-------|------------------|---------------------------------------------------
`200`  | `Ok`             | Users has been retrieved

___

<span class="api method get">GET</span> <span class="api label">/v1/users/`{id}`</span>

Get a single user.

###### Response

```json
{
    "id": "587e2ef6ccb8b2921b3c6e2f",
    "username": "paulmccartney",
    "firstname": "Paul",
    "lastname": "McCartney",
    "email": "paul.mccartney@opencompute.org",
    "createdAt": "1942-06-18T14:40:46.760Z",
    "updatedAt": "2017-01-17T14:40:46.130Z"
}
```

###### Parameters

Name           | In    | Type     | Required | Description
---------------|-------|----------|----------|-----------------------------------
`id`           | path  | string   | Yes      | User ID

###### Response codes

Code   | Name             | Description
-------|------------------|---------------------------------------------------
`200`  | `Ok`             | User has been retrieved
`404`  | `Not found`      | No user exists for this ID

___

<span class="api method put">PUT</span> <span class="api label">/v1/users/`{id}`</span>

Update the specified user.

###### body

```json
{
    "firstname": "John Winston",
}
```

###### Response

```json
{
    "id": "587e2ceeccb8b2921b3c6e2b",
    "username": "johnlenon",
    "firstname": "John",
    "lastname": "Lenon",
    "email": "john.lenon@opencompute.org",
    "createdAt": "1940-10-08T10:43:26.730Z",
    "updatedAt": "2017-01-17T14:40:46.760Z"
}
```

###### Parameters

Name           | In    | Type     | Required | Description
---------------|-------|----------|----------|-----------------------------------
`id`           | path  | string   | Yes      | ID for the user to update
`firstname`    | body  | string   | No       | Firstname for the user
`lastname`     | body  | string   | No       | Lastname for the user
`company`      | body  | string   | No       | Company name for the user

###### Response codes

Code   | Name             | Description
-------|------------------|---------------------------------------------------
`20O`  | `Ok`             | User has been correctly updated
`404`  | `Not found`      | No user exists for this ID
`400`  | `Bad Request`    | Request is either malformed or incomplete

___

<span class="api method delete">DETELE</span> <span class="api label">/v1/users/`{id}`</span>

Delete a single user.

###### Parameters

Name           | In    | Type     | Required | Description
---------------|-------|----------|----------|-----------------------------------
`id`           | path  | string   | Yes      | User ID

###### Response codes

Code   | Name             | Description
-------|------------------|---------------------------------------------------
`204`  | `No content`     | User has been delete
`404`  | `Not found`      | No user exists for this ID

___
