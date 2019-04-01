let body = document.querySelector("body");
createFirstPage();

//Generating the html and css needed to make the login/register page
function createFirstPage() {
  body.innerHTML = 
  `<div class="login-registration">
    <nav class="login-registration__nav">
      <span class="login-registration__nav__label" id="login">Login page</span>
      <span class="login-registration__nav__label" id="register">Registration page</span>
    </nav>
    <form class="login-registration__form left">
      <label>Username</label>
      <input
        type="text"
        class="input-div__form__input"
        id="username"
        placeholder="Enter username.."/>
      <label>Password</label>
      <input
        type="password"
        class="input-div__form__input"
        id="password"
        placeholder="Enter password.."/>
      <label id="confirmPasswordLabel">Confirm password</label>
      <input
        type="password"
        class="input-div__form__input"
        id="confirmPassword"
        placeholder="Repeat password.."/>
    </form>
    <button class="input-div__form__button">Register</button>
  </div>`;
}

/*If the local storage is empty then the first page must load
as a register page, othervise it loads as a login page*/
if (localStorage.length !== 0) {
  login();
}

//Deciding the first page is a login page and making it into one
function login() {
  if (
    document.querySelector(".input-div__form__button")
      .innerHTML === "Register"
  ) {
    document.querySelector(".input-div__form__button")
      .innerHTML = "Login";
    let form = document.querySelector(".login-registration__form");
    form.removeChild(document.querySelector("#confirmPassword"));
    form.removeChild(document.querySelector("#confirmPasswordLabel"));
  }
}

//Deciding the first page is a registration page and and making it into one
function register() {
  if (
    document.querySelector(".input-div__form__button")
      .innerHTML === "Login"
  ) {
    document.querySelector(".input-div__form__button")
      .innerHTML = "Register";
    document.querySelector(
      ".login-registration__form"
    ).innerHTML += 
      `<label 
        class="login-registration__form__label"
        id="confirmPasswordLabel">Confirm password</label>
      <input 
        type="password"
        class="input-div__form__input"
        id="confirmPassword"
        placeholder="Repeat password.."/>`;
  }
}

function checkIfRegistrationInformationIsOkay() {
  let username = document.querySelector("#username").value.trim();
  let password = document.querySelector("#password").value.trim();
  let passwordRepeat = document.querySelector("#confirmPassword").value;
  if (username === "" || password === "" || passwordRepeat === "") {
    alert("You must enter all information.\n");
    return false;
  } else if (username.length < 5 || username.length > 10) {
    alert("The username must be between 5 and 10 letters.\n");
    return false;
  } else if (password.length < 5 || password.length > 10) {
    alert("The password must be between 5 and 10 letters.\n");
    return false;
  } else if (password !== passwordRepeat) {
    alert("The passwords don't match\n");
    return false;
  } else if (checkIfUserAlreadyExists(username)) {
    alert("That username is already taken, try another");
    return false;
  }
  return true;
}

function checkIfLoginInformationIsOkay() {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  for (let i = 0; i < localStorage.length; i++) {
    if (
      username ===
        JSON.parse(localStorage.getItem(localStorage.key(i))).username &&
      password ===
        JSON.parse(localStorage.getItem(localStorage.key(i))).password
    ) {
      return true;
    }
  }
  alert("That user does not exist, try again");
  return false;
}

function checkIfUserAlreadyExists(username) {
  for (var i = 0; i < localStorage.length; i++) {
    if (
      JSON.parse(localStorage.getItem(localStorage.key(i))).username ===
      username
    ) {
      return true;
    }
    return false;
  }
}

function openSecondPage() {
  if (
    document.querySelector(".input-div__form__button")
      .innerHTML === "Register"
  ) {
    if (checkIfRegistrationInformationIsOkay()) {
      let user = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
      };
      localStorage.setItem(user.username, JSON.stringify(user));
      createSecondPage();
    }
  } else {
    if (checkIfLoginInformationIsOkay()) {
      //Next line was made when i expected I'd need the user later
      localStorage.getItem(document.querySelector("#username").value);
      createSecondPage();
    }
  }
}

function createSecondPage() {
  //Divs where I'll add info later
  body.innerHTML = `<div class="main__offers""></div>
                    <div class="modal"></div>
                    <div class="input-div"></div>`;
  let placeToAddScrollButton = document.querySelector(".main__offers");
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(date => date.json())
    .then(users => {
      //Adding all info to a grid
      users.forEach(function(user) {
        addMainContent(user);
      });
      //Creating events for use details and post pop ups
      users.forEach(function(user, index) {
        addDetailsPopUp(user, index);
        addPostsPopUp(user, index);
      });
    });
    //Creating the scroll button
    placeToAddScrollButton.innerHTML += `
    <button class="scroll-to-top" onclick="goToTop()">
      <i class="upArrow"></i>
    </button>`;
}

//Creates the grid as requested
function addMainContent(user) {
  let placeInPageToAddCode = document.querySelector(".main__offers");
  placeInPageToAddCode.innerHTML += 
  `<div class ="offers__item">
    <img class="item__img" src="img/user.jpg"/>
    <p class="item__img-description">${user.name}</p>
    <p class="item__paragraph">Email: ${user.email}</p>
    <span class="item__price">City: ${user.address.city}</span>
    <button class="item__button">Posts</button>
  </div>`;
}

//Function that creates events which display user info
function addDetailsPopUp(user, index) {
  //Images are selected since when they are clicked the info
  //is displayed
  let images = document.querySelectorAll(".item__img")[index];
  let modal = document.querySelector(".modal");
  images.addEventListener("click", () => {
    modal.innerHTML += 
    `<div class="container">
      <div class ="modal-content">
        <span class="close" onclick="closeModalPopUp()">&#10006;</span>
        <h1>Name: ${user.name}</h1>
          <p>Username:${user.username}</p>
          <p>Email:${user.email}</p>
          <p>Phone:${user.phone}</p>
          <p>Web:${user.website}</p>
        <h1>Address:</h1>
          <p>Street:${user.address.street}</p>
          <p>City:${user.address.city}</p>
          <p>Zipcode:${user.address.zipcode}</p>
          <p>lat:-${user.address.geo.lat}</p>
          <p>lng:-${user.address.geo.lng}</p>
        <h1>Company:</h1>
          <p>Name:${user.company.name}</p>
          <p>Phrase:${user.company.catchPhrase}</p>
          <p>Bs:${user.company.bs}</p>
      </div>
    </div>`;
    modal.style.display = "block";
  });
}

//Function that creates events which display user info
function addPostsPopUp(user, index) {
  let postButtons = document.querySelectorAll(".item__button")[index];
  let modal = document.querySelector(".modal");
  postButtons.addEventListener("click", () => {
    modal.innerHTML += `<div class="container">
        <div class="modal-content">
          <span class="close" onclick="closeModalPopUp()">&#10006;</span>
          <h1>User ID:${user.id}</h1>
        </div>
    </div>`;
    let modalContainer = document.querySelector(".container");
    fetch("https://jsonplaceholder.typicode.com/users/1/posts")
      .then(date => date.json())
      .then(postsToDisplay => {
        postsToDisplay.forEach(function(post) {
          if (post.userId === user.id) {
            modalContainer.innerHTML += `<div class="modal-content">
              <h2>Title:${post.title}</h2>
              <span>Post ID:${post.id}</span>
              <p>Post:${post.body}</p>
            </div>`;
          }
        });
      })
      .then(() => {
        modalContainer.innerHTML += 
        `<button class="modal-content__add-post-button">
            Add new Post</button>`;
        document
          .querySelector(".modal-content__add-post-button")
          .addEventListener("click", () => newPostForm(user.id));
      });
    modal.style.display = "block";
  });
}

function newPostForm(id) {
  let inputForm = document.querySelector(".input-div");
  inputForm.innerHTML += 
  `<form class="input-div__form">
      <span class="close" onclick="closeFormPopUp()">&#10006;</span>
      <h1 class="input-div__title">New Post</h1><br /><br />
      <label>Enter title:</label>
      <input 
        id="form-title" 
        class="input-div__form__input" 
        placeholder="Your title.."/>
      <label>Enter post text:</label>
      <textarea 
        id="form-text" 
        class="input-div__form__input" 
        rows="10" 
        cols="100" 
        placeholder="Your text.."></textarea>
      <button class="input-div__form__button">Submit</button>
    </form>`;
  inputForm.style.display = "block";
  document
    .querySelector(".input-div__form__button")
    .addEventListener("click", () => {
      event.preventDefault();
      let post = {
        title: document.querySelector("#form-title").value,
        text: document.querySelector("#form-text").value,
        userId: id
      };
      if (CheckIfPostInformationIsOkay(post)) {
        createPost(post);
      }
    });
}

function CheckIfPostInformationIsOkay(post) {
  if (post.title !== "" && post.text !== "") {
    return true;
  }
  alert("You must enter a title and post text");
  return false;
}

function createPost(post) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: post.title,
      text: post.text,
      userId: post.userId
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(alert("successfully created post"))
    .then(closeFormPopUp());
}

function closeModalPopUp() {
  let element = document.querySelector(".modal");
  element.style.display = "none";
  element.innerHTML = "";
}

function closeFormPopUp() {
  let element = document.querySelector(".input-div");
  element.style.display = "none";
  element.innerHTML = "";
}

//event listeners
document.querySelector("#login").addEventListener("click", login);
document.querySelector("#register").addEventListener("click", register);
document
  .querySelector(".input-div__form__button")
  .addEventListener("click", openSecondPage);

//Button for scrolling to the top of the page
window.onscroll = function() {
  scroll();
};

function scroll() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    document.querySelector(".scroll-to-top").style.display = "block";
  } else {
    document.querySelector(".scroll-to-top").style.display = "none";
  }
}

function goToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
