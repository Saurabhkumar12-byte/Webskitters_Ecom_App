// LoginScreen.tsx

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/rootReducer';
import { validateEmail, validatePassword } from '../../utils/validation';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError('Invalid email address');
    } else {
      setEmailError(null);
    }

    if (!isPasswordValid) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError(null);
    }

    if (isEmailValid && isPasswordValid) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError && <Text style={styles.error}>{emailError}</Text>}
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {passwordError && <Text style={styles.error}>{passwordError}</Text>}
      {error && <ErrorMessage error={error} />}
      <Button mode="contained" onPress={handleLogin} loading={loading}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate('SignUp')}>Sign Up</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default LoginScreen;
