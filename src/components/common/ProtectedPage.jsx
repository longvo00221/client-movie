import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";

// const { user } = useSelector((state) => state.user);
const ProtectedPage = ({ children }) => {
  const [userState, setUserState] = useState({});
  useEffect(() => {
    const userInfoFromLocalStorage = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUserState(userInfoFromLocalStorage);
  }, []);


  const navigate = useNavigate();
  const HandleNavigate = () => {
    navigate("/signin");
  };
  useEffect(() => {
    if (!userState) HandleNavigate();
  }, []);
  return userState ? children : null;
};

export default ProtectedPage;
