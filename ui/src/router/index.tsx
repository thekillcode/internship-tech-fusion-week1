import { AdminLayout, AuthLayout, MainLayout } from "@/layouts";
import { Home as Dashboard, MailSettingPage, PosCategoriesPage } from "@/pages/admin";
import { ForgotPassword, LoginPage, RegisterPage } from "@/pages/auth";
import { fetchUser, getUser, isLoggedIn } from "@/store/authSlice";
import { setLoader } from "@/store/generalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Cookies from "js-cookie";
import { Navigate, useNavigate, useRoutes, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ResetPassword from "@/pages/auth/ResetPassword";
import { ProfilePage } from "@/pages/user";
import { HomePage } from "@/pages/frontend";

const Router = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authCheck = useAppSelector(isLoggedIn);
  const user = useAppSelector(getUser);
  const token = Cookies.get("token");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token && !authCheck) {
        try {
          dispatch(setLoader(true));
          await dispatch(fetchUser()).unwrap();
        } catch (error: any) {
          if (error.response?.status === 401) {
            toast.error('Session expired. Please login again.');
          } else {
            toast.error('Failed to fetch user data');
          }
          Cookies.remove('token');
          navigate('/');
        } finally {
          dispatch(setLoader(false));
          setIsCheckingAuth(false);
        }
      } else {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [token, authCheck, dispatch, navigate]);

  const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
    if (isCheckingAuth) {
      return null; // or return a loading spinner
    }

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    if (!authCheck) {
      return null; // or return a loading spinner
    }
    if (user?.role !== 'admin') {
      toast.error('Permission denied. Admin access required.', {
        toastId: "permission_denied"
      });
      return <Navigate to="/" replace />;
    }

    return children;
  };

  const GuestRoute = ({ children }: { children: React.JSX.Element }) => {
    if (isCheckingAuth) {
      return null; // or return a loading spinner
    }

    if (token && authCheck) {
      return <Navigate to="/" replace />;
    }

    return children;
  };


  const ResetRoute = ({ children }: { children: React.JSX.Element }) => {
    const [searchParams] = useSearchParams();
    const urlToken = searchParams.get('token');
    if (isCheckingAuth) {
      return null; // or return a loading spinner
    }

    if (token && authCheck) {
      return <Navigate to="/" replace />;
    }

    if (!urlToken) {
      return <Navigate to="/login" replace state={{ from: '/reset-password' }} />;
    }
    return children;
  };
  const routes = [
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "categories",
          element: <PosCategoriesPage />
        },
        {
          path: "mail-settings",
          element: <MailSettingPage />
        },
        {
          path: "profile",
          element: <ProfilePage />
        }
      ]
    },
    {
      path: "/",
      element: (
        <MainLayout />
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        }
      ]
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: (
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          )
        },
        {
          path: "/register",
          element: (
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          )
        },
        {
          path: "/forgot-password",
          element: (
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          )
        },
        {
          path: "/reset-password",
          element: (
            <ResetRoute>
              <ResetPassword />
            </ResetRoute>
          )
        }
      ]
    },
    {
      path: "*",
      element: token ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
    }
  ];

  return useRoutes(routes);
}

export default Router;