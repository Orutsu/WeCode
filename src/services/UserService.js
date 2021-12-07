var pjson = require('../../package.json');
console.log(pjson.host);
var host = pjson.host;

export const signUp = (roleId,  name, surname, email, dateOfBirth, password) => {
    const axios = require('axios').default;
    //doesn't work
    fetch(host + "/api/Users/signup", {
        method: 'POST', 
        mode: "cors",
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : '*',
            'Access-Control-Allow-Headers' : '*',
          },
          credentials: 'include',
        body: JSON.stringify({
            roleId : roleId,
            name : name,
            surname : surname,
            email : email,
            dateOfBirth : dateOfBirth,
            password : password,
        })}).then(() => {});
        
   //doesn't work either
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.post(host + "/api/Users/signup", {
            roleId : roleId,
            name : name,
            surname : surname,
            email : email,
            dateOfBirth : dateOfBirth,
            password : password,
          })
}

export const getUsers = () =>{
    fetch(host + "/api/Users", {mode: 'no-cors'}).then((response) =>{console.log(response)});
}