import React from 'react';
import { Button, Form, Input } from 'antd';

const EditProfile: React.FC = () => {
   const [form] = Form.useForm();

   const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
   };

   const formItemLayout = {
      labelCol: {
         xs: { span: 5 },
         sm: { span: 5 },
      },
      wrapperCol: {
         xs: { span: 24 },
         sm: { span: 16 },
      },
   };

   return (
      <div className="flex justify-center items-center w-full h-full">
         <Form
            {...formItemLayout}
            form={form}
            name="edit-profile"
            onFinish={onFinish}
            initialValues={{
               prefix: '86',
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

            <Form.Item
               name="link1"
               label="Link 1"
               rules={[{ required: true, message: 'Please input link!' }]}
               className="mb-2 w-full"
            >
               <Input />
            </Form.Item>

            <Form.Item
               name="link2"
               label="Link 2"
               rules={[{ required: true, message: 'Please input link!' }]}
               className="mb-2 w-full"
            >
               <Input />
            </Form.Item>

            <Form.Item
               name="link3"
               label="Link 3"
               rules={[{ required: true, message: 'Please input link!' }]}
               className="mb-2 w-full"
            >
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
