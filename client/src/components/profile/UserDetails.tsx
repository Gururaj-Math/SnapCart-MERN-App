import { Avatar } from 'antd';
import Card from 'antd/es/card/Card';
const { Meta } = Card;

const UserDetails = (props: { currentUser: any; userPosts: String[] }) => {
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
      <div className="p-4 border-2 rounded-md flex justify-between px-8">
        <div>
          <h1 className="font-semibold text-gray-500">Bio</h1>
          <p>{props.currentUser.bio}</p>
          <h1 className="font-semibold text-gray-500">Location</h1>
          <p>{props.currentUser.location}</p>
        </div>
        <div>
          <h1 className="font-semibold text-gray-500">Social Links</h1>
          <div className="flex flex-col">
            {props.currentUser.links.map((link: string, index: number) => (
              <a href={link} key={index} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full gap-4 flex-wrap justify-evenly max-h-[200px] overflow-auto">
        {props.userPosts.map((post: any, index) => (
          <div key={index} className="border-2 rounded-md">
            <p className="p-2 border-b-2 font-semibold">{post.title}</p>
            <img src={post.image} className="w-[150px] h-[150px] rounded-b-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
