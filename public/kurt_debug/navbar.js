function buildNavbar(logged_in){
  console.log("Building the navbar");
  var elem = document.getElementById("navbar");

  //Basic navbar header
  var str =   '<nav class="navbar navbar-expand-lg navbar-dark bg-primary">';

  str += '<a class="navbar-brand" href="#">Lender</a>';

  //Toggles the navbar in case the screen is too small
  str +=  '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">';
  str +=  '<span class="navbar-toggler-icon"></span>';
  str +=  '</button>';

  //Begin the content of the navbar
  str +=  '<div class="collapse navbar-collapse" id="navbarToggler">';
  str +=  '<ul class="navbar-nav">';
  //Making the user drop down for logging in or signing out
  str +=  '<li class="nav-item dropdown">';
  str +=  '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="fa fa-user"></span></a>'
  str +=  '<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">';
  if(logged_in){
    str += '<a class="dropdown-item" style="cursor: pointer;" onclick=signoutUser()>Sign out</a>';
    str += '<a class="dropdown-item" style="cursor: pointer;" href="../kurt_debug/userDash.html">User Dash</a>';
  }
  else{
    str += '<a class="dropdown-item" href="../kurt_debug/login.html">Log in</a>';
  }
  str +=  '</div>';
  str +=  '</li>'; //End of the user dropdown menu

  str +=  '</ul>'; //End of navbar items
  str +=  '</div>'; //End of navbar content
  str +=  '</nav>'; //Navbar footer

  elem.innerHTML = str;
}
