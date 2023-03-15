import React, { useEffect, useState } from "react";
import { dbService } from "../myBase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

const Home = () => {
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([]);

  const getFweets = async () => {
    const dbFweets = query(collection(dbService, "fweets"));
    const querySnapshot = await getDocs(dbFweets);
    querySnapshot.forEach((doc) => {
      const fweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      setContents((prev) => [fweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getFweets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(dbService, "fweets"), {
      content,
      createAt: Date.now(),
    });
    setContent(docRef);
    console.log(content);
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
            <div key={fweet.id}>
              <h4>{fweet.contents}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
