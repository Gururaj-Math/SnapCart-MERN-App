import React from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import API_BASE_URL from '../constant';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/user/userSlice';

const EditProfile: React.FC = () => {
   const { currentUser } = useSelector((state: any) => state.user);
   const userId = currentUser._id;
   const [form] = Form.useForm();
   const dispatch = useDispatch();

   const formItemLayout = {
      labelCol: {
         xs: { span: 24 },
         sm: { span: 5 },
      },
      wrapperCol: {
         xs: { span: 24 },
         sm: { span: 16 },
      },
   };

   const onFinish = async (values: any) => {
      try {
         const { location, ...updatedValues } = values;
         const linksArray = collectLinks(values);
         updatedValues.links = linksArray;
         updatedValues.location = location;
         console.log(updatedValues, userId);
         const response = await axios.put(
            `${API_BASE_URL}users/update/${userId}`,
            updatedValues,
         );
         const newUserData = {
            ...currentUser,
            avatar: form.getFieldValue('avatar'),
            coverImage: form.getFieldValue('coverImage'),
            bio: form.getFieldValue('bio'),
            links: [
               form.getFieldValue('link1'),
               form.getFieldValue('link2'),
               form.getFieldValue('link3'),
            ],
            location: form.getFieldValue('location'),
         };
         dispatch(updateUserProfile(newUserData));
         console.log('Received response: ', response.data);
      } catch (error) {
         console.error('Error updating user details: ', error);
      }
   };

   const collectLinks = (values: any) => {
      const linkFields = ['link1', 'link2', 'link3'];
      const linksArray: string[] = [];
      linkFields.forEach((field: string) => {
         const fieldValue = values[field];
         if (Array.isArray(fieldValue)) {
            linksArray.push(...fieldValue);
         } else if (fieldValue) {
            linksArray.push(fieldValue);
         }
      });
      return linksArray.filter(Boolean);
   };

   const initialLinkValues: { [key: string]: string } = {};
   currentUser.links.forEach((link: string, index: number) => {
      initialLinkValues[`link${index + 1}`] = link;
   });

   return (
      <div className="flex justify-center items-center w-full h-full">
         <Form
            {...formItemLayout}
            form={form}
            name="edit-profile"
            onFinish={onFinish}
            initialValues={{
               prefix: '86',
               ...currentUser,
               ...initialLinkValues,
            }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
            className="bg-white p-4 rounded-md w-[30vw] flex flex-col items-center justify-center gap-4"
         >
            <h1 className="text-xl font-semibold text-center p-4">
               Edit User Profile
            </h1>
            <Form.Item
               name="avatar"
               label="Avatar"
               rules={[{ required: true, message: 'Please input avatar!' }]}
               className="mb-4 w-full"
            >
               <Input />
            </Form.Item>

            <Form.Item
               name="coverImage"
               label="Cover Image"
               rules={[
                  { required: true, message: 'Please input cover image!' },
               ]}
               className="mb-4 w-full"
            >
               <Input />
            </Form.Item>

            <Form.Item
               name="bio"
               label="Bio"
               rules={[{ required: true, message: 'Please input bio!' }]}
               className="mb-4 w-full"
            >
               <Input.TextArea />
            </Form.Item>

            {[1, 2, 3].map((index) => (
               <Form.Item
                  key={`link${index}`}
                  name={`link${index}`}
                  label={`Link ${index}`}
                  className="mb-2 w-full"
               >
                  <Input />
               </Form.Item>
            ))}

            <Form.Item name="location" label="Location" className="mb-2 w-full">
               <Input />
            </Form.Item>

            <Form.Item>
               <Button type="primary" htmlType="submit" className="w-[100px]">
                  Save
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
};

export default EditProfile;
