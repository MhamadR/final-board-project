import React from "react";
import { collection, addDoc } from "firebase/firestore"; 
import db from "../Firebase";

function Boards() {
  const handleSubmit = async () => {
  const docRef = await addDoc(collection(db, "boards"), {
    title: "Work",
    columns: ["To-Do"],
    goal: "Finish Assignment",
    "start-date": new Date("October 13, 2022 11:13:00"),
    "end-date": new Date("December 13, 2022 11:13:00")
  });
  console.log("Document written with ID: ", docRef.id);
}
  return (
    <div>
    <button onClick={handleSubmit}>Add Board</button>
    </div>
  );
}

export default Boards;