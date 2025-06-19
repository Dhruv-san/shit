"use client";
import { useEffect, useState } from "react";

interface Article {
  title: string;
  description: string;  description: string;
  url: string;
}

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]); useState<Article[]>([]);

  useEffect(() => {> {
    const fetchNews = async () => { fetchNews = async () => {
      const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=YOUR_KEY`);      const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=YOUR_KEY`);
      const data = await res.json();t data = await res.json();
      setArticles(data.articles);
    };
    fetchNews();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">TechCrunch News</h1>
      <div className="space-y-6">Name="space-y-6">
        {articles.map((a, idx) => (ticles.map((a, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded">iv key={idx} className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl">{a.title}</h2>  <h2 className="text-xl">{a.title}</h2>
            <p className="text-sm text-gray-400">{a.description}</p>        <p className="text-sm text-gray-400">{a.description}</p>
            <a href={a.url} className="text-blue-400" target="_blank" rel="noopener noreferrer">Read more</a>           <a href={a.url} className="text-blue-400" target="_blank">Read more</a>
          </div>          </div>






}  );    </div>      </div>        ))}        ))}
      </div>
    </div>
  );
}
