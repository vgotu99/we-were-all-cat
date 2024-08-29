import "./TestGuide.css";
import Button from "./Button";

const TestGuide = ({ switchMainView, setUserAnswer, curView, tieAnswer, setTieAnswer, setUserReAnswer, setUserType }) => {

  const goToTest = () => {
    switchMainView(1);
    setUserAnswer([]);
    setTieAnswer([])
    setUserReAnswer([])
    setUserType('')
  };

  const goToReTest = () => {
    switchMainView(`re_${tieAnswer[0]}`)
  }


  if (curView === "testGuide") {
    return (
      <div className="testGuide">
        <img src="/caution.png" />
        <h2>과거로 이동 전 안내</h2>
        <div>과거로 이동하는 동안</div>
        <div>테스트를 진행해주세요.</div>
        <div>고양이적 사고로 질문에 대한</div>
        <div>답변을 골라주셔야 합니다.</div>
        <br />
        <Button onClick={goToTest} type={"main"} text={"알겠습니다!"} />
      </div>
    );
  }

  if (curView === "reTest") {
    return (
      <div className="reTest">
        <img src="/caution.png" />
        <div>내가 분명 고양이적 사고로</div>
        <div>답변을 고르라고 했을텐데?!</div>
        <br />
        <div>너는 아직 과거로의 이동에</div>
        <div>집중하지 못한 것 같아..</div>
        <div>인간이 잘 이해할 수 있는</div>
        <div>새로운 질문을 {tieAnswer.length}개 줄게 !</div>
        <div>다시 답변해봐 !</div>
        <Button onClick={goToReTest} type={"main"} text={"어.. 알겠어..!"} />
      </div>
    );
  }
};

export default TestGuide;
