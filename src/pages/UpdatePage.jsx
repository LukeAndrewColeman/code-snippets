import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import supabase from "../services/supabaseClient.js";

const UpdatePage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [language, setLanguage] = useState('')
    const [codeSnippet, setCodeSnippet] = useState('')
    const [formError, setFormError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !description || !language || !codeSnippet ) {
            setFormError('Please fill all fields in the form')
            return
        }

        const {data, error} = await supabase
            .from('snippets')
            .update({title, description, language,codeSnippet})
            .eq('id', id)
            .select()

        if (error) {
            setFormError('Please fill all fields in the form')
            console.log(error)
        }

        if (data) {
            setFormError(null)
            console.log(data)
            navigate('/')
        }

    }

    useEffect(() => {
        const fetchCodeSnippet = async () => {
            const {data, error} = await supabase
                .from('snippets')
                .select()
                .eq('id', id)
                .single()

            if (error) {
                navigate('/snippets', {replace: true})
            }

            if (data) {
                setTitle(data.title)
                setDescription(data.description)
                setLanguage(data.language)
                setCodeSnippet(data.codeSnippet)
                console.log(data)
            }
        }

        fetchCodeSnippet()
    }, [id, navigate]);

    return (
        <div className="container mx-auto mt-6">
            <h1 className="text-center text-2xl text-indigo-500 font-bold">Update Code Snippet</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6 bg-[#1E1E1E] p-10 rounded-xl">
                <div className="flex flex-col w-[800px]">
                    <label htmlFor="title"
                           className="mb-2 font-bold text-gray-900 dark:text-white text-center">Title</label>
                    <input type="text" id="title" name="title"
                           className="bg-[#2C2C2C]  text-gray-400 rounded-lg block w-full p-2.5 "
                           required
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-[800px] mt-6">
                    <label htmlFor="description"
                           className="mb-2 font-bold text-gray-900 dark:text-white text-center">Description</label>
                    <input type="text" id="description" name="description"
                           className="bg-[#2C2C2C] text-gray-400 rounded-lg block w-full p-2.5 "
                           required
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-[800px] mt-6">
                    <label htmlFor="language"
                           className="mb-2 font-bold text-gray-900 dark:text-white text-center">Tag</label>
                    <input type="text" id="language" name="language"
                           className="bg-[#2C2C2C]  text-gray-400 rounded-lg block w-full p-2.5 "
                           required
                           value={language}
                           onChange={(e) => setLanguage(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-[800px] mt-6">
                    <label htmlFor="codeSnippet" className="mb-4 font-bold text-gray-900 dark:text-white text-center">Code
                        Snippet</label>
                    <textarea id="codeSnippet" name="codeSnippet" rows="30" cols="33"
                              className="bg-[#2C2C2C]  text-gray-400 rounded-lg block w-full p-2.5 "
                              required
                              value={codeSnippet}
                              onChange={(e) => setCodeSnippet(e.target.value)}
                    />
                </div>
                <button className="mt-6 bg-indigo-700 px-6 py-2 rounded">Update Code Snippet</button>

                {formError && <p className="text-red-500">{formError}</p>}
            </form>
        </div>
    );
};

export default UpdatePage;
