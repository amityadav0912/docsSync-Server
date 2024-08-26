import { validationResult } from "express-validator";
import catchAsync from "../../middleware/catch-async";
import { Request, Response } from "express";
import { userService } from "../../services/user.service";
import jwt, { VerifyErrors } from "jsonwebtoken"

class UserController{
    public register = catchAsync(async (req:Request, res:Response) => {
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json(err);
        }

        const {email, password1} = req.body;
        await userService.createUser(email,password1);
        return res.sendStatus(200);
    })

    public resetPassword = catchAsync(async (req:Request, res:Response) => {
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json(err);
        }

        const {email} = req.body;
        const user = await userService.findUserByEmail(email);
        if(!user) return res.status(200).json(this.resetPassword);

        await userService.resetPassword(user);

        return res.status(200).json(this.resetPassword);
    })

    public getUser = catchAsync(async (req: Request, res: Response) => {
        const userId = parseInt(req.params.id);

        const user = await userService.findUserById(userId);

        if(user===null) return res.sendStatus(400);
        return res.status(200).json(user);
    })

    public confirmResetPassword = catchAsync(async (req: Request, res: Response) => {
        const err= validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json(err);
        }

        const resetPasswordToken = req.params.token;
        const {password1} = req.body;

        jwt.verify(
            resetPasswordToken,
            "password_reset",
            async(err: VerifyErrors | null , decoded: unknown)=>{
                if(err) res.sendStatus(403);
                try{
                    const {email} = decoded as {email: string};

                    userService
                        .findUserByPasswordResetToken(email, resetPasswordToken)
                        .then((user) => {
                            if(!user){
                                return res.sendStatus(400);
                            }

                            userService
                                .updatePassword(user, password1)
                                .then(()=>{
                                    res.sendStatus(200);
                                })
                                .catch(()=>{
                                    res.sendStatus(500);
                                });
                        })
                        .catch(()=>{
                            res.sendStatus(500);
                        })
                }
                catch(error){
                    console.log(error);
                    res.sendStatus(403);
                }
            }
        )
    })


    public verifyEmail = catchAsync(async (req: Request, res: Response) => {
        const verificationToken = req.params.token;

        jwt.verify(
            verificationToken,
            "verification_token",
            async(err: VerifyErrors | null , decoded: unknown)=> {
                if(err) res.sendStatus(403);

                try{    
                    const {email} = decoded as {email: string};

                    userService
                        .findUserByVerificationToken(email,verificationToken)
                        .then((user)=>{
                            if(!user || user.isVerified){
                                return res.sendStatus(400);
                            }

                            userService
                                .updateIsVerified(user, true)
                                .then(()=>{
                                    res.sendStatus(500);
                                })
                                .catch(()=>{
                                    res.sendStatus(500);
                                });
                        }).catch(()=>{
                            res.sendStatus(500);
                        })
                }catch(error){
                    console.log(error);
                    res.sendStatus(403);
                }
            }
        )
    })
}

const userController = new UserController();

export {userController};