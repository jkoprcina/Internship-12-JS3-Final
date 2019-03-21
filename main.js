let registration = document.querySelector("body");
registration.innerHTML += `<div class="login-registration">
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
//if bool is true then the form is a registration form, if it's false it's a login form
let isLoginOrRegistration = true;

let login = function () {
  if(isLoginOrRegistration){
  document.querySelector(".login-registration__button").innerHTML = "Login";
  let form = document.querySelector(".login-registration__form");
  let inputToRemove = document.querySelector("#confirmPassword");
  let labelToRemove = document.querySelector("#confirmPasswordLabel");
  form.removeChild(inputToRemove);
  form.removeChild(labelToRemove);
  isLoginOrRegistration = false;
  }
}

let register = function() {
  if(!isLoginOrRegistration){
  document.querySelector(".login-registration__button").innerHTML = "Register";
  document.querySelector(".login-registration__form").innerHTML +=  
  `<label class="login-registration__form__label"
    id="confirmPasswordLabel">Confirm password</label>
  <input type="text"
    class="login-registration__form__input"
    id="confirmPassword"/>`
  isLoginOrRegistration = true;
  }
}

if (localStorage.length !== 0) {
  login();
}

let enter = function(){
  //First check if all information is good, tell the user if it's not
  if(checkInfo){

  }
  else{
    alert("not good");
  }
  //If everything is okay, check if it's a new or old user and open the page
  if(isLoginOrRegistration){
    
  }
  else{

  }
}

//event listeners 
document.querySelector("#login").addEventListener("click", login);
document.querySelector("#register").addEventListener("click", register);
document.querySelector(".login-registration__button").addEventListener("click", enter);


