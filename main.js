let body = document.querySelector("body");

//Generating the html and css needed to make the login/register page
function createFirstPage() {
  body.innerHTML += `<div class="login-registration">
    <nav class="login-registration__nav">
      <span class="login-registration__nav__label" id="login">Login</span>
      <span class="login-registration__nav__label" id="register">Registration</span>
    </nav>
    <form class="login-registration__form">
      <label class="login-registration__form__label"
        >Username</label>
      <input
        type="text"
        class="login-registration__form__input"
        id="username"/>
      <label class="login-registration__form__label"
        >Password</label>
      <input
        type="password"
        class="login-registration__form__input"
        id="password"/>
      <label class="login-registration__form__label"
        id="confirmPasswordLabel">Confirm password</label>
      <input
        type="password"
        class="login-registration__form__input"
        id="confirmPassword"/>
    </form>
    <button class="login-registration__button">Register</button>
  </div>`;
}

//If bool is true then the form is a registration form, if it's false it's a login form
let isPageLoginOrRegistration = true;

//Deciding the first page is a login page and making it into one
function login() {
  if (isPageLoginOrRegistration) {
    document.querySelector(".login-registration__button").innerHTML = "Login";
    let form = document.querySelector(".login-registration__form");
    form.removeChild(document.querySelector("#confirmPassword"));
    form.removeChild(document.querySelector("#confirmPasswordLabel"));
    isPageLoginOrRegistration = false;
  }
}

//Deciding the first page is a registration page and and making it into one
function register() {
  if (!isPageLoginOrRegistration) {
    document.querySelector(".login-registration__button").innerHTML =
      "Register";
    document.querySelector(
      ".login-registration__form"
    ).innerHTML += `<label class="login-registration__form__label"
                      id="confirmPasswordLabel">Confirm password</label>
                    <input type="password"
                      class="login-registration__form__input"
                      id="confirmPassword"/>`;
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

//Generating the main page, full of api information
function createSecondPage() {
  body.innerHTML = `<div class="main__offers""></div>`;
  let divToAddContentTo = document.querySelector(".main__offers");

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(date => date.json())
    .then(arrayOfPeopleToDisplay => {
      arrayOfPeopleToDisplay.forEach(function(item) {
        //Creating each person's information into an element
        divToAddContentTo.innerHTML += `<div class ="offers__item">
            <img class="item__img" src="img/user.jpg"/>
            <p class="item__img-description">${item.name}</p>
            <p class="item__paragraph">Email: ${item.email}</p>
            <span class="item__price">City: ${item.address.city}</span>
            <button class="userDetails" class="item__button">Details</button>
            <button class="userPosts" class="item__button">Posts</button>
          </div>`;
      });
      setClickOnDetailButtons();
      setClickOnPostButtons();
      divToAddContentTo.innerHTML += `<button class="scroll-to-top"></button>`;
      document.querySelector(".scroll-to-top")
        .addEventListener("click", goToTopFunction);
    });
}

function setClickOnDetailButtons() {
  document.querySelectorAll(".userDetails").forEach(function(detailButton) {
    detailButton.addEventListener("click", function() {
      getUsersDetailsAndShowThem(
        detailButton.parentNode.children[1].textContent
      );
    });
  });
}

function setClickOnPostButtons() {
  document.querySelectorAll(".userPosts").forEach(function(postButton) {
    postButton.addEventListener("click", function() {
      getUsersPostsAndShowThem(postButton.parentNode.children[1].textContent);
    });
  });
}

function getUsersDetailsAndShowThem(nameWeHave) {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(date => date.json())
    .then(arrayOfPeopleToDisplay => {
      arrayOfPeopleToDisplay.forEach(user => {
        if (user.name === nameWeHave) {
          body.innerHTML += `<div class="modal">
          <div class="container">
            <div class ="modal-content">
              <span class="close">&#10006;</span>
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
            </div>
          </div>`;
          document
            .querySelector(".close")
            .addEventListener("click", ClosePopUp);
        }
      });
    });
}

function getUsersPostsAndShowThem(nameWeHave) {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(date => date.json())
    .then(arrayOfPeopleToDisplay => {
      arrayOfPeopleToDisplay.forEach(user => {
        if (user.name === nameWeHave) {
          body.innerHTML += `<div class="modal">
            <div class="container">
            <div class="modal-content">
              <h1>User ID:${user.Id}</h1>
              <span class="close">&#10006;</span>
            </div>
            </div>
          </div>`;
          document
            .querySelector(".close")
            .addEventListener("click", ClosePopUp);
          let basicModulDiv = document.querySelector(".container");
          console.log(basicModulDiv);
          fetch("https://jsonplaceholder.typicode.com/users/1/posts")
            .then(date => date.json())
            .then(arrayOfPostsToDisplay => {
              arrayOfPostsToDisplay.forEach(function(post) {
                if (post.userId === user.id) {
                  basicModulDiv.innerHTML += `<div class="modal-content">
                    <h2>Title:${post.title}</h2>
                    <span>Post ID:${post.id}</span>
                    <p>Post:${post.body}</p>
                  </div>`;
                }
              });
            });
        }
      });
    });
}

function ClosePopUp() {
  body.removeChild(document.querySelector(".modal"));
}
createFirstPage();
//If the local storage is empty then the first page must load as a register page
//Othervise it loads as a login page
if (localStorage.length !== 0) {
  login();
}
//event listeners
document.querySelector("#login")
  .addEventListener("click", login);
document.querySelector("#register")
  .addEventListener("click", register);
document
  .querySelector(".login-registration__button")
  .addEventListener("click", openSecondPage);

//Button for scrolling to the top of the page
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    document.querySelector(".scroll-to-top").style.display = "block";
  } else {
    document.querySelector(".scroll-to-top").style.display = "none";
  }
}

function goToTopFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
