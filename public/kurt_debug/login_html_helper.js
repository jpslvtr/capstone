//Input listeners for the modal inputs
document.getElementById("email_entry").addEventListener("input", function(){
  validateEmail(document.getElementById("email_entry"), document.getElementById("email_alert"))
});
document.getElementById("password_entry").addEventListener("input", function(){
  validatePassword(document.getElementById("password_entry"), document.getElementById("password_alert"))
});
document.getElementById("password_confirmation").addEventListener("input", function(){
  validatePasswordConfirmation(document.getElementById("password_entry"), document.getElementById("password_confirmation"), document.getElementById("password_confirmation_alert"))
});
document.getElementById("login_email_entry").addEventListener("input", function(){
  validateEmail(document.getElementById("login_email_entry"), document.getElementById("login_email_alert"))
});

//Enter listeners for the modals
$("body").on('keyup', '#login_email_entry', function(event){
  var code = event.keyCode;
  if(code === 13){
    document.getElementById("login_modal_button").click();
  }
});
$("body").on('keyup', '#login_password_entry', function(event){
  var code = event.keyCode;
  if(code === 13){
    document.getElementById("login_modal_button").click();
  }
});
$("body").on('keyup', '#email_entry', function(event){
  var code = event.keyCode;
  if(code === 13){
    document.getElementById("signup_modal_button").click();
  }
});
$("body").on('keyup', '#password_entry', function(event){
  var code = event.keyCode;
  if(code === 13){
    document.getElementById("signup_modal_button").click();
  }
});
$("body").on('keyup', '#password_confirmation', function(event){
  var code = event.keyCode;
  if(code === 13){
    document.getElementById("signup_modal_button").click();
  }
});

//Triggered when the user changes their auth state
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("signup_buttons").innerHTML = "";

    var userData = JSON.stringify(user);

    var area = document.getElementById("signed_in_area");
    area.innerHTML += "User " + user['displayName'] + " signed in. <br />";
    area.innerHTML += "Data available from user: <br />";
    area.innerHTML += userData;
    area.innerHTML += "<br /><br />";

    add_signout_button();
    buildNavbar(true);

   } else {
    console.log("No user is signed in");
    buildNavbar(false);
  }
});
