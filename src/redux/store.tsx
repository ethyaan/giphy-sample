import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { mainReducer } from './slices/main.slice';

export const store = configureStore({
    reducer: {
      main: mainReducer
    }
});

const AppStorage = (props: any) => {
    return (
      <Provider store={store}>
        {props.children}
      </Provider>);
};

export default AppStorage;