import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const home = () => {
  const { currentUser } = useSelector((state: any) => state.user);

  return <div>hellow world</div>;
};

export default home;
