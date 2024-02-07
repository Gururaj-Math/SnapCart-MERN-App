import React, { useEffect, useState } from "react";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import Card from "antd/es/card/Card";
import axios from "axios";
import API_BASE_URL from "../constant";

const { Meta } = Card;

const UserProfile: React.FC = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const [userPosts, setUserPosts] = useState<String[]>([]);
  const userId = currentUser._id;

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}posts/user/${userId}`);
        setUserPosts(res.data.data);
        console.log("response", userPosts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserPosts();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card
        className="w-[50vw]"
        cover={
          <img
            alt="cover image"
            src={currentUser.coverImage}
            className="h-[120px] w-[600px] object-cover"
          />
        }
        actions={[
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <div className="flex flex-col gap-4">
          <Meta
            avatar={<Avatar src={currentUser.avatar} className="w-16 h-16" />}
            title={currentUser.username}
            description={currentUser.email}
          />
          <div className=" flex items-center justify-around font-semibold">
            <p className="flex flex-col items-center">
              {userPosts.length}
              <span className="text-gray-400">Posts</span>
            </p>
            <p className="flex flex-col items-center">
              {currentUser.followers}
              <span className="text-gray-400">Followers</span>{" "}
            </p>
            <p className="flex flex-col items-center">
              {currentUser.following}
              <span className="text-gray-400">Following</span>{" "}
            </p>
          </div>
          <div className="flex w-full gap-4 flex-wrap justify-evenly max-h-[200px] overflow-auto">
            {userPosts.map((post: any, index) => (
              <div key={index} className="border-2 rounded-md">
                <p className="p-2 border-b-2 font-semibold">{post.title}</p>
                <img src={post.image} className="w-[150px] h-[150px] rounded-b-md"/>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
