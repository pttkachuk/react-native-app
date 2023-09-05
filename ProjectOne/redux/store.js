import { configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import rootReducer from './rootReducer';
import { authReducer } from './auth/authSlice';
import { postsReducer } from './post/postsSlice';

const persistConfigAuth = {
    key: 'auth',
    storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: persistedAuthReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
//const persistor = persistStore(store);
//export default { store, persistor };