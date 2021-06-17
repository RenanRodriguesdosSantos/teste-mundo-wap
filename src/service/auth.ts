// export const TOKEN_KEY = "token";
// export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
// export const getToken = () => localStorage.getItem(TOKEN_KEY);
// export const login = (token: any) => {
//   localStorage.setItem(TOKEN_KEY, token);
// };
// export const logout = () => {
//   localStorage.removeItem(TOKEN_KEY);
// };

const token = localStorage.getItem("token");

export default function reducer(state = token, action : any){
  switch (action.type) {
      case "SET_TOKEN":
          return action.token;
      case "REMOVE_TOKEN":
          return null;
      default:
          return state;
  }
}

export const setToken = (token: string) =>{
  return{
      type: "SET_TOKEN",
      token
  }
}

export const removeToken = () =>{
  return{
      type: "REMOVE_TOKEN"
  }
}