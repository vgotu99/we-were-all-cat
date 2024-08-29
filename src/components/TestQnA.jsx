import "./TestQnA.css";
import Button from "./Button";

const TestQnA = ({
  testData,
  handleAnswerClick,
  curView,
  reTestData,
  handleReAnswerClick,
}) => {
  if (curView < 9) {
    return (
      <div className="testQnA">
        {testData.map((data) => (
          <div key={data.id} className="testQnA_content">
            <div className="question_box">
              <div>Q: {data.question}</div>
            </div>
            <Button
              onClick={() => handleAnswerClick(data.id, "answerA")}
              type={"QnA"}
              text={data.answerA}
            />
            <Button
              onClick={() => handleAnswerClick(data.id, "answerB")}
              type={"QnA"}
              text={data.answerB}
            />
          </div>
        ))}
      </div>
    );
  }

  if (reTestData && reTestData.length > 0) {
    return (
      <div className="reTestQnA">
        {reTestData.map((reData) => (
          <div key={reData.reId} className="testQnA_content">
            <div className="question_box">
              <div>Q: {reData.question}</div>
            </div>
            <Button
              onClick={() => handleReAnswerClick(reData.reId, "answerA")}
              type={"QnA"}
              text={reData.answerA}
            />
            <Button
              onClick={() => handleReAnswerClick(reData.reId, "answerB")}
              type={"QnA"}
              text={reData.answerB}
            />
          </div>
        ))}
      </div>
    );
  }
};

export default TestQnA;
