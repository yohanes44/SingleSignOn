



export default class DeleteUserUseCase{

    public databaseService: any;

    constructor(deps: any){
        this.databaseService = deps;
    }

    async execute(user : any){
        return this.databaseService.delete(user);
    }

}