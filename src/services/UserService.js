var pjson = require('../../package.json');
var axios = require('axios').default;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
var host = pjson.host;

export const signUp = async (roleId,  name, surname, email, password) => {
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
    const userInfo = await axios.post(host + `/api/Users/signin?email=${email}&password=${password}`);
    console.log('signIn', userInfo);
    return userInfo.data;
}

export const getUsers = async () =>{
    return await axios.get(host + "/api/Users");
}

export const getUser = async (userId) =>{
    const userInfo = await axios.get(host + `/api/Users/${userId}`);
    console.log('getUser', userInfo);
    return userInfo.data;
}

export const changeUserData = async (userId, name, surname, email, password) =>{
    const currentUserData = await getUser(userId);

    if(name)
    {
        currentUserData.name = name;
    }
    if(surname)
    {
        currentUserData.surname = surname;
    }
    if(email)
    {
        currentUserData.email = email;
    }
    if(password)
    {
        currentUserData.name = password;
    }

    await axios.put(host + `/api/Users/${userId}`, currentUserData);
    return currentUserData;
}
