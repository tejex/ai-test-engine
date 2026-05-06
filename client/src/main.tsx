import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './pages/App.tsx'
import Test from "./pages/Test.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/tests/:id", element: <Test /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);