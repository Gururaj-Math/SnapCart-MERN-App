import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import Card from 'antd/es/card/Card';
import axios from 'axios';
import API_BASE_URL from '../constant';
import UserDetails from '../components/profile/UserDetails';
import EditProfileModal from '../components/profile/EditProfileModal';
import { Skeleton } from 'antd';

const UserProfile = () => {
   const [user, setUser] = useState<any[]>([]);
   const [userPosts, setUserPosts] = useState<string[]>([]);
   const [loading, setLoading] = useState(true);

   const { userId } = useParams<{ userId: string }>();

   useEffect(() => {
      const fetchUserById = async () => {
         try {
            const res = await axios.get(`${API_BASE_URL}users/${userId}`);
            setUser(res.data.data);
            setLoading(false);
         } catch (err) {
            console.error(err);
            setLoading(false);
         }
      };
      fetchUserById();

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
            cover={<img alt="cover image" src={user?.coverImage} className="h-[120px] w-[600px] object-cover" />}
            actions={[<EditProfileModal />]}
         >
            {loading ? (
               <Skeleton avatar paragraph={{ rows: 10 }} />
            ) : (
               user && <UserDetails currentUser={user} userPosts={userPosts} />
            )}
         </Card>
      </div>
   );
};

export default UserProfile;
