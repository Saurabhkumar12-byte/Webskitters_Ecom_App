import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from '../redux/slices/authSlice';
import { RootState } from '../redux/rootReducer';

const AuthLoadingScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (user !== null) {
      navigation.navigate('Main'); 
    } else {
      navigation.navigate('Auth'); 
    }
  }, [user, navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{error ? `Error: ${error}` : 'Authenticating...'}</Text>
    </View>
  );
};

export default AuthLoadingScreen;
