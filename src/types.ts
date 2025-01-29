export interface UrlRequest {
  url: string;
}

export interface UrlResponse {
  id: number;
  url: string;
  shortUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface UrlStats extends UrlResponse {
  accessCount: number;
}