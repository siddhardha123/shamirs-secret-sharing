const {createNewAccount,isUserNameTaken,checkForPasswordMatch, simpleEncrypt} = require("./utils");
const crypto = require('crypto')
const CryptoJS = require('crypto-js');
const {isValidRegisterData, isValidLoginData} = require('./validator')
const User = require('./Models/User.schema');
const register = async (req,res) => {
    try{
        if(req.body.threshold > req.body.share_count){
            res.json({"message" : "threshold cannot be greater than total shares"})
        }
        const  validatedData = await isValidRegisterData(req.body)
        const  accountData=   await createNewAccount({...validatedData})
        validatedData.password = simpleEncrypt(validatedData.password,accountData.pv).toString()
        const user = await isUserNameTaken(validatedData.user_name);
        if(user !== null){
            res.json({"message" : "user already exists"})
            return
        }
        const newUser = new User(validatedData);
        await newUser.save();
        res.status(200).json({"name" : newUser.name,"shares" : accountData.shares})
    }catch (e) {
        console.log(e)
    }

}

const login = async(req,res) => {
   try{
       const validatedData = await isValidLoginData(req.body)
       const user = await isUserNameTaken(validatedData.user_name)
       if(user === null){
           res.json({"message" : "user doesn't exist"})
           return
       }
       const isCorrect = await checkForPasswordMatch(user.password,validatedData.password,validatedData.shares)
       if(isCorrect){
           res.json({"message" : "login successful"})
       }else{
           res.json({"message" : "login failed"})
       }

   }catch (e) {
       console.log(e)
   }

}

module.exports = {register,login}
