import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ switchMainView }) => {
  const nav = useNavigate();
  const loc = useLocation();

  const onClickHeader = () => {
    nav("/");

    if (loc.pathname === '/') {
      switchMainView("main");
    }
  };

  return (
    <div onClick={onClickHeader} className="header">
      <div className="header_point_font">우</div>
      <p>리는</p>
      <div className="header_point_font">모</div>
      <p>두</p>
      <img src="/paw.png" />
      <div className="header_point_font">고</div>
      <p>양이였다</p>
    </div>
  );
};

export default Header;
