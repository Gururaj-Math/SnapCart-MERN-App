import React, { ReactNode } from 'react';
import {
   BookOutlined,
   HomeOutlined,
   LogoutOutlined,
   SearchOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Content, Footer, Sider } = Layout;

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
   return (
      <Layout hasSider>
         <Sider
            style={{
               overflow: 'auto',
               height: '100vh',
               position: 'fixed',
               left: 0,
               top: 0,
               bottom: 0,
            }}
         >
            <div className="demo-logo-vertical text-white text-center text-2xl p-4">
               SnapCart
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
               {items.map((item) => (
                  <Menu.Item key={item.key} icon={item.icon}>
                     <Link to={item.path}>{item.label}</Link>
                  </Menu.Item>
               ))}
            </Menu>
         </Sider>
         <Layout style={{ marginLeft: 200 }}>
            <Content style={{ overflow: 'initial', height: '90vh' }}>
               {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}></Footer>
         </Layout>
      </Layout>
   );
};

export default Sidebar;
