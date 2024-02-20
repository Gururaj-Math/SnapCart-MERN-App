import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'antd/es/card/Card';
import axios from 'axios';
import API_BASE_URL from '../constant';
import UserDetails from '../components/profile/UserDetails';
import EditProfileModal from '../components/profile/EditProfileModal';
import { Skeleton, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/user/userSlice';
import { Post, User } from '../types';

const UserProfile = () => {
   const [user, setUser] = useState<User>();
   const [userPosts, setUserPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [isFollowing, setIsFollowing] = useState(false);
   const { currentUser } = useSelector((state: any) => state.user);
   const dispatch = useDispatch();

   const { userId } = useParams<{ userId: string }>();

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

   useEffect(() => {
      fetchUserById();
      fetchUserPosts();
   }, []);

   useEffect(() => {
      const checkIfFollowing = async () => {
         try {
            const res = await axios.get(`${API_BASE_URL}users/${userId}/isFollowing?userId=${currentUser._id}`);
            setIsFollowing(res.data.isFollowing);
         } catch (err) {
            console.error(err);
         }
      };
      checkIfFollowing();
   }, [isFollowing]);

   const handleFollow = async () => {
      try {
         const currentUserID = currentUser._id;
         await axios.post(`${API_BASE_URL}users/${currentUserID}/follow`, { userId: userId });
         fetchUserById();
         setIsFollowing(true);
         message.success('You have successfully followed this user.');

         const updatedUser = { ...currentUser, following: [...currentUser.following, userId] };
         dispatch(updateUserProfile(updatedUser));
      } catch (err) {
         console.error(err);
         message.error('Failed to follow this user. Please try again later.');
      }
   };

   const handleUnfollow = async () => {
      try {
         const currentUserID = currentUser._id;
         await axios.post(`${API_BASE_URL}users/${currentUserID}/unfollow`, { userId: userId });
         fetchUserById();
         setIsFollowing(false);
         message.success('You have successfully unfollowed this user.');

         const updatedUser = {
            ...currentUser,
            following: currentUser.following.filter((id: string | undefined) => id !== userId),
         };
         dispatch(updateUserProfile(updatedUser));
      } catch (err) {
         console.error(err);
         message.error('Failed to unfollow this user. Please try again later.');
      }
   };

   return (
      <div className="w-full h-full flex justify-center items-center">
         <Card
            className="w-full md:w-[50vw]"
            cover={<img alt="cover image" src={user?.coverImage} className="h-[120px] w-[600px] object-cover" />}
            actions={[
               isFollowing ? (
                  <Button onClick={handleUnfollow} type="primary">
                     Unfollow
                  </Button>
               ) : (
                  <Button onClick={handleFollow} type="primary">
                     Follow
                  </Button>
               ),
            ]}
         >
            {loading ? (
               <Skeleton avatar paragraph={{ rows: 10 }} />
            ) : (
               user && (
                  <UserDetails
                     currentUser={user}
                     userPosts={userPosts}
                     fetchUserPosts={fetchUserPosts}
                     currentUserId={currentUser._id}
                  />
               )
            )}
         </Card>
      </div>
   );
};

export default UserProfile;
