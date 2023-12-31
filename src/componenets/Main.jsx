import React, { useEffect } from 'react';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import { server } from './shared/const';
import { courseDataAction } from './redux/courseDataSlice';
import { useDispatch } from 'react-redux';


const Main = () => {


    return (
        <main>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </main>
    );
};

export default Main;