import React from 'react';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { View } from 'react-native';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={{flex:1 ,justifyContent:"flex-end",padding:23
      

    }}>
      <Button mode="contained" onPress={handleLogout}>
      Logout
    </Button>
    </View>
  );
};

export default LogoutButton;
