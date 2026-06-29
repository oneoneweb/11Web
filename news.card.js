const NewsCard = {

  render(post, expanded = false) {

    const full = post.description || "";
    const short = full.slice(0, 120);

    return `
      <div class="news-card">

        ${post.image ? `<img src="${post.image}" class="news-image">` : ""}

        <div class="news-title">${post.title}</div>

        <div class="news-description">
          ${expanded ? full : short + (full.length > 120 ? "..." : "")}
        </div>

        <div class="news-separator"></div>
      </div>
    `;
  }

};

window.NewsCard = NewsCard;