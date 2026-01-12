import { useContext, useState } from "react";
import AuthContent from "../components/auth/AuthContent";
import { createUser } from "../utils/rest";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function Signup() {
  const { signup } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const signUp = async ({email, password}) => {
    setIsLoading(true)
    try {
      const res = await createUser(email,password)
      signup(res)
    } catch (err: any) {
      setError(err.message)
      console.error('Signup error:', err);
      console.error('Error response:', err.response?.data);
    }
    setIsLoading(false)
  }
  if(error && !isLoading) return <ErrorOverlay message={error} onConfirm={() => setError(null)} />
  if(isLoading) return <LoadingOverlay />
  return <AuthContent onAuthenticate={signUp} />;
}

export default Signup;