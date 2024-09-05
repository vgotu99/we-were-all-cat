import "./Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QnAData } from "../components/QnAData";
import { reQnAData } from "../components/reQnAData";
import { db } from "../../Auth - Do Not Upload/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";
import Header from "../components/Header";
import Main from "../components/Main";
import TestGuide from "../components/TestGuide";
import TestQnA from "../components/TestQnA";
import Button from "../components/Button";

const Home = () => {
  const [curView, setCurView] = useState("main");
  const [userAnswer, setUserAnswer] = useState([]);
  const [tieAnswer, setTieAnswer] = useState([]);
  const [userReAnswer, setUserReAnswer] = useState([]);
  const [userType, setUserType] = useState("");
  const nav = useNavigate();

  const handleAnswerClick = (questionId, answer) => {
    const newUserAnswers = {
      questionId,
      answer,
    };

    const updateUserAnswer = [newUserAnswers, ...userAnswer];
    setUserAnswer(updateUserAnswer);

    if (curView < 8) {
      const curViewId = curView + 1;
      switchMainView(curViewId);
    }

    if (updateUserAnswer.length === 8) {
      const reversedUpdateUserAnswer = updateUserAnswer.reverse();

      const updateTieAnswer = [];

      let hasTie = false;
      for (let i = 0; i < 4; i++) {
        if (
          reversedUpdateUserAnswer[i].answer !==
          reversedUpdateUserAnswer[i + 4].answer
        ) {
          updateTieAnswer.push(i + 1);
          hasTie = true;
        }
      }

      if (hasTie) {
        setTieAnswer(updateTieAnswer);
        switchMainView("reTest");
      } else {
        switchMainView("submit");
      }
    }
  };

  const handleReAnswerClick = async (questionId, answer) => {
    const newUserReAnswers = {
      questionId,
      answer,
    };

    const updateUserReAnswer = [newUserReAnswers, ...userReAnswer];

    setUserReAnswer(updateUserReAnswer);

    if (curView === `re_${tieAnswer[tieAnswer.length - 1]}`) {
      updateUserReAnswer.reverse();
      switchMainView("submit");
    } else {
      if (curView === `re_${tieAnswer[0]}`) {
        switchMainView(`re_${tieAnswer[1]}`);
      }
      if (curView === `re_${tieAnswer[1]}`) {
        switchMainView(`re_${tieAnswer[2]}`);
      }
      if (curView === `re_${tieAnswer[2]}`) {
        switchMainView(`re_${tieAnswer[3]}`);
      }
    }
  };

  const testData = QnAData.filter((data) => data.id === curView);
  const reTestData = tieAnswer.map((tieIndex) => {
    return reQnAData.filter((reData) => reData.reId === tieIndex);
  });

  const goToResult = async () => {
    let resultData;

    if (userReAnswer && userReAnswer.length > 0) {
      const combinedData = userAnswer.map((data) => {
        const userReAnswerData = userReAnswer.find(
          (reData) => reData.questionId === data.questionId
        );

        return userReAnswerData
          ? { ...data, answer: userReAnswerData.answer }
          : data;
      });

      resultData = `${combinedData[0].answer},${combinedData[1].answer},${combinedData[2].answer},${combinedData[3].answer}`;
    } else {
      resultData = `${userAnswer[0].answer},${userAnswer[1].answer},${userAnswer[2].answer},${userAnswer[3].answer}`;
    }

    let updateUserType = "";

    if (resultData === "answerA,answerA,answerA,answerA") {
      setUserType("A");
      updateUserType = "A";
    }
    if (resultData === "answerA,answerA,answerA,answerB") {
      setUserType("B");
      updateUserType = "B";
    }
    if (resultData === "answerA,answerA,answerB,answerA") {
      setUserType("C");
      updateUserType = "C";
    }
    if (resultData === "answerA,answerA,answerB,answerB") {
      setUserType("D");
      updateUserType = "D";
    }
    if (resultData === "answerA,answerB,answerA,answerA") {
      setUserType("E");
      updateUserType = "E";
    }
    if (resultData === "answerA,answerB,answerA,answerB") {
      setUserType("F");
      updateUserType = "F";
    }
    if (resultData === "answerA,answerB,answerB,answerA") {
      setUserType("G");
      updateUserType = "G";
    }
    if (resultData === "answerA,answerB,answerB,answerB") {
      setUserType("H");
      updateUserType = "H";
    }
    if (resultData === "answerB,answerA,answerA,answerA") {
      setUserType("I");
      updateUserType = "I";
    }
    if (resultData === "answerB,answerA,answerA,answerB") {
      setUserType("J");
      updateUserType = "J";
    }
    if (resultData === "answerB,answerA,answerB,answerA") {
      setUserType("K");
      updateUserType = "K";
    }
    if (resultData === "answerB,answerA,answerB,answerB") {
      setUserType("L");
      updateUserType = "L";
    }
    if (resultData === "answerB,answerB,answerA,answerA") {
      setUserType("M");
      updateUserType = "M";
    }
    if (resultData === "answerB,answerB,answerA,answerB") {
      setUserType("N");
      updateUserType = "N";
    }
    if (resultData === "answerB,answerB,answerB,answerA") {
      setUserType("O");
      updateUserType = "O";
    }
    if (resultData === "answerB,answerB,answerB,answerB") {
      setUserType("P");
      updateUserType = "P";
    }

    if (updateUserType) {
      const resultRef = doc(db, "result", "type");

      try {
        await updateDoc(resultRef, {
          [updateUserType]: increment(1),
        });
        nav(`/result/${updateUserType}`);
      } catch (error) {
        console.error("Firestore 업데이트 중 오류 발생: ", error);
      }
    }
  };

  const switchMainView = (view) => {
    setCurView(view);
  };

  const renderMainView = () => {
    switch (curView) {
      case "main":
        return <Main switchMainView={switchMainView} />;
      case "testGuide":
        return (
          <TestGuide
            switchMainView={switchMainView}
            setUserAnswer={setUserAnswer}
            setTieAnswer={setTieAnswer}
            setUserReAnswer={setUserReAnswer}
            setUserType={setUserType}
            curView={curView}
          />
        );
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return (
          <TestQnA
            testData={testData}
            handleAnswerClick={handleAnswerClick}
            curView={curView}
          />
        );
      case "submit":
        return (
          <div style={{ textAlign: "center", marginTop:'20px' }}>
            <div style={{backgroundColor: 'black', width: '100%', padding: '7% 0', borderRadius: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img
              src="/submit.png"
              style={{ width: "95%"}}
            />
            </div>
            <Button
              onClick={goToResult}
              type={"main"}
              text={"과거 냥생 확인하기"}
            />
          </div>
        );
      case "reTest":
        return (
          <TestGuide
            switchMainView={switchMainView}
            setUserAnswer={setUserAnswer}
            curView={curView}
            tieAnswer={tieAnswer}
          />
        );
      case `re_${tieAnswer[0]}`:
        return (
          <TestQnA
            reTestData={reTestData[0]}
            handleReAnswerClick={handleReAnswerClick}
          />
        );
      case `re_${tieAnswer[1]}`:
        return (
          <TestQnA
            reTestData={reTestData[1]}
            handleReAnswerClick={handleReAnswerClick}
          />
        );
      case `re_${tieAnswer[2]}`:
        return (
          <TestQnA
            reTestData={reTestData[2]}
            handleReAnswerClick={handleReAnswerClick}
          />
        );
      case `re_${tieAnswer[3]}`:
        return (
          <TestQnA
            reTestData={reTestData[3]}
            handleReAnswerClick={handleReAnswerClick}
          />
        );
      default:
        return <Main switchMainView={switchMainView} />;
    }
  };

  return (
    <div className="home">
      <Header switchMainView={switchMainView} />
      {renderMainView()}
    </div>
  );
};

export default Home;
