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
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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

  const boards = boardList.map((board) => {
    return (
      <Col key={board.id}>
        <Card className="h-100 w-100">
          <Card.Body className="h-75">
            <DropdownButton
              className="position-absolute"
              style={{ right: "5%", top: "5%" }}
              variant="light"
              title=""
              size="sm"
              align="end"
            >
              <Dropdown.Item
                as="button"
                className="text-center"
                onClick={() => {
                  setIsBoardEdit((prev) => !prev);
                  setEditBoard(() => board);
                }}
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                as="button"
                className="text-center text-danger"
                onClick={() => deleteDocument(board.id)}
              >
                Delete
              </Dropdown.Item>
            </DropdownButton>
            <Card.Title>{board.title}</Card.Title>
            <Card.Text>{board.goal}</Card.Text>
          </Card.Body>
          <Card.Footer className="h-25">
            <small className="text-muted">{board["start-date"]}</small>
            <small className="text-muted">{board["end-date"]}</small>
          </Card.Footer>
        </Card>
      </Col>
      // <div key={board.id}>
      //   <h2>{board.title}</h2>

      //   <button
      //     onClick={() => {
      //       setIsBoardEdit((prev) => !prev);
      //       setEditBoard(() => board);
      //     }}
      //   >
      //     Edit
      //   </button>
      //   <button onClick={() => deleteDocument(board.id)}>Delete</button>
      // </div>
    );
  });

  return (
    <div>
      {isBoardNew ? (
        <BoardForm onSubmit={addDocument} submitBtn="Add Board" />
      ) : null}
      <button onClick={() => setIsBoardNew((prev) => !prev)}>New Board</button>
      {boardList ? (
        <Container>
          <Row xs={1} md={3} lg={4} className="g-4">
            {boards}
          </Row>
        </Container>
      ) : null}
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
