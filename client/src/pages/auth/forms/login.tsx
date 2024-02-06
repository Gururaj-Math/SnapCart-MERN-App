import { useCookies } from "react-cookie";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  const [_, setCookie] = useCookies(["access_token"]);

  const onFinish = async (values: string[]) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        values
      );
      console.log("Login successful", res);

      setCookie("access_token", res.data.data.access_token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Form
        className="w-[400px]"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" className="w-full">
            Log in
          </Button>
          Or <Link to={'/auth/register'}>register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
