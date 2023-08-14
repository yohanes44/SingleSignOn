import express from "express";
import AuthenticationController from "../../controllers/auth";
import myRouter from "express";

const router = myRouter()

export default (dependencies: any)=> {

    const router = express.Router();

    router.post("/loginToSSO", async (req: any, res: any, next: any) => {
        try{
            const controller = new AuthenticationController(dependencies);
            const authresult = await controller.loginToSSOApp(req.body);
            res.json(authresult);
        }catch(error: any) {
           res.json({
                status: 505,
                message: error.message
            });
        }
    });


    router.post("/loginToExternalApp", async (req: any, res: any, next: any) => {
        try{
            console.log(req.body);
            const controller = new AuthenticationController(dependencies);
            const authresult = await controller.loginToExternalApp(req.body);
           
            res.json(authresult);
         
        }catch(error: any) {
           res.json({
                status: 505,
                message: error.message
            });
            
        }
    });
   
    return router;

}

