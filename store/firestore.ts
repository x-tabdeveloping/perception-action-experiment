import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "perception-and-action.firebaseapp.com",
    projectId: "perception-and-action",
    storageBucket: "perception-and-action.appspot.com",
    messagingSenderId: "373551858351",
    appId: "1:373551858351:web:57beaa19f535d388c6ca5a",
    measurementId: "G-PDP64GYXGL",
};
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
// import admin, { ServiceAccount } from "firebase-admin";
// import serviceAccount from "./serviceAccountKey.json";

// if (!admin.apps.length) {
// try {
// admin.initializeApp({
// credential: admin.credential.cert(serviceAccount as ServiceAccount),
// });
// } catch (error: any) {
// console.log("Firebase admin initialization error", error.stack);
// }
// }

// export const database = admin.firestore();
