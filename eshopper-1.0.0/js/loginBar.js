let userName =  localStorage.getItem("username");
function loginBar(userName){

    let str = "";
    let token = localStorage.getItem("token")
    if (userName != null) {

        str += `<a href="editprofile.html" class="nav-item nav-link" >Welcome ${userName}</a>
                <a href="shop.html" class="nav-item nav-link" onClick="logout()">Logout</a>`

                // <button class="nav-item nav-link" onClick="logout()">Logout</button>`
    } else {
        str += `<a href="login.html" class="nav-item nav-link">Login</a>
                    <a href="register.html" class="nav-item nav-link">Register</a>`
    }

    return str;

}

document.getElementById("loginBar").innerHTML = loginBar(userName);