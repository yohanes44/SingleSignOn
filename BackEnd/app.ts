

import express from "express"

const app = express();

const port = 3000;

import userRouter from "./Infrastructure/routes/user"
import authRouter from "./Infrastructure/routes/auth"

import dependencies from "./config/projectDependencies";


app.use(express.json());
app.use("/", userRouter(dependencies));
app.use("/auth", authRouter(dependencies));



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})


