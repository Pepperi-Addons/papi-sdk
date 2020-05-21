import Endpoint from "./endpoint";
import { AddonEndpoint } from "./endpoints";
import { UserDefinedTableMetaData, UserDefinedTableRow } from "./entities" ;
import { performance } from 'perf_hooks';

type HttpMethod =  'POST' | 'GET' | 'PUT' | 'DELETE';

type HttpClientRequest = {
    uri: string,
    method: HttpMethod,
    headers: any,
    body: any | undefined, 
    json: boolean
};

type HttpClient = (req: HttpClientRequest) => Promise<any>;
interface PapiClientOptions {
    token: string, 
    papiBaseURL: string
};

export class PapiClient {
    
    metaData = {
        userDefinedTables: new Endpoint<UserDefinedTableMetaData>(this, '/meta_data/user_defined_tables')
    };

    userDefinedTables = new Endpoint<UserDefinedTableRow>(this, '/user_defined_tables');
    addons = new AddonEndpoint(this);
  
    
    constructor(
        private httpClient: HttpClient, 
        private options: PapiClientOptions
        ) {
        
    }

    async get(url: string): Promise<any> {
        return this.apiCall('GET', url);
    }

    async post(url: string, body: any): Promise<any> {
        return this.apiCall('POST', url, body);
    }

    private async apiCall(method: HttpMethod, url: string, body: any = null) {
        
        const options = {
            uri: this.options.papiBaseURL + url,
            method: method,
            headers: {
                authorization: 'Bearer ' + this.options.token
            },
            json: true,
            body: body
        };
        
        const t0 = performance.now();
        const res = await this.httpClient(options);
        const t1 = performance.now();

        console.log(method, options.uri, 'took', (t1 - t0).toFixed(2), 'milliseconds');

        return res;
    }
}