import "./Result.css";
import Header from "../components/Header";
import Button from "../components/Button";
import { typeData } from "../components/typeData";
import { useNavigate, useParams } from "react-router-dom";

const Result = () => {
  const nav = useNavigate();
  const { type } = useParams();

  const filteredTypeData = typeData.filter((data) => data.type === type);

  return (
    <div className="result">
      <Header />
      {filteredTypeData.map((data) => (
        <div className="result_wrapper" key={data.type}>
          <div className="result_img">
            <img src={data.img} />
          </div>
          <div className="background_paw">
            <img src="/paw2.png" alt="" />
          </div>
          <div className="result_description1">{data.description1}</div>
          <div className="result_description2">{data.description2}</div>
        </div>
      ))}
      <Button
        onClick={() => nav("/feedback")}
        type={"main"}
        text={"건의사항 보내기"}
      />
    </div>
  );
};

export default Result;
