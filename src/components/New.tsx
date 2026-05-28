import React, { useState, useEffect } from 'react';

interface NewsItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedNews, setExpandedNews] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.ifbb.qurilo.com/api/news', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          credentials: 'include',
        });

        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setNews(data.data);
        }
      } catch (err) {
        console.error('Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);


  



  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(dateString);
  };

  const getGradient = (title: string) => {
    const gradients = [
      'from-blue-600 to-blue-400',
      'from-purple-600 to-purple-400',
      'from-pink-600 to-pink-400',
      'from-indigo-600 to-indigo-400',
      'from-cyan-600 to-cyan-400',
    ];
    const index = title.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Loading News</h2>
          <p className="text-gray-600">Fetching latest updates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 mb-4 leading-tight">
              News & Updates
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Stay informed with the latest stories, insights, and developments
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded blur-xl opacity-0 group-focus-within:opacity-20 transition duration-300"></div>
              <div className="relative flex items-center bg-white border-2 border-gray-200 rounded px-6 py-4 focus-within:border-blue-600 transition duration-300 ">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        {filteredNews.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v4m3-7h-6m0 0V5m0 2h6" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">No News Found</h3>
            <p className="text-gray-600 text-lg">Try searching with different keywords or check back later</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {filteredNews.length > 0 && (
              <div className="mb-20">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded blur-2xl opacity-0 group-hover:opacity-15 transition duration-500"></div>
                  <div className="relative bg-white rounded overflow-hidden  transition duration-300 border border-gray-100">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Featured Image */}
                      <div className="relative h-72 md:h-full overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-400">
                        {filteredNews[0].imageUrl ? (
                          <img
                            src={filteredNews[0].imageUrl}
                            alt={filteredNews[0].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : null}
                        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(filteredNews[0].title)} ${filteredNews[0].imageUrl ? 'hidden' : ''}`}></div>
                        <div className="absolute top-6 left-6">
                          <span className="bg-white text-blue-600 px-4 py-2 rounded text-sm font-bold shadow-lg">
                            Featured
                          </span>
                        </div>
                      </div>

                      {/* Featured Content */}
                      <div className="p-10 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                          </svg>
                          <span className="text-sm font-semibold text-blue-600">{formatDate(filteredNews[0].createdAt)} • {getTimeAgo(filteredNews[0].createdAt)}</span>
                        </div>

                        <h2 className="text-2xl font-black text-gray-900 mb-6 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition duration-300">
                          {filteredNews[0].title}
                        </h2>

                        <p className="text-lg text-gray-700 mb-8 leading-relaxed line-clamp-4">
                          {filteredNews[0].description}
                        </p>

                        <button
                          onClick={() => setExpandedNews(filteredNews[0]._id)}
                          className="self-start bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded font-bold transition-all duration-300 flex items-center gap-2"
                        >
                          Read Full News
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* News Grid */}
            {filteredNews.length > 1 && (
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-10">Latest News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredNews.slice(1).map((item) => (
                    <article key={item._id} className="group relative">
                      <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded blur-xl opacity-0 group-hover:opacity-15 transition duration-500"></div>
                      <div className="relative bg-white rounded overflow-hidden  transition-all duration-300 border border-gray-100 h-full flex flex-col">
                        {/* Article Image */}
                        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-400">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover transition duration-500"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : null}
                          <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(item.title)} ${item.imageUrl ? 'hidden' : ''}`}></div>
                          <div className="absolute top-4 left-4">
                            <span className="bg-white/95 backdrop-blur text-blue-600 px-3 py-1 rounded text-xs font-bold">
                              Article
                            </span>
                          </div>
                        </div>

                        {/* Article Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                            </svg>
                            {formatDate(item.createdAt)} 
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition duration-300">
                            {item.title}
                          </h3>

                          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
                            {item.description}
                          </p>

                          <button
                            onClick={() => setExpandedNews(item._id)}
                            className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 font-bold py-2.5 rounded hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 border border-blue-200 group-hover:border-blue-400"
                          >
                            Read More
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {expandedNews && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setExpandedNews(null)}
        >
          <div
            className="relative bg-white rounded max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpandedNews(null)}
              className="sticky top-6 right-6 float-right z-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded p-2 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {(() => {
              const newsItem = news.find((n) => n._id === expandedNews);
              return newsItem ? (
                <div className="p-8 md:p-12">
                  {/* Modal Image */}
                  <div className="relative h-96 rounded overflow-hidden mb-8 bg-gradient-to-br from-blue-400 to-indigo-400">
                    {newsItem.imageUrl ? (
                      <img
                        src={newsItem.imageUrl}
                        alt={newsItem.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(newsItem.title)} ${newsItem.imageUrl ? 'hidden' : ''}`}></div>
                  </div>

                  {/* Modal Meta */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded text-sm font-bold">
                      Article
                    </span>
                    <span className="text-gray-600 text-sm font-medium">{formatDate(newsItem.createdAt)}</span>
                  </div>

                  {/* Modal Title */}
                  <h2 className="text-2xl font-black text-gray-900 mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    {newsItem.title}
                  </h2>

                  {/* Modal Content */}
                  <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {newsItem.description}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded p-6 border border-blue-200">
                    <p className="text-gray-700 text-sm">
                      <span className="font-bold text-blue-600">Published:</span> {formatDate(newsItem.createdAt)}
                    </p>
                    <p className="text-gray-700 text-sm mt-2">
                      <span className="font-bold text-blue-600">Last Updated:</span> {getTimeAgo(newsItem.updatedAt)}
                    </p>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

export default News;