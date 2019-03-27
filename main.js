let body = document.querySelector("body");

//Generating the html and css needed to make the login/register page
let createFirstPage = function() {
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
        type="text"
        class="login-registration__form__input"
        id="password"/>
      <label class="login-registration__form__label"
        id="confirmPasswordLabel">Confirm password</label>
      <input
        type="text"
        class="login-registration__form__input"
        id="confirmPassword"/>
    </form>
    <button class="login-registration__button">Register</button>
  </div>`;
};

const basicPopUpModul = 
  `<div id="myModal" class="modal">
    <div class="modal-content">
    </div>
  </div>`;

let showUserPosts = function(user){
  body.innerHTML += basicPopUpModul;
  let basicModulDiv = document.querySelector("#myModal");
  fetch("https://jsonplaceholder.typicode.com/users/1/posts")
    .then(date => date.json())
    .then(arrayOfPostsToDisplay => {
      arrayOfPostsToDisplay.forEach(function(post) {
        if(post.UserId === user.Id){
          basicModulDiv.innerHTML += `<div class="modal-content">
                                        <h1>${post.title}</h1>
                                        <p>${post.body}</p>
                                      </div>`
        }
      });
    });
}

let showUserDetails = function(){

}

let getUser = function(){
  
}
let setClickOnPostButtons = function() {
  document.querySelectorAll(".userDetails").forEach(function(postButton) {
    postButton.addEventListener("click", function() {
      let user = getUser();
      showUserPosts(user);
    });
  });
} 

let setClickOnDetailButtons = function(){
  document.querySelectorAll(".userPosts").forEach(function(detailButton) {
    detailButton.addEventListener("click", function() {
      let user = getUser();
      showUserDetails(user);
    });
  });
}

//Generating the main page, full of api information
let createSecondPage = function() {
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
          <button class="item__button" class="userDetails">Details</button>
          <button class="item__button" class="userPosts">Posts</button>
          </div>`;
      });
      setClickOnDetailButtons();
      setClickOnPostButtons();
    });
};

//If bool is true then the form is a registration form, if it's false it's a login form
let isPageLoginOrRegistration = true;

//Deciding the first page is a login page and making it into one
let login = function() {
  if (isPageLoginOrRegistration) {
    document.querySelector(".login-registration__button").innerHTML = "Login";
    let form = document.querySelector(".login-registration__form");
    form.removeChild(document.querySelector("#confirmPassword"));
    form.removeChild(document.querySelector("#confirmPasswordLabel"));
    isPageLoginOrRegistration = false;
  }
};

//Deciding the first page is a registration page and and making it into one
let register = function() {
  if (!isPageLoginOrRegistration) {
    document.querySelector(".login-registration__button").innerHTML =
      "Register";
    document.querySelector(".login-registration__form"
    ).innerHTML += `<label class="login-registration__form__label"
                      id="confirmPasswordLabel">Confirm password</label>
                    <input type="text"
                      class="login-registration__form__input"
                      id="confirmPassword"/>`;
    isPageLoginOrRegistration = true;
  }
};

let checkIfUserAlreadyExists = function(username){
  for (var i = 0; i < localStorage.length; i++) {
    if(JSON.parse(localStorage.getItem(localStorage.key(i))).username === username){
      return true;
    }
    return false;
  }
}

let checkIfRegistrationInformationIsOkay = function() {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let passwordRepeat = document.querySelector("#confirmPassword").value;
  if (username === "" || password === "" || passwordRepeat === "") {
    alert("You must enter all information.\n");
    return false;
  } else if (username.length < 5 || username.length > 10) {
    alert("The username is the wrong length.\n");
    return false;
  } else if (password.length < 5 || password.length > 10) {
    alert("The password is the wrong length.\n");
    return false;
  } else if (password !== passwordRepeat) {
    alert("The passwords don't match\n");
    return false;
  } else if(checkIfUserAlreadyExists(username)){
    alert("That username is already taken, try another");
    return false;
  }
  console.log("Is okay");
  return true;
};

let checkIfLoginInformationIsOkay = function() {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  for (let i = 0; i < localStorage.length; i++) {
    if(username === JSON.parse(localStorage.getItem(localStorage.key(i))).username
      && password === JSON.parse(localStorage.getItem(localStorage.key(i))).password){
        return true;
      }
  }
  alert("That user does not exist, try again");
  return false;
};

let openSecondPage = function() {
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
      let user = localStorage.getItem(document.querySelector("#username").value);
      createSecondPage();
    }
  }
};

createFirstPage();
//If the local storage is empty then the first page must load as a register page
//Othervise it loads as a login page
if (localStorage.length !== 0) {
  login();
}
//event listeners
document.querySelector("#login").addEventListener("click", login);
document.querySelector("#register").addEventListener("click", register);
document
  .querySelector(".login-registration__button")
  .addEventListener("click", openSecondPage);
