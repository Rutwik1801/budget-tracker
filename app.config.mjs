import 'dotenv/config';
import Constants from 'expo-constants';

dotenv.config();
export default {
  expo: {
    extra: {
      BACKEND_URL: process.env.BACKEND_URL || Constants.expoConfig?.extra?.BACKEND_URL,
      SIGNUP_URL: process.env.SIGNUP_URL || Constants.expoConfig?.extra?.SIGNUP_URL,
      LOGIN_URL: process.env.LOGIN_URL || Constants.expoConfig?.extra?.LOGIN_URL,
      TOKEN_REFRESH_URL: process.env.TOKEN_REFRESH_URL || Constants.expoConfig?.extra?.TOKEN_REFRESH_URL,
      API_KEY: process.env.API_KEY || Constants.expoConfig?.extra?.API_KEY,
    },
  },
};