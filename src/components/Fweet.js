import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../color";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { dbService, storageService } from "../myBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const Fweet = ({ fweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [editedFweet, setEditedFweet] = useState(fweetObj.text);
  const FweetTextRef = doc(dbService, "fweets", `${fweetObj.id}`);
  // console.log(fweetObj, editedFweet);

  const handleDelete = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await deleteDoc(FweetTextRef);
      await deleteObject(ref(storageService, fweetObj.fileUrl));
    }
  };

  const handleEdit = () => {
    setEditing((prev) => !prev);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    await updateDoc(FweetTextRef, {
      text: editedFweet,
    });
    setEditing(false);
  };
  const editFweet = (event) => {
    const {
      target: { value },
    } = event;
    setEditedFweet(value);
  };
  return (
    <StyledFweet>
      <div>
        {editing ? (
          <div>
            <form onSubmit={submitEdit}>
              <input
                type="text"
                placeholder="Edit your Fweet"
                value={editedFweet}
                required
                onChange={editFweet}
              />
              <input type="submit" />
            </form>
            <button onClick={handleEdit}>Cancel</button>
          </div>
        ) : (
          <div className="fweetText">
            <p>{fweetObj.text}</p>
            {/* <p>{fweetObj.id}</p> */}
            {fweetObj.fileUrl && (
              <img
                src={fweetObj.fileUrl}
                alt="attachmentImg"
                width="100px"
                height="100px"
              />
            )}
            {isOwner && (
              <div>
                <button onClick={handleDelete}>
                  <BsTrash3 />
                </button>
                <button onClick={handleEdit}>
                  <AiOutlineEdit />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </StyledFweet>
  );
};
export default Fweet;

const StyledFweet = styled.div`
  margin-top: 3vh;

  .fweetText {
    display: flex;
    width: 30vw;

    vertical-align: center;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;

    img {
      display: inline-block;
    }

    p {
      width: 20vw;
      text-align: left;
      align-items: center;
      padding: 3px;
      color: black;
    }
    button {
      width: 3vw;
      height: 3vh;
      border: none;
      background-color: white;

      svg {
        width: 2vw;
        height: 2vh;
        fill: ${theme.red};
      }
    }
  }
`;
