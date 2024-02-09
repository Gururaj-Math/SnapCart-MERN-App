import { Avatar, Card, Input, Button, theme, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import UploadWidget from '../UploadWidget';

const CreatePost = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
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

  const UpdateImageUrl = (result: any) => {
    setImageUrl(result.secure_url);
  };

  return (
    <Card
      style={{ width: 700 }}
      actions={[
        <div>
          {' '}
          <CloudUploadOutlined />
          <div className='px-6'>
            {' '}
            <UploadWidget buttonName="Upload Image" onUpload={UpdateImageUrl} />
          </div>
        </div>,
        <Button className="border-0 mt-2">Save</Button>,
      ]}
    >
      <div className="flex justify-center items-center  ">
        <Avatar src={currentUser.avatar} className="h-20 w-24" />
        <div className="p-4 w-full flex flex-col gap-2">
          <Input placeholder="Title" className="p-2" />
          <Input placeholder="Description" className="p-4" />
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
          </>
        </div>
      </div>
    </Card>
  );
};

export default CreatePost;
