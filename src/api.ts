const API_BASE_URL = 'http://localhost:8080/shorten/';
const REDIRECT_BASE_URL = 'http://localhost:8080/redirect/';

export async function shortenUrl(url: string): Promise<UrlResponse> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });
  
  if (!response.ok) throw new Error('Failed to shorten URL');
  return response.json();
}

export async function getUrlStats(shortUrl: string): Promise<UrlStats> {
  const response = await fetch(`${API_BASE_URL}${shortUrl}/stats`);
  if (!response.ok) throw new Error('Failed to get URL stats');
  return response.json();
}

export async function updateUrl(shortUrl: string, newUrl: string): Promise<UrlResponse> {
  const response = await fetch(`${API_BASE_URL}${shortUrl}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: newUrl }),
  });
  
  if (!response.ok) throw new Error('Failed to update URL');
  return response.json();
}

export async function deleteUrl(shortUrl: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}${shortUrl}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) throw new Error('Failed to delete URL');
}

export async function redirectToOriginalUrl(shortUrl: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}${shortUrl}`);
  if (!response.ok) throw new Error('Failed to get original URL');
  const data = await response.json();
  return data.url;
}

export async function searchUrl(shortUrl: string): Promise<UrlResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${shortUrl}`);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    return null;
  }
}

export function getRedirectUrl(shortUrl: string): string {
  return `${REDIRECT_BASE_URL}${shortUrl}`;
}