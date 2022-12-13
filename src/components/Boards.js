import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../Firebase";
import BoardForm from "./BoardForm";

function Boards() {
  const [boardList, setBoardList] = useState([]);
  const [isBoardNew, setIsBoardNew] = useState(false);
  const [isBoardEdit, setIsBoardEdit] = useState(false);
  const [editBoard, setEditBoard] = useState();

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

  const updateDocument = async (data) => {
    const dataRef = doc(db, "boards", data.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(dataRef, data);
  };
  return (
    <div>
      {isBoardNew ? (
        <BoardForm onSubmit={addDocument} submitBtn="Add Board" />
      ) : null}
      <button onClick={() => setIsBoardNew((prev) => !prev)}>New Board</button>
      {boardList
        ? boardList.map((board) => {
            return (
              <div key={board.id}>
                <h2>{board.title}</h2>

                <button
                  onClick={() => {
                    setIsBoardEdit((prev) => !prev);
                    setEditBoard(() => board);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteDocument(board.id)}>Delete</button>
              </div>
            );
          })
        : null}
      {isBoardEdit ? (
        <BoardForm
          onSubmit={updateDocument}
          submitBtn="Save"
          data={editBoard}
        />
      ) : null}
    </div>
  );
}

export default Boards;
