
import User from "../../../entities/User";


export default class AddUserUseCase{

    public dependancies: any;

    constructor(deps: any){
        this.dependancies = deps;
    }

    async execute(firstName: any, lastName : any, email : any, password : any){
        const hashedPassword = await this.dependancies.encryptor.hash(password);
        const userInstance = new User(firstName, lastName, email, hashedPassword)
        return this.dependancies.DatabaseService.add(userInstance);
    }

}