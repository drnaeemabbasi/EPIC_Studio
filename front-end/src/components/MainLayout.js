import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../header/sidebar';
import Header from '../header/header';
import Bottom from '../header/bottom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col justify-start items-center w-full min-h-screen bg-slate-50 pb-12">
          <Header />
          <main className="w-full flex-1">
            <Outlet />
          </main>
          <Bottom />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MainLayout;
