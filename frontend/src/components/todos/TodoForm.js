import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      text: input,
    });
    setInput("");
  };

  return (
    <div class="add-items d-flex">
      <input
        value={input}
        ref={inputRef}
        onChange={handleChange}
        name="text"
        type="text"
        class="form-control todo-list-input"
        placeholder="What do you need to do today?"
      />
      <button
        onClick={handleSubmit}
        class="add btn btn-primary font-weight-bold todo-list-add-btn"
      >
        {props.edit ? "update" : "add"}
      </button>
    </div>
  );
}

export default TodoForm;
