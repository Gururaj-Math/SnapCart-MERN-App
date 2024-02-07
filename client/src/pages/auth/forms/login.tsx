import { useCookies } from "react-cookie";
import axios from "axios";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  logInStart,
  logInSuccess,
  logInFailure,
} from "../../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import API_BASE_URL from "../../../constant";

const Login = () => {
  const [_, setCookie] = useCookies(["access_token"]);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const { loading, error } = useSelector((state) => state.user);

  const onFinish = async (values: string[]) => {
    try {
      dispatch(logInStart());
      const res = await axios.post(
        `${API_BASE_URL}users/login`,
        values
      );
      dispatch(logInSuccess(res.data.data.user));
      navigate("/")
      console.log("Login successful", res);
      setCookie("access_token", res.data.data.access_token);
    } catch (error) {
      dispatch(logInFailure());
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
          Or <Link to={"/auth/register"}>register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
