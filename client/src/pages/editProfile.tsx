import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../constant';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/user/userSlice';
import { message } from 'antd';
import EditProfileForm from '../components/profile/EditProfileForm';

const EditProfile: React.FC = () => {
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
    } catch (error) {
      console.error('Error updating user details:', error);
      message.error('Error updating user details');
    }
  };

  const initialLinkValues: { [key: string]: string } = {};
  currentUser.links.forEach((link: string, index: number) => {
    initialLinkValues[`link${index + 1}`] = link;
  });

  return (
    <div className="flex justify-center items-center w-full h-full">
      <EditProfileForm
        formItemLayout={formItemLayout}
        onFinish={onFinish}
        currentUser={currentUser}
        initialLinkValues={initialLinkValues}
        setAvatarUrl={setAvatarUrl}
        setCoverImageUrl={setCoverImageUrl}
      />
    </div>
  );
};

export default EditProfile;
