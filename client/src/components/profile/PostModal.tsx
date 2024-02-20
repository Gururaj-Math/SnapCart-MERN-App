import { Modal, Tag, Button } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { Post } from '../../types';
import React from 'react';

const PostModal = (props: {
   modalVisible: boolean;
   modalPostData: Post | undefined;
   currentUserId: string;
   deletingPost: boolean;
   deletePost: (postId: string) => Promise<void>;
   setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
   const postId = props.modalPostData ? props.modalPostData._id : '';

   return (
      <Modal title="Post Details" open={props.modalVisible} onCancel={() => props.setModalVisible(false)} footer={null}>
         {props.modalPostData && (
            <div className="flex flex-col gap-2">
               <h2>Title: {props.modalPostData.title}</h2>
               <p>Description: {props.modalPostData.description}</p>
               <img
                  src={props.modalPostData.image}
                  className="w-full h-[300px] rounded-md"
                  alt={props.modalPostData.title}
               />
               <div>
                  <Tag>
                     <HeartFilled className="text-red-500" />
                     {props.modalPostData.likes} Likes
                  </Tag>
               </div>
               {props.modalPostData.userOwner === props.currentUserId && (
                  <Button onClick={() => props.deletePost(postId)} loading={props.deletingPost}>
                     Delete
                  </Button>
               )}
            </div>
         )}
      </Modal>
   );
};

export default PostModal;
