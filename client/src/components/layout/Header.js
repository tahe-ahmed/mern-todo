import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../authen/AuthOptions";

export default function Header() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <Link class="navbar-brand" to="/">
        ToDo APP
      </Link>
      <AuthOptions />
    </nav>
  );
}
