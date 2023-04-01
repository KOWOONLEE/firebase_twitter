import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { dbData } from "../myBase";
import { ref, child, push, update, set, onValue } from "firebase/database";

const Heart = ({ fweetObj, heartCount, setHeartCount }) => {
  const [heartClick, setHeartClick] = useState(false);
  const [heartColor, setHeartColor] = useState("empty");

  // const starCountRef = ref(dbData, "fweets/" + fweetObj.creatorId + "/starCount");
  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   updateStarCount(postElement, data);
  // });

  const realtimeHeart = (uid) => {
    set(ref(dbData, "users/" + fweetObj.creatorId), {
      username: fweetObj.creatorId,
      heartCount,
    });
    const postData = {
      heartCount,
    };
    const newPostKey = push(child(ref(dbData), "fweets")).key;
    const updates = {};
    updates["/fweets/" + newPostKey] = postData;

    return update(ref(dbData), updates);
  };

  const clickHeart = () => {
    if (heartCount === 0) {
      setHeartClick(false);
      setHeartColor("empty");
    } else {
      setHeartClick(true);
      setHeartColor("fill");
    }
  };

  const handleHeart = () => {
    setHeartCount(heartCount + 1);
  };

  useEffect(() => {
    realtimeHeart();
  }, []);
  return (
    <>
      <div>
        <span
          onClick={() => {
            clickHeart();
            handleHeart();
          }}
        >
          {heartClick ? <AiFillHeart /> : <AiOutlineHeart />}
        </span>
        <span>{heartCount}</span>
      </div>
    </>
  );
};
export default Heart;
