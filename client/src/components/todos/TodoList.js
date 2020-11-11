import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import Axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  let token = localStorage.getItem("auth-token");

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const fetchedToDos = await Axios.get(
          "http://localhost:5000/todos/all",
          { headers: { "x-auth-token": token } }
        );
        setTodos(fetchedToDos.data);
      } catch (err) {
        console.log(err.response.data.msg);
      }
    };
    if (token) fetchToDos();
  }, [token]);

  const addTodo = async (todo) => {
    try {
      if (!todo.text || /^\s*$/.test(todo.text)) {
        return;
      }
      const toaddtodo = await Axios.post(
        "http://localhost:5000/todos",
        { title: todo.text, isComplete: false },
        { headers: { "x-auth-token": token } }
      );

      ///// update the local state
      const newTodos = [toaddtodo.data, ...todos];
      setTodos(newTodos);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  const updateTodo = async (todoId, newValue) => {
    try {
      if (!newValue.text || /^\s*$/.test(newValue.text)) {
        return;
      }
      const toupdateToDo = await Axios.patch(
        `http://localhost:5000/todos/${todoId}`,
        { title: newValue.text },
        { headers: { "x-auth-token": token } }
      );

      setTodos((prev) =>
        prev.map((item) => (item._id === todoId ? toupdateToDo.data : item))
      );
    } catch {
      ///handle errors
    }
  };

  const removeTodo = async (id) => {
    try {
      await Axios.delete(`http://localhost:5000/todos/${id}`, {
        headers: { "x-auth-token": token },
      });

      ///update local state
      const removedArr = [...todos].filter((todo) => todo._id !== id);
      setTodos(removedArr);
    } catch {
      ///handle errors
    }
  };

  const completeTodo = async (id) => {
    try {
      const myTodo = todos.find((todo) => todo._id === id);
      let status = { isComplete: !myTodo.isComplete };

      const toUpdateIsComplete = await Axios.patch(
        `http://localhost:5000/todos/${id}`,
        status,
        { headers: { "x-auth-token": token } }
      );
      console.log(toUpdateIsComplete);
      let updatedTodos = todos.map((todo) => {
        if (todo._id === toUpdateIsComplete.data._id) {
          todo.isComplete = toUpdateIsComplete.data.isComplete;
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch {}
  };

  return (
    <>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="col-md-12">
              <div class="card px-3">
                <div class="card-body">
                  <h4 class="card-title">Awesome Todo list</h4>
                  <TodoForm onSubmit={addTodo} />
                  {todos && (
                    <Todo
                      todos={todos}
                      completeTodo={completeTodo}
                      removeTodo={removeTodo}
                      updateTodo={updateTodo}
                    />
                  )}
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
