import React, { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Card from 'antd/es/card/Card';
import axios from 'axios';
import API_BASE_URL from '../constant';
import { Link } from 'react-router-dom';
import UserDetails from '../components/profile/UserDetails';

const UserProfile: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [userPosts, setUserPosts] = useState<String[]>([]);
  const userId = currentUser._id;

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}posts/user/${userId}`);
        setUserPosts(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserPosts();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card
        className="w-[50vw]"
        cover={<img alt="cover image" src={currentUser.coverImage} className="h-[120px] w-[600px] object-cover" />}
        actions={[
          <Link to={`/profile/${currentUser._id}`}>
            <EditOutlined key="edit" />
          </Link>,
        ]}
      >
        <UserDetails currentUser={currentUser} userPosts={userPosts} />
      </Card>
    </div>
  );
};

export default UserProfile;
