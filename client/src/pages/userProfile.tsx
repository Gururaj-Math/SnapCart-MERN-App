import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from 'antd/es/card/Card';
import axios from 'axios';
import API_BASE_URL from '../constant';
import UserDetails from '../components/profile/UserDetails';
import EditProfileModal from '../components/profile/EditProfileModal';
import { Skeleton } from 'antd';

const UserProfile: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [userPosts, setUserPosts] = useState<String[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = currentUser._id;

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}posts/user/${userId}`);
        setUserPosts(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [userId]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card
        className="w-[50vw]"
        cover={<img alt="cover image" src={currentUser.coverImage} className="h-[120px] w-[600px] object-cover" />}
        actions={[<EditProfileModal />]}
      >
        {loading ? (
          <Skeleton avatar paragraph={{ rows: 10 }} />
        ) : (
          <UserDetails currentUser={currentUser} userPosts={userPosts} />
        )}
      </Card>
    </div>
  );
};

export default UserProfile;
