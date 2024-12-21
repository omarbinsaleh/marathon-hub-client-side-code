import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import auth, { googleAuthProvider } from '../firebase/firebase.config';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

   // state values:
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true);
   const [darkMood, setDarkMood] = useState(false);

   // create new user with email and password:
   function createNewUser(email, password) {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   };

   // sign-in user:
   function signInUser(email, password) {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   };
   // 
   function logInWithGoogle() {
      setLoading(true);
      return signInWithPopup(auth, googleAuthProvider);
   }

   // update user profile:
   function updateUserInfo(userInfoObj) {
      setLoading(true);
      return updateProfile(auth.currentUser, userInfoObj);
   }

   // sign-out user:
   function signOutUser() {
      setLoading(true);
      return signOut(auth);
   }


   // informations passed through the authContext:
   const authInfo = {
      user,
      setUser,
      loading,
      setLoading,
      createNewUser,
      signInUser,
      updateUserInfo,
      signOutUser,
      logInWithGoogle,
      darkMood,
      setDarkMood
   };

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setLoading(false);
      })

      return () => {
         unsubscribe();
      }
   }, [])

   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider
