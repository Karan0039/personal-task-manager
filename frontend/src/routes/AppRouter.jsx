import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthRoutes} from './auth/AuthRoutes';
import {AuthProvider} from '../context/auth';
import {DashboardRoutes} from './dashboard/DashboardRoutes';
import PageNotFound from '../components/PageNotFound';
import {ChakraProvider} from '@chakra-ui/react';
const AppRouter = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <Routes>
            {AuthRoutes}
            {DashboardRoutes}
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
