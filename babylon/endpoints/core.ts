import { AddonData, SearchBody, SearchData } from '../../entities';
import { BabylonPapiClient } from '../babylon-papi-client';

export class CoreEndpoint {
    private readonly coreResourcesAddonUUID = '00000000-0000-0000-0000-00000000c07e';
    private readonly routerExposingFileName = 'babylon';

    constructor(protected service: BabylonPapiClient) {}

    resourceName(resourceName: string) {
        return {
            search: async (searchBody: SearchBody): Promise<SearchData<AddonData>> => {
                return await this.service.apiCall(
                    'POST',
                    this.coreResourcesAddonUUID,
                    this.routerExposingFileName,
                    `${resourceName}/search`,
                    searchBody,
                );
            },
        };
    }
}
