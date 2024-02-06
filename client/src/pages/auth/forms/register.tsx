import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../constant';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}api/v1/users/register`, formData);
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange} />
      <input type="text" name="email" placeholder="email" value={formData.email} onChange={handleChange} />
      <input type="text" name="password" placeholder="password" value={formData.password} onChange={handleChange} />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
};

export default Register;
