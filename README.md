# papi-sdk

A Javascript/Typescript SDK for working with the Pepperi SDK.

## Installation
Install by running 
``` 
npm install @pepperi-addons/papi-sdk
```

## Usage:
#### Typescript 
``` Typescript
import { PapiClient } from '@pepperi-addons/papi-sdk'

// This might be an endpoint for an addon API
export async function foo(client: Client, request: Request) {
  
    // we need to supply the PapiClient with an HttpClient, the papi BaseURL and an access token
    const api = new PapiClient({
        baseURL: client.BaseURL, 
        token: client.OAuthAccessToken
    });

    const tables = await api.userDefinedTables.iter().toArray();
    console.log('tables.length', tables.length);
    console.log(tables);

    return tables;
};
```
#### Item Iteration
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

## Endpoints
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

We chose that the Interfaces (eg. Account) representing the objects that are returned from the API, 
should include all the endpoints known properties. Properties that must be sent in `upsert` are marked as non-optional in the interfaces. The rest are all marked as optional. Although the fields that you will get by calling `iter()` depend on the `fields` parameter that you send, we decided that the `iter` will return an object with the interface type `eg. Account`, for easy code-completion & intelisense.

With endpoints that are more complicated, we incorporated the API route into the function signature. 

For example:
| API | SDK |
| --- | --- |
| /addons/installed_addons/\<uuid\>/install | client.addons.installedAddons.addonUUID('\<uuid\>').install() |
| /addons/api/\<uuid\>/api/foo | client.addons.api.uuid('\<uuid\>').file('api').func('foo').get() |
| /meta_data/transactions/types/Sales Order/fields | client.metaData.type('transactions').types.subtype('Sales Order').fields.get() |

## Versioning
This repo follows semantic versioning. See https://semver.org/.

Given a version number **MAJOR**.**MINOR**.**PATCH**, increment the:

**MAJOR** version when you make incompatible API changes

**MINOR** version when you add functionality in a backwards compatible manner

**PATCH** version when you make backwards compatible bug fixes.


## Contributing
Contributions to this package are encouraged strongly.

To contribute commit your changes to a separate branch, and then create a PR at https://github.com/pepperi-addons/papi-sdk.

Before submitting your PR make sure:
- That your branch compiles `npm run compile`
- That your branch follows this repo's linting guides `npm run lint`
  You can fix most linting issues by running `npm run fix-lint`. Make sure that these scripts do not return an error or warning.
- That you increment the version number for your changes to be published, according to the specifications above.

To increment the package version:

Run `npm version patch` to increment a patch.

Run `npm version minor` to increment a minor.

Run `npm version major` to increment a major. You probably shouldn't do this if you are not sure.

Every PR must be approved by at least one other person before it can be merged in to the master.
When you create or update a PR, there are GitHub Actions that will verify that your PR complies to the above.
Once the PR is merged into master, a GitHub Action will publish the new version to the npm registry.
If you do not increment the version number. This script will fail.

To locally test your changes, run `npm pack`. Then run `npm install path_to_local_papi_sdk` in the project you want to test the papi-sdk in.