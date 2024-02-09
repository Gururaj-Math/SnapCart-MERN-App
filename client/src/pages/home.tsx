import axios from 'axios';
import { Key, useEffect, useState } from 'react';
import API_BASE_URL from '../constant';
import { EditOutlined, EllipsisOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Avatar, message, Divider, Space, Tag, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/user/userSlice';
const { Meta } = Card;

const Home = () => {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}posts`);
        const posts = res.data.data;
        const postsWithUserDetails = await Promise.all(
          posts.map(async (post: { userOwner: string }) => {
            const userDetails = await fetchUserDetails(post.userOwner);
            return { ...post, userDetails };
          })
        );
        setAllPosts(postsWithUserDetails);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchAllPosts();
    console.log(currentUser);
  }, []);

  const fetchUserDetails = async (userId: string) => {
    try {
      const res = await axios.get(`${API_BASE_URL}users/${userId}`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await axios.post(`${API_BASE_URL}posts/like/${postId}`, { userId: currentUser._id });
      const updatedPosts = allPosts.map((post) => {
        if (post._id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      });
      setAllPosts(updatedPosts);
      message.success('Post liked successfully');
      dispatch(updateUserProfile({ ...currentUser, likedPosts: [...currentUser.likedPosts, postId] }));
    } catch (error) {
      console.error('Error liking post:', error);
      message.error('Error liking post');
    }
  };

  const handleUnlike = async (postId: string) => {
    try {
      await axios.post(`${API_BASE_URL}posts/unlike/${postId}`, { userId: currentUser._id });

      const updatedPosts = allPosts.map((post) => {
        if (post._id === postId) {
          return { ...post, likes: post.likes - 1 };
        }
        return post;
      });
      setAllPosts(updatedPosts);
      message.success('Post unliked successfully');
      const updatedLikedPosts = currentUser.likedPosts.filter((id: string) => id !== postId);
      dispatch(updateUserProfile({ ...currentUser, likedPosts: updatedLikedPosts }));
    } catch (error) {
      console.error('Error unliking post:', error);
      message.error('Error unliking post');
    }
  };

  const getRandomColor = () => {
    const colors = [
      'magenta',
      'red',
      'volcano',
      'orange',
      'gold',
      'lime',
      'green',
      'cyan',
      'blue',
      'geekblue',
      'purple',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex flex-col justify-center items-center overflow-y-auto gap-4 p-2">
      {allPosts.map((post: any, key) => (
        <Card
          key={key}
          style={{ width: 700 }}
          actions={[
            currentUser.likedPosts.includes(post._id) ? (
              <div>
                <HeartFilled key="like" onClick={() => handleUnlike(post._id)} style={{ color: 'red' }} />
                <p>{post.likes} Likes</p>
              </div>
            ) : (
              <div>
                <HeartOutlined key="unlike" onClick={() => handleLike(post._id)} />
                <p>{post.likes} Likes</p>
              </div>
            ),
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar src={post.userDetails.avatar} />}
            title={post.userDetails.username}
            description={post.title}
          />
          <div className="p-2 flex flex-col gap-4">
            <img alt="post cover" src={post.image} className="w-full h-full object-cover rounded-md" />
            <p>{post.description}</p>
            <Divider orientation="left">Tags</Divider>
            <Space size={[0, 8]} wrap>
              {post.tags.map((tag: string, index: Key) => (
                <span key={index}>
                  <Tag color={getRandomColor()}>{tag}</Tag>
                </span>
              ))}
            </Space>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Home;
