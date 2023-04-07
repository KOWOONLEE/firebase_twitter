import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../color";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineArrowRight, AiOutlineCamera } from "react-icons/ai";
import { dbService, storageService } from "../myBase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Fweet from "../components/Fweet";

const Home = ({ userObj }) => {
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([]);
  const [fileAddress, setFileAddress] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const q = query(
      collection(dbService, "fweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const fweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContents(fweetArray);
    });
  }, []);

  //사진이 있다면 먼저 사진 파일 url을 받아서 그걸 트윗에 넣고 파일 url을 가진 트윗을 만들기
  const handleSubmit = async (e) => {
    e.preventDefault();
    let fileUrl = "";
    if (fileAddress !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, fileAddress, "data_url");
      fileUrl = await getDownloadURL(response.ref);
    }
    const fweetobject = {
      text: content,
      userName: userObj.displayName,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      fileUrl,
    };
    await addDoc(collection(dbService, "fweets"), fweetobject);
    setContent("");
    setFileAddress("");
  };

  const handleContents = (event) => {
    const {
      target: { value },
    } = event;
    setContent(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    //파일로딩이 끝날떄 finishedevent를 갖게 됨
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      //파일
      setFileAddress(result);
    };
    //데이터를 얻음
    reader.readAsDataURL(theFile);
  };

  const onClearPhotoClick = () => {
    setFileAddress(null);
    setInputValue("");
    console.log(userObj);
  };

  return (
    <StyledHome>
      <div className="homeWrap">
        <div className="mindInputWrap">
          <form onSubmit={handleSubmit}>
            <div className="addForm">
              <input
                className="mindInput"
                type="text"
                value={content}
                onChange={handleContents}
                placeholder="What's on your mind?"
                maxLength={120}
              />
              <button className="submitInput" type="submit" value="Fweet">
                <AiOutlineArrowRight />
              </button>
            </div>
            <div className="fileAdd">
              <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add Photos</span>
                <AiOutlineCamera />
              </label>
              <input
                id="attach-file"
                onChange={onFileChange}
                type="file"
                accept="image/*"
                value={inputValue}
                style={{
                  opacity: 0,
                }}
              />
            </div>
            <div className="imgPreview">
              {fileAddress && (
                <div className="imgWrap">
                  <img
                    src={fileAddress}
                    width="100px"
                    height="100px"
                    alt="img"
                  />
                  <div className="clearButton">
                    <button onClick={onClearPhotoClick}>Clear</button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="fweetWrap">
          {contents.map((fweet) => (
            <Fweet
              key={fweet.id}
              fweetObj={fweet}
              isOwner={fweet.creatorId === userObj.uid}
              userObj={userObj}
            />
          ))}
        </div>
      </div>
    </StyledHome>
  );
};
export default Home;

const StyledHome = styled.div`
  display: flex;
  width: 100%;
  height: 78vh;
  justify-content: center;
  padding-top: 10px;

  .homeWrap {
    align-items: center;
    justify-content: center;
  }
  .mindInputWrap {
    align-items: center;
    justify-content: center;
  }
  .addForm {
    display: flex;
    justify-content: center;
    margin-bottom: 2vh;
  }
  .mindInput {
    width: 23vw;
    height: 3vh;
    border-radius: 20px;
    border: none;
    padding-left: 1vw;
    background-color: ${theme.beige};
  }
  .submitInput {
    display: flex;
    width: 25px;
    height: 25px;
    border: none;
    border-radius: 50%;
    text-align: center;
    align-items: center;
    background-color: ${theme.red};
    cursor: pointer;

    svg {
      width: 2vw;
      height: 2vh;
      stroke-width: 20;
    }
  }
  .submitInput:hover {
    background-color: ${theme.pink};
  }
  .fileAdd {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    label {
      display: flex;
      align-items: center;
      font-size: 1.1em;
      color: ${theme.red};
      cursor: pointer;
    }

    svg {
      width: 20px;
      height: 20px;
      text-align: center;
      align-items: center;
      margin-left: 15px;
    }
  }

  .imgPreview {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
  }

  .clearButton {
    display: flex;
    justify-content: center;

    button {
      width: 6vw;
      height: 3vh;
      background-color: ${theme.beige};
      border: none;
      cursor: pointer;
    }
  }
  .fweetWrap {
    /* display: flex; */
    align-items: center;
    justify-content: center;
  }
`;
