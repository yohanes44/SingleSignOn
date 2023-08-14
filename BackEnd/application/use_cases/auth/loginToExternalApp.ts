


export default class LoginToExternal{

    public dependancies: any;

    constructor(deps: any){
        this.dependancies = deps;
    }


    async login(email: any, address: any, password: any){
        
        const app = await this.dependancies.AppService.getByAddress(address);

        // console.log(this.dependancies.AppService.getByAddress);

        if (!app)
            throw new Error(`There is no application registered with the address ${address}`);

        const applicationId = app.appId;
        const user = await this.dependancies.DatabaseService.getByEmail(email);

        if (!user)
            throw new Error(`There is no user with the email ${email}`);

        const isMatchPassword = await this.dependancies.encryptor.compare(password, user.password);
        if(!isMatchPassword)
            throw new Error("Password does not math");

        const userRoles = await this.dependancies.AppService.getRolesForApp(user.id, app.id);

        if (userRoles.length < 1) {
            throw new Error("user has no role for the app");
        }

        if (userRoles.length >= 1) {
            const payload = { fullName: user.fullName, email: user.email, roles: userRoles }
            const token = await this.dependancies.tokenGenerator.generate(payload, app.key);
            return { token, userRoles };
        }


    }

}