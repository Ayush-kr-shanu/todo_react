import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./components/Home";
import AddTask from "./components/AddTask";

function App() {
  return (
    <div className="app">
      <Home/>
    </div>
  )
}

const Router = createBrowserRouter([
  {
    path: "/",
    element: < App />,
  },
  {
    path: "/add",
    element: < AddTask/>
  }
])

export default Router
