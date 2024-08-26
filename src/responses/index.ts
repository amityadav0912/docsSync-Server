

const userNotFound : Array<ResponseMessage> = [
    {
        msg:"Your email or password is incorrect",
    },
];

const inCorrectPassword: Array<ResponseMessage> = [
    {
        msg:"Incorrect Password",
    }
]

const emailNotVerified: Array<ResponseMessage> = [
    {
        msg:"Please verify your email before logging in."
    }
]
export {userNotFound, inCorrectPassword, emailNotVerified};