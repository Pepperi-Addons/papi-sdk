# papi-sdk

A Javascript/Typescript SDK for working with the Pepperi API.

## Usage:

### Installation
Install by running 
``` 
npm install @pepperi-addons/papi-sdk
```

### Papi Client Initialization
The PapiClient object is the object you will create to get access to the Pepperi API's.
The following are the options when creating the PapiClient object.

#### **Mandatory Parameters**

`token`: The JWT used to authenticate the user.

`baseURL`: The Pepperi API base URL (eg. https://papi.pepperi.com/v1.0/)

#### **Optional Parameters**

`actionUUID`: Sets the `X-Pepperi-ActionID` request header on the API call. 

Sending this parameter will allow tracibility of a single call between services, since the ActionUUID is logged in each service. When a ActionUUID is not provided the recieving API will generate a new one and return it in the `X-Pepperi-ActionID` response header.

**BEWARE:** Do **NOT** send this paramater when making an async API call, since the value will be used as the async API's `ActionUUID` which may override an already existing async API.

`codeJobUUID`: Sets the `X-Pepperi-CodeJobID` request header on the API call. 

This is an alternative to the `ActionUUID` and is also included in most of the logs. This can be propagated even between multiple async API calls.

`suppressLogging`: Default is `false`. For enhaced traceability, every API call the `PapiClient` it will log the URL and its duration. If you are making tons of API calls and choose to omit this log, you can do so by setting this option to `true`. 

`addonUUID`: Sets the `X-Pepperi-OwnerID` request header on the API call. 

Used when maked API calls to system endpoints that require addon authentication (eg. some of the ADAL endpoint are blocked to the addon owning the ADAL tables).

`addonSecretKey`: Sets the `X-Pepperi-SecretKey` request header on the API call.

Used when maked API calls to system endpoints that require addon authentication (eg. some of the ADAL endpoint are blocked to the addon owning the ADAL tables).

**Beware:** Do not send your addon's secret call to every API call, and surely do not send it to endpoint you do not trust. 


``` Typescript
interface PapiClientOptions {
    token: string;
    baseURL: string;
    addonUUID?: string;
    suppressLogging?: boolean;
    addonSecretKey?: string;
    actionUUID?: string;
    codeJobUUID?: string;
}
```

### Example 
``` Typescript
import { PapiClient } from '@pepperi-addons/papi-sdk'

// This might be an endpoint for an addon API
export async function foo(client: Client, request: Request) {
  
    // initialize the PapiClient using the `client` object in the endpoint
    const api = new PapiClient({
        baseURL: client.BaseURL, 
        token: client.OAuthAccessToken,
        actionUUID: client.ActionUUID,

        // for addons authentication for system calls (eg. ADAL)
        addonUUID: client.AddonUUID,
        addonSecretKey: client.AddonSecretKey,
    });

    const tables = await api.userDefinedTables.iter().toArray();
    console.log('tables.length', tables.length);
    console.log(tables);

    return tables;
};
```
### Item Iteration
``` Typescript
import { PapiClient } from '@pepperi-addons/papi-sdk'

// This might be an endpoint for an addon API
export async function foo(client: Client, request: Request) {
  
    // we need to supply the PapiClient with an HttpClient, the papi BaseURL and an access token
    const api = new PapiClient({
        baseURL: client.BaseURL, 
        token: client.OAuthAccessToken
    });

    for await (let table of api.userDefinedTables.iter()) {
        console.log(table);
        console.log('values', table.values);
    }
};
```

## Contributing
Contributions to this package are strongly encouraged.

To contribute commit your changes to a separate branch, and then create a PR at https://github.com/pepperi-addons/papi-sdk.

Before submitting your PR make sure:
- The you have read and are complient with the [Style Guide](#style-guide). 
- That you have tested your changes. See [Debugging](#debugging) on how you can do this without creating a version.
- That your branch compiles `npm run compile`.
- That your branch follows this repo's linting guides `npm run lint`.
  You can fix most linting issues by running `npm run fix-lint`. Make sure that these scripts do not return an error or warning.
- That you increment the version number for your changes to be published, according to the [versioning](#versioning) specifications. See the [Deployment](#deployment) section for why this is important. 

Every PR must be approved by at least one other person before it can be merged in to the master.

## Style Guide

See the [Pepperi Development Guidelines](https://github.com/Pepperi-Addons/development-guidelines) for general guidelines. 

The following are some guidlines specific to `papi-sdk`.

### Interfaces 

- We chose that the Interfaces (eg. Account) representing the objects that are returned from the API, 
should include all the endpoints known properties. 
- Properties that must be sent in `upsert` are marked as non-optional in the interfaces. 
- The rest of the fields are all marked as optional. 
- Although the fields that you will get by calling `iter()` depend on the `fields` parameter that you send, we decided that the `iter` will return an object with the interface type `eg. Account`, for easy code-completion & intellisense.

### Endpoints

#### Fluent API
The `PapiClient` object is used for all API calls. We chose the [Fluent Interface API Style](https://en.wikipedia.org/wiki/Fluent_interface) for this object. 

This means that all functionality in the `PapiClient` is done by chaining commands to the object like so: 

```typescript
papiClient.addons.data.uuid('addon-uuid').table('<table-name>').upsert(data)
```

Each step in the chain represents a corresponding API route in the Pepperi API. When routes require path parameters, the corresponding function in the fluid API will receive a single parameter to the function (eg. `table('table-name')`). 

The final function will correspond to the request method. For `POST` the fucntion will receive the data as a parameter, and for `GET` it will recieve the request query parameters. The function name may give some meaning to the action (eg. `upsert`, `find`).

The previous example corresponds to the following API call:

``` HTTP
POST /addons/data/:addonUUID/:tablename
```

Endpoints that have only a single method, may omit the last function from the chain. 

Eg. `POST /addons/resources/:resource/search` is mapped to `papiClient.resources.resource('').search(searchBody)`


#### Common endpoints
Most of Pepperi API endpoints support similar functionality, and therefore most of the endpoints in the *papi-sdk* have the same functions.

Let's take the accounts endpoint for example.
``` bash
GET https://papi.pepperi.com/v1.0/accounts #returns a list of accounts
POST https://papi.pepperi.com/v1.0/accounts #upsert a single account returns the updated account
```

The same way the papi-sdk:
``` typescript
const accounts: Account[] = papiClient.accounts.iter().toArray();
const updated: Account = papiClient.accounts.upsert(account);
```

The `iter` function on all endpoints support the same parameters that the `GET` supports.

`fields` - The APIName that the endpoint should return

`where` - an SQL like where clause for filtering

`order_by` - sorting `eg. CreationDate ASC`

etc. See https://developer.pepperi.com/account-resources/apis/get/accounts

When adding such and endpoint inherit one of the base classes `IterableEndpoint` and `Endpoint` to implement your API. 

## Deployment
This SDK is distributed as a Javascript + types package on npm, under the `@pepperi-addons/papi-sdk` name. 

When a commit is made to master via direct commit or via PR, there is a Github action that builds the code & publishes it on npm. The bumping on the version need to be done manually, so if a commit is made to the master without the version bump the publish to npm will fail. 

The reason to bump needs to be done manually is: 
- The master branch is blocked to direct commits, therefore the Github action can't commit the version bump
- The editor of the changes should know if it is a major, minor or patch. 

## Versioning
This repo follows [Semantic Versioning](https://semver.org/).

Given a version number **MAJOR**.**MINOR**.**PATCH**, increment the:

**MAJOR** version when you make incompatible API changes

**MINOR** version when you add functionality in a backwards compatible manner

**PATCH** version when you make backwards compatible bug fixes.

To increment the package version:

Run `npm version patch` to increment a patch.

Run `npm version minor` to increment a minor.

Run `npm version major` to increment a major. You probably shouldn't do this if you are not sure.

## Debugging
To locally test your changes, run `npm pack`. Then run `npm install <path_to_local_papi_sdk>` in the project you want to test the papi-sdk in.
This reroute the dependency in your `package.json` file to a local version of the `papi-sdk`. Be sure not to commit this change to your `package.json` as it will only work locally.