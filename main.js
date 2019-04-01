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

//If bool is true then the form is a registration form, if it's false it's a login form
let isPageLoginOrRegistration = true;

//Deciding the first page is a login page and making it into one
function login() {
  if (isPageLoginOrRegistration) {
    document.querySelector(".input-div__form__button").innerHTML = "Login";
    let form = document.querySelector(".login-registration__form");
    form.removeChild(document.querySelector("#confirmPassword"));
    form.removeChild(document.querySelector("#confirmPasswordLabel"));
    isPageLoginOrRegistration = false;
  }
}

//Deciding the first page is a registration page and and making it into one
function register() {
  if (!isPageLoginOrRegistration) {
    document.querySelector(".input-div__form__button").innerHTML =
      "Register";
    document.querySelector(
      ".login-registration__form"
    ).innerHTML += `<label class="login-registration__form__label"
                      id="confirmPasswordLabel">Confirm password</label>
                    <input type="password"
                      class="input-div__form__input"
                      id="confirmPassword"
                      placeholder="Repeat password.."/>`;
    isPageLoginOrRegistration = true;
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
  console.log("Is okay");
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
  //If the variable is true, does the registration code, if it's false, does the login code
  if (isPageLoginOrRegistration) {
    //Does the literal registration here
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
      //Does the literal login here
      let user = localStorage.getItem(
        document.querySelector("#username").value
      );
      createSecondPage();
    }
  }
}

function createSecondPage() {
  body.innerHTML = `<div class="main__offers""></div>
                    <div class="modal"></div>`;
  let placeInPageToAddCode = document.querySelector(".main__offers");
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(date => date.json())
    .then(users => {
      users.forEach(function(user) {
        addMainContent(user);
      });
      users.forEach(function(user, index){
        addDetailsPopUp(user, index);
        addPostsPopUp(user, index);
      });
    });
  placeInPageToAddCode.innerHTML += `<button class="scroll-to-top" 
    onclick="goToTop()"><i class="upArrow"></i></button>`;
}

function addMainContent(user){
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

function addDetailsPopUp(user, index){
  let image = document.querySelectorAll(".item__img")[index];
  let modal = document.querySelector(".modal");
  image.addEventListener("click", () => {
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

function addPostsPopUp(user, index){
  let buttons = document.querySelectorAll(".item__button")[index];
  let modal = document.querySelector(".modal");
  buttons.addEventListener("click", () => {
    modal.innerHTML += 
      `<div class="container">
        <div class="modal-content">
          <span class="close" onclick="closeModalPopUp()">&#10006;</span>
          <h1>User ID:${user.id}</h1>
        </div>
    </div>`;
    let basicModulDiv = document.querySelector(".container");
    fetch("https://jsonplaceholder.typicode.com/users/1/posts")
      .then(date => date.json())
      .then(postsToDisplay => {
        postsToDisplay.forEach(function(post) {
          if (post.userId === user.id) {
            basicModulDiv.innerHTML += 
            `<div class="modal-content">
              <h2>Title:${post.title}</h2>
              <span>Post ID:${post.id}</span>
              <p>Post:${post.body}</p>
            </div>`;
          }
        });
      })
      .then(() => {
        basicModulDiv.innerHTML += 
          `<button class="modal-content__add-post-button">
            Add new Post</button>`;
        document.querySelector(".modal-content__add-post-button")
          .addEventListener("click", () => newPostForm(user.id));
      });
      modal.style.display = "block";
    });
}

function newPostForm(id) {
  body.innerHTML += 
    `<div class="input-div">
      <form class="input-div__form">
        <span class="close" onclick="closeFormPopUp()">&#10006;</span>
        <h1 class="input-div__title">New Post</h1><br /><br />
        <label>Enter title:</label>
        <input id="form-title" class="input-div__form__input" placeholder="Your title.."/>
        <label>Enter post text:</label>
        <textarea id="form-text" class="input-div__form__input" rows="10" cols="100" placeholder="Your text.."></textarea>
        <button class="input-div__form__button">Submit</button>
      </form>
    </div>`;
  
  document.querySelector(".input-div__form__button")
    .addEventListener("click", () => {
    event.preventDefault();
    let post = {
      title: document.querySelector("#form-title").value,
      text: document.querySelector("#form-text").value,
      userId : id
    }
    if(CheckIfPostOkay(post)){
      createPost(post);
    }
  })
}

function CheckIfPostOkay(post) {
  if(post.title !== "" && post.text !== ""){ 
    return true; }
  alert("You must enter a title and post text");
  return false; 
}

function createPost(post) {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
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
  .then(closeFormPopUp())
}

function closeModalPopUp() {
  let element = document.querySelector(".modal");
  element.style.display = "none";
  element.innerHTML = "";
}

function closeFormPopUp(){
  let element = document.querySelector(".input-div");
  element.style.display = "none";
  element.innerHTML = "";
  createSecondPage();
}

//If the local storage is empty then the first page must load as a register page
//Othervise it loads as a login page
if (localStorage.length !== 0) {
  login();
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
