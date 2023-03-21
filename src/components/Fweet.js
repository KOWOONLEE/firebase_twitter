import React, { useState } from "react";
import { dbService } from "../myBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Fweet = ({ fweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [editedFweet, setEditedFweet] = useState(fweetObj.text);
  const FweetTextRef = doc(dbService, "fweets", `${fweetObj.id}`);
  console.log(fweetObj, editedFweet);

  const handleDelete = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await deleteDoc(FweetTextRef);
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
    <>
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
          <div>
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
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleEdit}>Edit</button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default Fweet;
