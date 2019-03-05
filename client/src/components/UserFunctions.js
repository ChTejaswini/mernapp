import axios from 'axios'

export const register =newUser =>{
    return axios
    .post('users/register ',{
        first_name:newUser.first_name,
        last_name:newUser.last_name,
        email:newUser.email,
        password:newUser.password,
        confirmpassword:newUser.confirmpassword

    })
    .then(res =>{
        console.log('Registered')
    })
}
export const login =user =>{
    return axios
    .post('users/login ',{
        
        email:user.email,
        password:user.password

    })
    .then(res =>{
    localStorage.setItem('usertoken',res.data)
    return res.data
    })
    .catch(err =>
        {
            console.log(err)
        })
} 
export const reset =user =>{
    return axios
    .put('users/reset ',{
        
      // first_name:user.first_name,
        password:user.password,
        confirmpassword:user.confirmpassword

    })
    .then(res =>{
        console.log(res.data);
    return res.data
    })
    .catch(err =>
        {
            console.log(err)
        })
} 
export const forgot =user =>{
    return axios
    .post('users/forgot ',{
        
        email:user.email,
    })
    .then(res =>{
        console.log(res.data);
    return res.data
    })
    .catch(err =>
        {
            console.log(err)
        })
}
 
