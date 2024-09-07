import "./Feedback.css";
import Header from "../components/Header";
import Button from "../components/Button";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../Auth - Do Not Upload/firebase";

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [message, setMessage] = useState("ㅤ");
  const [nickname, setNickname] = useState("");

  const handleSubmitFeedback = async () => {
    if (feedbackText.trim().replaceAll(" ", "") === "") {
      setMessage(
        "내용이 입력되지 않았습니다. 내용을 입력 후 제출해주세요 !"
      );
      setTimeout(() => {
        setMessage("ㅤ");
      }, 3000);
    }

    if (feedbackText.trim().replaceAll(" ", "") !== "") {
      try {
        await addDoc(collection(db, "feedbacks"), {
          nickname: nickname,
          feedbacks: feedbackText,
          writeTime: serverTimestamp(),
        });
        setFeedbackText("");
        setNickname("");
        setMessage("정상적으로 제출되었습니다. 관심 가져주셔서 감사드립니다 !");

        setTimeout(() => {
          setMessage("ㅤ");
        }, 3000);
      } catch (error) {
        console.error("Error submitting feedback: ", error);
      }
    }
  };

  return (
    <div className="feedback">
      <Header />
      <br />
      <div className="feedback_guide">
        <div>우모고를 이용해주시고</div>
        <div>관심 가져주셔 감사드립니다.</div>
        <div>저에게 전하고 싶으신 내용을</div>
        <div>자유롭게 작성 후 제출해주세요.</div>
      </div>
      <div className="feedback_nicknameBox">
        <input
          onChange={(e) => setNickname(e.target.value)}
          value={nickname}
          type="text"
          placeholder="닉네임을 입력해주세요."
          maxLength={"10"}
        />
        <div>＜ 미입력 시 익명으로 처리됩니다.</div>
      </div>
      <textarea
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="우모고를 제작한 개발자에게&#10;전하고 싶은 말을 자유롭게 남겨주세요.&#10;&#10;간단한 이용 후기 등과 같은 내용,&#10;에러 발생 및 추가되었으면 하는 기능,&#10;혹은 UI/UX 등 다양한 피드백을&#10;작성해주셔도 됩니다.&#10;&#10;남겨주신 내용은 추후 업데이트에&#10;활용될 수 있습니다!&#10;&#10;마지막으로 우모고에&#10;관심 가져주셔 감사드립니다."
      />
      {message && (
        <pre
          style={{ fontSize: "12px", color: "crimson", textAlign: "center" }}
        >
          {message}
        </pre>
      )}
      <Button
        onClick={handleSubmitFeedback}
        type={"submit"}
        text={"제출하기"}
      />
    </div>
  );
};

export default Feedback;
