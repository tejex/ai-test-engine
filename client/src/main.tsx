import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import HomePage from './pages/HomePage.tsx'
import TestPage from "./pages/TestPage.tsx"
import ResultDetailPage from "./pages/ResultDetailPage.tsx"
import ResultsPage from "./pages/ResultsPage.tsx"
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
      { path: "/", element: <HomePage /> },
      { path: "/tests/:id", element: <TestPage /> },
      { path: "/results", element: <ResultsPage /> },
      { path: "/results/:attemptId", element: <ResultDetailPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
)
