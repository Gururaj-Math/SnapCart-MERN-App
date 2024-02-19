import { Avatar, Modal, Tag, Button } from 'antd';
import { Card, message } from 'antd';
import {
   FacebookOutlined,
   TwitterOutlined,
   InstagramOutlined,
   LinkedinOutlined,
   CodepenOutlined,
   GithubOutlined,
   MediumOutlined,
   InfoCircleOutlined,
   EnvironmentOutlined,
   HeartFilled,
} from '@ant-design/icons';
import React, { useState } from 'react';
import API_BASE_URL from '../../constant';
import axios from 'axios';
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
   userPosts: String[];
   fetchUserPosts?: () => Promise<void>;
   currentUserId: string;
}) => {
   const [modalVisible, setModalVisible] = useState(false);
   const [modalPostData, setModalPostData] = useState<any>(null);
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
      <div className="flex flex-col gap-4">
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
         <div className="p-4 border-2 rounded-md flex justify-between px-12">
            <div>
               <h1 className="font-semibold text-gray-500 flex items-center gap-2">
                  <span>
                     <InfoCircleOutlined />
                  </span>
                  Bio
               </h1>
               <p className="mb-2">{props.currentUser.bio}</p>
               <h1 className="font-semibold text-gray-500 flex items-center gap-2">
                  <span>
                     <EnvironmentOutlined />
                  </span>
                  Location
               </h1>
               <p>{props.currentUser.location}</p>
            </div>
            <div className="flex flex-col justify-center items-center px-4 gap-2">
               <h1 className="font-semibold text-gray-500 text-center">Social Links</h1>
               <div className="flex items-center gap-4">
                  {props.currentUser.links
                     .filter((link: string) => link && typeof link === 'string')
                     .map((link: string, index: number) => (
                        <a href={link} key={index} target="_blank" rel="noopener noreferrer">
                           {renderSocialMediaIcon(link)}
                        </a>
                     ))}
               </div>
            </div>
         </div>
         <div className="flex w-full gap-2 flex-wrap justify-evenly max-h-[200px] overflow-auto">
            {props.userPosts.map((post: any, index) => (
               <div key={index} className="border-2 rounded-md" onClick={() => handleImageClick(post)}>
                  <img src={post.image} className="w-[200px] h-[200px] rounded-md" />
               </div>
            ))}
         </div>
         <Modal title="Post Details" open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
            {modalPostData && (
               <div className="flex flex-col gap-2">
                  <h2>Title: {modalPostData.title}</h2>
                  <p>Description: {modalPostData.description}</p>
                  <img src={modalPostData.image} className="w-full h-[300px] rounded-md" />
                  <div>
                     <Tag>
                        <HeartFilled className="text-red-500" />
                        {modalPostData.likes} Likes
                     </Tag>
                  </div>
                  {modalPostData.userOwner === props.currentUserId && (
                     <Button onClick={() => deletePost(modalPostData._id)} loading={deletingPost}>
                        Delete
                     </Button>
                  )}
               </div>
            )}
         </Modal>
      </div>
   );
};

export default UserDetails;
