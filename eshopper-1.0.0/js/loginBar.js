function loginBar() {
    let str = "";
    let token = localStorage.getItem("userName")
    if (token != "") {

        str += `<a href="" class="nav-item nav-link">Login</a>
                    <a href="" class="nav-item nav-link">Register</a>`
    } else {
        str += `<input type="submit" value="Logout" className="btn btn-black" onClick="logout()">`
    }
}
        document.getElementById("loginBar").innerHTML = str;

