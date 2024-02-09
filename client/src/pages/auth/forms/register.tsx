import axios from 'axios';
import API_BASE_URL from '../../../constant';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';

const Register = () => {
   const onFinish = async (values: string[]) => {
      try {
         await axios.post(`${API_BASE_URL}users/register`, values);
         message.success('Registration successful');
         console.log('Registration successful');
      } catch (error) {
         console.error('Registration failed:', error);
      }
   };

   return (
      <div className="flex justify-center items-center h-[90vh]">
         <Form className="w-[400px]" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
               <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
               <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
               <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
               />
            </Form.Item>

            <Form.Item>
               <Button htmlType="submit" className="w-full">
                  Register
               </Button>
               Or <Link to={'/auth/login'}>login now!</Link>
            </Form.Item>
         </Form>
      </div>
   );
};

export default Register;
