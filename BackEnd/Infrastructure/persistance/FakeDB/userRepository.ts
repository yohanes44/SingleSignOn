import express from "express";
import ejs from "ejs";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import path from "path";







 const fakeDBUser: any = JSON.parse(fs.readFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/User.json"), { encoding: 'utf8' }))
// const fakeDBApp: any = JSON.parse(fs.readFileSync("./Store/Application.json", { encoding: 'utf8' }))
// const fakeDBRole: any = JSON.parse(fs.readFileSync("./Store/Role.json", { encoding: 'utf8' }))
// const fakeDBPermission: any = JSON.parse(fs.readFileSync("./Store/Permission.json", { encoding: 'utf8' }))


export class userDBService{

   
    constructor(){
    }
    

    add(userInstance: any){
       userInstance.id = fakeDBUser.length + 1 ;  
       fakeDBUser.push(userInstance);              
       fs.writeFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/User.json"), JSON.stringify(fakeDBUser, null, 2) + '\n')   
       return userInstance;         
    }

    update(userId: any, updatedUser: any){
        const userIndex = fakeDBUser.findIndex( (user: any) => user.id == userId );
        if(userIndex !== -1){        
            fakeDBUser[userIndex] = updatedUser;
            fs.writeFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/User.json"), JSON.stringify(fakeDBUser, null, 2) + '\n');
            return updatedUser;
        }else{
            throw new Error(`No User found with the id ${userId}`);
        }
    }

    delete(user: any){
        const userToBeDeleted = fakeDBUser.find( (user: any) => user == user);
        if(!userToBeDeleted){
            throw new Error("No User found");;
        }
        const userIndex  = fakeDBUser.findIndex( (user: any) => user == user );
        fakeDBUser.splice(userIndex, 1);
        return fs.writeFileSync(path.resolve("./Infrastructure/persistance/fakeDB/Store/User.json"), JSON.stringify(fakeDBUser, null, 2) + '\n'); 
    }

    getById(id: any){
        const user = fakeDBUser.find( (user: any) => user.id == id);
        if(!user)
            throw new Error(`No User found with the id ${id}`);
        return user;
    }

    getByEmail(email: any){
        const user = fakeDBUser.find( (user: any) => user.email == email);
        if(!user)
            return null;
        return user;
    }

    getAll(){
        return fakeDBUser;
    }
    
}

