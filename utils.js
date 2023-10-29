const sss = require('shamirs-secret-sharing')
const EC = require('elliptic').ec;
const User = require('./Models/User.schema');
const CryptoJS = require('crypto-js');
const nodemailer = require('nodemailer');
// {userName,password,shareCount,threshold}
const _createPrivateKeyPair = async ()=>{
    const ec = new EC('secp256k1');
    const keyPair = ec.genKeyPair();
    const privateKeyHex = keyPair.getPrivate('hex');
    const publicKeyHex = keyPair.getPublic('hex');
    return {pb:publicKeyHex,pv:privateKeyHex}
}

const _splitKey = (privateKey, shareCount, threshold) => {
    const secret = Buffer.from(privateKey);
    const shares = sss.split(secret, { shares: shareCount, threshold: threshold });
    return shares.map(share => share.toString('base64'));
}

const _recoverKey = async (shares) => {
    const recovered = sss.combine(shares)
    return recovered.toString()
}

const createNewAccount = async ({share_count,threshold}) => {
   const keyValuePair =  await  _createPrivateKeyPair()
   const shares = _splitKey(keyValuePair.pv,share_count,threshold)
   return {
       'pb' : keyValuePair.pb,
       'pv' : keyValuePair.pv,
       'shares' : shares
   }
}
const checkForPasswordMatch = async(correctPass,sentPass,shares) => {
    const newShares = shares.map(base64String => Buffer.from(base64String, 'base64'));
    const recoveredKey =  await _recoverKey(newShares)
    const decryptedPass = simpleDecrypt(correctPass,recoveredKey)
   if(decryptedPass === sentPass){
       return true
   }
   return false
}
const isUserNameTaken = async (userName) => {
      return  User.findOne({ user_name : userName });
};

const  simpleEncrypt = (input, secret) => {
    let result = '';
    for (let i = 0; i < input.length; i++) {
        result += String.fromCharCode(input.charCodeAt(i) ^ secret.charCodeAt(i % secret.length));
    }
    return result;
}
function simpleDecrypt(input, secret) {
    return simpleEncrypt(input, secret); // XOR operation is its own inverse
}

const sendMail = async (email, otp) => {
    const mailOptions = {
        from: 'otpsender12345@gmail.com',
        to: email,
        subject: 'Your Subject',
        text: `Your OTP is: ${otp}`,
    };

    return  transporter.sendMail(mailOptions);
};
module.exports = {createNewAccount,isUserNameTaken,checkForPasswordMatch,simpleEncrypt,simpleDecrypt,sendMail}




