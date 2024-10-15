import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/loaderSlice';
import { getCurrentUser } from '../apicalls/users';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    //check if user is logged in
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getValidUser = async () => {
        try {
            dispatch(showLoading)
            const user = await getCurrentUser();
            // dispatch(setUser({payload: user}));
            console.log(user);
            dispatch(hideLoading);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token')) {
            getValidUser();
        } else {
            navigate('/login');
        }
    }, [])
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute