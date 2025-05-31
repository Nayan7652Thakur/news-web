import React, {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apiKey = import.meta.env.VITE_NEWS_API;

export default function NewsBox() {
    const { category } = useParams();
    console.log(category);
     

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const res = await fetch(
                `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=bce4082fa10f4d75aa44b0a0595c5998`
            );
            const data = await res.json();
            setArticles(data.articles);
            setLoading(false)
        };

        fetchData();
    }, [category]);

    return (

        <div className="p-6">

            <h1 className="text-3xl font-bold capitalize mb-6">Daily Top {category} News</h1>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative w-16 h-16">
                        {/* Outer ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-red-600 animate-spin" />

                        {/* Inner dot */}
                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-600 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping" />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {articles?.map((article, index) => (
                    <div key={index} className="border rounded p-4 shadow">
                        {article.urlToImage && (
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-full h-48 object-cover rounded mb-4"
                            />
                        )}
                        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                        <p className="text-sm text-gray-600">{article.description}</p>
                        <a
                            href={article.url}
                            target="_blank"
                            className="text-blue-600 underline mt-2 inline-block"
                        >
                            Read More →
                        </a>
                    </div>
                ))}
            </div>

        </div>
    );
}
