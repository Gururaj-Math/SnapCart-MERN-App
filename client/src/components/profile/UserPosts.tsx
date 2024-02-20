import { Empty } from 'antd';
import { Post } from '../../types';

const UserPosts = (props: { userPosts: Post[]; handleImageClick: (post: Post) => Promise<void> }) => {
   return (
      <div className="flex w-full gap-2 flex-wrap justify-evenly max-h-[200px] overflow-auto">
         {props.userPosts.length === 0 && <Empty description="No posts yet" />}
         {props.userPosts.map((post: any, index) => (
            <div key={index} className="border-2 rounded-md" onClick={() => props.handleImageClick(post)}>
               <img src={post.image} className="w-[200px] h-[200px] rounded-md" />
            </div>
         ))}
      </div>
   );
};

export default UserPosts;
