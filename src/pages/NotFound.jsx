import './NotFound.css'
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate()

  return (
    <div className="notfound">
      <Header />
      <div className="notfound_img_box">
        <img src="/notFound.png" alt="" />
      </div>
      <Button onClick={() => nav('/')} type={'main'} text={'홈으로 이동하기'}/>
    </div>
  );
};

export default NotFound;
