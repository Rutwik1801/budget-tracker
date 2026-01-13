import { useState } from 'react';
import Input from './Input';
import { Button } from '../UI/Button';
import { View } from '../base';

export type CredentialsInvalid = {
email:boolean;
password: boolean;
confirmPassword: boolean;  
}

export type Credentials = {
  email: string;
  password: string;
  confirmPassword: string;
}

function AuthForm({ isLogin, onSubmit, credentialsInvalid }: {isLogin: boolean; onSubmit: (val: Credentials) => void; credentialsInvalid: CredentialsInvalid}) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType: "email" | "password" | "confirmPassword", enteredValue: string) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={(value) => updateInputValueHandler('email', value)}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        <Input
          label="Password"
          onUpdateValue={(value) => updateInputValueHandler('password', value)}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={(value) => updateInputValueHandler('confirmPassword', value)}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View className="mt-3">
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;