import "./Main.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Main = ({ switchMainView }) => {
  const nav = useNavigate()

  return (
    <div className="main">
      <img src="./main.jpg" alt="" />
      <div>전생에 모두가 고양이였다는 사실!! 알고 계신가요?!</div>
      <div>과거 당신의 모습을 볼 수 있는 기회를 드립니다!</div>
      <Button
        onClick={() => switchMainView("testGuide")}
        type={"main"}
        text={"과거로 이동하기"}
      />
      <p className="test_start_text">😺 과거로 이동하기 버튼을 눌러주세요!</p>
      <Button type={"main"} text={"공유하기"} />
      <Button onClick={() => nav('/feedback')} type={"main"} text={"건의사항 보내기"} />
      <Button onClick={() => nav('/update')} type={'main'} text={'업데이트 내역'} />
    </div>
  );
};

export default Main;
