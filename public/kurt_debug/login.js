function signupUser(method, email, password){
  console.log("User trying to sign up with: " + method);

  var provider = "";

  if (method == "facebook"){
    provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    provider.setCustomParameters({
      'display': 'popup'
    });
  }

  else if (method == "google"){
    provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });

  }

  if (provider != ""){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
  }

}

function validateEmail(email, email_alert) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(email.value)){
    email_alert.innerHTML = "Please enter a valid email";
    email.focus();
    return false;
  }
  else{
    email_alert.innerHTML = "";
    return true;
  }
}

function validatePassword(pass, pass_alert){
  if(pass.value.length < 8) {
    pass_alert.innerHTML = "Password must be at least 8 characters";
    pass.focus();
    return false;
  }
  var re = /[0-9]/;
  if(!re.test(pass.value)) {
    pass_alert.innerHTML = "Must contain a number";
    pass.focus();
    return false;
  }
  re = /[a-z]/;
  if(!re.test(pass.value)) {
    pass_alert.innerHTML = "Must contain a lowercase letter";
    pass.focus();
    return false;
  }
  re = /[A-Z]/;
  if(!re.test(pass.value)) {
    pass_alert.innerHTML = "Must contain an uppercase letter";
    pass.focus();
    return false;
  }
  if(pass.value.match(/[\<\>!@#\$%^&\*,'"\\/ ]+/i) ) {
    pass_alert.innerHTML = "Password cannot contain an illegal character";
    pass.focus();
    return false;
  }
  pass_alert.innerHTML = "";
  return true;
}

function validatePasswordConfirmation(pass, pass_conf, pass_conf_alert){
  if(pass.value != pass_conf.value){
    pass_conf_alert.innerHTML = "The two passwords do not match";
    pass_conf.focus();
    return false;
  }
  pass_conf_alert.innerHTML = "";
  return true;
}

function validateSignupModal(){
  var email = document.getElementById("email_entry");
  var pass = document.getElementById("password_entry");
  var pass_conf = document.getElementById("password_confirmation");

  var email_alert = document.getElementById("email_alert");
  var pass_alert = document.getElementById("password_alert");
  var pass_conf_alert = document.getElementById("password_confirmation_alert");

  var valid = true;

  if(email.value == "" ){
    email_alert.innerHTML = "Please enter an email";
    email.focus();
    valid = false;
  }
  else if(!validateEmail(email, email_alert)){
    valid = false;
  }
  else{
    email_alert.innerHTML = "";
  }

  if(pass.value == "" ){
    pass_alert.innerHTML = "Please enter a password";
    pass.focus();
    valid = false;
  }
  else if(!validatePassword(pass, pass_alert)){
    valid = false;
  }
  else{
    pass_alert.innerHTML = "";
  }

  if(pass_conf.value == "" ){
    pass_conf_alert.innerHTML = "Please confirm your password";
    pass_conf.focus();
    valid = false;
  }
  else if(!validatePasswordConfirmation(pass, pass_conf, pass_conf_alert)){
    valid = false;
  }
  else{
    pass_conf_alert.innerHTML = "";
  }

  if(valid){
    firebase.auth().createUserWithEmailAndPassword(email.value, pass.value)
    .then(result => {
      email_alert.innerHTML = "";
      $("#signupModal").modal('hide');
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      email_alert.innerHTML = "This email is already in use";
      email.focus();
      // ...
    });
  }

}

function validateLoginModal(){
  var email = document.getElementById("login_email_entry");
  var pass = document.getElementById("login_password_entry");

  var email_alert = document.getElementById("login_email_alert");
  var pass_alert = document.getElementById("login_password_alert");

  var valid = true;

  if(email.value == "" ){
    email_alert.innerHTML = "Please enter an email";
    email.focus();
    valid = false;
  }
  else if(!validateEmail(email, email_alert)){
    valid = false;
  }
  else{
    email_alert.innerHTML = "";
  }

  if(pass.value == "" ){
    pass_alert.innerHTML = "Please enter a password";
    pass.focus();
    valid = false;
  }
  else{
    pass_alert.innerHTML = "";
  }

  if(valid){
    firebase.auth().signInWithEmailAndPassword(email.value, pass.value)
      .then(result => {
        email_alert.innerHTML = "";
        $("#loginModal").modal('hide');
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode == "auth/user-not-found"){
          email_alert.innerHTML = "We can't find a user with that email";
        }
        else{
          email_alert.innerHTML = "Email/password combination incorrect";
        }
        email.focus();
        // ...
      });

  }
}

function signoutUser(){
  console.log("User signing out");
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    location.reload();
  }).catch(function(error) {
    // An error happened.
  });
}

function add_signout_button(){
  var area = document.getElementById("signed_in_area");
  area.innerHTML += '<div type="button" class="btn btn-danger" onclick=signoutUser()>Sign Out</div>'
}

//Virtually clicks the button when user hits enter on keyboard
function clickButton(event, button_id){
  event.preventDefault();
  if(event.keyCode === 13){
    document.getElementById(button_id).click();
  }
}

function refreshPage(){
  location.reload();
}
