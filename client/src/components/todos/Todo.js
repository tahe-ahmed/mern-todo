import React, { useState, useEffect } from "react";
import CustomDialogContent from "./Modal";
import { CustomDialog } from "react-st-modal";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [filterTodo, setFilterTodo] = useState();
  const [edit, setEdit] = useState({
    id: null,
    value: "",
    details: "",
  });

  useEffect(() => {
    todos && setFilterTodo(todos);
  }, [todos]);

  const submitUpdate = (id, value, details) => {
    updateTodo(id, value, details);
    setEdit({
      id: null,
      value: "",
      details: "",
    });
  };

  const handleOnChange = (e) => {
    switch (e.target.value) {
      case "completed":
        setFilterTodo(todos.filter((todo) => todo.isComplete === true));
        break;
      case "incompleted":
        setFilterTodo(todos.filter((todo) => todo.isComplete === false));
        break;
      default:
        setFilterTodo(todos);
    }
  };

  return (
    <React.Fragment>
      <div class="list-wrapper">
        <div>
          <select
            class="custom-select custom-select-md mb-3 mt-3 "
            onChange={handleOnChange}
          >
            <option value="all" selected>
              All
            </option>
            <option value="completed">Completed</option>
            <option value="incompleted">Incompleted</option>
          </select>
        </div>

        <ul class="d-flex flex-column-reverse todo-list">
          {filterTodo &&
            todos &&
            filterTodo.map((todo, index) => (
              <li key={todo._id}>
                <div class="form-check" onChange={() => completeTodo(todo._id)}>
                  <label class="form-check-label">
                    {!todo.isComplete ? (
                      <input class="checkbox" type="checkbox"/>
                    ) : (
                      <input class="checkbox" type="checkbox" checked />
                    )}

                    <i class="input-helper"></i>
                  </label>
                </div>
                <div class="accordion" id="accordionExample">
                  <button
                    type="button"
                    class={`btn btn-link ${todo.isComplete && "completed"}`}
                    data-toggle="collapse"
                    data-target={`#${todo._id}`}
                  >
                    {todo.title}
                  </button>

                  <div
                    id={todo._id}
                    class="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div class="card-body">
                      <p>{todo.content ? todo.content : "No details"} </p>
                    </div>
                  </div>
                </div>

                <i
                  class="icon-edit"
                  onClick={async () => {
                    setEdit({ id: todo._id, value: todo.title });

                    await CustomDialog(
                      <CustomDialogContent
                        todoToEdit={{
                          id: todo._id,
                          value: todo.title,
                          details: todo.content,
                        }}
                        onSubmit={submitUpdate}
                      />,
                      {
                        title: "Edit ToDo",
                        showCloseIcon: true,
                      }
                    );
                  }}
                ></i>
                <i class="remove mdi" onClick={() => removeTodo(todo._id)}></i>
              </li>
            ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Todo;
