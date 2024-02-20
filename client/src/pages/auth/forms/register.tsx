import axios from 'axios';
import API_BASE_URL from '../../../constant';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import loginSvg from '../../../../public/login.svg';
import { useState } from 'react';
import Logo from '../../../../public/logo.png'

const Register = () => {
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate()

   const onFinish = async (values: any) => {
      try {
         setLoading(true);
         const res = await axios.post(`${API_BASE_URL}users/register`, values);
         console.log(res);
         message.success('Registration successful');
         navigate('/auth/login')
         console.log('Registration successful');
      } catch (error) {
         console.error('Registration failed:', error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex justify-evenly">
         <div className="flex flex-col justify-center items-center h-[100vh] w-full bg-black">
            <img src={Logo} className="max-h-[250px]" />
            <Form className="w-[300px] md:w-[400px]" initialValues={{ remember: true }} onFinish={onFinish}>
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

               <Form.Item className="text-white">
                  <Button
                     htmlType="submit"
                     className="w-full"
                     type="dashed"
                     style={{ color: 'white' }}
                     loading={loading}
                  >
                     {loading ? 'Registering...' : 'Register'}
                  </Button>
                  Or <Link to={'/auth/login'}>login now!</Link>
               </Form.Item>
            </Form>
         </div>
         <div className="w-full hidden md:flex justify-center items-center">
            <img src={loginSvg} className="max-h-[100px] md:max-h-[600px]" />
         </div>
      </div>
   );
};

export default Register;
