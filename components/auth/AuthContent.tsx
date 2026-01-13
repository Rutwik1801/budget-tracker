import { useState } from 'react';
import { Alert } from 'react-native';
import AuthForm, { Credentials } from './AuthForm';
import FlatButton from '../UI/FlatButton';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../UI/Button';
import { IconButton } from '../UI/IconButton';
import { View, Text } from '../base';

function AuthContent({ isLogin, onAuthenticate }: {isLogin: boolean; onAuthenticate: (val: {email: string; password: string}) => void;}) {
  const navigation = useNavigation()
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if(isLogin) {
      (navigation as any).navigate("Signup")
    } else {
      (navigation as any).navigate("Login")
    }
  }

  function submitHandler(credentials: Credentials) {
    let { email, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && !passwordsAreEqual)
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View className="p-4 rounded-xl bg-white flex-1 pt-[140px]">
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View className="mt-2 pb-2.5 border-b border-gray-500 mb-7">
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
      <Button onPress={() => {}}>
        <View className="flex-row items-center flex-1">
          <IconButton icon='logo-google' size={20} color='black' />
          <Text>Sign In with Google</Text>
        </View>
      </Button>
    </View>
  );
}

export default AuthContent;