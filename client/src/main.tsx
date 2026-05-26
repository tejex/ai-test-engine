import { lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'
import AppLayout from "./components/AppLayout.tsx"
import RouteLoadingFallback from "./components/layout/RouteLoadingFallback.tsx"
import { ThemeModeProvider } from "./styles/ThemeModeProvider.tsx"

const DashboardPage = lazy(() => import("./pages/DashboardPage.tsx"))
const UploadNotesPage = lazy(() => import("./pages/UploadNotesPage.tsx"))
const MissedPracticePage = lazy(() => import("./pages/MissedPracticePage.tsx"))
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
      { path: "/", element: <DashboardPage /> },
      { path: "/upload", element: <UploadNotesPage /> },
      { path: "/practice/missed", element: <MissedPracticePage /> },
      { path: "/tests/:id", element: <TestPage /> },
      { path: "/results", element: <ResultsPage /> },
      { path: "/results/:attemptId", element: <ResultDetailPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
)
