

import {userDBService} from "../Infrastructure/persistance/FakeDB/userRepository";
import {appDBService} from "../Infrastructure/persistance/FakeDB/appRepository";
// import {AuthenticationServiceInternal} from "../Infrastructure/authentication/authenticationInternal";
// import {AuthenticationServiceExternal} from "../Infrastructure/authentication/authenticationExternal";

import {Encryption} from "../Infrastructure/authentication/encryption";
import {TokenGenerator} from "../Infrastructure/authentication/tokenGenerator"


const DatabaseService: any = new userDBService();
const AppDatabaseService: any = new appDBService();

const encryptor: any = new Encryption();
const tokenGenerator: any = new TokenGenerator();
// const authenticationServiceInternal: any = new AuthenticationServiceInternal(DatabaseService, encrytor, tokenGenerator);
// const authenticationExternalExternal: any = new AuthenticationServiceExternal(DatabaseService, appDBService, encrytor, tokenGenerator);




export default {
    DatabaseService: DatabaseService,
    AppService: new appDBService(),
    encryptor,
    tokenGenerator,
    applicationSecretKey: "UserManagment API"
    // AuthenticationServiceInternal: authenticationServiceInternal,
    // AuthenticationServiceExternal: authenticationExternalExternal,
}