import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/loaderSlice';
import { getCurrentUser } from '../apicalls/users';
import { setUser } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, message } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { HomeOutlined, UserOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';


function ProtectedRoute({children}) {
    //check if user is logged in
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleNavigation = () => {
        navigate(userData.isAdmin ? "/admin" : "/profile");
    }
    const userData = useSelector(state => state.user.data);
    const navItems = userData && [
        {
            label: "Home",
            icon: <HomeOutlined />
        },
        {
            label: `${userData.name}`,
            icon: <UserOutlined />,
            children: [
                {
                    label: <span onClick={handleNavigation}>
                            My Profile
                        </span>,
                    icon: <ProfileOutlined />,
                },
                {
                    label: <Link to="/login" onClick={() => localStorage.removeItem("token")}>Log out</Link>,
                    icon: <LogoutOutlined />
                }

            ]
        }
    ];

    const getValidUser = useCallback(async () => {
        try {
            dispatch(showLoading());
            const response = await getCurrentUser();
            if(response.success) {
                dispatch(setUser(response.data));
            } else {
                message.error(response.message);
                dispatch(setUser(response.data));
                localStorage.removeItem("token");
                navigate('/login');
            }
            dispatch(hideLoading());
        } catch (err) {
            console.log(err);
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        if (!userData) {
            if (localStorage.getItem('token')) {
                getValidUser();
            } else {
                navigate('/login');
            }
        }
    }, [userData, getValidUser, navigate]);
    return (
    userData && (
          <Layout>
              <Header className="d-flex justify-content-between"
                  style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                  }}>
                  <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>Book My Show</h3>
                  <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
              </Header>

              <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
                  {children}
              </div>
          </Layout>
      )
  )
}

export default ProtectedRoute