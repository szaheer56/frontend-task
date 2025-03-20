import React, { useState, useEffect } from "react";
import axios from "axios";

interface NewsItem {
  title: string;
  description: string;
  source: { name: string };
  publishedAt?: string;
  url: string;
}

const API_KEYS = {
  newsapi: "3d9077ccd0fa4e17b9398675de35af4b", // NewsAPI API key
  nytimes: "w5zVow18O9zdVVz4sRRQWwttf4G9jp0Y", // NYTimes API key
  opennews: "pub_753185244ec20ff3595d4bb7af9dec62d1d20", //OpenNews API key
};

const NewsComponent: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("general");
  const [source, setSource] = useState("newsapi");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError("");
      setNews([]);

      try {
        let response;

        if (source === "newsapi") {
          response = await axios.get("https://newsapi.org/v2/everything", {
            params: {
              q: searchTerm || "news",
              from: fromDate || undefined,
              to: toDate || undefined,
              apiKey: API_KEYS.newsapi,
            },
          });

          if (response.data.status === "ok") {
            setNews(response.data.articles || []);
          } else {
            setError("No news found.");
          }
        } else if (source === "nytimes") {
          response = await axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
            params: {
              "api-key": API_KEYS.nytimes,
              q: searchTerm || "news",
              begin_date: fromDate ? fromDate.replace(/-/g, "") : undefined,
              end_date: toDate ? toDate.replace(/-/g, "") : undefined,
              fq: category !== "general" ? `section_name:("${category}")` : undefined,
              sort: "newest",
            },
          });

          if (response.data.response.docs.length > 0) {
            setNews(
              response.data.response.docs.map((article: any) => ({
                title: article.headline.main,
                description: article.abstract || "No description available",
                source: { name: "NYTimes" },
                url: article.web_url,
                publishedAt: article.pub_date,
              }))
            );
          } else {
            setError("No news found.");
          }
        } else if (source === "opennews") {
           
          
          response = await axios.get("https://newsdata.io/api/1/news", {
            params: {
              q: searchTerm || "news",
              category,
              from_date: fromDate || undefined,
              to_date: toDate || undefined,
              apiKey: API_KEYS.opennews,
            },
          });

          if (response.data.status === "success") {
            setNews(
              response.data.results.map((article: any) => ({
                title: article.title,
                description: article.summary || "No description available",
                source: { name: "OpenNews" },
                url: article.url,
                publishedAt: article.published_at,
              }))
            );
          } else {
            setError("No news found.");
          }
        }
      } catch (err) {
        setError("Failed to fetch news. Try again later.");
      }

      setLoading(false);
    };

    fetchNews();
  }, [searchTerm, category, source, fromDate, toDate]);

  return (
    <div className="news-container">
      {/* Search & Filter Section */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-filter">
          <option value="general">All Categories</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>

        <select value={source} onChange={(e) => setSource(e.target.value)} className="source-filter">
          <option value="newsapi">NewsAPI</option>
          <option value="nytimes">NYTimes</option>
          <option value="opennews">OpenNews</option>
        </select>

        {/* Date Filters */}
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="date-input"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="date-input"
        />
      </div>

      {/* Loading & Error Messages */}
      {loading && <p>Loading news...</p>}
      {error && <p className="error">{error}</p>}

      {/* News List */}
      <div className="news-list">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="news-item">
              <h3>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h3>
              <p>{article.description}</p>
              <small>
                Source: {article.source.name} | {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "N/A"}
              </small>
            </div>
          ))
        ) : (
          !loading && <p className="no-results">No news found.</p>
        )}
      </div>
    </div>
  );
};

export default NewsComponent;
