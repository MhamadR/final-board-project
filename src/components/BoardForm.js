import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function BoardForm({ onSubmit, submitBtn, data }) {
  const [board, setBoard] = useState({
    title: "",
    columns: ["To-Do"],
    goal: "",
    "start-date": "",
    "end-date": "",
  });

  useEffect(() => {
    if (data) setBoard(() => data);
  }, []);

  const handleInputChange = (event) => {
    setBoard((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(board);
  };

  return (
    <Container
      fluid
      className="position-absolute d-flex justify-content-center"
    >
      <Form
        className="d-flex flex-column p-5 w-50 border border-light mt-4 rounded"
        style={{ zIndex: "1000", backgroundColor: "rgba(238, 239, 240, 1)" }}
        onSubmit={handleSubmit}
        id="boardForm"
      >
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={board.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStartDate">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control
            name="start-date"
            type="datetime-local"
            value={board["start-date"]}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEndDate">
          <Form.Label>End Date:</Form.Label>
          <Form.Control
            name="end-date"
            type="datetime-local"
            value={board["end-date"]}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEndDate">
          <Form.Label>Goal:</Form.Label>
          <Form.Control
            name="goal"
            type="text"
            value={board.goal}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {submitBtn}
        </Button>
      </Form>
    </Container>
  );
}

export default BoardForm;
