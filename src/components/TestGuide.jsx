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
        <div className="testGuide_emoji">⚠️</div>
        <h2>과거로 이동 전 안내</h2>
        <div>과거로 이동하는 동안</div>
        <div>테스트를 진행해주세요.</div>
        <div>고양이적 사고로 질문에 대한</div>
        <div>답변을 골라주셔야 합니다.</div>
        <br />
        <Button onClick={goToTest} type={"main"} text={"알겠습니다 !"} />
      </div>
    );
  }

  if (curView === "reTest") {
    return (
      <div className="reTest">
        <img src="/caution.png" />
        <div>엇,,, 깜짝이야</div>
        <div>너 왜 여기로 왔니..?</div>
        <br />
        <div>아~ 너는 아직 고양이적 사고에</div>
        <div>동화되지 못한 것 같아!</div>
        <div>인간이 잘 이해할 수 있는</div>
        <div>새로운 질문을 {tieAnswer.length}개 줄게 !</div>
        <div>다시 천천히 답변해봐 !</div>
        <Button onClick={goToReTest} type={"main"} text={"어! 알겠어!"} />
      </div>
    );
  }
};

export default TestGuide;
