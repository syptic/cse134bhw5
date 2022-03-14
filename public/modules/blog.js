// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6HSqovSee-xCz12BNVIAEUXgnjMnER1M",
  authDomain: "cse134bhw5-63a32.firebaseapp.com",
  projectId: "cse134bhw5-63a32",
  storageBucket: "cse134bhw5-63a32.appspot.com",
  messagingSenderId: "138662852315",
  appId: "1:138662852315:web:3009462717f85e8546fefe",
  measurementId: "G-RQKPLZGH8G",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const postsRef = ref(db, "posts/");

const logInDiv = document.getElementById("logIn");
const logOutDiv = document.getElementById("logOut");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const errorOutput = document.getElementById("errorOutput");
const userGreeting = document.getElementById("userGreeting");

onAuthStateChanged(auth, function (user) {
  if (user) {
    logInDiv.style.display = "none";
    logOutDiv.style.display = "block";
    userGreeting.innerText = `Welcome ${user.email}`;
  } else {
    userGreeting.innerHTML = "";
    logInDiv.style.display = "block";
    logOutDiv.style.display = "none";
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      errorOutput.innerHTML = "";
    })
    .catch((error) => {
      // Handle Errors here.
      errorOutput.innerHTML = DOMPurify.sanitize(error.message);
      if (error.code === "auth/wrong-password") {
        alert("Wrong password.");
      }
    });
});

const today = new Date();

// array of posts -> init or fetch from db
let posts = [];
get(postsRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      posts = snapshot.val();
      displayPosts();
    } else {
      // no posts
      posts = [];
      postsList.innerHTML = "No posts to show!";
    }
  })
  .catch((error) => {
    postsList.innerHTML = DOMPurify.sanitize(error.message);
  });

// buttons
const addBtn = document.getElementById("addBtn");

// dialogs
const addPost = document.getElementById("addPost");
const editPost = document.getElementById("editPost");
const deletePost = document.getElementById("deletePost");

// dialog-buttons
const addOkay = document.getElementById("addOkay");
const addCancel = document.getElementById("addCancel");
const editOkay = document.getElementById("editOkay");
const editCancel = document.getElementById("editCancel");
const deleteOkay = document.getElementById("deleteOkay");
const deleteCancel = document.getElementById("deleteCancel");

const addTitle = document.getElementById("add-title");
const addContent = document.getElementById("add-content");
const addDate = document.getElementById("add-date");

const editTitle = document.getElementById("edit-title");
const editContent = document.getElementById("edit-content");
const editDate = document.getElementById("edit-date");

// posts-list
const postsList = document.getElementById("postsList");

// get post html item from text
function getPostItem(post, index) {
  const postItem = document.createElement("article");
  postItem.className = "postItem";
  postItem.innerHTML = `
		<hr>
		<h2 class="post-title">${post.title}</h2>
		<h5> Last edited on ${post.date} by ${post.author}</h5>
		<details>
		  <summary> View post </summary>
		  <p>${post.content}</p>
		</details>
		<br>
	`;
  let li = document.createElement("li");
  li.setAttribute("data-index", index);
  li.appendChild(postItem);

  let editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  editBtn.className = "editBtn";
  editBtn.addEventListener("click", () => {
    if (!auth.currentUser) {
      alert("Please log in to edit posts!");
      return;
    }
    editOkay.setAttribute("data-index", index);
    editTitle.value = post.title;
    editContent.value = post.content;
    editDate.value = today.toISOString().substr(0, 10);
    editPost.showModal();
  });

  let delBtn = document.createElement("button");
  delBtn.appendChild(document.createTextNode("Delete"));
  delBtn.className = "delBtn";
  delBtn.addEventListener("click", () => {
    if (!auth.currentUser) {
      alert("Please log in to delete posts!");
      return;
    }
    deleteOkay.setAttribute("data-index", index);
    deletePost.showModal();
  });
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  return li;
}

function displayPosts() {
  postsList.innerHTML = "";
  // render all posts
  posts.forEach(function (post, index) {
    postsList.appendChild(getPostItem(post, index));
  });
}

// show add dialog
addBtn.addEventListener("click", function () {
  if (!auth.currentUser) {
    alert("Please log in first!");
    return;
  }
  addDate.value = today.toISOString().substr(0, 10);
  addPost.showModal();
});

// add Posts
addOkay.addEventListener("click", () => {
  if (
    addTitle.value === "" ||
    addContent.value === "" ||
    addDate.value === ""
  ) {
    alert("Please fill in all fields");
    return;
  }
  // add to array
  posts.push({
    title: addTitle.value,
    content: addContent.value,
    date: addDate.value,
    author: auth.currentUser.email,
  });
  // save to db
  set(postsRef, posts);
  let index = posts.length - 1;
  let newPostLi = getPostItem(posts[index], index);
  postsList.appendChild(newPostLi);
  closeAddModal();
});
function closeAddModal() {
  addPost.close();
  addTitle.value = "";
  addContent.value = "";
  addDate.value = "";
}

function closeEditModal() {
  editPost.close();
  editTitle.value = "";
  editContent.value = "";
  editDate.value = "";
}

addCancel.addEventListener("click", () => {
  closeAddModal();
});

editOkay.addEventListener("click", () => {
  let index = editOkay.getAttribute("data-index");
  if (
    editTitle.value === "" ||
    editContent.value === "" ||
    editDate.value === ""
  ) {
    alert("Please fill in all fields");
    return;
  }
  posts[index].title = editTitle.value;
  posts[index].content = editContent.value;
  posts[index].date = editDate.value;
  posts[index].author = auth.currentUser.email;
  set(postsRef, posts);
  let editedPostLi = getPostItem(posts[index], index);
  postsList.replaceChild(editedPostLi, postsList.children[index]);
  // close dialog
  closeEditModal();
});

editCancel.addEventListener("click", () => {
  closeEditModal();
});

deleteOkay.addEventListener("click", () => {
  let index = deleteOkay.getAttribute("data-index");
  // remove from array
  posts.splice(index, 1);
  set(postsRef, posts);
  // remove from list
  postsList.removeChild(postsList.children[index]);
  // reset indexing
  posts.forEach((post, index) => {
    let postItem = postsList.children[index];
    postItem.setAttribute("data-index", index);
  });
  // close dialog
  deletePost.close();
});
deleteCancel.addEventListener("click", () => {
  // close dialog
  deletePost.close();
});
