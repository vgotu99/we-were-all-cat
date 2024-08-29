import "./Feedback.css";
import Header from "../components/Header";
import Button from "../components/Button";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../Auth - Do Not Upload/firebase";

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("ㅤ");
  const [message, setMessage] = useState("ㅤ\nㅤ");

  const handleSubmitFeedback = async () => {
    if (nickname.trim().replaceAll(" ", "") === "") {
      setNicknameMessage("< 닉네임을 입력해주세요");
      setTimeout(() => {
        setNicknameMessage("ㅤ");
      }, 3000);
    }

    if (feedbackText.trim().replaceAll(" ", "") === "") {
      setMessage(
        "피드백 내용이 입력되지 않았습니다.\n내용을 입력 후 제출해주세요 !"
      );
      setTimeout(() => {
        setMessage("ㅤ\nㅤ");
      }, 3000);
    }

    if (
      nickname.trim().replaceAll(" ", "") !== "" &&
      feedbackText.trim().replaceAll(" ", "") !== ""
    ) {
      try {
        await addDoc(collection(db, "feedbacks"), {
          nickname: nickname,
          feedbacks: feedbackText,
          writeTime: serverTimestamp(),
        });
        setNickname("");
        setFeedbackText("");
        setNicknameMessage("ㅤ");
        setMessage("피드백이 제출되었습니다.\n관심가져주셔서 감사드립니다 !");

        setTimeout(() => {
          setSuccessMessage("ㅤ\nㅤ");
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
      <div>우모고를 이용해주시고</div>
      <div> 관심가져주셔 감사드립니다.</div>
      <br />
      <div>아래에 피드백 내용을 작성해주시면</div>
      <div>최대한 반영하도록 하겠습니다 !</div>
      <div className="feedback_nickname_box">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요."
          maxLength={"10"}
        />
        {nicknameMessage && (
          <pre
            style={{ fontSize: "13px", color: "crimson", textAlign: "center" }}
          >
            {nicknameMessage}
          </pre>
        )}
      </div>
      <textarea
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        placeholder="에러 발생 및 추가되었으면 하는 기능&#10;혹은 UI/UX 등 다양한 피드백을 작성해주세요.&#10;&#10;‼️남겨주신 닉네임과 피드백은 업데이트 내역 중&#10;감사한 분 목록에 기재될 수 있습니다!"
      />
      {message && (
        <pre
          style={{ fontSize: "13px", color: "crimson", textAlign: "center" }}
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
