import React from 'react';
import Registration from './Pages/Registration';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Home from './Pages/Home';
import ForgotPassword from './Pages/ForgotPassword';
import Books from './Pages/Books';
import Library from './Pages/Library';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Profile from "./Pages/Profile";
import BookDetails from "./Pages/BookDetails";
import MyCartPage from './Pages/Mycart.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          <Route
            path='/lib'
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Mycart"
            element={
              <ProtectedRoute>
                <MyCartPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/books'
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />

          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <BookDetails />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
