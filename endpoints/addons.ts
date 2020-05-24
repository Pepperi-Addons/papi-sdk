import Endpoint from "../endpoint"
import { Addon, InstalledAddon } from "../entities"
import { PapiClient } from "../papi-client";

export class AddonEndpoint extends Endpoint<Addon> {
    constructor(service: PapiClient) { 
        super(service, '/addons');
    }

    installedAddons = new Endpoint<InstalledAddon>(this.service, this.endpoint + '/installed_addons')
}