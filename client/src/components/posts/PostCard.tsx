import React, { useEffect, useState } from 'react';
import { Card, Avatar, Space, Tag } from 'antd';
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

   useEffect(() => {
      setRandomColor(getRandomColor());
   }, []); // Run only once on mount

   const getRandomColor = () => {
      const colors = ['magenta', 'red', 'volcano', 'orange', 'gold'];
      return colors[Math.floor(Math.random() * colors.length)];
   };

   return (
      <Card
         className="md:w-[400px] sm:w-[300px] lg:w-[600px]"
         actions={[
            currentUser.likedPosts.includes(post._id) ? (
               <div>
                  <HeartFilled key="like" onClick={() => handleUnlike(post._id)} style={{ color: 'red' }} />
                  <p>{post.likes} Likes</p>
               </div>
            ) : (
               <div>
                  <HeartOutlined key="unlike" onClick={() => handleLike(post._id)} />
                  <p>{post.likes} Likes</p>
               </div>
            ),
            currentUser.savedPosts.includes(post._id) ? (
               <div>
                  <BookFilled key="save" onClick={() => handleRemoveSavedPost(post._id)} />
                  <p>Remove From Saved</p>
               </div>
            ) : (
               <div>
                  <BookOutlined key="unsave" onClick={() => handleSavePost(post._id)} />
                  <p>Save Post</p>
               </div>
            ),
            <div>
               <ShareAltOutlined key="share" onClick={() => handleSharePost(post._id)} />
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
