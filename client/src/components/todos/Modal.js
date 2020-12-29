import React, { useState } from "react";
import { useDialog } from "react-st-modal";

function CustomDialogContent(props) {
  const dialog = useDialog();

  const [title, setTitle] = useState(
    props.todoToEdit ? props.todoToEdit.value : ""
  );
  const [details, setDetails] = useState(
    props.todoToEdit ? props.todoToEdit.details : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      text: title,
      details: details,
    });
    setTitle("");
    setDetails("");
  };
  const handleTitleOnchange = (e) => {
    setTitle(e.target.value);
  };
  const handleDetailsOnchange = (e) => {
    setDetails(e.target.value);
  };
  return (
    <div>
      <div class="form-group p-3">
        <input
          value={title}
          onChange={(e) => handleTitleOnchange(e)}
          type="text"
          class="form-control mb-1  "
          placeholder="Title"
          required
        />
        <textarea
          value={details}
          onChange={(e) => handleDetailsOnchange(e)}
          class="form-control mb-2"
          placeholder="Details"
          required
        />
      </div>
      {props.todoToEdit ? (
        <button
          class="add btn btn-primary font-weight-bold todo-list-add-btn "
          onClick={(e) => {
            props.onSubmit(props.todoToEdit.id, title, details);
            dialog.close(props.todoToEdit);
          }}
        >
          Update
        </button>
      ) : (
        <button
          class="add btn btn-primary font-weight-bold todo-list-add-btn "
          onClick={(e) => {
            handleSubmit(e);
            dialog.close(props.input);
          }}
        >
          ADD
        </button>
      )}
    </div>
  );
}
export default CustomDialogContent;
