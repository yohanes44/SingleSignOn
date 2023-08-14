import express from "express";
import userController from "../../controllers/user";


export default (dependencies: any) => {
    const router = express.Router();

    const controller = new userController(dependencies);

    router.get("/", (req, res)=>{
        return res.json("Welcome to my SSO");
    });

    router.post("/register", async (req: any, res: any, next: any) => {
        try{
            const {firstName, lastName, email, password} = req.body;
            const user = await controller.addNewUser({firstName, lastName, email, password});
            res.json(user);
        }
        catch(error: any){    
            res.json({
                status: 505,
                message: error.message
            })
        }
    });

    
    router.get("/getUser", async (req: any, res: any, next: any) => {
        try{
            const user = await controller.getUser(req.query);
            res.json(user);
        }
        catch(error: any){    
            res.json({
                status: 505,
                message: error.message
            })
        }
    });
    
    router.put("/updateUser", async (req: any, res: any, next: any) => {
        try{
            const user = await controller.updateUser(req.body);
            res.json(user);
        }
        catch(error: any){    
            res.json({
                status: 505,
                message: error.message
            })
        }
    });

    router.delete("/deleteUser", async (req: any, res: any, next: any) => {
        try{
            const user = await controller.deleteUser(req.body.userId);
            res.json("user deleted succesfully");
        }
        catch(error: any){    
            res.json({
                status: 505,
                message: error.message
            })
        }
    });


    return router;
}

