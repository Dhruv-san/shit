"use client";
import { useEffect, useState } from "react";

interface Article {
  title: string;
  description: string;
  url: string;
}

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=83a679cb473e4cf7bd58f918de5adee483a679cb473e4cf7bd58f918de5adee4`);
      const data = await res.json();
      setArticles(data.articles);
    };
    fetchNews();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">TechCrunch News</h1>
        <a
          href="https://techcrunch.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
        >
          Visit TechCrunch →
        </a>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, idx) => (
          <a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg"
          >
            <div className="p-6">
              <h2 className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                {article.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                {article.description}
              </p>
              <div className="mt-4 flex items-center text-sm text-blue-500">
                Read article
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
