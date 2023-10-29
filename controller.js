const {createNewAccount,isUserNameTaken,checkForPasswordMatch, simpleEncrypt, sendMail} = require("./utils");
const crypto = require('crypto')
const CryptoJS = require('crypto-js');
const {isValidRegisterData, isValidLoginData, isValidReset, isValidSendOtp} = require('./validator')
const nodemailer = require('nodemailer');
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



const sendOtp = async(req,res) => {
    const validatedData = isValidSendOtp(req.body)
    const otp = Math.floor(100000 + Math.random() * 900000);
    try {
        const email = validatedData.email
        await User.findOneAndUpdate({ email }, { otp }, { upsert: true });
        const mailInfo = await sendMail(email,otp)
        res.json(mailInfo)
        //write a function send mail to the user
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send OTP.');
    }
}

const validateOtp = async(req,res) => {
     // validate the otp data

     // make a read request to the db and check if the otp matches the user

     // reset his shares and update the entry in the DB
}

module.exports = {register,login,sendOtp}
