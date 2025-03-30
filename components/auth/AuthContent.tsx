import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AuthForm from './AuthForm';
import FlatButton from '../UI/FlatButton';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../UI/Button';
import { IconButton } from '../UI/IconButton';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation()
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if(isLogin) {
      navigation.navigate("Signup")
    } else {
      navigation.navigate("Login")
    }
  }

  function submitHandler(credentials) {
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
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler} >
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
      <Button onPress={() => {}}>
        <View style={{flexDirection:"row", alignItems:"center", flex:1}}>
        <IconButton icon='logo-google' size={20} color='black' />
        <Text>Sign In with Google</Text>
        </View>
      </Button>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "white",
    flex: 1,
    paddingTop: 140
  },
  buttons: {
    marginTop: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#777",
    marginBottom: 30
  },
});