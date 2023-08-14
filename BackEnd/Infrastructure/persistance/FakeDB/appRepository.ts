import express from "express";
import ejs from "ejs";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import path from "path";







 const fakeDBUser: any = JSON.parse(fs.readFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/User.json"), { encoding: 'utf8' }))
 const fakeDBApp: any = JSON.parse(fs.readFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/Application.json"), { encoding: 'utf8' }))
 const fakeDBRole: any = JSON.parse(fs.readFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/Role.json"), { encoding: 'utf8' }))
 const fakeDBPermission: any = JSON.parse(fs.readFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/Permission.json"), { encoding: 'utf8' }))





export class appDBService{

    constructor(){
        
    }
    

    // done
   
    async addApp(applicationInstance: any, roles: any){
        applicationInstance.id = fakeDBApp.length + 1 ;  
        fakeDBApp.push(applicationInstance);              
        fs.writeFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/Application.json"), JSON.stringify(fakeDBApp, null, 2) + '\n')   
        roles.forEach((role: any) => {
            fakeDBRole.push({
                "id": fakeDBRole.length + 1,
                "appId": applicationInstance.id,
                "name": role
            });
        }); 
        fs.writeFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/Role.json"), JSON.stringify(fakeDBRole, null, 2) + '\n');    
        return applicationInstance;
    }

    // done
    async updateApp(id: any, content: any){
        try{   
            fakeDBApp.forEach( (app: any) => {
                if(app.id == id){                    
                    if(content.key)
                        app.key = content.key;
                    if(content.ApplicationName)
                        app.ApplicationName = content.ApplicationName;
                    if(content.Address)
                        app.Address = content.Address;
                    if(content.appAdmin)
                        app.appAdmin = content.appAdmin;
                    return  fs.writeFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/Application.json"), JSON.stringify(fakeDBApp, null, 2) + '\n');
                }
                return null;
            });
            
        }
        catch(error){
            return error
        }
    }

    // done
    async deleteApp(id: any){
        const appIndex  = fakeDBApp.findIndex( (app: any) => app.id == id );
        fakeDBApp.splice(appIndex, 1); 
        return fs.writeFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/Application.json"), JSON.stringify(fakeDBApp, null, 2) + '\n');
    }

    // done
    async addPermission(permissionInstance: any){
        permissionInstance.id = fakeDBPermission.length + 1 ;  
        fakeDBPermission.push(permissionInstance);              
        fs.writeFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/Permission.json"), JSON.stringify(fakeDBPermission, null, 2) + '\n')   
        return permissionInstance;  
    }


    async getRoleById(id: any){
        return fakeDBRole.find( (role: any) => role.id == id);
    }
    // done
    async getRolesForApp(userId: any, appId: any){

        const userRoles: any = [];
        const userPermissionForApp: any = [];

        const permission = fakeDBPermission.filter( (permission: any) => {
            if(permission.userId == userId){
                userPermissionForApp.push(permission.roleId);
                return true;
            }
        });

        const roles = fakeDBRole.filter( (role: any) => {
            if(userPermissionForApp.includes(role.id) && role.appId == appId){
               userRoles.push(role.Name);
               return true;
            }

         })

         return userRoles;

    }


    // done
    async deletePermission(userId: any, roleId: any){
        const permissionIndex  = fakeDBPermission.findIndex( (perm: any) => perm.userId == userId && perm.roleId == roleId )
        fakeDBPermission.splice(permissionIndex, 1);
        return fs.writeFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/Permission.json"), JSON.stringify(fakeDBPermission, null, 2) + '\n');
    }

    // done
    async addRole(appId: any, name: any){
       fakeDBRole.push({appId, name});
       return fs.writeFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/Role.json"), JSON.stringify(fakeDBRole, null, 2) + '\n');
    }

    // done
    async deleteRole(appId: any, name: any){
        const roleIndex  = fakeDBRole.findIndex( (role: any) => role.appId == appId && role.name == name )
        fakeDBRole.splice(roleIndex, 1);
        return fs.writeFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/Role.json"), JSON.stringify(fakeDBRole, null, 2) + '\n');
    }

    // done
    async checkAppOwner(userId: any, app: any){
        return fakeDBApp.find( (app: any) => app == app && app.appAdmin == userId);
    }

    
    async loginToApp(){
        
    }

    // done
    async getById(id: any){
        return fakeDBApp.find( (app: any) => app.id == id );
    }

    // done
    async getByKey(key: any){
        return fakeDBApp.find( (app: any) => app.key == key );
    }

    //done
    async getByAddress(address: any){
        return fakeDBApp.find( (app: any) => app.Address == address );
    }

    // done
    async getAll(){
        return fakeDBApp;
    }

    // async addApp(email: any, appKey: any, appName: any, appAddress: any, roles: any){
    //     try{
    //         const user = fakeDBUser.getByEmail( (user: any) => user.email == email );
    //         if(!user){
    //             return "No user is found with your Email";
    //         }
    
    //         const appAdmin = user.userId;
    
    //         var appLength = fakeDBApp.length;
            
    //         fakeDBApp.push({ appId: appLength++, key: appKey, ApplicationName: appName, Address: appAddress, appAdmin });
    //         fs.writeFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/Application.json"), JSON.stringify(fakeDBApp, null, 2) + '\n');
            
    
    //         var roleLength = fakeDBRole.length--;

    //         roles.map( (role: any) => {
    //             fakeDBRole.push({
    //                 "id": roleLength++,
    //                 "appId": fakeDBApp[fakeDBApp.length - 1].appId,
    //                 "Name": role
    //             })})

    //        fs.writeFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/Role.json"), JSON.stringify(fakeDBRole, null, 2) + '\n');    
    //        return {message: "Application Registered Succesffuly", "app info": fakeDBApp[fakeDBApp.length - 1], Roles: roles };
    

    //     }
    //     catch(error){
    //         return error
    //     }
    // }
    
}

