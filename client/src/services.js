import axios from 'axios'
const API_ENDPOINT = 'http://localhost:3001'

const register = async ({ name,email,password,share_count,threshold})=> {
    return axios
        .post(
            API_ENDPOINT + '/register',
            {
                name,email,password,share_count,threshold
            }
        )
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        })
}

const login = async ({ email,password,shares })=> {
    return axios
        .post(
            API_ENDPOINT + '/login',
            {
                email,password,shares
            }
        )
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        })
}
export {register,login}
