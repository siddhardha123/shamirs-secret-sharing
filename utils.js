const sss = require('shamirs-secret-sharing')
const EC = require('elliptic').ec;
const User = require('./Models/User.schema');
const CryptoJS = require('crypto-js');
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
   const recoveredKey =  await _recoverKey(shares)
   const newPass = CryptoJS.AES.encrypt(sentPass,recoveredKey).toString();
   if(newPass === correctPass){
       return true
   }
   return false
}
const isUserNameTaken = async (userName) => {
     return  User.findOne({ userName });
};

module.exports = {createNewAccount,isUserNameTaken,checkForPasswordMatch}




