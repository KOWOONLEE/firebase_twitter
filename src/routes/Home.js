import React, { useState } from "react";
import { dbService } from "../myBase";
import { collection, addDoc } from "firebase/firestore";

const Home = () => {
  const [contents, setContents] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(dbService, "fweets"), {
      contents,
      createAt: Date.now(),
    });
    setContents(docRef);
    console.log(contents);
  };

  const handleContents = (event) => {
    const {
      target: { value },
    } = event;
    setContents(value);
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={contents}
            onChange={handleContents}
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="submit" value="Fweet" />
        </form>
      </div>
    </>
  );
};
export default Home;
