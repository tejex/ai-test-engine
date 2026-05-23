import { lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import AppLayout from "./components/AppLayout.tsx"
import RouteLoadingFallback from "./components/layout/RouteLoadingFallback.tsx"
import { ThemeModeProvider } from "./styles/ThemeModeProvider.tsx"

const HomePage = lazy(() => import("./pages/HomePage.tsx"))
const TestPage = lazy(() => import("./pages/TestPage.tsx"))
const ResultsPage = lazy(() => import("./pages/ResultsPage.tsx"))
const ResultDetailPage = lazy(() => import("./pages/ResultDetailPage.tsx"))

const router = createBrowserRouter([
  {
    element: (
      <ThemeModeProvider>
        <Suspense fallback={<RouteLoadingFallback />}>
          <AppLayout />
        </Suspense>
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
