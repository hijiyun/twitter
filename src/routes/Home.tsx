import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  const logOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <h1>
        <button onClick={logOut}>로그아웃</button>
      </h1>
    </>
  );
};

export default Home;
