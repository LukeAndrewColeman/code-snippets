import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search?q=${searchTerm}`)
    }

    return (
        <div className='container mx-auto'>
            <form onSubmit={handleSubmit} className="max-w-xl flex flex-col mx-auto">
                <div className="mt-10">
                    <label htmlFor="search"
                           className="mb-4 font-medium text-gray-900 dark:text-white text-center hidden">Search For a
                        Code Snippets</label>
                    <input type="text"
                           placeholder="Search for a code snippet"
                           id="serach"
                           className="bg-[#2C2C2C] text-gray-400 rounded-lg block w-full p-2.5 "
                           required
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="mt-6 bg-indigo-700 px-6 py-2 rounded">Search</button>
            </form>
        </div>
    );
};

export default Search