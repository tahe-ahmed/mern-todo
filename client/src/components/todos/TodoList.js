import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import Axios from "axios";

const TodoList = (props) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState();

  let token = localStorage.getItem("auth-token");
  let userName = localStorage.getItem("user");

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const fetchedToDos = await Axios.get(
          "/todos/all",
          { headers: { "x-auth-token": token } }
        );
        setTodos(fetchedToDos.data);
      } catch (err) {
        err.response && setError(err.response.data.msg);
      }
    };
    if (token) fetchToDos();
  }, [token]);

  const addTodo = async (todo) => {
    try {
      const toaddtodo = await Axios.post(
        "/todos",
        { title: todo.text, isComplete: false, content: todo.details },
        { headers: { "x-auth-token": token } }
      );

      ///// update the local state
      const newTodos = [toaddtodo.data, ...todos];
      setTodos(newTodos);
    } catch (err) {
      err.response && setError(err.response.data.msg);
    }
  };

  const updateTodo = async (todoId, newValue, details) => {
    try {
      const toupdateToDo = await Axios.patch(
        `/todos/${todoId}`,
        { title: newValue, content: details },
        { headers: { "x-auth-token": token } }
      );
      console.log(toupdateToDo);

      setTodos((prev) =>
        prev.map((item) => (item._id === todoId ? toupdateToDo.data : item))
      );
    } catch (err) {
      err.response && setError(err.response.data.msg);
    }
  };

  const removeTodo = async (id) => {
    try {
      await Axios.delete(`/todos/${id}`, {
        headers: { "x-auth-token": token },
      });

      ///update local state
      const removedArr = [...todos].filter((todo) => todo._id !== id);
      setTodos(removedArr);
    } catch (err) {
      err.response && setError(err.response.data.msg);
    }
  };

  const completeTodo = async (id) => {
    try {
      const myTodo = todos.find((todo) => todo._id === id);
      let status = { isComplete: !myTodo.isComplete };

      const toUpdateIsComplete = await Axios.patch(
        `/todos/${id}`,
        status,
        { headers: { "x-auth-token": token } }
      );
      let updatedTodos = todos.map((todo) => {
        if (todo._id === toUpdateIsComplete.data._id) {
          todo.isComplete = toUpdateIsComplete.data.isComplete;
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (err) {
      err.response && setError(err.response.data.msg);
    }
  };

  return (
    <>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="col-md-12">
              <div class="card px-3">
                <div class="card-body">
                  <h2 class="card-title">Welcome {userName}</h2>
                  {error && (
                    <div class="alert alert-danger alert-dismissible fade show">
                      <strong>Error !</strong> {error}
                      <button
                        onClick={() => setError(undefined)}
                        type="button"
                        class="close"
                        data-dismiss="alert"
                      >
                        &times;
                      </button>
                    </div>
                  )}
                  {todos && (
                    <Todo
                      todos={todos}
                      completeTodo={completeTodo}
                      removeTodo={removeTodo}
                      updateTodo={updateTodo}
                    />
                  )}
                  <TodoForm onSubmit={addTodo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
