import { createRoot } from "react-dom/client";

import Note from "./src/components/Note";
import Login from "./src/components/Login.jsx";
import Index from "./src/components/Index.jsx";
import Register from "./src/components/Register.jsx";
import Error from "./src/components/404.jsx";
import Account from "./src/components/Account.jsx";
import DeleteNotes from "./src/components/DeleteNotes.jsx";
import Revision from "./src/components/Revision.jsx";
import AllUsers from "./src/components/AllUsers.jsx";

import { isSession } from "./src/components/Is_Session.js";

const root = createRoot(document.getElementById("app"));

let token = localStorage.getItem("access_token")

isSession(token)

let component
  switch (window.location.pathname) {
    case "/":
      component = <Index />
      break
    case "/note":
      if (token){
        component = <Note />
        break
      }else {
        component = <Login />
        break
      }
    case "/login":
      component = <Login />
      break
    case "/register":
      component = <Register />
      break
    case "/logout":
      localStorage.clear()
      component = <Index />
      break
    case "/account":
      if (token){
        component = <Account />
        break
      }else {
        component = <Login />
        break
      }
    case "/delete_notes":
      if (token){
        component = <DeleteNotes />
        break
      }else {
        component = <Login />
        break
      }
    case "/rev":
      if (token){
        component = <Revision />
        break
      }else {
        component = <Login />
        break
      }
    case "/users":
      component = <AllUsers />
      break
    default:
      component = <Error />
}
root.render(component);
