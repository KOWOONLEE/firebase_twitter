import React, { useEffect, useState } from "react";
import { dbService } from "../myBase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import Fweet from "../components/Fweet";

const Home = ({ userObj }) => {
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "fweets"), {
        text: content,
        createAt: Date.now(),
        creatorId: userObj.uid,
      });
      setContent(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContents = (event) => {
    const {
      target: { value },
    } = event;
    setContent(value);
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
          <input type="submit" value="Fweet" />
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
