import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import store from './redux/store';

const RNApp = () => {
  return (
    <Provider Provider store={store}>
      <ToastProvider offsetBottom={60}>
        <App />
      </ToastProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNApp);
