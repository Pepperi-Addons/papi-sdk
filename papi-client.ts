import Endpoint, { IterableEndpoint } from './endpoint';
import {
    AddonEndpoint,
    CodeJobsEndpoint,
    DistributorFlagsEndpoint,
    TypeMetaData,
    MaintenanceEndpoint,
    AuditLogsEndpoint,
    SyncEndpoint,
    FileStorageEndpoint,
    NotificationEndpoint,
    SchemesEndpoint,
    GenericResourceEndpoint,
} from './endpoints';
import {
    UserDefinedTableMetaData,
    UserDefinedTableRow,
    Account,
    GeneralActivity,
    Transaction,
    User,
    UIControl,
    Profile,
    PepperiObject,
    Type,
    Catalog,
    Item,
    TransactionLines,
    Contact,
    Image,
    Page,
    DataView,
    AddonData,
    AuditLog,
} from './entities';

import { papi_fetch, getPerformance } from './papi-module';

type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

interface PapiClientOptions {
    token: string;
    baseURL: string;
    addonUUID?: string;
    suppressLogging?: boolean;
    addonSecretKey?: string;
    actionUUID?: string;
}

export class PapiClient {
    metaData = {
        userDefinedTables: new Endpoint<UserDefinedTableMetaData>(this, '/meta_data/user_defined_tables'),
        flags: new DistributorFlagsEndpoint(this),
        type: (typeObject: string) => {
            return new TypeMetaData(this, typeObject);
        },
        dataViews: new Endpoint<DataView>(this, '/meta_data/data_views'),
        pepperiObjects: new Endpoint<PepperiObject>(this, '/meta_data/pepperiObjects'),
    };

    userDefinedTables = new Endpoint<UserDefinedTableRow>(this, '/user_defined_tables');
    addons = new AddonEndpoint(this);
    codeJobs = new CodeJobsEndpoint(this);
    activities = new Endpoint<GeneralActivity>(this, '/activities');
    transactions = new Endpoint<Transaction>(this, '/transactions');
    allActivities = new Endpoint<GeneralActivity | Transaction>(this, '/all_activities');
    accounts = new Endpoint<Account>(this, '/accounts');
    users = new Endpoint<User>(this, '/users');
    uiControls = new Endpoint<UIControl>(this, '/uicontrols');
    profiles = new Endpoint<Profile>(this, '/profiles');
    fileStorage = new FileStorageEndpoint(this);
    maintenance = new MaintenanceEndpoint(this);
    auditLogs = new AuditLogsEndpoint(this);
    types = new IterableEndpoint<Type>(this, '/types');
    catalogs = new Endpoint<Catalog>(this, '/catalogs');
    application = {
        sync: new SyncEndpoint(this),
    };
    items = new Endpoint<Item>(this, '/items');
    transactionLines = new Endpoint<TransactionLines>(this, '/transaction_lines');
    contacts = new Endpoint<Contact>(this, '/contacts');
    images = new Endpoint<Image>(this, '/images');
    notification = new NotificationEndpoint(this);
    pages = new Endpoint<Page>(this, '/pages');
    userDefinedCollections = {
        schemes: new SchemesEndpoint(this),
        documents: (collectionName: string) => {
            return new Endpoint<AddonData>(this, `/user_defined_collections/${collectionName}`);
        },
    };
    resources = {
        resource: (resourceName: string) => {
            return new GenericResourceEndpoint(this, `/resources/${resourceName}`);
        },
    };

    constructor(private options: PapiClientOptions) {}

    async get(url: string): Promise<any> {
        return this.apiCall('GET', url)
            .then((res) => res.text())
            .then((res) => (res ? JSON.parse(res) : ''));
    }

    async post(url: string, body: any = undefined, headers: any = undefined): Promise<any> {
        return this.apiCall('POST', url, body, headers)
            .then((res) => res.text())
            .then((res) => (res ? JSON.parse(res) : ''));
    }

    async asyncPost(url: string, body: any = undefined, headers: any = undefined): Promise<any> {
        const asyncURL = this.getAsyncRelativeURL(url);

        try {
            const postResults = await this.post(asyncURL, body, headers);

            if (!postResults.URI) {
                throw new Error(`Async post to ${asyncURL} returned without URI: ${JSON.stringify(postResults)}`);
            } else {
                const pollingResults: AuditLog = await this.getAuditLogResultObject(postResults.URI);

                if (!pollingResults.AuditInfo?.ResultObject) {
                    throw new Error(`AuditLog ${postResults.URI} has no ResultObject.`);
                }

                return JSON.parse(pollingResults.AuditInfo.ResultObject);
            }
        } catch (ex) {
            console.error(`asyncPost: ${ex}`);
            throw new Error((ex as { message: string }).message);
        }
    }

    async delete(url: string): Promise<any> {
        return this.apiCall('DELETE', url);
    }

    async apiCall(method: HttpMethod, url: string, body: any = undefined, headers: any = undefined) {
        const fullURL = this.options.baseURL + url;
        const options: any = {
            method: method,
            headers: {
                authorization: 'Bearer ' + this.options.token,
                ...headers,
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        if (this.options.addonUUID) {
            options.headers['X-Pepperi-OwnerID'] = this.options.addonUUID;
        }

        if (this.options.addonSecretKey) {
            options.headers['X-Pepperi-SecretKey'] = this.options.addonSecretKey;
        }

        if (this.options.actionUUID) {
            options.headers['X-Pepperi-ActionID'] = this.options.actionUUID;
        }
        const performance = getPerformance();
        const t0 = performance?.now();
        const res = await papi_fetch(fullURL, options);
        const t1 = performance?.now();

        if (!this.options.suppressLogging) {
            const diff = t0 && t1 ? (t1 - t0).toFixed(2) : 0;
            console.log(method, fullURL, 'took', diff, 'milliseconds');
        }

        if (!res.ok) {
            // try parsing error as json
            let error = '';
            try {
                error = JSON.stringify(await res.json());
            } catch {}

            throw new Error(`${fullURL} failed with status: ${res.status} - ${res.statusText} error: ${error}`);
        }

        return res;
    }

    msSleep(ms: number) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
    }

    sleep(ms: number) {
        console.debug(`%cSleep: ${ms} milliseconds`);
        this.msSleep(ms);
        return;
    }

    async getAuditLogResultObject(uri: string, loopsAmount = 30): Promise<AuditLog> {
        let auditLogResponse;

        do {
            try {
                auditLogResponse = await this.get(uri);
            } catch (ex) {
                console.error(`getAuditLogResultObject: ${ex}`);
                throw new Error((ex as { message: string }).message);
            }

            auditLogResponse =
                auditLogResponse === null
                    ? auditLogResponse
                    : auditLogResponse[0] === undefined
                    ? auditLogResponse
                    : auditLogResponse[0];

            //This case is used when AuditLog was not created at all (This can happen and it is valid)
            if (auditLogResponse === null) {
                this.sleep(2000);
                console.log('%cAudit Log was not found, waiting...');
                loopsAmount--;
            }

            //This case will only retry the get call again as many times as the "loopsAmount"
            else if (auditLogResponse.Status.ID == '2' || auditLogResponse.Status.ID == '5') {
                this.sleep(2000);
                console.log(
                    `%c${auditLogResponse.Status.ID === 2 ? 'In_Progress' : 'Started'}: Status ID is ${
                        auditLogResponse.Status.ID
                    }, 
                    Retry ${loopsAmount} Times.`,
                );
                loopsAmount--;
            }

            // Action failed. Throwing error
            else if (auditLogResponse.Status.ID === 0) {
                const errorMessage = auditLogResponse['AuditInfo'].ErrorMessage;
                console.log('Execution failed:', errorMessage);
                throw new Error(errorMessage);
            }
        } while (
            (auditLogResponse === null || auditLogResponse.Status.ID == '2' || auditLogResponse.Status.ID == '5') &&
            loopsAmount > 0
        );

        return auditLogResponse;
    }

    // this will work only for unrouted addon function calls
    getAsyncRelativeURL(url: string): string {
        // async relative URL is in the format of: /addons/api/async/{{addonUUID}}/...
        // regular relativeURL is in the format of: /addons/api/{{addonUUID}}/...

        const splitURL = url.split('/');

        if (splitURL.length < 4) {
            throw new Error(`Relative URL: ${url} is invalid!`);
        }

        if (splitURL[3] === 'async') {
            // URL is already async
            return url;
        }

        // add 'async' to URL
        splitURL.splice(3, 0, 'async');

        return splitURL.join('/');
    }
}
