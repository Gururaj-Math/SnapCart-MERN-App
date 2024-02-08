import { Button, Form, Input } from 'antd';
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
      className="bg-white p-4 rounded-md flex flex-col items-center justify-center gap-4"
    >

      <div className="w-[400px]">
        <UploadWidget buttonName="Upload New Avatar" onUpload={updateAvatarUrl} />
      </div>

      <div className="w-[400px]">
        <UploadWidget buttonName="Upload New Cover Image" onUpload={updateCoverImageUrl} />
      </div>

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

      <Button type="primary" htmlType="submit" className="w-[100px]">
        Save
      </Button>
    </Form>
  );
};

export default EditProfileForm;
