


export default class GetUserUseCase{

    public databaseService: any;

    constructor(deps: any){
        this.databaseService = deps;
    }

    async execute(requestQuery : any){
            if(requestQuery.id){
                return this.databaseService.getById(requestQuery.id);    
            }
            if(requestQuery.email){
                return this.databaseService.getByEmail(requestQuery.email);
            }
            return this.databaseService.getAll();
    }

}