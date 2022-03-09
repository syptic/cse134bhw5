// array of posts -> init or fetch from db
var posts = [];
if (localStorage.getItem("posts") !== null) {
  posts = JSON.parse(localStorage.getItem("posts"));
}
// buttons
var addBtn = document.getElementById("addBtn");

// dialogs
var addPost = document.getElementById("addPost");
var editPost = document.getElementById("editPost");
var deletePost = document.getElementById("deletePost");

// dialog-buttons
var addOkay = document.getElementById("addOkay");
var addCancel = document.getElementById("addCancel");
var editOkay = document.getElementById("editOkay");
var editCancel = document.getElementById("editCancel");
var deleteOkay = document.getElementById("deleteOkay");
var deleteCancel = document.getElementById("deleteCancel");

// posts-list
var postsList = document.getElementById("postsList");

// get post html item from text
function getPostItem(post, index) {
  console.log(post);
  let li = document.createElement("li");
  li.appendChild(
    document.createTextNode(`${post.title} - ${post.date} - ${post.content}`)
  );

  let editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  editBtn.addEventListener("click", () => {
    editOkay.setAttribute("data-index", index);
    editPost.showModal();
  });

  let delBtn = document.createElement("button");
  delBtn.appendChild(document.createTextNode("Delete"));
  delBtn.addEventListener("click", () => {
    deleteOkay.setAttribute("data-index", index);
    deletePost.showModal();
  });
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  console.log(li.textContent);
  return li;
}

// render all posts
posts.forEach(function (post, index) {
  postsList.innerHTML = "";
  postsList.appendChild(getPostItem(post, index));
});

// show add dialog
addBtn.addEventListener("click", function () {
  addPost.showModal();
});

// add Posts
addOkay.addEventListener("click", () => {
  console.log("addOkay");
  let title = document.getElementById("add-title").value;
  let content = document.getElementById("add-content").value;
  let date = document.getElementById("add-date").value;
  // add to array
  posts.push({
    title: title,
    content: content,
    date: date,
  });
  let index = posts.length - 1;
  let li = getPostItem(posts[index], index);
  console.log(li);
  postsList.appendChild(li);
  addPost.close();
  document.getElementById("add-title").value = "";
  document.getElementById("add-content").value = "";
  document.getElementById("add-date").value = "";
  localStorage.setItem("posts", JSON.stringify(posts));
});

addCancel.addEventListener("click", () => {
  addPost.close();
  document.getElementById("add-title").value = "";
  document.getElementById("add-content").value = "";
  document.getElementById("add-date").value = "";
});

editOkay.addEventListener("click", () => {
  console.log("editOkay");
  let index = editOkay.getAttribute("data-index");
  let title = document.getElementById("edit-title").value;
  let content = document.getElementById("edit-content").value;
  let date = document.getElementById("edit-date").value;

  document.getElementById("edit-title").value = "";
  document.getElementById("edit-content").value = "";
  document.getElementById("edit-date").value = "";
  // add to array
  posts[index] = {
    title: title,
    content: content,
    date: date,
  };
  // update list
  postsList.innerHTML = "";
  posts.forEach((post, index) => {
    postsList.appendChild(getPostItem(post, index));
  });
  // close dialog
  editPost.close();
  localStorage.setItem("posts", JSON.stringify(posts));
});
editCancel.addEventListener("click", () => {
  document.getElementById("edit-title").value = "";
  document.getElementById("edit-content").value = "";
  document.getElementById("edit-date").value = "";
  // close dialog
  editPost.close();
});

deleteOkay.addEventListener("click", () => {
  console.log("deleteOkay");
  let index = deleteOkay.getAttribute("data-index");
  // remove from array
  posts.splice(index, 1);
  // update list
  postsList.innerHTML = "";
  posts.forEach((post, index) => {
    postsList.appendChild(getPostItem(post, index));
  });
  // close dialog
  deletePost.close();
  localStorage.setItem("posts", JSON.stringify(posts));
});
deleteCancel.addEventListener("click", () => {
  // close dialog
  deletePost.close();
});
console.log(posts);
