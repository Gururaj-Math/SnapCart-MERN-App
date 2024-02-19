import { Avatar, Card, Input, Button, theme, Tag, message, InputRef } from 'antd';
import { PlusOutlined, CloudUploadOutlined, CheckOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import UploadWidget from '../UploadWidget';
import axios from 'axios';
import API_BASE_URL from '../../constant';

const CreatePost = (props: { fetchAllPosts: () => Promise<void> }) => {
   const { currentUser } = useSelector((state: any) => state.user);
   const { token } = theme.useToken();
   const [tags, setTags] = useState<string[]>([]);
   const [inputVisible, setInputVisible] = useState(false);
   const [inputValue, setInputValue] = useState('');
   const [imageUrl, setImageUrl] = useState('');
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const inputRef = useRef<InputRef>(null);

   useEffect(() => {
      if (inputVisible) {
         inputRef.current?.focus();
      }
   }, [inputVisible]);

   const handleClose = (removedTag: string) => {
      const newTags = tags.filter((tag) => tag !== removedTag);
      setTags(newTags);
   };

   const showInput = () => {
      setInputVisible(true);
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
   };

   const handleInputConfirm = () => {
      if (inputValue && tags.indexOf(inputValue) === -1) {
         setTags([...tags, inputValue]);
      }
      setInputVisible(false);
      setInputValue('');
   };

   const handleSave = async () => {
      try {
         const postData = {
            title: title,
            description: description,
            image: imageUrl,
            tags: tags,
            userOwner: currentUser._id,
            likes: 0,
         };
         await axios.post(`${API_BASE_URL}posts/create`, postData);
         props.fetchAllPosts();
         message.success('Post created successfully');
         setTitle('');
         setDescription('');
         setImageUrl('');
         setTags([]);
      } catch (error) {
         console.error('Error creating post:', error);
         message.error('Error creating post');
      }
   };

   const forMap = (tag: string) => {
      const tagElem = (
         <Tag
            closable
            onClose={(e) => {
               e.preventDefault();
               handleClose(tag);
            }}
         >
            {tag}
         </Tag>
      );
      return (
         <span key={tag} style={{ display: 'inline-block' }}>
            {tagElem}
         </span>
      );
   };

   const tagChild = tags.map(forMap);

   const tagPlusStyle: React.CSSProperties = {
      background: token.colorBgContainer,
      borderStyle: 'dashed',
   };

   const updateImageUrl = (result: any) => {
      setImageUrl(result.secure_url);
   };

   return (
      <Card
         className="md:w-[400px] sm:w-[300px] lg:w-[700px]"
         actions={[
            <div>
               <CloudUploadOutlined />
               <div className="px-6">
                  <UploadWidget buttonName="Upload Image" onUpload={updateImageUrl} class="border-0" />
               </div>
            </div>,
            <div>
               <CheckOutlined />
               <div>
                  <Button className="border-0" onClick={handleSave}>
                     Save
                  </Button>
               </div>
            </div>,
         ]}
      >
         <div className="flex justify-center items-center  ">
            <Avatar src={currentUser.avatar} className="h-20 w-24" />
            <div className="p-4 w-full flex flex-col gap-2">
               <Input placeholder="Title" className="p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
               <Input
                  placeholder="Description"
                  className="p-4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               />
               <>
                  <div>{tagChild}</div>
                  {inputVisible ? (
                     <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                     />
                  ) : (
                     <Tag onClick={showInput} style={tagPlusStyle} className="w-[100px]">
                        <PlusOutlined /> New Tag
                     </Tag>
                  )}
                  {imageUrl && <p className="truncate">Image : {imageUrl}</p>}
               </>
            </div>
         </div>
      </Card>
   );
};

export default CreatePost;
