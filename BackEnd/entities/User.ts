export default class User {

    declare public firstName: string;
    declare public lastName: string;
    declare public fullName: string;
    declare public email: string;
    declare public password: string;

 
    constructor(firstName: string, lastName: string, email: string, password: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = `${firstName} ${lastName}`;
        this.email = email;
        this.password = password;
    }

}