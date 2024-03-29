import axios from 'axios';
import { useEffect, useState } from 'react';
import API_BASE_URL from '../constant';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/user/userSlice';
import ShareProfileModal from '../components/posts/ShareProfileModal';
import CreatePost from '../components/posts/CreatePost';
import PostCard from '../components/posts/PostCard';
import { Post } from '../types';

const Home = () => {
   const [allPosts, setAllPosts] = useState<Post[]>([]);
   const [shareModalVisible, setShareModalVisible] = useState<boolean>(false);
   const [selectedPostId, setSelectedPostId] = useState<string>('');
   const { currentUser } = useSelector((state: any) => state.user);
   const dispatch = useDispatch();

   const fetchAllPosts = async () => {
      try {
         const res = await axios.get(`${API_BASE_URL}posts`);
         const posts = res.data.data;
         const postsWithUserDetails = await Promise.all(
            posts.map(async (post: { userOwner: string }) => {
               const userDetails = await fetchUserDetails(post.userOwner);
               return { ...post, userDetails };
            })
         );
         setAllPosts(postsWithUserDetails);
      } catch (error) {
         console.error('Error fetching posts:', error);
      }
   };

   useEffect(() => {
      fetchAllPosts();
   });

   const fetchUserDetails = async (userId: string) => {
      try {
         const res = await axios.get(`${API_BASE_URL}users/${userId}`);
         return res.data.data;
      } catch (error) {
         console.error('Error fetching user details:', error);
         return null;
      }
   };

   const handleLike = async (postId: string) => {
      try {
         await axios.post(`${API_BASE_URL}posts/like/${postId}`, { userId: currentUser._id });
         const updatedCurrentUser = { ...currentUser, likedPosts: [...currentUser.likedPosts, postId] };
         dispatch(updateUserProfile(updatedCurrentUser));
         message.success('Post liked successfully');
      } catch (error) {
         console.error('Error liking post:', error);
         message.error('Error liking post');
      }
   };

   const handleUnlike = async (postId: string) => {
      try {
         await axios.post(`${API_BASE_URL}posts/unlike/${postId}`, { userId: currentUser._id });
         message.success('Post unliked successfully');
         const updatedLikedPosts = currentUser.likedPosts.filter((id: string) => id !== postId);
         const updatedCurrentUser = { ...currentUser, likedPosts: updatedLikedPosts };
         dispatch(updateUserProfile(updatedCurrentUser));
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
         message.success('Post removed from saved');
         const updatedCurrentUser = await updateUser(currentUser._id);
         dispatch(updateUserProfile(updatedCurrentUser));
      } catch (error) {
         console.error('Error removing saved post:', error);
         message.error('Error removing saved post');
      }
   };

   const handleSharePost = (postId: string) => {
      setSelectedPostId(postId);
      setShareModalVisible(true);
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

   return (
      <div className="flex flex-col justify-center items-center overflow-y-auto gap-4 p-2">
         <CreatePost fetchAllPosts={fetchAllPosts} />
         {allPosts.map((post: Post, key) => (
            <div key={key}>
               <PostCard
                  post={post}
                  currentUser={currentUser}
                  handleLike={handleLike}
                  handleUnlike={handleUnlike}
                  handleSavePost={handleSavePost}
                  handleRemoveSavedPost={handleRemoveSavedPost}
                  handleSharePost={handleSharePost}
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

export default Home;
