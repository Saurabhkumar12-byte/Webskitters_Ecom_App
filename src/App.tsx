import 'react-native-gesture-handler';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './redux/store';
import MainNavigator from './navigation/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/index';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
