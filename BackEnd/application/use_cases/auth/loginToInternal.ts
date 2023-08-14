


export default class LoginToSSO{

    public dependancies: any;

    constructor(deps: any){
        this.dependancies = deps;
    }

    async login(email: any, password: any) {

        const user = this.dependancies.DatabaseService.getByEmail(email);
        if (!user)
            throw new Error("User not found");
        
        const isMatchPassword = await this.dependancies.encryptor.compare(password, user.password);
        if (!isMatchPassword)
            throw new Error("Password does not math");

        const accessToken = await this.dependancies.tokenGenerator.generate({ fullName: user.fullName, email: user.email }, this.dependancies.applicationSecretKey);
        return {
            accessToken, firstName: user.firstName, lastName: user.lastName, fullName: user.fullName, email: user.email
        };
    }

}