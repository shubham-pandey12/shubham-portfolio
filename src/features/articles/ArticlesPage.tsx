import { ArrowUpRight, BookOpen } from "lucide-react";
import type { PortfolioArticle } from "../../data/recognition";
import pageContent from "../../data/pageContent.json";

export function ArticlesPage({ articles }: { articles: PortfolioArticle[] }) {
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
        {articles.length ? (
          <div className="articles-grid">
            {articles.map((item) => (
              <article key={item.url || item.title} className="article-card">
                {item.image && <img className="article-image" src={item.image} alt="" />}
                <div className="article-card-body">
                  <span className="category-label">{item.category}</span>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <div className="article-card-footer">
                    <span>{item.date}</span>
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noreferrer">
                        Read Article <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="articles-empty-state">{pageContent.articles.emptyState}</p>
        )}
      </div>
    </div>
  );
}
