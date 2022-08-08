function login() {

    let username = $("#username").val();
    let password = $("#password").val();

    let account = {
        username: username,
        password: password
    }

    $.ajax({
        type: "POST",
        headers: {
            //kiểu dữ liệu nhận về
            // 'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/login",
        data: JSON.stringify(account),
        //xử lý khi thành công
        success: function (data) {

            alert(data.role)
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", data.nameAccountLogin)
            location.href = "shop.html"
            // document.getElementById("UserName").innerHTML = localStorage.getItem("userName")
            alert("Đăng nhập thành công")
            if (data.role == "ROLE_USER"){
                location.href = "home.html"
            }
            else if (data.role == "ROLE_ADMIN"){
                location.href = "shop.html"
                // alert(document.getElementById("1").value)
                }
            },
        error: function (err) {
            console.log(err)
            alert("Sai tài khoản hoặc mật khẩu. Vui lòng nhập lại!")
        }
    })
}

