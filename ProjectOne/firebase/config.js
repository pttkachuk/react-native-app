// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyDyPWswXsxuhnTjLKWGll6WB4S5hcGKzko",
    authDomain: "reactnativeprojectone-abcc7.firebaseapp.com",
    projectId: "reactnativeprojectone-abcc7",
    databaseURL: "https://reactnativeprojectone-abcc7-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "reactnativeprojectone-abcc7.appspot.com",
    messagingSenderId: "425014447323",
    appId: "1:425014447323:web:d2dc1065b1119be506d0fe",
    measurementId: "G-3DKEBB2TF7",
};

const app = initializeApp(firebaseConfig);
//export const auth = getAuth(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);
