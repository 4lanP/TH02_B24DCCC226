import React, { useEffect, useState } from "react";
import axios from "axios";

interface Article {
  id: number;
  title: string;
  summary: string;
  url: string;
  image_url: string;
  published_at: string;
  news_site: string;
}

export default function NewsApp() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get("https://api.spaceflightnewsapi.net/v4/articles?limit=10");
        setArticles(data.results);
      } catch {
        setError("Không tải được tin tức. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Đang tải tin tức...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Tin tức</h2>

      {articles.map((a) => (
        <div
          key={a.id}
          style={{
            marginBottom: "20px",
            paddingBottom: "15px",
            borderBottom: "1px solid #ddd",
          }}
        >
          {a.image_url && (
            <img
              src={a.image_url}
              alt={a.title}
              width="100%"
              style={{
                borderRadius: "8px",
                maxHeight: "300px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
          )}

          <h3>{a.title}</h3>
          <p>{a.summary}</p>

          <a
            href={a.url}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            Đọc thêm tại {a.news_site}
          </a>

          <p style={{ marginTop: "5px", color: "#555" }}>
            <small>Ngày đăng: {new Date(a.published_at).toLocaleDateString()}</small>
          </p>
        </div>
      ))}
    </div>
  );
}
