import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import TodoList from "./TodoList";

export default function Home() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  console.log(localStorage.getItem("auth-token"));
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) history.push("/login");
    console.log(userData);
  }, [userData, history]);

  return (
    <div className="todo-app">
      <TodoList />
    </div>
  );
}
