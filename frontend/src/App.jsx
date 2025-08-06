import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();  // Runs when app starts
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to='/login' replace />;
    }
    return children;
  };

  const RedirectAuthenticatedUser = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/register',
      element: <RedirectAuthenticatedUser><Register /></RedirectAuthenticatedUser>
    },
    {
      path: '/login',
      element: <RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute><Dashboard /></ProtectedRoute>
    }
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
