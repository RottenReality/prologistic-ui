import { useState } from "react";
import { AuthContext } from "./AuthContext"; 

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "")

    const saveToken = (value) => {
        localStorage.setItem("auth_token", value)
        setToken(value)
    }

    const clearToken = () => {
        localStorage.removeItem("auth_token")
        setToken("")
    }
    
    return(
        <AuthContext.Provider value={{ token, saveToken, clearToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;