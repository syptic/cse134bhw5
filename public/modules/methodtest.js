import * as serverMethods from "./serverMethods.js";
import * as articleMethods from "./articleMethods.js";
import * as responseMethods from "./responseMethods.js";

function responseReady() {
  if (this.readyState === 4 && this.status === 200) {
    let json = JSON.parse(this.responseText);
    // set output as the response from the server
    responseMethods.outputResponse({ ...json["args"], ...json["json"] });
  } else {
    responseMethods.outputError(this.responseText);
  }
}

document.addEventListener("DOMContentLoaded", onPageLoad);
function onPageLoad() {
  // set current date
  const today = new Date();
  let dateInput = document.getElementById("article-date");
  dateInput.value = today.toISOString().substr(0, 10);
  // get button elements
  let postBtn = document.getElementById("postBtn");
  let getBtn = document.getElementById("getBtn");
  let putBtn = document.getElementById("putBtn");
  let deleteBtn = document.getElementById("deleteBtn");
  // add event listeners
  postBtn.addEventListener("click", postArticle);
  getBtn.addEventListener("click", getArticle);
  putBtn.addEventListener("click", putArticle);
  deleteBtn.addEventListener("click", deleteArticle);
}

function postArticle() {
  let article = articleMethods.getArticleObj();
  if (!articleMethods.validateArticle(article)) {
    alert("Please fill in all fields");
    return;
  }
  // send the article object to the server
  responseMethods.outputProcessing("POST Request");
  serverMethods.postMethod("https://httpbin.org/post", article, responseReady);
}

function getArticle() {
  let args = articleMethods.getIdArgs();
  if (args === null) {
    alert("Please enter an id");
    return;
  }
  // fetch the article from the server
  responseMethods.outputProcessing("GET Request");
  serverMethods.getMethod("https://httpbin.org/get", args, responseReady);
}

function putArticle() {
  let args = articleMethods.getIdArgs();
  if (args === null) {
    alert("Please enter an id");
    return;
  }
  let article = articleMethods.getArticleObj();
  if (!articleMethods.validateArticle(article)) {
    alert("Please fill in all fields");
    return;
  }
  // put the article object in the server
  responseMethods.outputProcessing("PUT Request");
  serverMethods.putMethod(
    "https://httpbin.org/put",
    args,
    article,
    responseReady
  );
}

function deleteArticle() {
  let args = articleMethods.getIdArgs();
  if (args === null) {
    alert("Please enter an id");
    return;
  }
  // delete the article from the server
  responseMethods.outputProcessing("DELETE Request");
  serverMethods.deleteMethod("https://httpbin.org/delete", args, responseReady);
}
