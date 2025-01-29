import React, { useState, useEffect } from 'react';
import { Link2, Copy, Trash2, BarChart2, Edit2, ExternalLink, Search } from 'lucide-react';
import type { UrlResponse, UrlStats } from './types';
import { shortenUrl, getUrlStats, updateUrl, deleteUrl, searchUrl, getRedirectUrl } from './api';

function App() {
  const [url, setUrl] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState<UrlResponse[]>(() => {
    const saved = localStorage.getItem('shortenedUrls');
    return saved ? JSON.parse(saved) : [];
  });
  const [stats, setStats] = useState<Record<string, UrlStats>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingUrl, setEditingUrl] = useState<{ shortUrl: string; newUrl: string } | null>(null);
  const [copySuccess, setCopySuccess] = useState<{ id: string; type: 'full' | 'short' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<UrlResponse | null>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(shortenedUrls));
  }, [shortenedUrls]);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim()) {
        setSearching(true);
        try {
          const result = await searchUrl(searchQuery);
          setSearchResult(result);
          setError('');
        } catch (err) {
          setSearchResult(null);
        } finally {
          setSearching(false);
        }
      } else {
        setSearchResult(null);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await shortenUrl(url);
      setShortenedUrls(prev => [response, ...prev]);
      setUrl('');
    } catch (err) {
      setError('Failed to shorten URL. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetStats = async (shortUrl: string) => {
    try {
      const statsData = await getUrlStats(shortUrl);
      setStats(prev => ({ ...prev, [shortUrl]: statsData }));
    } catch (err) {
      setError('Failed to fetch URL statistics.');
    }
  };

  const handleUpdate = async (shortUrl: string) => {
    if (!editingUrl) return;
    
    try {
      const updated = await updateUrl(shortUrl, editingUrl.newUrl);
      setShortenedUrls(prev => 
        prev.map(url => url.shortUrl === shortUrl ? updated : url)
      );
      setEditingUrl(null);
    } catch (err) {
      setError('Failed to update URL.');
    }
  };

  const handleDelete = async (shortUrl: string) => {
    try {
      await deleteUrl(shortUrl);
      setShortenedUrls(prev => prev.filter(url => url.shortUrl !== shortUrl));
      setStats(prev => {
        const newStats = { ...prev };
        delete newStats[shortUrl];
        return newStats;
      });
    } catch (err) {
      setError('Failed to delete URL.');
    }
  };

  const handleCopy = async (shortUrl: string, type: 'full' | 'short') => {
    try {
      const textToCopy = type === 'full' ? getRedirectUrl(shortUrl) : shortUrl;
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess({ id: shortUrl, type });
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const handleRedirect = (shortUrl: string) => {
    const redirectUrl = getRedirectUrl(shortUrl);
    window.open(redirectUrl, '_blank');
  };

  const filteredUrls = shortenedUrls.filter(item => 
    item.shortUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderUrlCard = (item: UrlResponse, isSearchResult = false) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
          {item.url}
        </h3>
        {!isSearchResult && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleGetStats(item.shortUrl)}
              className="p-2 text-gray-600 hover:text-indigo-600"
              title="View Stats"
            >
              <BarChart2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setEditingUrl({ shortUrl: item.shortUrl, newUrl: item.url })}
              className="p-2 text-gray-600 hover:text-indigo-600"
              title="Edit URL"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleDelete(item.shortUrl)}
              className="p-2 text-gray-600 hover:text-red-600"
              title="Delete URL"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {editingUrl?.shortUrl === item.shortUrl && !isSearchResult ? (
        <div className="flex gap-2 mb-4">
          <input
            type="url"
            value={editingUrl.newUrl}
            onChange={(e) => setEditingUrl({ ...editingUrl, newUrl: e.target.value })}
            className="flex-1 px-3 py-2 rounded border border-gray-300"
          />
          <button
            onClick={() => handleUpdate(item.shortUrl)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Save
          </button>
          <button
            onClick={() => setEditingUrl(null)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      ) : null}

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Short Code:</span>
          <span className="text-indigo-600">{item.shortUrl}</span>
          <button
            onClick={() => handleCopy(item.shortUrl, 'short')}
            className="p-1 text-gray-600 hover:text-indigo-600"
            title="Copy short code"
          >
            <Copy className="h-4 w-4" />
          </button>
          {copySuccess?.id === item.shortUrl && copySuccess.type === 'short' && (
            <span className="text-green-600 text-xs">Copied!</span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{isSearchResult ? 'Found URL:' : 'Full URL:'}</span>
          <button
            onClick={() => handleRedirect(item.shortUrl)}
            className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            {getRedirectUrl(item.shortUrl)}
            <ExternalLink className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleCopy(item.shortUrl, 'full')}
            className="p-1 text-gray-600 hover:text-indigo-600"
            title="Copy full URL"
          >
            <Copy className="h-4 w-4" />
          </button>
          {copySuccess?.id === item.shortUrl && copySuccess.type === 'full' && (
            <span className="text-green-600 text-xs">Copied!</span>
          )}
        </div>
      </div>

      {!isSearchResult && stats[item.shortUrl] && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Statistics</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Access Count:</span>
              <span className="ml-2 font-medium">{stats[item.shortUrl].accessCount}</span>
            </div>
            <div>
              <span className="text-gray-500">Created:</span>
              <span className="ml-2 font-medium">
                {new Date(stats[item.shortUrl].createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Link2 className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">URL Shortener</h1>
          <p className="text-gray-600">Shorten and manage your URLs</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your URL here..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </div>
          {error && <p className="mt-2 text-red-600">{error}</p>}
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any shortened URL..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {searching && (
          <div className="text-center text-gray-600 my-4">
            Searching...
          </div>
        )}

        {searchResult && !shortenedUrls.some(url => url.shortUrl === searchResult.shortUrl) && (
          <div className="mb-6">
            {renderUrlCard(searchResult, true)}
          </div>
        )}

        <div className="space-y-4">
          {filteredUrls.map((item) => renderUrlCard(item))}
        </div>
      </div>
    </div>
  );
}

export default App;