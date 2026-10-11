import { ArrowUpRight, BookOpen } from "lucide-react";
import { articles } from "../../data/recognition";
import pageContent from "../../data/pageContent.json";

export function ArticlesPage() {
  return (
    <div className="articles-page page-shell">
      <div className="container">
        <div className="articles-intro">
          <span className="eyebrow-pill">
            <BookOpen size={15} /> {pageContent.articles.eyebrow}
          </span>
          <h1>{pageContent.articles.title}</h1>
          <p>{pageContent.articles.description}</p>
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
                  {item.url && !item.url.startsWith("YOUR_") ? (
                    <a href={item.url} target="_blank" rel="noreferrer">
                      Read Article <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <span className="article-link-placeholder">Article link TBD</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
