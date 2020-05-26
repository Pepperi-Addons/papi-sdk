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

interface AsyncApiQueryParameters  {
    CallbackUUID?:string,
    NumberOfTries?:number
}
    
class AddonApiEndpoint {

    private options = {
        uuid: '',
        file: '',
        func: '',
        version: '',
        sync: true,
        queryString: ''
    }
    constructor (private service: PapiClient) {
    }

    uuid(uuid:string) {
        this.options.uuid = uuid;
        return this;
    }
    version(version:string) {
        this.options.version = version;
        return this;
    }
    file(fileName:string) {
        this.options.file = fileName;
        return this;
    }
    func(functionName:string) {
        this.options.func = functionName;
        return this;
    }
    sync() {
        this.options.sync = true;
        return this;
    }
    async() {
        this.options.sync = false;
        return this;
    }
    async get(asyncApiQueryParameters:AsyncApiQueryParameters) {

        var versionPart='';
        if(this.options.version){
            versionPart = `/version/${this.options.version}`;
        }

        if(this.options.sync){
            return await this.service.get(`/addons/api/${this.options.uuid}${versionPart}/${this.options.file}/${this.options.func}`);
        }
        else{

            var queryString = this.getAsyncQueryString(asyncApiQueryParameters);
            return await this.service.get(`/addons/api/async/${this.options.uuid}${versionPart}/${this.options.file}/${this.options.func}?${queryString}`);
        }
    }
    async post(asyncApiQueryParameters:AsyncApiQueryParameters, body:any=undefined) {

        var versionPart='';
        if(this.options.version){
            versionPart = `/version/${this.options.version}`;
        }

        if(this.options.sync){
            return await this.service.post(`/addons/api/${this.options.uuid}${versionPart}/${this.options.file}/${this.options.func}`,body);
        }
        else{
  
            var queryString = this.getAsyncQueryString(asyncApiQueryParameters);
            return await this.service.post(`/addons/api/async/${this.options.uuid}${versionPart}/${this.options.file}/${this.options.func}?${queryString}`,body);
        }
    }

    private getAsyncQueryString(asyncApiQueryParameters : AsyncApiQueryParameters){
        var numberOfTries = asyncApiQueryParameters.NumberOfTries? asyncApiQueryParameters.NumberOfTries: 1;
        var queryString =`retry=${numberOfTries}`;
            if(asyncApiQueryParameters.CallbackUUID)  {
                queryString = queryString+`&callback=${asyncApiQueryParameters.CallbackUUID}`;
            }
        return queryString;
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
 versions = new AddonVersionEndpoint(this.service)
 api = new AddonApiEndpoint(this.service)
}
