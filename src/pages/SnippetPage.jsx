import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import supabase from '../services/supabaseClient.js';

const SnippetPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [copyNotification, setCopyNotification] = useState(false);

    const codeRef = useRef(null);

    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('snippets')
            .delete()
            .eq('id', data.id)
            .select();

        if (error) {
            console.log(error);
        }

        if (data) {
            console.log(data);
            navigate('/', { replace: true });
        }
    };

    const handleCopyClick = () => {
        const codeSnippet = data.codeSnippet;
        const textarea = document.createElement('textarea');
        textarea.value = codeSnippet;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        // Show notification
        setCopyNotification(true);

        // Hide notification after 2 seconds
        setTimeout(() => {
            setCopyNotification(false);
        }, 2000);
    };

    useEffect(() => {
        const fetchCodeSnippet = async () => {
            const { data, error } = await supabase
                .from('snippets')
                .select()
                .eq('id', id)
                .single();

            if (error) {
                navigate('/', { replace: true });
            }

            if (data) {
                setData(data);
            }
        };

        fetchCodeSnippet();
    }, [id, navigate]);

    return (
        <div className="container mx-auto mt-12 flex justify-center">
            {data && (
                <div className="p-10 rounded-lg shadow bg-[#2C2C2C] flex flex-col items-center">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-500">{data.title}</h5>
                    <p className="font-normal text-gray-400">{data.description}</p>
                    <pre ref={codeRef} className="mt-4 text-sm bg-[#1E1E1E] p-6 rounded-xl">
                        <code className="text-white">{data.codeSnippet}</code>
                    </pre>
                    <div className="flex gap-3 mt-4">
                        <p className="text-sm py-1 px-2 bg-indigo-500 rounded font-bold">{data.language}</p>

                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Link to={'/' + data.id}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 hover:text-indigo-500"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                            </svg>
                        </Link>
                        <button onClick={handleCopyClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6 hover:text-indigo-500">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/>
                            </svg>
                        </button>
                        <button onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6 hover:text-indigo-500">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                            </svg>
                        </button>
                        <Link to={'/snippets'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6 hover:text-indigo-500">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>
                            </svg>
                        </Link>
                    </div>
                    {copyNotification && (
                        <div className="text-indigo-500 mt-6">Copied code!</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SnippetPage;
