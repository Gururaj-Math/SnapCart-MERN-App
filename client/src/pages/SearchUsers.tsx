import { useState, useEffect } from 'react';
import { Card, Avatar, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import API_BASE_URL from '../constant';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Meta } = Card;

const SearchUsers = () => {
   const [users, setUsers] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');
   const { currentUser } = useSelector((state: any) => state.user);

   useEffect(() => {
      const fetchUsers = async () => {
         try {
            const response = await axios.get(`${API_BASE_URL}users`);
            setUsers(response.data.data);
         } catch (error) {
            console.error('Error fetching users:', error);
         }
      };

      fetchUsers();
   }, []);

   const handleSearch = (value: string) => {
      setSearchQuery(value);
   };

   const filteredUsers = users.filter((user: any) => {
      const username = user.username.toLowerCase();
      const query = searchQuery.toLowerCase();
      return username.includes(query) && user._id !== currentUser._id; // Exclude the current user
   });

   return (
      <div className="flex items-center flex-col w-full gap-2 max-h-[90vh overflow-auto] p-2">
         <h1 className="font-bold text-xl">All Users</h1>
         <div className="w-[40rem] flex gap-2 items-center">
            <SearchOutlined className="text-2xl" />
            <Input
               className="p-4 rounded-xl"
               placeholder="Search User"
               onChange={(e) => handleSearch(e.target.value)}
            />
         </div>
         {filteredUsers.map((user: any, key) => (
            <Link to={`/profile/${user._id}`} key={key}>
               <Card key={user._id} className="w-[40rem]">
                  <Meta avatar={<Avatar src={user.avatar} />} title={user.username} description={user.bio} />
               </Card>
            </Link>
         ))}
      </div>
   );
};

export default SearchUsers;
