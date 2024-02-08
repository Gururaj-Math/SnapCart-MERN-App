import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import UploadWidget from '../UploadWidget';

const EditProfileForm = (props: {
  formItemLayout: any;
  onFinish: (values: any) => Promise<void>;
  currentUser: any;
  setAvatarUrl: any;
  setCoverImageUrl: any;
  initialLinkValues: {
    [key: string]: string;
  };
}) => {
  const [form] = Form.useForm();

  const updateAvatarUrl = (result: any) => {
    props.setAvatarUrl(result.secure_url);
  };

  const updateCoverImageUrl = (result: any) => {
    props.setCoverImageUrl(result.secure_url);
  };

  return (
    <Form
      {...props.formItemLayout}
      form={form}
      name="edit-profile"
      onFinish={props.onFinish}
      initialValues={{
        prefix: '86',
        ...props.currentUser,
        ...props.initialLinkValues,
      }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
      className="bg-white p-4 rounded-md w-[30vw] flex flex-col items-center justify-center gap-4"
    >
      <h1 className="text-xl font-semibold text-center p-4">Edit User Profile</h1>

      <UploadWidget buttonName="Upload New Avatar" onUpload={updateAvatarUrl} />

      <UploadWidget buttonName="Upload New Cover Image" onUpload={updateCoverImageUrl} />

      <Form.Item
        name="bio"
        label="Bio"
        rules={[{ required: true, message: 'Please input bio!' }]}
        className="mb-4 w-full"
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="location" label="Location" className="mb-2 w-full">
        <Input />
      </Form.Item>

      {[1, 2, 3].map((index) => (
        <Form.Item key={`link${index}`} name={`link${index}`} label={`Link ${index}`} className="mb-2 w-full">
          <Input />
        </Form.Item>
      ))}

      <div className="flex gap-4 justify-center items-center">
        <Link to="/profile">
          <Button type="primary" className="w-[100px]">
            Back
          </Button>
        </Link>
        <Button type="primary" htmlType="submit" className="w-[100px]">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default EditProfileForm;