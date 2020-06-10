import { Account } from "../entities/accounts";
import Endpoint from "../endpoint"
import { PapiClient } from "../papi-client";


export class AccountsEndpoint extends Endpoint<Account> {
    constructor(service: PapiClient) { 
    super(service, '/accounts');
    }
    
}