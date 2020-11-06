import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [filterTodo, setFilterTodo] = useState();

  useEffect(() => {
    todos && setFilterTodo(todos);
  }, [todos]);

  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }
  // console.log(todos);

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
  console.log(todos);

  return (
    <React.Fragment>
      <div class="list-wrapper">
        <div>
          <select
            class="md-form colorful-select dropdown-primary"
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
                <div class="form-check" onClick={() => completeTodo(todo._id)}>
                  <label class="form-check-label">
                    {todo.isComplete ? (
                      <input class="checkbox" type="checkbox" checked />
                    ) : (
                      <input class="checkbox" type="checkbox" />
                    )}{" "}
                    {todo.title}
                    <i class="input-helper"></i>
                  </label>
                </div>

                <i
                  class="icon-edit"
                  onClick={() => setEdit({ id: todo._id, value: todo.title })}
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
