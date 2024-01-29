import React, {useState} from 'react';
import supabase from "../services/supabaseClient.js";
import {useNavigate} from "react-router-dom";

const CreatePage = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [language, setLanguage] = useState('')
    const [codeSnippet, setCodeSnippet] = useState('')
    const [formError, setFormError] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !description || !language || !codeSnippet ) {
            setFormError('Please fill all fields in the form')
            return
        }

       const {data, error} = await supabase
           .from('snippets')
           .insert([{title, description, language, codeSnippet}])
           .select()

        if (error) {
            console.log(error)
            setFormError('Please fill all fields in the form')
        }

        if (data) {
            console.log(data)
            setFormError(null)
            setTitle('')
            setDescription('')
            setLanguage('')
            setCodeSnippet('')
            navigate('/snippets')
        }
    }

    return (
        <div className="container mx-auto mt-6">
            <h1 className="text-center text-2xl text-indigo-500 font-bold">Create a New Code Snippet</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6 bg-[#1E1E1E]] p-10 rounded-xl">
                <div className="flex flex-col w-[80%]">
                    <label htmlFor="title" className="mb-2 font-bold text-gray-900 dark:text-white text-center">Title</label>
                    <input type="text" id="title" name="title"
                           className="bg-[#2C2C2C]  text-gray-400 rounded-lg block w-full p-2.5 "
                           required
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-[80%] mt-6">
                    <label htmlFor="description" className="mb-2 font-bold text-gray-900 dark:text-white text-center">Description</label>
                    <input type="text" id="description" name="description"
                           className="bg-[#2C2C2C] text-gray-400 rounded-lg block w-full p-2.5 "
                           required
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-[80%] mt-6">
                    <label htmlFor="language"
                           className="mb-2 font-bold text-gray-900 dark:text-white text-center">Tag</label>
                    <select name="language" id="language"  className="bg-[#2C2C2C] text-gray-400 rounded-lg block w-full p-2.5"
                            required
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}>
                        <option value="">-- Please choose an language --</option>
                        <option value="Wp Bakery">Wp Bakery</option>
                        <option value="WordPress">WordPress</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="SQL">SQL</option>
                        <option value="PHP">PHP</option>
                        <option value="CSS">CSS</option>
                        <option value="HTML">HTML</option>
                    </select>
                </div>
                <div className="flex flex-col w-[80%] mt-6">
                    <label htmlFor="codeSnippet" className="mb-4 font-bold text-gray-900 dark:text-white text-center">Code
                        Snippet</label>
                    <textarea id="codeSnippet" name="codeSnippet" rows="15" cols="33"
                              className="bg-[#2C2C2C]  text-gray-400 rounded-lg block w-full p-2.5 "
                              required
                              value={codeSnippet}
                              onChange={(e) => setCodeSnippet(e.target.value)}
                    />
                </div>
                <button className="mt-6 bg-indigo-700 px-6 py-2 rounded">Submit Code Snippet</button>

                {formError && <p className="text-red-500">{formError}</p>}
            </form>
        </div>
    );
};

export default CreatePage;
