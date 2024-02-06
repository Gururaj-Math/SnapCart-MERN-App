import { useState, ChangeEvent, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

interface LoginData {
  username: string;
  password: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const [cookie, setCookie] = useCookies(["access_token"]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("cookie data:", cookie);
  }, [cookie]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        loginData
      );
      console.log("Login successful", res);

      setCookie("access_token", res.data.data.access_token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="username"
        placeholder="username"
        value={loginData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={loginData.password}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
