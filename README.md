# papi-sdk

A Javascript/Typescript SDK for working with the Pepperi SDK

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

    const tables = await api.userDefinedTables.find();
    console.log('tables.length', tables.length);
    console.log(tables);

    return tables;
};
```
