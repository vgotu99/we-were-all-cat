import "./Result.css";
import Header from "../components/Header";
import Button from "../components/Button";
import NotFound from "./NotFound";
import { typeData } from "../components/typeData";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useRef } from "react";
import { db } from "../../Auth - Do Not Upload/firebase";
import { doc, getDoc } from "firebase/firestore";
import { initializeKakao } from "../../Auth - Do Not Upload/kakao";

const Result = () => {
  const nav = useNavigate();
  const { type } = useParams();
  const [typeValue, setTypeValue] = useState(null);
  const [totalTypeValue, setTotalTypeValue] = useState(0);
  const resultSaveBoxRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "result", "type");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          const specificTypeValue = data[type];
          setTypeValue(specificTypeValue);

          const totalSumValue = Object.values(data).reduce(
            (acc, curr) => acc + curr,
            0
          );
          setTotalTypeValue(totalSumValue);
        } else {
          console.log("no such document");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchData();
  }, [type]);

  useEffect(() => {
    initializeKakao();
  }, []);

  const typeValueResult =
    typeValue && totalTypeValue
      ? ((typeValue * 100) / totalTypeValue).toFixed(1)
      : 0;

  const filteredTypeData = typeData.filter((data) => data.type === type);

  const handleSaveImage = () => {
    const resultSaveBox = resultSaveBoxRef.current;

    html2canvas(resultSaveBox).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, `우모고_${type}타입.png`);
      }, "image/png");
    });
  };

  const handleShareImage = () => {
    let imageUrlType = "";

    if (type === "A") {
      imageUrlType =
        "https://github.com/user-attachments/assets/a2bd98d2-21fb-4e78-91b9-f59595a6fb2f";
    }
    if (type === "B") {
      imageUrlType =
        "https://github.com/user-attachments/assets/a72dbd63-7f29-4ef5-8d7a-a6e7606ef945";
    }
    if (type === "C") {
      imageUrlType =
        "https://github.com/user-attachments/assets/06421932-2c88-45ea-8a52-26415dee6fc5";
    }
    if (type === "D") {
      imageUrlType =
        "https://github.com/user-attachments/assets/fb825a90-bfd4-4043-ba3c-7b58996b5c92";
    }
    if (type === "E") {
      imageUrlType =
        "https://github.com/user-attachments/assets/e11bf7d3-556a-4789-b5f3-5ea71ef773a8";
    }
    if (type === "F") {
      imageUrlType =
        "https://github.com/user-attachments/assets/8bb39d60-cd35-480f-98ca-a1c158d2007a";
    }
    if (type === "G") {
      imageUrlType =
        "https://github.com/user-attachments/assets/25ae125c-3190-4c80-8977-27609cfa3c10";
    }
    if (type === "H") {
      imageUrlType =
        "https://github.com/user-attachments/assets/afb0fd47-7ec5-4dde-916c-f863bd1b50ef";
    }
    if (type === "I") {
      imageUrlType =
        "https://github.com/user-attachments/assets/cf414f68-d27c-4f86-b6c1-4ae83f1127b0";
    }
    if (type === "J") {
      imageUrlType =
        "https://github.com/user-attachments/assets/7e7b9b3a-4970-41bb-879d-52b76d6f08e6";
    }
    if (type === "K") {
      imageUrlType =
        "https://github.com/user-attachments/assets/ef35664d-3c54-4494-9f91-87cdb1c9c6ae";
    }
    if (type === "L") {
      imageUrlType =
        "https://github.com/user-attachments/assets/d41b6c4d-dae1-4759-8a9e-22bdf35ea226";
    }
    if (type === "M") {
      imageUrlType =
        "https://github.com/user-attachments/assets/d1a26ba4-0b6c-49a4-b6d9-0d8a28b0fb1b";
    }
    if (type === "N") {
      imageUrlType =
        "https://github.com/user-attachments/assets/2d8d1536-46b1-4049-bf4c-5f03fa02a87e";
    }
    if (type === "O") {
      imageUrlType =
        "https://github.com/user-attachments/assets/c8396d63-cb17-4506-9d56-e7a3356978ca";
    }
    if (type === "P") {
      imageUrlType =
        "https://github.com/user-attachments/assets/f022f7ac-da6b-4a38-a919-02baa83703c9";
    }

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "우리는 모두 고양이였다",
        description:
          "우리는 모두 고양이였다는 사실!!\n과거 냥생 시절 모습을 확인해보세요!",
        imageUrl: imageUrlType,
        link: {
          mobileWebUrl: "https://woomogo.vercel.app",
          webUrl: "https://woomogo.vercel.app",
        },
      },
      buttons: [
        {
          title: "나의 과거 냥생 확인하기",
          link: {
            mobileWebUrl: "https://woomogo.vercel.app",
            webUrl: "https://woomogo.vercel.app",
          },
        },
      ],
    });
  };

  const validType = "ABCDEFGHIJKLMNOP".split("");

  if (!validType.includes(type)) {
    return <NotFound />;
  }

  return (
    <div className="result">
      <div id="result_save_box" ref={resultSaveBoxRef}>
        <Header />
        {filteredTypeData.map((data) => (
          <div className="result_wrapper" key={data.type}>
            <div className="result_img">
              <img src={`/${data.type}.png`} />
            </div>
            <div className="background_paw">
              <img src="/paw2.png" alt="" />
            </div>
            <div className="result_text">
              <div className="result_species">
                <div>👇 당신의 과거 냥생은</div>
                <div className="species_point">😸 {data.species} 고양이</div>
              </div>
              <div className="result_description1">{data.description1}</div>
              <div className="result_description2">{data.description2}</div>
              <div className="result_description3">{data.description3}</div>
            </div>
            <div className="result_type_wrapper">
              <div className="result_type_box">
                <div>우모고를 이용한</div>
                <div>고양이들 중</div>
                <div>{typeValueResult}%</div>
              </div>
              <div
                className="result_type_box"
                onClick={() => nav(`/result/${data.matchType}`)}
                style={{ cursor: "pointer" }}
              >
                <div>당신과 가장 찰떡인 고양이는 ?</div>
                <div>{data.matchSpecies} ＞</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="border"></p>
      <Button
        onClick={handleSaveImage}
        type={"main"}
        text={"이미지 저장하기"}
      />
      <Button
        onClick={handleShareImage}
        type={"main"}
        text={"카톡으로 이미지 공유하기"}
      />
    </div>
  );
};

export default Result;
