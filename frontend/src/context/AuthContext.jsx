import {  createContext, useContext, useState } from "react";

export const AuthContext = createContext(); 


//Instead of writing useContext(AuthContext) repeatedly in multiple components, this hook wraps that logic for easier reuse.
export const useAuthContext = () => {
  return useContext(AuthContext); 
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {

  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  ); 
  return (
    <AuthContext.Provider value={{authUser,setAuthUser}}>
      {children}
    </AuthContext.Provider>
  )
}