import React from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import TheatreList from './TheatreList';
import BookingList from './Bookings';

function Profile() {
  const tabItems = [
    {
      key: "1",
      label: "Theaters",
      children: <TheatreList />
    },
    {
      key: "2",
      label: "Bookings",
      children: <BookingList />
    }
  ];

  const user = useSelector(state => state.user.data);

  return (
    <>
      <h1>Welcome {user.name} to your Profile!</h1>
      <Tabs defaultActiveKey='1' items={tabItems}/>
    </>
  );
}

export default Profile;