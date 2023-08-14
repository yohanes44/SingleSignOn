import AddUserUseCase from "../application/use_cases/user/addUser";
import GetUserUseCase from "../application/use_cases/user/getUser";


export default class ApplicationController{

    public dependancies: any;

    constructor(deps: any){
        this.dependancies = deps;
    }

    async addNewUser (req: any, res: any, next: any){
        const {firstName, lastName, email, password} = req.body;
        const user = this.dependancies.DatabaseService.getByEmail(email);
        if(user)
           return res.json("User with the same email already exist");
        const addUserCommand = new AddUserUseCase(this.dependancies.DatabaseService);
        addUserCommand.execute(firstName, lastName, email, password);
        return res.status(200).json("User Registered Succesfully");
    }

    async getUsers (req: any, res: any, next: any){
        const getUserCommand =  new GetUserUseCase(this.dependancies.DatabaseService);
        const allUsers = getUserCommand.execute(req.query)
        return res.status(200).json(allUsers);
    }


}

