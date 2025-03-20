import { PapiClientOptions } from '../papi-client';
import { AddonRunnerParameters, executeBabylonCall, HttpMethod } from '@pepperi-addons/addon-infra-sdk';
import { CoreEndpoint } from './endpoints/core';

export class BabylonPapiClient {
    constructor(private options: PapiClientOptions) {}

    // Expose only the apiCall method as public
    public async apiCall(
        method: HttpMethod,
        addonUUID: string,
        routerFile: string,
        route: string,
        body?: any,
        headers?: any,
    ): Promise<any> {
        const addonRunnerParameters: AddonRunnerParameters = {
            Body: body,
            Headers: {
                Authorization: this.options.token,
                ActionID: this.options.actionUUID,
                ...headers,
            },
            QueryStringParameters: null,
            HostedFunctionParameters: {
                AddonUUID: addonUUID,
                AddonFunctionName: route,
                AddonFileName: routerFile,
            },
            HttpMethod: method,
            PathParameters: null,
        };
        return await executeBabylonCall(addonRunnerParameters);
    }

    core = new CoreEndpoint(this);
}
