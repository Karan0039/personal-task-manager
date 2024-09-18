import {Route} from 'react-router-dom';
import SignUp from '../../components/userManagement/Signup';
import PublicRoute from '../public/PublicRoute';
import SignIn from '../../components/userManagement/SignIn';
import VerifyOtp from '../../components/userManagement/VerifyOTP';
import ForgotPassword from '../../components/userManagement/ForgotPassword';

export const AuthRoutes = (
  <>
    <Route
      path="/sign-up"
      element={
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      }
    />
    <Route
      path="/sign-in"
      element={
        <PublicRoute>
          <SignIn />
        </PublicRoute>
      }
    />
    <Route
      path="/verify-otp"
      element={
        <PublicRoute>
          <VerifyOtp />
        </PublicRoute>
      }
    />
    <Route
      path="/forgot-password"
      element={
        <PublicRoute>
          <ForgotPassword />
        </PublicRoute>
      }
    />
  </>
);
