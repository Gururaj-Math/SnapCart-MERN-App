import { Avatar } from 'antd';
import { Card, Space } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  CodepenOutlined,
  GithubOutlined,
  MediumOutlined,
} from '@ant-design/icons';
import React from 'react';

const { Meta } = Card;

const socialMediaIcons: { [key: string]: JSX.Element } = {
  facebook: <FacebookOutlined />,
  twitter: <TwitterOutlined />,
  instagram: <InstagramOutlined />,
  linkedin: <LinkedinOutlined />,
  codepen: <CodepenOutlined />,
  github: <GithubOutlined />,
  medium: <MediumOutlined />,
};

const UserDetails = (props: { currentUser: any; userPosts: String[] }) => {
  const renderSocialMediaIcon = (link: string) => {
    const socialMediaPlatforms: string[] = Object.keys(socialMediaIcons);
    const platform = socialMediaPlatforms.find((platform) => link.includes(platform));
    const icon = platform ? socialMediaIcons[platform] : null;
    const iconStyle = { fontSize: '24px' };
    return icon ? React.cloneElement(icon, { style: iconStyle }) : null;
  };

  return (
    <div className="flex flex-col gap-4">
      <Meta
        avatar={<Avatar src={props.currentUser.avatar} className="w-16 h-16" />}
        title={props.currentUser.username}
        description={props.currentUser.email}
      />
      <div className="flex items-center justify-around font-semibold">
        <p className="flex flex-col items-center">
          {props.userPosts.length}
          <span className="text-gray-400">Posts</span>
        </p>
        <p className="flex flex-col items-center">
          {props.currentUser.followers}
          <span className="text-gray-400">Followers</span>{' '}
        </p>
        <p className="flex flex-col items-center">
          {props.currentUser.following}
          <span className="text-gray-400">Following</span>{' '}
        </p>
      </div>
      <div className="p-4 border-2 rounded-md flex justify-between px-12">
        <div>
          <h1 className="font-semibold text-gray-500">Bio</h1>
          <p>{props.currentUser.bio}</p>
          <h1 className="font-semibold text-gray-500">Location</h1>
          <p>{props.currentUser.location}</p>
        </div>
        <div className="flex flex-col justify-center items-center px-4 gap-2">
          <h1 className="font-semibold text-gray-500 text-center">Social Links</h1>
          <div className="flex items-center gap-4">
            {props.currentUser.links
              .filter((link: string) => link && typeof link === 'string')
              .map((link: string, index: number) => (
                <a href={link} key={index} target="_blank" rel="noopener noreferrer">
                  {renderSocialMediaIcon(link)}
                </a>
              ))}
          </div>
        </div>
      </div>
      <div className="flex w-full gap-2 flex-wrap justify-evenly max-h-[200px] overflow-auto">
        {props.userPosts.map((post: any, index) => (
          <div key={index} className="border-2 rounded-md">
            <img src={post.image} className="w-[200px] h-[200px] rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
