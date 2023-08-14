import AddUserUseCase from "../application/use_cases/user/addUser";
import GetUserUseCase from "../application/use_cases/user/getUser";
import UpdateUserUseCase from "../application/use_cases/user/updateUser";
import DeleteUserUseCase from "../application/use_cases/user/deleteUser";

export default class UserController{

    public dependancies: any;

    constructor(deps: any){
        this.dependancies = deps;
    }

    async addNewUser({firstName, lastName, email, password}: {firstName: any, lastName: any, email: any, password: any}){
            const user = this.dependancies.DatabaseService.getByEmail(email);
            if(user){
                throw new Error("User with the same email already exist");
            }
            const addUserCommand = new AddUserUseCase(this.dependancies);
            return addUserCommand.execute(firstName, lastName, email, password);       
    }

    async getUser (requestQuery: any){
        const getUserCommand = new GetUserUseCase(this.dependancies.DatabaseService)
        const users = getUserCommand.execute(requestQuery);
        return users;
    }

    async updateUser ({userId, updatedUser}: {userId: any, updatedUser: any}){
        const updateUserCommand = new UpdateUserUseCase(this.dependancies.DatabaseService);
        return updateUserCommand.execute(userId, updatedUser);
    }

    async deleteUser (userId: any){
        const user = this.dependancies.DatabaseService.getById(userId);
        if(!user){
            throw new Error("user not found");
        }
        const deleteCommand = new DeleteUserUseCase(this.dependancies.DatabaseService);
        deleteCommand.execute(user);
        return "User Deleted Succesfully";
    }


}