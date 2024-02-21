import { useCookies } from 'react-cookie';
import axios from 'axios';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { logInStart, logInSuccess, logInFailure } from '../../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import API_BASE_URL from '../../../constant';
import loginSvg from '../../../../public/login.svg';
import { useState } from 'react';
import Logo from '../../../../public/logo.png';

const Login = () => {
   const [_, setCookie] = useCookies(['access_token']);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);

   const onFinish = async (values: string[]) => {
      try {
         setLoading(true);
         dispatch(logInStart());
         const res = await axios.post(`${API_BASE_URL}users/login`, values);
         dispatch(logInSuccess(res.data.data.user));
         navigate('/');
         setCookie('access_token', res.data.data.access_token);
      } catch (err: any) {
         message.error("Login failed. Please check your credentials.");
         dispatch(logInFailure(err))
       } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex justify-evenly">
         <div className="flex flex-col justify-center items-center h-[100vh] w-full bg-black">
            <img src={Logo} className="max-h-[250px]" />
            <Form className="w-[300px] md:w-[400px]" initialValues={{ remember: true }} onFinish={onFinish}>
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
                     {loading ? 'Logging in...' : 'Log in'}
                  </Button>
                  Or <Link to={'/auth/register'}>register now!</Link>
               </Form.Item>
            </Form>
         </div>
         <div className="w-full justify-center items-center hidden md:flex">
            <img src={loginSvg} className="max-h-[600px]" />
         </div>
      </div>
   );
};

export default Login;
