import bcryptjs from "bcryptjs"

const users=[
    {
        name:"Sree",
        email:"sree@12",
        password:bcryptjs.hashSync("123456"),
        isAdmin:true
    }, 
    {
        name:"john",
        email:"john@12",
        password:bcryptjs.hashSync("123456"),
    },
     {
        name:"Sree",
        email:"honay@12",
        password:bcryptjs.hashSync("123456"),
    },
]
export default users