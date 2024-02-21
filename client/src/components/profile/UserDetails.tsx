import { Avatar } from 'antd';
import { Card, message } from 'antd';
import {
   FacebookOutlined,
   TwitterOutlined,
   InstagramOutlined,
   LinkedinOutlined,
   CodepenOutlined,
   GithubOutlined,
   MediumOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import API_BASE_URL from '../../constant';
import axios from 'axios';
import { Post } from '../../types';
import UserInfo from './UserInfo';
import UserPosts from './UserPosts';
import PostModal from './PostModal';
const { Meta } = Card;

const socialMediaIcons: { [key: string]: JSX.Element } = {
   facebook: <FacebookOutlined />,
   twitter: <TwitterOutlined />,
   instagram: <InstagramOutlined />,
   linkedin: <LinkedinOutlined />,
   codepen: <CodepenOutlined />,
   github: <GithubOutlined />,
   medium: <MediumOutlined />,
};

const UserDetails = (props: {
   currentUser: any;
   userPosts: Post[];
   fetchUserPosts?: () => Promise<void>;
   currentUserId: string;
}) => {
   const [modalVisible, setModalVisible] = useState(false);
   const [modalPostData, setModalPostData] = useState<Post>();
   const [deletingPost, setDeletingPost] = useState(false);
   const followersCount = props.currentUser.followers.filter((follower: string) => follower.trim() !== '').length;
   const followingCount = props.currentUser.following.filter((follow: string) => follow.trim() !== '').length;

   const handleImageClick = async (post: any) => {
      if (post) {
         setModalPostData(post);
         setModalVisible(true);
      }
   };

   const deletePost = async (postId: string) => {
      try {
         setDeletingPost(true);
         await axios.delete(`${API_BASE_URL}posts/delete/${postId}`);
         message.success('Post deleted successfully');

         if (props.fetchUserPosts) {
            await props.fetchUserPosts();
         }

         setDeletingPost(false);
         setModalVisible(false);
      } catch (error) {
         console.error('Error deleting post:', error);
         setDeletingPost(false);
      }
   };

   const renderSocialMediaIcon = (link: string) => {
      const socialMediaPlatforms: string[] = Object.keys(socialMediaIcons);
      const platform = socialMediaPlatforms.find((platform) => link.includes(platform));
      const icon = platform ? socialMediaIcons[platform] : null;
      const iconStyle = { fontSize: '24px' };
      return icon ? React.cloneElement(icon, { style: iconStyle }) : null;
   };

   return (
      <div className="flex flex-col gap-4 text-[13px] md:text-md">
         <Meta
            avatar={<Avatar src={props.currentUser.avatar} className="w-16 h-16" />}
            title={props.currentUser.username}
            description={props.currentUser.email}
         />
         <div className="flex items-center justify-around font-semibold">
            <p className="flex flex-col items-center">
               {props.userPosts.length}
               <span className="text-gray-400">Posts</span>
            </p>
            <p className="flex flex-col items-center">
               {followersCount}
               <span className="text-gray-400">Followers</span>{' '}
            </p>
            <p className="flex flex-col items-center">
               {followingCount}
               <span className="text-gray-400">Following</span>{' '}
            </p>
         </div>
         <UserInfo currentUser={props.currentUser} renderSocialMediaIcon={renderSocialMediaIcon} />
         <UserPosts userPosts={props.userPosts} handleImageClick={handleImageClick} />
         <PostModal
            modalVisible={modalVisible}
            modalPostData={modalPostData}
            currentUserId={props.currentUserId}
            deletingPost={deletingPost}
            deletePost={deletePost}
            setModalVisible={setModalVisible}
         />
      </div>
   );
};

export default UserDetails;
