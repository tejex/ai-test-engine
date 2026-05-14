import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import App from './pages/App.tsx'
import Test from "./pages/Test.tsx"
import ResultsView from "./pages/ResultsView.tsx"
import Results from "./pages/Results.tsx"
import AppLayout from "./components/AppLayout.tsx"
import { ThemeModeProvider } from "./styles/ThemeModeProvider.tsx"

const router = createBrowserRouter([
  {
    element: (
      <ThemeModeProvider>
        <AppLayout />
      </ThemeModeProvider>
    ),
    children: [
      { path: "/", element: <App /> },
      { path: "/tests/:id", element: <Test /> },
      { path: "/results", element: <Results /> },
      { path: "/results/:attemptId", element: <ResultsView /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
)
