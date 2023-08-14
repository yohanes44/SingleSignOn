import express from "express";
import ejs from "ejs";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';


const SECRET_ID = "userMgmtKey4466";

export class TokenGenerator {
    
    constructor(){

    }

    async generate(payload: any, secretId: any){
        const token = jwt.sign(payload, secretId);
        return token;
    }
}  