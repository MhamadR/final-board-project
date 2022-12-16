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
import { ReactComponent as PlusIcon } from "../Assets/plus-icon.svg";

function Boards() {
  const [boardList, setBoardList] = useState([]);
  const [isBoardNew, setIsBoardNew] = useState(false);
  const [isBoardEdit, setIsBoardEdit] = useState(false);
  const [editBoard, setEditBoard] = useState();

  const onPopupForm = (e) => {
    const boardForm = document.querySelector("#boardForm");
    const addBoard = document.querySelector(".add");
    if (
      !boardForm.contains(e.target) &&
      !e.target.classList.contains("edit") &&
      !addBoard.contains(e.target)
    ) {
      setIsBoardEdit(() => false);
      setIsBoardNew(() => false);
      window.removeEventListener("click", onPopupForm);
    }
  };

  useEffect(() => {
    if (isBoardEdit || isBoardNew) {
      window.addEventListener("click", onPopupForm);
    }
  }, [isBoardEdit, isBoardNew]);

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
          } else if (change.type === "modified") {
            setBoardList((prev) => [
              ...prev.map((board) =>
                change.doc.id === board.id ? change.doc.data() : board
              ),
            ]);
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
    setIsBoardNew(() => false);
    window.removeEventListener("click", onPopupForm);
  };

  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, "boards", id));
  };

  const updateDocument = async (data) => {
    const dataRef = doc(db, "boards", data.id);

    await updateDoc(dataRef, data);
    setIsBoardEdit(() => false);
    window.removeEventListener("click", onPopupForm);
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
                className="text-center edit"
                onClick={(e) => {
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
    );
  });

  return (
    <div>
      {isBoardNew ? (
        <BoardForm onSubmit={addDocument} submitBtn="Add Board" />
      ) : isBoardEdit ? (
        <BoardForm
          onSubmit={updateDocument}
          submitBtn="Save"
          data={editBoard}
        />
      ) : null}

      <Container className="mt-4">
        <Row xs={1} md={3} lg={4} className="g-4">
          {boardList ? boards : null}
          <Col>
            <Card
              className="h-100 w-100 d-flex justify-content-center align-items-center add"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (isBoardNew) {
                  window.removeEventListener("click", onPopupForm);
                  setIsBoardNew((prev) => !prev);
                } else {
                  setIsBoardNew((prev) => !prev);
                }
              }}
            >
              <PlusIcon className="w-25 h-25" />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Boards;
