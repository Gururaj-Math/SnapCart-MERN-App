import { useState, useEffect } from 'react';
import { Avatar, Card, Skeleton } from 'antd';
import axios from 'axios';
import API_BASE_URL from '../constant';

const FollowedUserDetails = (props: { userId: string }) => {
   const [userDetails, setUserDetails] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchUserDetails = async () => {
         try {
            const response = await axios.get(`${API_BASE_URL}users/${props.userId}`);
            setUserDetails(response.data.data);
            setLoading(false);
         } catch (error) {
            console.error('Error fetching user details:', error);
            setLoading(false);
         }
      };

      fetchUserDetails();
   }, [props.userId]);

   if (loading) {
      return <Skeleton active />;
   }

   if (!userDetails) {
      return <div>User not found</div>;
   }

   return (
      <Card style={{ width: 300 }}>
         <Card.Meta avatar={<Avatar src={userDetails.avatar} />} title={userDetails.username} description={userDetails.bio} />
      </Card>
   );
};

export default FollowedUserDetails;
