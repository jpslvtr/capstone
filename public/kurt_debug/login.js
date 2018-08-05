function signupUser(method){
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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("User is signed in");
    document.getElementById("signup_buttons").innerHTML = "";

    var userData = JSON.stringify(user);

    var area = document.getElementById("signed_in_area");
    area.innerHTML += "User " + user['displayName'] + " signed in. <br />";
    area.innerHTML += "Data available from user: <br />";
    area.innerHTML += userData;
    area.innerHTML += "<br /><br />";

    add_signout_button();

   } else {
    console.log("No user is signed in");
  }
});
