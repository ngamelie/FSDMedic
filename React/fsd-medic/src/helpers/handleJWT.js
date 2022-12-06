
const tokenKey = 'accessToken';

export function getRole(){
    const token = localStorage.getItem(tokenKey);

    if (!token){
        return 0;
    }

    const dataToken = JSON.parse(atob(token.split('.')[1]));
    const response = [];
    for (const property in dataToken){
        response.push({name: property, value: dataToken[property]});
    }
    console.log(response[1].value)
    return response[1].value;
}

export function getEmail(){
   const token = localStorage.getItem(tokenKey);

   if (!token){
       return '';
   }

   const dataToken = JSON.parse(atob(token.split('.')[1]));
   const response = [];
   for (const property in dataToken){
       response.push({name: property, value: dataToken[property]});
   }
   console.log(response[0].value)
   return response[0].value;
}

export function logout(){
    localStorage.removeItem(tokenKey);   
}

export function getToken(){
    return localStorage.getItem(tokenKey);
}