import React, {useState, use, useEffect} from 'react';
import supabase from "../services/supabaseClient.js";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            setFormError('Sorry you could not be logged in')
            console.log(error)
        }

        if (data) {
            console.log(data.user.aud)
            setEmail('')
            setPassword('')
            navigate('/snippets')
        }
    }

    return (
        <div className="container mx-auto">
            <div className="container mx-auto mt-6">
                <h1 className="text-center text-2xl text-indigo-500 font-bold">Please Log in Below</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6 bg-[#1E1E1E]] p-10 rounded-xl">
                    <div className="flex flex-col w-[800px]">
                        <label htmlFor="email"
                               className="mb-2 font-bold text-gray-900 dark:text-white text-center">Email</label>
                        <input type="email" id="email" name="email"
                               className="!bg-[#2C2C2C]  text-gray-400 rounded-lg block w-full p-2.5 "
                               required
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-[800px] mt-6">
                        <label htmlFor="password"
                               className="mb-2 font-bold text-gray-900 dark:text-white text-center">Password</label>
                        <input type="password" id="password" name="password"
                               className="!bg-[#2C2C2C] text-gray-400 rounded-lg block w-full p-2.5 "
                               required
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="mt-6 bg-indigo-700 px-6 py-2 rounded">Login</button>
                    {formError && <p className="text-red-500 mt-4">{formError}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
