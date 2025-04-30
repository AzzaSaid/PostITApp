import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { isLogin } = useSelector(state => state.users)
    const navigate = useNavigate()
    useEffect(() => {
      if (!isLogin) { navigate("/login") }
    },[isLogin])

  return (
    <h1>Profile</h1>
  );
};

export default Profile;
