document.addEventListener("DOMContentLoaded", onPageLoad);
function onPageLoad() {
  setDate();
  setBtnMethods();
}
function setDate() {
  // set current date
  var today = new Date();
  var dateInput = document.getElementById("article-date");
  dateInput.value = today.toISOString().substr(0, 10);
}
function setBtnMethods() {
  var postBtn = document.getElementById("postBtn");
  var getBtn = document.getElementById("getBtn");
  var putBtn = document.getElementById("putBtn");
  var deleteBtn = document.getElementById("deleteBtn");
  postBtn.addEventListener("click", postArticle);
  getBtn.addEventListener("click", getArticle);
  putBtn.addEventListener("click", putArticle);
  deleteBtn.addEventListener("click", deleteArticle);
}
function getArticleObj() {
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
function validateArticle(article) {
  // validate the article object
  if (article.title === "" || article.date === "" || article.content === "") {
    return false;
  }
  return true;
}

function getIdArgs() {
  const id = document.getElementById("article-id").value;
  if (id === "") {
    return null;
  }
  const args = "?id=" + id;
  return args;
}

function outputResponse(response) {
  // output the response
  let responseDiv = document.getElementById("response");
  let responseText = "<table border=1>";
  responseText += "<tr><th>Key</th><th>Value</th></tr>";
  for (let key in response) {
    responseText +=
      "<tr><td>" + key + "</td><td>" + response[key] + "</td></tr>";
  }
  responseText += "</table>";
  responseDiv.innerHTML = DOMPurify.sanitize(responseText);
}

function outputError(error) {
  let responseDiv = document.getElementById("response");
  let errorText =
    "<details><summary>Oops! Seems like something went wrong!</summary>";
  errorText += "<p>" + error + "</p></details>";
  responseDiv.innerHTML = DOMPurify.sanitize(errorText);
}

function postArticle() {
  let article = getArticleObj();
  if (!validateArticle(article)) {
    alert("Please fill in all fields");
    return;
  }
  // send the article object to the server
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://httpbin.org/post", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let json = JSON.parse(xhr.responseText);
      // set output as the response from the server
      outputResponse(json["json"]);
    } else {
      outputError(xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(article));
}

function getArticle() {
  let args = getIdArgs();
  if (args === null) {
    alert("Please enter an id");
    return;
  }
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://httpbin.org/get" + args, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let json = JSON.parse(xhr.responseText);
      // set output as the response from the server
      outputResponse(json["args"]);
    } else {
      outputError(xhr.responseText);
    }
  };
  xhr.send();
}

function putArticle() {
  let args = getIdArgs();
  if (args === null) {
    alert("Please enter an id");
    return;
  }
  let article = getArticleObj();
  if (!validateArticle(article)) {
    alert("Please fill in all fields");
    return;
  }
  // send the article object to the server
  let xhr = new XMLHttpRequest();
  xhr.open("PUT", "https://httpbin.org/put" + args, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let json = JSON.parse(xhr.responseText);
      // set output as the response from the server
      outputResponse(json["json"]);
    } else {
      outputError(xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(article));
}
function deleteArticle() {
  let args = getIdArgs();
  if (args === null) {
    alert("Please enter an id");
    return;
  }
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", "https://httpbin.org/delete" + args, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let json = JSON.parse(xhr.responseText);
      // set output as the response from the server
      outputResponse(json["args"]);
    } else {
      outputError(xhr.responseText);
    }
  };
  xhr.send();
}
