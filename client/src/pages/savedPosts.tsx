import axios from 'axios';
import { useEffect, useState } from 'react';
import API_BASE_URL from '../constant';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { updateUserProfile } from '../redux/user/userSlice';
import ShareProfileModal from '../components/posts/ShareProfileModal';
import PostCard from '../components/posts/PostCard';

const SavedPosts = () => {
   const [allSavedPosts, setAllSavedPosts] = useState<any[]>([]);
   const [shareModalVisible, setShareModalVisible] = useState(false);
   const [selectedPostId, setSelectedPostId] = useState('');
   const { currentUser } = useSelector((state: any) => state.user);
   const dispatch = useDispatch();

   const fetchUserDetails = async (userId: string) => {
      try {
         const res = await axios.get(`${API_BASE_URL}users/${userId}`);
         return res.data.data;
      } catch (error) {
         console.error('Error fetching user details:', error);
         return null;
      }
   };

   useEffect(() => {
      const fetchAllPosts = async () => {
         try {
            const res = await axios.get(`${API_BASE_URL}posts/saved/${currentUser._id}`);
            const posts = res.data.data;
            const postsWithUserDetails = await Promise.all(
               posts.map(async (post: { userOwner: string }) => {
                  const userDetails = await fetchUserDetails(post.userOwner);
                  return { ...post, userDetails };
               })
            );
            setAllSavedPosts(postsWithUserDetails);
         } catch (error) {
            console.error('Error fetching posts:', error);
         }
      };
      fetchAllPosts();
      console.log(currentUser);
   }, []);

   const handleLike = async (postId: string) => {
      try {
         await axios.post(`${API_BASE_URL}posts/like/${postId}`, { userId: currentUser._id });
         const updatedPosts = allSavedPosts.map((post) => {
            if (post._id === postId) {
               return { ...post, likes: post.likes + 1 };
            }
            return post;
         });
         setAllSavedPosts(updatedPosts);
         message.success('Post liked successfully');
         dispatch(updateUserProfile({ ...currentUser, likedPosts: [...currentUser.likedPosts, postId] }));
      } catch (error) {
         console.error('Error liking post:', error);
         message.error('Error liking post');
      }
   };

   const handleUnlike = async (postId: string) => {
      try {
         await axios.post(`${API_BASE_URL}posts/unlike/${postId}`, { userId: currentUser._id });

         const updatedPosts = allSavedPosts.map((post) => {
            if (post._id === postId) {
               return { ...post, likes: post.likes - 1 };
            }
            return post;
         });
         setAllSavedPosts(updatedPosts);
         message.success('Post unliked successfully');
         const updatedLikedPosts = currentUser.likedPosts.filter((id: string) => id !== postId);
         dispatch(updateUserProfile({ ...currentUser, likedPosts: updatedLikedPosts }));
      } catch (error) {
         console.error('Error unliking post:', error);
         message.error('Error unliking post');
      }
   };

   const handleSavePost = async (postId: string) => {
      try {
         const res = await axios.post(`${API_BASE_URL}posts/save`, { userID: currentUser._id, postID: postId });
         console.log('res', res.data);
         message.success('Post saved successfully');
         const updatedCurrentUser = await updateUser(currentUser._id);
         dispatch(updateUserProfile(updatedCurrentUser));
      } catch (error) {
         console.error('Error saving post:', error);
         message.error('Error saving post');
      }
   };

   const handleRemoveSavedPost = async (postId: string) => {
      try {
         await axios.delete(`${API_BASE_URL}posts/remove/saved/${currentUser._id}/${postId}`);
         setAllSavedPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
         message.success('Post removed from saved');
         const updatedCurrentUser = await updateUser(currentUser._id);
         dispatch(updateUserProfile(updatedCurrentUser));
      } catch (error) {
         console.error('Error removing saved post:', error);
         message.error('Error removing saved post');
      }
   };

   const updateUser = async (userId: string) => {
      try {
         const res = await axios.get(`${API_BASE_URL}users/${userId}`);
         return res.data.data;
      } catch (error) {
         console.error('Error updating user profile:', error);
         return currentUser;
      }
   };

   const handleShare = (postId: string) => {
      setSelectedPostId(postId);
      setShareModalVisible(true);
   };

   return (
      <div className="flex flex-col justify-center items-center overflow-y-auto gap-4 p-2">
         {allSavedPosts.map((post: any, index) => (
            <div key={index}>
               <PostCard
                  post={post}
                  currentUser={currentUser}
                  handleLike={handleLike}
                  handleUnlike={handleUnlike}
                  handleSavePost={handleSavePost}
                  handleRemoveSavedPost={handleRemoveSavedPost}
                  handleSharePost={handleShare}
               />
            </div>
         ))}
         <ShareProfileModal
            shareModalVisible={shareModalVisible}
            setShareModalVisible={setShareModalVisible}
            selectedPostId={selectedPostId}
         />
      </div>
   );
};

export default SavedPosts;
