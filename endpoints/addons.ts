import Endpoint from "../endpoint"
import { Addon, InstalledAddon, AddonVersion,AddonSyncDeploymentResult,AddonAPIAsyncResult,AddonAPISyncResult } from "../entities"
import { PapiClient } from "../papi-client";

class InstalledAddonEnpoint {
 constructor(private service: PapiClient, private uuid: string) { 
 
 }
 async install(version:string): Promise<AddonSyncDeploymentResult> {
    if(version)
        return await this.service.post(`/addons/installed_addons/${this.uuid}/install/${version}`);
    else
        return await this.service.post(`/addons/installed_addons/${this.uuid}/install`); 
}

 async upgrade(version:string): Promise<AddonAPIAsyncResult> {
     if(version)
        return await this.service.post(`/addons/installed_addons/${this.uuid}/upgrade/${version}`);
    else
        return await this.service.post(`/addons/installed_addons/${this.uuid}/upgrade`);

    }
}

class InstalledAddonsEnpoint extends Endpoint<InstalledAddon> {
 constructor(service: PapiClient) { 
 super(service, '/addons/installed_addons');
 }
    addonUUID(uuid: string) {
        return new InstalledAddonEnpoint(this.service, uuid);
    }
}


class AddonExecuteNowEnpoint {

    constructor(private service: PapiClient) { }

    async PostSyncWithVersion(AddonUUID:string,Version:string, FileName:string,  FunctionName:string, Debug:string="false", Body: any= undefined): Promise<AddonAPISyncResult> {
           return await this.service.post(`/addons/api/${AddonUUID}/version/${Version}/${FileName}/${FunctionName}?debug=${Debug}`,Body);
   }

}
class AddonVersionEndpoint extends Endpoint<AddonVersion> {
    constructor(service: PapiClient) { 
    super(service, '/addons/versions');
    }
         
}

export class AddonEndpoint extends Endpoint<Addon> {
 constructor(service: PapiClient) { 
 super(service, '/addons');
 }
 installedAddons = new InstalledAddonsEnpoint(this.service)
 addonsVersions = new AddonVersionEndpoint(this.service)
 addonExecuteNow = new AddonExecuteNowEnpoint(this.service)
}