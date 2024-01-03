import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import supabase from "../services/supabaseClient.js";

const Navbar = () => {
    const navigate = useNavigate();
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    const handleClick = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log(error)
        }

        setUserLoggedIn(false)
        navigate('/')
    }

    useEffect(() => {

        const getUser = async () => {

            const { data: { user } } = await supabase.auth.getUser()

            if (user.aud) {
                console.log(user)
                setUserLoggedIn(true)
            }
        }

        getUser()

    }, );

    return (
        <div className="container mx-auto h-[100px] flex justify-between items-center">
            <Link to="/">
                <div className="flex justify-centeR items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="white" className="w-7 h-7 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"/>
                    </svg>
                    <h2 className="text-xl font-bold tracking-tight">CODE SNIPPETS</h2>
                </div>
            </Link>
            <div className="flex justify-center items-center">
                {userLoggedIn && <Link to="/create" className="m-2 bg-indigo-700 px-6 py-2 rounded">Create Snippet</Link>}
                {/*{userLoggedIn && <Link to="/login" className="m-2 px-6 py-2 border-2 border-indigo-700 rounded">Login</Link>}*/}
                {userLoggedIn && <button onClick={handleClick} className="m-2 px-6 py-2 border-2 border-indigo-700 rounded cursor-pointer">Logout</button>}
            </div>
        </div>
    );
};

export default Navbar;
