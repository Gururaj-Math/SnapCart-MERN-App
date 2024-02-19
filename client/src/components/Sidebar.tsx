import React, { ReactNode } from 'react';
import { BookOutlined, HomeOutlined, LogoutOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { message } from 'antd';
import NotesBoard from './NotesBoard';

const { Content, Sider } = Layout;

interface SidebarProps {
   children: ReactNode;
}

const items = [
   {
      key: '1',
      icon: <UserOutlined />,
      label: 'Profile',
      path: '/profile',
   },
   {
      key: '2',
      icon: <HomeOutlined />,
      label: 'Feed',
      path: '/',
   },
   {
      key: '3',
      icon: <BookOutlined />,
      label: 'Saved Posts',
      path: '/saved-posts',
   },
   {
      key: '4',
      icon: <SearchOutlined />,
      label: 'Search',
      path: '/search',
   },
   {
      key: '5',
      icon: <LogoutOutlined />,
      label: 'Logout',
      path: '/auth/login',
   },
];

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
   const [_, setCookies] = useCookies(['access_token']);
   const navigate = useNavigate();

   const logout = () => {
      setCookies('access_token', '');
      window.localStorage.clear();
      message.success('Logout Successful');
      navigate('/auth/login');
   };

   return (
      <Layout hasSider>
         <Sider
            width={300}
            style={{
               overflow: 'auto',
               height: '100vh',
               position: 'fixed',
               left: 0,
               top: 0,
               bottom: 0,
               padding: 10,
            }}
            className="hidden md:block"
         >
            <div className="flex items-center w-full justify-center">
               <img src="../../public/logo.png" className="h-[200px] w-[200px]" />
            </div>

            <Menu theme="dark" mode="vertical" defaultSelectedKeys={['2']}>
               {items.map((item) => (
                  <Menu.Item key={item.key} icon={item.icon} style={{ margin: '20px 0' }}>
                     {item.path === '/auth/login' ? (
                        <a onClick={logout}>{item.label}</a>
                     ) : (
                        <Link to={item.path}>{item.label}</Link>
                     )}
                  </Menu.Item>
               ))}
            </Menu>
         </Sider>
         <Layout style={{ marginLeft: 200 }}>
            <div className="flex justify-around realtive">
               <Content className="min-h-[100vh] lg:mr-[300px]">{children}</Content>
               <div className="hidden lg:block">
                  <NotesBoard />
               </div>
            </div>
         </Layout>
      </Layout>
   );
};

export default Sidebar;
