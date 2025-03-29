import { useContext, useState } from "react";
import AuthContent from "../components/auth/AuthContent";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { loginUser } from "../utils/rest";
import { AuthContext } from "../store/auth-context";

function Login() {
  const {login: loginuser} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const login = async ({email, password}) => {
      setIsLoading(true)
      try {
        const res = await loginUser(email,password)
        loginuser(res)
      } catch (err) {
        setError(err.message)
      }
     setIsLoading(false)
    }
    if(error && !isLoading) return <ErrorOverlay message={error} onConfirm={() => setError(null)} />
    if(isLoading) return <LoadingOverlay />
  return <AuthContent isLogin onAuthenticate={login} />;
}

export default Login;