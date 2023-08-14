




import Permission from "../../../entities/Permission";



export default class AddPermission {

    public dependancies: any;

    constructor(deps: any) {
        this.dependancies = deps;
    }


    async addPermission({ userId, userToBeAddedId, roleId, appId }: { userId: any, userToBeAddedId: any, roleId: any, appId: any }) {

        const user = await this.dependancies.DatabaseService.getById(userId);
        if (!user) {
            throw new Error("No user is found with your Email");
        }

        const app = await this.dependancies.AppService.getById(appId);
        if (!app) {
            throw new Error("No app is found with this APP ID")
        }

        if (app.appAdmin != user.id) {
            throw new Error("You can't add permission to Application you are not Owner of");
        }

        const userAdded = await this.dependancies.DatabaseService.getById(userToBeAddedId);
        const roleAdded = await this.dependancies.AppService.getRoleById(roleId);

        if (!userAdded) {
            throw new Error(`There is no User with the Id ${userToBeAddedId}`);
        }

        if (!roleAdded) {
            throw new Error(`There is no Role with this Id ${roleId}`);
        }

        const permissionInstance = new Permission(userToBeAddedId, roleId);
        return await this.dependancies.AppService.addPermission(permissionInstance);
    }


}





