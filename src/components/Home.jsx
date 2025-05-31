import React, { useEffect, useState } from "react";


const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=e258af100c3c41d09fffbd1b2632d8d9'
      );
      const data = await res.json();

      if (data.status === "ok") {
        setNews(data.articles);
        setError(null);
      } else {
        setError("Failed to fetch news.");
      }
    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Get Daily Top News</h1>

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

        {news.map((article, index) => (
          <div
            key={index}
            className="border rounded shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-700 mb-2">
                {article.description?.substring(0, 120)}...
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
