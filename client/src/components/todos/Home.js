import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import TodoList from "./TodoList";

export default function Home() {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) history.push("/login");
  }, [userData, history]);

  return (
    <div className="todo-app">
      {userData && <TodoList userData={userData} />}
    </div>
  );
}
