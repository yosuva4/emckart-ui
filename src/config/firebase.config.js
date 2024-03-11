import { initializeApp } from "firebase/app"

import { getAuth } from "firebase/auth"
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCmKLjW2HiYfY0Hy9k8dBcUtJ4vXhU6gzE",
    authDomain: "emccart-98fe1.firebaseapp.com",
    projectId: "emccart-98fe1",
    storageBucket: "emccart-98fe1.appspot.com",
    messagingSenderId: "13012631125",
    appId: "1:13012631125:web:c2a1b5bfa68bc1fb279edc",
    measurementId: "G-PJ1G0NFF8P"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const firebaseStorage = getStorage(app)

export default app