import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/loaderSlice';
import { getCurrentUser } from '../apicalls/users';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';

function ProtectedRoute({children}) {
    //check if user is logged in
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const getValidUser = useCallback(async () => {
        try {
            dispatch(showLoading)
            const user = await getCurrentUser();
            dispatch(setUser({payload: user}));
            dispatch(hideLoading);
        } catch (err) {
            console.log(err);
        }
    }, [dispatch]);

    useEffect(() => {
        
        if(localStorage.getItem('token')) {
            getValidUser();
        } else {
            navigate('/login');
        }
    }, [getValidUser, navigate])
  return (
    user && (
        <Layout>
            {children}
        </Layout>
    )
  )
}

export default ProtectedRoute