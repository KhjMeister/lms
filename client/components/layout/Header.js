import { Bars3Icon } from '@heroicons/react/24/solid';
import { Context } from '../../context';
import { toast }  from 'react-toastify';
import React, { useEffect,useContext } from 'react';
import { useRouter } from 'next/router';
import Notifications from './header/Notifications';
import SearchBox from './header/SearchBox';
import axios from 'axios';


const Header = ({mobileNavsidebar, setMobileNavsidebar}) => {
  const {state,dispatch} = useContext(Context);
  const router = useRouter();

  const logout = async () =>{
    dispatch({type:"LOGOUT"});
    const token = JSON.parse(window.localStorage.getItem('token'));
    const { data } = await axios.get(`http://localhost:8000/api/users/logout`,{ headers: {"Authorization" : `Bearer ${token}`} });
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    router.push('/login');
    toast('Logout success!');
  }

  return (
    <header className="flex items-center px-6 sm:px-10 bg-white ">
        
        <Bars3Icon className='h-12 stroke-slate-600 cursor-pointer sm:hidden' onClick={()=>setMobileNavsidebar(!mobileNavsidebar)}/>
        <SearchBox />
        
        <div className="flex flex-shrink-0 items-center ml-auto">
          <div className="border-l pl-3 ml-3 space-x-1">
            <Notifications />

            <button onClick={logout} className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
              <span className="sr-only">Log out</span>
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>
  );
};

export default Header;