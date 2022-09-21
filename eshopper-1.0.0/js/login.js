function login() {

    let username = $("#username").val();
    let password = $("#password").val();

    let account = {
        username: username,
        password: password
    }
    let token = localStorage.getItem("token");

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
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username)
            localStorage.setItem("idAccount", data.idAccount)
            console.log("data")
            console.log(data)


            if (data.role == "ROLE_USER"){
                location.href = "shop.html"
            }else if (data.role == "ROLE_ADMIN"){
                location.href = "Admin.html"
            }else {
                location.href = "404.html";
            }

            // alert("Đăng nhập thành công")
        },
        error: function (err) {
            console.log(err)
            alert("Sai tài khoản hoặc mật khẩu. Vui lòng nhập lại!")
        }
    })
}
