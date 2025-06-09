const NEWS_API_KEY = '83a679cb473e4cf7bd58f918de5adee4';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsErrorResponse {
  status: 'error';
  code: string;
  message?: string;
  error?: {
    message: string;
  };
}

export type NewsCategory = 
  | 'technology' 
  | 'business' 
  | 'startup' 
  | 'ai' 
  | 'finance' 
  | 'venture-capital' 
  | 'entrepreneurship';

// Cache news results for 5 minutes to avoid rate limits
const newsCache = new Map<string, { data: NewsResponse; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const fetchNews = async (categories: NewsCategory[] = ['technology']) => {
  // Create a cache key from sorted categories to ensure consistent caching
  const cacheKey = [...categories].sort().join(',');
  const now = Date.now();
  
  // Check cache first
  const cached = newsCache.get(cacheKey);
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }

  const queries = categories.map(cat => {
    let q = '';
    switch (cat) {
      case 'startup':
        q = 'startup OR "start-up" OR startups';
        break;
      case 'ai':
        q = 'artificial intelligence OR AI OR machine learning';
        break;
      case 'venture-capital':
        q = 'venture capital OR VC funding OR seed funding';
        break;
      case 'entrepreneurship':
        q = 'entrepreneur OR entrepreneurship OR founder';
        break;
      default:
        q = cat;
    }
    return q;
  });

  const queryString = queries.join(' OR ');
  const url = `${NEWS_API_BASE_URL}/everything?q=${encodeURIComponent(queryString)}&language=en&sortBy=publishedAt&pageSize=30&apiKey=${NEWS_API_KEY}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Cofindr/1.0',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`News API error: ${response.status} ${response.statusText}`);
    }

    const data: NewsResponse = await response.json();
    
    if (data.status === 'error') {
      const errorMessage = data.message || data.error?.message || 'News API returned an error';
      throw new Error(errorMessage);
    }

    // Cache the successful response
    newsCache.set(cacheKey, { data, timestamp: Date.now() });

    return data;
  } catch (error: any) {
    // If we have cached data and encounter an error, return cached data
    const cached = newsCache.get(cacheKey);
    if (cached) {
      console.warn('Using cached news data due to API error');
      return cached.data;
    }

    if (error.name === 'AbortError') {
      throw new Error('News API request timed out. Please try again.');
    }
    
    // Log the full error for debugging
    console.error('Error fetching news:', {
      error,
      categories,
      url: error.config?.url || 'URL not available',
      status: error.response?.status || 'Status not available',
    });

    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to fetch news. Please try again later.'
    );
  }
};
