import firebase from 'firebase/app'
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBU4_A-1TNM6qAyeDda8xw9DiIlEqQQmak",
    authDomain: "stockapp-5c3f5.firebaseapp.com",
    databaseURL: "https://stockapp-5c3f5.firebaseio.com",
    projectId: "stockapp-5c3f5",
    storageBucket: "stockapp-5c3f5.appspot.com",
    messagingSenderId: "879827123683",
    appId: "1:879827123683:web:201a7b800a609b31fbb4d6"
  });


export const auth = app.auth();
export default app;