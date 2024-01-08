import React, {useEffect, useState} from 'react';
import SnippetCard from "../components/SnippetCard.jsx";
import Search from "../components/Search.jsx";
import supabase from "../services/supabaseClient.js";
import AOS from 'aos'
import "aos/dist/aos.css"


const HomePage = () => {
    const [fetchError, setFetchError] = useState(null)
    const [snippets, setSnippets] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    const handleAll = async () => {
        const {data, error} = await supabase
            .from('snippets')
            .select()

        if (error) {
            setFetchError('Could not fetch snippets')
            setSnippets(null)
            console.log(error)
        }

        if (data) {
            setSnippets(data)
            setFetchError(null)
        }
    }

    const handleWpBakery = async () => {
        const {data, error} = await supabase
            .from('snippets')
            .select()
            .eq('language', 'WP Bakery')

        if (error) {
            setFetchError('Could not fetch snippets')
            setSnippets(null)
            console.log(error)
        }

        if (data) {
            setSnippets(data)
            setFetchError(null)
        }
    }

    const handleWordpress = async () => {
        const {data, error} = await supabase
            .from('snippets')
            .select()
            .eq('language', 'WordPress')

        if (error) {
            setFetchError('Could not fetch snippets')
            setSnippets(null)
            console.log(error)
        }

        if (data) {
            setSnippets(data)
            setFetchError(null)
        }
    }

    const handleJavascript = async () => {
        const {data, error} = await supabase
            .from('snippets')
            .select()
            .eq('language', 'JavaScript')

        if (error) {
            setFetchError('Could not fetch snippets')
            setSnippets(null)
            console.log(error)
        }

        if (data) {
            setSnippets(data)
            setFetchError(null)
        }
    }

    const handlePHP = async () => {
        const {data, error} = await supabase
            .from('snippets')
            .select()
            .eq('language', 'PHP')

        if (error) {
            setFetchError('Could not fetch snippets')
            setSnippets(null)
            console.log(error)
        }

        if (data) {
            setSnippets(data)
            setFetchError(null)
        }
    }

    const handleCSS = async () => {
        const {data, error} = await supabase
            .from('snippets')
            .select()
            .eq('language', 'CSS')

        if (error) {
            setFetchError('Could not fetch snippets')
            setSnippets(null)
            console.log(error)
        }

        if (data) {
            setSnippets(data)
            setFetchError(null)
        }
    }

    const handleHTML = async () => {
        const {data, error} = await supabase
            .from('snippets')
            .select()
            .eq('language', 'HTML')

        if (error) {
            setFetchError('Could not fetch snippets')
            setSnippets(null)
            console.log(error)
        }

        if (data) {
            setSnippets(data)
            setFetchError(null)
        }
    }

    useEffect(() => {
        const fetchSnippets = async () => {
            const {data, error} = await supabase
                .from('snippets')
                .select()
                .order('id', { ascending: false })

            if (error) {
                setFetchError('Could not fetch snippets')
                setSnippets(null)
                console.log(error)
            }

            if (data) {
                setSnippets(data)
                setFetchError(null)
            }
        }

    fetchSnippets()

        const getUser = async () => {

            const { data: { user } } = await supabase.auth.getUser()

            if (user.aud) {
                console.log(user)
                setUserLoggedIn(true)
            }
        }

        getUser()

        AOS.init();

    }, []);

    return (
        <div className="container mx-auto">
            <Search/>
            <div className="mt-12 container mx-auto">
                <button data-aos="fade-right" data-aos-delay="300" onClick={handleAll} className="bg-indigo-700 px-3 py-1 rounded text-sm mr-2 mt-4 font-bold">All</button>
                <button data-aos="fade-right" data-aos-delay="400" onClick={handleWpBakery} className="bg-[#3F447B] px-3 py-1 rounded text-sm mr-2 mt-4 font-bold">WP Bakery</button>
                <button data-aos="fade-right" data-aos-delay="500" onClick={handleWordpress} className="bg-[#3759E9] px-3 py-1 rounded text-sm mr-2 mt-4 font-bold">WordPress</button>
                <button data-aos="fade-right" data-aos-delay="600" onClick={handleJavascript} className="bg-[#468A44] px-3 py-1 rounded text-sm mr-2 mt-4 font-bold">JavaScript</button>
                <button data-aos="fade-right" data-aos-delay="700" onClick={handlePHP} className="bg-[#7A86B8] px-3 py-1 rounded text-sm mr-2 mt-4 font-bold">PHP</button>
                <button data-aos="fade-right" data-aos-delay="800" onClick={handleCSS} className="bg-[#2377B9] px-3 py-1 rounded text-sm mr-2 mt-4 font-bold">CSS</button>
                <button data-aos="fade-right" data-aos-delay="900"onClick={handleHTML} className="bg-[#F26C33] px-3 py-1 rounded text-sm mr-2 mt-4 font-bold">HTML</button>
            </div>

            <div className="justify-center grid grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto mt-20">
                    {fetchError && (<p>{fetchError}</p>)}
                    {snippets && snippets.map(snippet => (
                        <SnippetCard key={snippet.id} snippet={snippet}/>
                    ))}
                </div>

            {!userLoggedIn && <h3 className="text-xl font-bold">Please login to see code snippets</h3>}
        </div>
    );
};

export default HomePage;


