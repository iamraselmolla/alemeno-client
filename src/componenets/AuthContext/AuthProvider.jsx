import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase-init';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { courseDataAction } from '../redux/courseDataSlice';
import { server } from '../shared/const';

export const AuthContext = createContext();

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [user, setUser] = useState(null);
    // User registration
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const loginWithGoogle = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    // User Logout
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }
    // Login
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Update info
    const updateUserInfo = (userinfo) => {
        return updateProfile(auth.currentUser, userinfo)
    }

    // On State changed
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser && !isRegistered) {
                setUser(currentUser);
                setLoading(false);
            } else {
                setUser(null);
            }
        });

        return () => {
            return unsubscribe();
        }
    }, [isRegistered]);

    const authInfo = { createUser, setLoading, setIsRegistered, updateUserInfo, loading, user, loginWithGoogle, login, logOut }


    useEffect(() => {
        fetch(`${server}/all-courses`)
            .then(res => res.json())
            .then(data => {

                dispatch(courseDataAction.setAllCourses(data));
                // setFilteredCourses(data); // Initialize filteredCourses with all courses
            })
            .catch(err => console.log(err));
    }, []);

    // if (loading) {
    //     return <><div className='d-flex justify-content-center  align-content-center '>
    //         <div>
    //             <Spinner />
    //         </div>
    //     </div></>
    // }


    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;