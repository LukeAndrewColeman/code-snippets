import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import supabase from "../services/supabaseClient.js";
import SnippetCard from "../components/SnippetCard.jsx";

const SearchPage = () => {
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q')
    const [snippets, setSnippets] = useState('')

    useEffect(() => {
        const fetchSearch = async () => {
            const {data, error} = await supabase
                .from('snippets')
                .select()
                .textSearch('title', `${query}`, {type:"websearch", config:'english'})

            if (error) {
                setSnippets(null)
                console.log(error)
            }

            if (data) {
                setSnippets(data)
                console.log(data)
            }
        }

        fetchSearch()

    }, [query]);

    console.log(snippets)

    return (
        <div className="container mx-auto mt-20">
            <h1 className='text-2xl font-bold mb-10'>You searched for "{query}"</h1>
            <div className="justify-center grid grid-cols-4 gap-6 ">
                {snippets && snippets.map(snippet => (
                    <SnippetCard key={snippet.id} snippet={snippet}/>
                ))}
                {!snippets && (<p>Sorry no snippets match that search</p>)}
            </div>
        </div>

    );
};

export default SearchPage;
