import { initializeApp } from "firebase/app";
import {
 getAuth,
 signInWithEmailAndPassword,
 createUserWithEmailAndPassword,
 signOut,
} from "firebase/auth";
import {
 getFirestore,
 collection,
 addDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDE6uQNhWcItWkjy72SGbpMpvdXwlIXxKA",
  authDomain: "image-hosting-service-7a3c2.firebaseapp.com",
  projectId: "image-hosting-service-7a3c2",
  storageBucket: "image-hosting-service-7a3c2.appspot.com",
  messagingSenderId: "318248133254",
  appId: "1:318248133254:web:e5775a864a4b39211f6707"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firebase = getFirestore(app);

const logIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const signUp = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(firebase, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  export {
    auth,
    firebase,
    logIn,
    signUp,
    logout,
  };