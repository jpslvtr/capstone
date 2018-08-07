function buildNotificationModal(header, message, modalId){
  var str = '<div class="modal fade"';
  str +=  ' id="' + modalId + '"';
  str += ' tabindex="-1" role="dialog" aria-labelledby="notifyModalLabel" aria-hidden="true"> <div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
  str += header;
  str += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body mx-3">';
  str += message;
  str += '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>';
  return str;
}

function addVerifyButton(){
  var area = document.getElementById("verify_area");
  area.innerHTML = "<hr><br> Your email is not yet verified. Click here to verify!";
  area.innerHTML += '<br><button type="button" id="verify_button" class="btn btn-primary" onclick=sendValidateEmail()>Validate</button>';
}

function sendValidateEmail(){
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      $("#email_validation_modal").modal('show');
    }, function(error) {
      console.log("error sending validation email");
    });
}

firebase.auth().onAuthStateChanged(function(user){
  var curUser = firebase.auth().currentUser;
  if(curUser != null){
    curUser.reload();
  }
  if (user) {
    if(!user['emailVerified']){
      console.log("HERE");
      document.getElementById("main_container").innerHTML += '<div id="verify_area"></div>';
      addVerifyButton();
    }
    else{
      document.getElementById("main_container").innerHTML += '<p>You are a verified user!</p>'
    }
  }
});

// https://tchalla-id.firebaseapp.com/__/auth/action/?mode=verifyEmail&oobCode=N0cIq1Ec7Tyu7Lvd5NtNHEhysambRPBb8QzfR0GtKj8AAAFlEPCXUw&apiKey=AIzaSyCFJM3V57Dci3_lsVXh0zs8nz9FoOCMB3A&lang=en
