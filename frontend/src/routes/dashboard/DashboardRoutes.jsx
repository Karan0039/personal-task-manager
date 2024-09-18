import {Route} from 'react-router-dom';
import PrivateRoute from '../private/PrivateRoute';
import FrameWrapper from '../../components/FrameWrapper';
import MyDay from '../../components/Dashboard/MyDay';
import Planned from '../../components/Dashboard/Planned';
import Important from '../../components/Dashboard/Important';
import Tasks from '../../components/Dashboard/Task';

export const DashboardRoutes = (
  <>
    <Route
      path="/"
      element={
        <PrivateRoute>
          <FrameWrapper>
            <MyDay />
          </FrameWrapper>
        </PrivateRoute>
      }
    />
    <Route
      path="/my-day"
      element={
        <PrivateRoute>
          <FrameWrapper>
            <MyDay />
          </FrameWrapper>
        </PrivateRoute>
      }
    />
    <Route
      path="/planned"
      element={
        <PrivateRoute>
          <FrameWrapper>
            <Planned />
          </FrameWrapper>
        </PrivateRoute>
      }
    />
    <Route
      path="/important"
      element={
        <PrivateRoute>
          <FrameWrapper>
            <Important />
          </FrameWrapper>
        </PrivateRoute>
      }
    />
    <Route
      path="/tasks"
      element={
        <PrivateRoute>
          <FrameWrapper>
            <Tasks />
          </FrameWrapper>
        </PrivateRoute>
      }
    />
  </>
);
