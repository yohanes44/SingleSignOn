
import User from "../../../entities/User";


export default class UpdateUserUseCase{

    public databaseService: any;

    constructor(deps: any){
        this.databaseService = deps;
    }

    async execute(userId: any, updatedUser: any){
        return this.databaseService.update(userId, updatedUser);
    }

}