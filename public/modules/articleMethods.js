export function getArticleObj() {
  // get the article id and title and date and content
  const title = document.getElementById("article-name").value;
  const date = document.getElementById("article-date").value;
  const content = document.getElementById("article-body").value;
  // create the article object
  return {
    title: title,
    date: date,
    content: content,
  };
}
export function validateArticle(article) {
  // validate the article object
  if (article.title === "" || article.date === "" || article.content === "") {
    return false;
  }
  return true;
}

export function getIdArgs() {
  const id = document.getElementById("article-id").value;
  if (id === "") {
    return null;
  }
  const args = "?id=" + id;
  return args;
}
