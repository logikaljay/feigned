# Feigned

I suck at naming packages.

Feigned will take a JSON representation of an API endpoint and mock it out to actual API endpoints, it will also generate documentation from the same JSON files.

Feigned expects the JSON API Endpoint files in your `$PWD/docs/endpoints` folder.

## Running a test version
```bash
$ git clone https://github.com/logikaljay/feigned
$ cd feigned
$ npm install
$ node ./server
```

## Starting the mock (WIP)
```bash
$ npx feigned mock
```

## Building the documentation (WIP)
```bash
$ npx feigned doc
```

## Example API endpoint:
```json
{
  "name": "Users",
  "description": "Management of users inside the application",
  "routes": [
    {
      "name": "List users",
      "description": "Get limited information about all users",
      "endpoint": "/api/v1/users",
      "method": "GET",
      "responses": [
        {
          "code": 200,
          "response": { "status": "ok", "users": [ ... ] }
        },
        {
          "code": 401,
          "name": "Unauthorized",
          "response": { "status": "fail", "error": "unauthenticated" },
          "condition": "!req.headers.hasOwnProperty('authorization')"
        }
      ],
      "headers": {
        "Authorization": "Bearer token"
      }
    }
  ]
}
```

## TODO
* [ ] Test feigned when installed globally, fix any pathing issues to documents or webpack
* [ ] Set up bin correctly so that the mock
* [ ] Write proper documentation for the endpoints (ironic right?)
* [ ] Build a postman like UI that will author the JSON files
* [ ] Allow the postman like UI tool the ability to start/stop the mock server
* [ ] Format the doc output better
* [ ] Allow different output generators - markdown/html
* [ ] Allow the generated HTML to actually make requests to the mock