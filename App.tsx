import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ToastProvider} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Route from './src/Navigation/Route';

const queryClient = new QueryClient();
const App = () => {
  // useEffect(() => {
  //   const clearStorage = async () => {
  //     try {
  //       await AsyncStorage.clear();
  //       console.log('Storage cleared');
  //     } catch (err) {
  //       await AsyncStorage.clear();
  //       console.log('Storage cleared');
  //       console.log('Failed to clear storage');
  //     }
  //   };
  //   clearStorage();
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <Route />
          </ToastProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
