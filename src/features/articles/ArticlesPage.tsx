import { ArrowUpRight, BookOpen } from "lucide-react";
import { articles } from "../../data/recognition";

export function ArticlesPage() {
  return (
    <div className="articles-page page-shell">
      <div className="container">
        <div className="articles-intro">
          <span className="eyebrow-pill">
            <BookOpen size={15} /> Technical Writing
          </span>
          <h1>Latest Articles</h1>
          <p>
            Latest 15 articles about software engineering, frontend development, and technology.
          </p>
        </div>
        <div className="articles-placeholder-grid">
          {articles.map((item, i) => (
            <article key={i} className="article-card">
              <div className="article-image-placeholder">
                <span>PLACEHOLDER ARTICLE IMAGE</span>
              </div>
              <div className="article-card-body">
                <span className="category-label">{item.category}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <div className="article-card-footer">
                  <span>{item.date}</span>
                  <a href={item.url}>
                    Read Article <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
