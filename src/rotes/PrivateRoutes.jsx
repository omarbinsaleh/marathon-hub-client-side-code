import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebase/firebase.config';

const PrivateRoutes = ({ children }) => {
   const location = useLocation();
   const { user, setUser } = useContext(AuthContext);
   const [currentUser, setCurrentUser] = useState({});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         console.log('currentUser:', currentUser);
         setUser(currentUser)
         setCurrentUser(currentUser);
         setLoading(false);
       })
   
       return () => {
         unsubscribe();
       }
   }, [user])

   console.log("user", currentUser);
   console.log("loading", loading)

   if (loading) {
      return (
         <div className="min-h-screen w-full flex items-center justify-center">
            <span className="loading loading-bars loading-lg"></span>
         </div>
      )
   }

   if (!currentUser) {
      return <Navigate to={'/auth/login'} state={location.pathname}></Navigate>
   }

   return children;
}

export default PrivateRoutes;
