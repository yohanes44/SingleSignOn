



import Application from "../../../entities/Application";



export default class AddApp{

    public dependancies: any;

    constructor(deps: any){
        this.dependancies = deps;
    }


    async addApp({ key, ApplicationName, Address, Roles, email }: { key: any, ApplicationName: any, Address: any, Roles: any, email: any } ){
        
        const user = this.dependancies.DatabaseService.getByEmail(email);
        if(!user){
            throw new Error("No user is found with your Email");
        }

        const applicationInstance = new Application(key, ApplicationName, Address, user.id);
        return await this.dependancies.AppService.addApp(applicationInstance, Roles);
    }


}




