import { Modal } from 'antd';
import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import { message } from 'antd';
import API_BASE_URL from '../../constant';
import { updateUserProfile } from '../../redux/user/userSlice';
import EditProfileForm from './EditProfileForm';

const EditProfileModal = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const { currentUser } = useSelector((state: any) => state.user);
   const [avatarUrl, setAvatarUrl] = useState<string>();
   const [coverImageUrl, setCoverImageUrl] = useState<string>('');
   const userId = currentUser._id;

   const dispatch = useDispatch();

   const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 5 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
   };

   const onFinish = async (values: any) => {
      try {
         const requestBody: any = {
            links: [values.link1, values.link2, values.link3],
            ...values,
         };

         if (avatarUrl) requestBody.avatar = avatarUrl;
         if (coverImageUrl) requestBody.coverImage = coverImageUrl;

         await axios.put(`${API_BASE_URL}users/update/${userId}`, requestBody);

         const newUserData = {
            ...currentUser,
            links: [values.link1, values.link2, values.link3],
            ...values,
            ...(avatarUrl && { avatar: avatarUrl }),
            ...(coverImageUrl && { coverImage: coverImageUrl }),
         };

         message.success('User profile updated successfully');
         dispatch(updateUserProfile(newUserData));
         setIsModalOpen(false);
      } catch (error) {
         console.error('Error updating user details:', error);
         message.error('Error updating user details');
      }
   };

   const initialLinkValues: { [key: string]: string } = {};
   currentUser.links.forEach((link: string, index: number) => {
      initialLinkValues[`link${index + 1}`] = link;
   });

   const showModal = () => {
      setIsModalOpen(true);
   };

   return (
      <>
         <EditOutlined onClick={showModal} />

         <Modal title="Edit Profile" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
            <EditProfileForm
               formItemLayout={formItemLayout}
               onFinish={onFinish}
               currentUser={currentUser}
               initialLinkValues={initialLinkValues}
               setAvatarUrl={setAvatarUrl}
               setCoverImageUrl={setCoverImageUrl}
            />
         </Modal>
      </>
   );
};

export default EditProfileModal;
