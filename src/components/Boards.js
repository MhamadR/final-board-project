import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import db from "../Firebase";
import BoardForm from "./BoardForm";

function Boards() {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    onSnapshot(
      collection(db, "boards"),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            setBoardList((prev) => [
              ...prev,
              { ...change.doc.data(), id: change.doc.id },
            ]);
          } else if (change.type === "removed") {
            setBoardList((prev) =>
              prev.filter((board) => board.id !== change.doc.id)
            );
          }
        });
      },
      (error) => {
        console.log("error", error);
      }
    );
  }, []);

  const addDocument = async (data) => {
    await addDoc(collection(db, "boards"), { ...data });
  };

  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, "boards", id));
  };
  return (
    <div>
      <BoardForm onSubmit={addDocument} />
      <button>New Board</button>
      {boardList
        ? boardList.map((board) => {
            return (
              <div key={board.id}>
                <h2>{board.title}</h2>
                <button onClick={() => deleteDocument(board.id)}>Delete</button>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Boards;
