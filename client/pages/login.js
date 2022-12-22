import LandingHeader from '../components/layout/LandingHeader';
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../context';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';


export default function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);

    const {state, dispatch} = useContext(Context);
    const {user} = state;
    const router = useRouter();

    // useEffect(()=>{
    //     if(user !== null) router.push('/')
    // },[user]);
    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            setLoading(true);
            const { data } = await axios.post(`http://localhost:8000/api/users/login`,{ email,password });

            dispatch({
                type : "LOGIN",
                payload: data.user
            });
            window.localStorage.setItem("user", JSON.stringify(data.user));
            window.localStorage.setItem("token", JSON.stringify(data.access_token));
            setLoading(false);
            router.push('/user/home');

        } catch (err) {
            if(err.response.data.error){
                toast.error(err.response.data.error);
            }
            if (JSON.parse(JSON.stringify(err.response.data)).email){
                toast.error(JSON.parse(JSON.stringify(err.response.data)).email[0]);
            }
            if (JSON.parse(JSON.stringify(err.response.data)).name){
                toast.error(JSON.parse(JSON.stringify(err.response.data)).name[0]);
            }
            if (JSON.parse(JSON.stringify(err.response.data)).password){
                toast.error(JSON.parse(JSON.stringify(err.response.data)).password[0]);
            }
            setLoading(false);

        }
    };
  return (
    <>
       <LandingHeader />
       <section className="grid grid-cols-12 gap-0 lg:grid-cols-12">
            <div className="w-full col-span-12 p-4 mx-auto mt-6 lg:col-span-12 xl:p-12 md:w-2/6">
                
                <h1 className="mt-4 mb-4 text-xl font-light text-left text-gray-900">Log in to your account</h1>
                <form onSubmit={handleSubmit} className="pb-1 space-y-4">
                    <label className="block">
                        <span className="block mb-1 text-sm font-medium text-gray-600">Your Email</span>
                        <input 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
                            className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800  border-2" 
                            type="email" 
                            placeholder="Ex. james@gmail.com" 
                            inputMode="email" 
                            required />
                    </label>
                    <label className="block">
                        <span className="block mb-1 text-sm font-medium text-gray-600">Your Password</span> 
                        <input 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                            className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-gray-800 border-2" 
                            type="password" 
                            placeholder="*********************" 
                            required />   
                    </label>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox" />
                        <span className="block ml-2 text-sm font-medium text-gray-600 cursor-pointer">Remember me</span>
                    </label>
                    <button 
                        type="submit" 
                        disabled={ !email || !password || loading}
                        className="bg-red-600 text-white font-bold text-md rounded p-2 disabled:bg-red-400 ">
                        {loading ? <ArrowPathIcon className="w-6 h-6" /> : " Login"}
                    </button>
                    {/* <button type="submit" className="  " >Login</button> */}
                    </div>
                </form>
                <div className="my-6 space-y-2">
                <p className="text-xs text-gray-600">
                    Don't have an account?
                    <Link href="/register" className="text-red-600 hover:text-black">Create an account</Link>
                </p>
                <a href="#" className="block text-xs text-red-600 hover:text-black">Forgot password?</a>
                </div>
            </div>
        </section>
  
        
        </>
    
  )
}
