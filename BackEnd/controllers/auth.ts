import AuthResult from "../application/Interface/AutResult";

import LoginToSSO from "../application/use_cases/auth/loginToInternal";
import LoginToExternal from "../application/use_cases/auth/loginToExternalApp";



export default class AuthenticationController {

    public dependancies: any;
    public loginToSSOuseCase: any;
    public loginToExternaluseCase: any;
   
    constructor(deps: any) {
        this.dependancies = deps;
        this.loginToSSOuseCase =new LoginToSSO(this.dependancies);
        this.loginToExternaluseCase =new LoginToExternal(this.dependancies);
    }

    


    async loginToSSOApp({ email, password }: { email: string, password: string }) {
           const userAccess =  await this.loginToSSOuseCase.login(email, password);
           return userAccess;
    }


    async loginToExternalApp({email, address, password}: {email: any, address: any, password: any}) {
        const userAccess = await this.loginToExternaluseCase.login(email, address, password);
        return userAccess;
    }

}