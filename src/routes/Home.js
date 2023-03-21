import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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

  // const getFweets = async () => {
  //   const dbFweets = query(collection(dbService, "fweets"));
  //   const querySnapshot = await getDocs(dbFweets);
  //   querySnapshot.forEach((doc) => {
  //     const fweetObject = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setContents((prev) => [fweetObject, ...prev]);
  //   });
  // };

  useEffect(() => {
    const q = query(collection(dbService, "fweets"));
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
      // console.log(await getDownloadURL(response.ref));
      fileUrl = await getDownloadURL(response.ref);
    }
    const fweetobject = {
      text: content,
      createAt: Date.now(),
      creatorId: userObj.uid,
      fileUrl,
    };
    await addDoc(collection(dbService, "fweets"), fweetobject);
    setContent("");
    setFileAddress("");
  };
  // try {
  //   const docRef = await addDoc(collection(dbService, "fweets"), {
  //     text: content,
  //     createAt: Date.now(),
  //     creatorId: userObj.uid,
  //   });
  //   setContent(docRef);
  // } catch (error) {
  //   console.log(error);
  // }

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
    // console.log(theFile);
    const reader = new FileReader();
    //파일로딩이 끝날떄 finishedevent를 갖게 됨
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
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
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={content}
            onChange={handleContents}
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input onChange={onFileChange} type="file" accept="image/*" />
          <input type="submit" value="Fweet" />
          {fileAddress && (
            <div>
              <img src={fileAddress} width="50px" height="50px" alt="img" />
              <button onClick={onClearPhotoClick}>Clear</button>
            </div>
          )}
        </form>
        <div>
          {contents.map((fweet) => (
            <Fweet
              key={fweet.id}
              fweetObj={fweet}
              isOwner={fweet.creatorId === userObj.uid}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
