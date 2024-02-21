import React, { useEffect, useState } from 'react';
import { Card, Avatar, Space, Tag, Spin } from 'antd';
import { BookOutlined, HeartOutlined, HeartFilled, BookFilled, ShareAltOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface PostCardProps {
   post: any;
   handleLike: (postId: string) => void;
   handleUnlike: (postId: string) => void;
   handleSavePost: (postId: string) => void;
   handleRemoveSavedPost: (postId: string) => void;
   handleSharePost: (postId: string) => void;
   currentUser: any;
}

const PostCard: React.FC<PostCardProps> = ({
   post,
   handleLike,
   handleUnlike,
   handleSavePost,
   handleRemoveSavedPost,
   handleSharePost,
   currentUser,
}) => {
   const [randomColor, setRandomColor] = useState<string>('');
   const [likeLoading, setLikeLoading] = useState<boolean>(false);
   const [saveLoading, setSaveLoading] = useState<boolean>(false);

   useEffect(() => {
      setRandomColor(getRandomColor());
   }, []);

   const getRandomColor = () => {
      const colors = ['magenta', 'red', 'volcano', 'orange', 'gold'];
      return colors[Math.floor(Math.random() * colors.length)];
   };

   const handleLikeAction = async () => {
      setLikeLoading(true);
      if (currentUser.likedPosts.includes(post._id)) {
         await handleUnlike(post._id);
      } else {
         await handleLike(post._id);
      }
      setLikeLoading(false);
   };

   const handleSaveAction = async () => {
      setSaveLoading(true);
      if (currentUser.savedPosts.includes(post._id)) {
         await handleRemoveSavedPost(post._id);
      } else {
         await handleSavePost(post._id);
      }
      setSaveLoading(false);
   };

   return (
      <Card
         className="md:w-[400px] sm:w-[300px] lg:w-[600px]"
         actions={[
            <div key="like" onClick={handleLikeAction}>
               {likeLoading ? (
                  <Spin size="small" />
               ) : currentUser.likedPosts.includes(post._id) ? (
                  <HeartFilled style={{ color: 'red' }} />
               ) : (
                  <HeartOutlined />
               )}
               <p>{post.likes} Likes</p>
            </div>,
            <div key="save" onClick={handleSaveAction}>
               {saveLoading ? (
                  <Spin size="small" />
               ) : currentUser.savedPosts.includes(post._id) ? (
                  <BookFilled />
               ) : (
                  <BookOutlined />
               )}
               <p>{currentUser.savedPosts.includes(post._id) ? 'Unsave Post' : 'Save Post'}</p>
            </div>,
            <div key="share" onClick={() => handleSharePost(post._id)}>
               <ShareAltOutlined />
               <p>Share</p>
            </div>,
         ]}
      >
         <Meta
            avatar={<Avatar src={post.userDetails.avatar} />}
            title={post.userDetails.username}
            description={post.title}
         />
         <div className="p-2 flex flex-col gap-4">
            {post.image && <img alt="post cover" src={post.image} className="w-full h-full object-cover rounded-md" />}

            <p>{post.description}</p>
            <Space size={[0, 8]} wrap>
               {post.tags.map((tag: string, index: number) => (
                  <span key={index}>
                     <Tag color={randomColor}>{tag}</Tag>
                  </span>
               ))}
            </Space>
         </div>
      </Card>
   );
};

export default PostCard;
