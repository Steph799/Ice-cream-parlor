import React, { useState } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './redux/store';
import MyNavBar from './components/MyNavBar';
import Contact from './components/utils/Contact';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import AboutUs from './components/pages/AboutUs';
import AdminForm from './components/pages/AdminForm';
import Products from './components/pages/Products';
import BuyForm from './components/pages/BuyForm';
import Footer from './components/utils/Footer';
import NotFound from './components/NotFound';
import Delivery from './components/pages/Delivery';
import ReviewOrder from './components/ReviewOrder';
import CreateComment from './components/pages/CreateComment';
import Comments from './components/pages/Comments';
import Employees from './components/pages/employees/Employees';
import EmployeeForm from './components/pages/employees/EmployeeForm';
import EmployeeDetails from './components/pages/employees/EmployeeDetails';


function App() {
  const [pathname, setPathname] = useState(window.location.pathname)

  return (
    <Provider store={store}>
      <BrowserRouter>
        <MyNavBar setPathname={setPathname} />
        <Routes>
          <Route path='/' element={<Navigate to="homepage" />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/Adminidentification' element={<AdminForm />} />
          <Route path='/products/*' element={<Products />} />
          <Route path='/deliveries/*' element={<Delivery />} />
          <Route path='/payment/:weight/:flavors/:price/:time/*' element={<BuyForm />} />
          <Route path='/revieworder/:weight/:flavors/:time' element={<ReviewOrder />} />
          <Route path='/comments' element={<Comments />} />
          <Route path='/yourcomment' element={<CreateComment />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/employees/:id' element={<EmployeeDetails />} />
          <Route path='/employeeform' element={<EmployeeForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <div className="bottom">
        <Contact />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
