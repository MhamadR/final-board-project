import { useState } from "react";

function BoardForm({ onSubmit }) {
  const [board, setBoard] = useState({
    title: "",
    columns: ["To-Do"],
    goal: "",
    "start-date": "",
    "end-date": "",
  });

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
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <label htmlFor="title">Title:</label>
      <input
        name="title"
        type="text"
        id="title"
        value={board.title}
        onChange={handleInputChange}
      />
      <label htmlFor="start">Start Date:</label>
      <input
        name="start-date"
        type="datetime-local"
        id="start"
        value={board["start-date"]}
        onChange={handleInputChange}
      />
      <label htmlFor="end">End Date:</label>
      <input
        name="end-date"
        type="datetime-local"
        id="end"
        value={board["end-date"]}
        onChange={handleInputChange}
      />
      <label htmlFor="goal">Goal:</label>
      <input
        name="goal"
        type="text"
        id="goal"
        value={board.goal}
        onChange={handleInputChange}
      />
      <input type="submit" value="Add Board" />
    </form>
  );
}

export default BoardForm;
