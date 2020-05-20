import Endpoint from "./endpoint";
import UserDefinedTableMetaData from "./entities/user-defined-tables-meta-data";
import UserDefinedTableRow from "./entities/user-defined-table";


type HttpClientRequest = {
    uri: string,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
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

    constructor(
        private httpClient: HttpClient, 
        private options: PapiClientOptions
        ) {
        
    }

    async get(url: string): Promise<any> {
        const res = await this.httpClient({
            uri: this.options.papiBaseURL + url,
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + this.options.token
            },
            json: true,
            body: undefined
        });

        return res;
    }

    async post(url: string, body: any): Promise<any> {
        const res = await this.httpClient({
            uri: this.options.papiBaseURL + url,
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + this.options.token
            },
            json: true,
            body: body
        });

        return res;
    }
}