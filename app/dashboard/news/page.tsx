"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/Card";
import { FilterButton } from "@/components/ui/FilterButton";
import { fetchNews, type NewsArticle, type NewsCategory } from "@/lib/newsapi";

const NEWS_CATEGORIES: { id: NewsCategory; label: string; emoji: string }[] = [
  { id: 'technology', label: 'Tech', emoji: '💻' },
  { id: 'business', label: 'Business', emoji: '💼' },
  { id: 'startup', label: 'Startups', emoji: '🚀' },
  { id: 'ai', label: 'AI', emoji: '🤖' },
  { id: 'finance', label: 'Finance', emoji: '💰' },
  { id: 'venture-capital', label: 'VC', emoji: '💎' },
  { id: 'entrepreneurship', label: 'Founders', emoji: '👥' },
];

export default function NewsFeedPage() {
  const [selectedCategories, setSelectedCategories] = useState<NewsCategory[]>(['technology', 'startup']);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleCategory = (category: NewsCategory) => {
    setSelectedCategories(prev => {
      const isSelected = prev.includes(category);
      if (isSelected && prev.length > 1) {
        // Remove category if it's not the last one
        return prev.filter(c => c !== category);
      } else if (!isSelected) {
        // Add category
        return [...prev, category];
      }
      return prev;
    });
  };

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchNews(selectedCategories);
        setArticles(response.articles);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [selectedCategories]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] p-6">
        <div className="text-red-500 text-center">
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => setSelectedCategories(['technology', 'startup'])}
            className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-white">Startup News</h1>
        <p className="text-blue-200">Select multiple categories to filter news</p>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {NEWS_CATEGORIES.map(category => (
            <FilterButton
              key={category.id}
              active={selectedCategories.includes(category.id)}
              onClick={() => toggleCategory(category.id)}
            >
              {category.emoji} {category.label}
            </FilterButton>
          ))}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Card 
            key={article.url} 
            className="transform transition-all hover:scale-[1.02] overflow-hidden flex flex-col h-full"
          >
            {article.urlToImage && (
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-blue-900/20">
                <img 
                  src={article.urlToImage} 
                  alt={article.title}
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className="flex flex-col flex-grow p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="px-3 py-1 bg-blue-900/30 rounded-full text-sm text-blue-200">
                  {article.source.name}
                </span>
                <span className="text-sm text-gray-400">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white line-clamp-2 hover:line-clamp-none">
                {article.title}
              </h3>
              <p className="text-blue-200 mb-4 line-clamp-3 hover:line-clamp-none">
                {article.description}
              </p>
              <div className="mt-auto pt-4 border-t border-blue-900/30">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  Read more
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
