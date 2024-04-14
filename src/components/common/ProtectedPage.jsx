import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
