import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup,signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import auth from '../../firebase/firebase.init';
import axios from 'axios';



const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser]= useState(null);
    const [loading, setLoading]= useState(true);

    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }


    const signInUser =(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);

    }
    const singInWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
    }

    const signOutUser = ()  =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
      const unsubScribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            console.log('state captured', currentUser)
            setLoading(false);
            if(currentUser?.email){
                const userData = {email:currentUser.email};
                axios.post('http://localhost:3000/jwt',userData,{
                    withCredentials:true
                })
                .then(res =>{
                    console.log('token after jwt', res.data)
                  
                })
                .catch(error => console.log(error))
            }
        })
        return()=>{
            unsubScribe();
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        singInWithGoogle 

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;