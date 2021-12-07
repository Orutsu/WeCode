var pjson = require('../../package.json');
var axios = require('axios').default;
var host = pjson.host;

export const signUp = async (roleId,  name, surname, email, password) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const userInfo = await axios.post(host + "/api/Users/signup", {
        roleId : roleId,
        name : name,
        surname : surname,
        email : email,
        password : password,
        });
    return userInfo.data;
}

export const signIn = async (email, password) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const userInfo = axios.post(host + `/api/Users/signin?email=${email}&password=${password}`);
    return userInfo.data;
}

export const getUsers = async () =>{
    return await axios.get(host + "/api/Users");
}