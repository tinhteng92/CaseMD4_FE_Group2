let listAccount = null;

$.ajax({
    type: "GET",
    headers: {
        //kiểu dữ liệu nhận về
        // 'Accept': 'application/json',
        // kiểu truyền đi
        'Content-Type': 'application/json'
    },
    url: "http://localhost:8080/register",
    //xử lý khi thành công
    success: function (data) {
        listAccount = data;
    },
    error: function (err) {
        console.log(err)
    }
})

function register() {
    let username = document.getElementById("userName").value;
    let displayName = document.getElementById("displayName").value;
    let gender = document.getElementById("gender").value;
    let address = document.getElementById("address").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let passwordd = document.getElementById("passwordd").value;
    // let passwordUser= document.getElementById("passwordUser").value;
    let appUser = {
        username: username,
        displayName: displayName,
        gender: gender,
        address: address,
        phoneNumber: phoneNumber,
        password: passwordd,
    }

    let check = true;
    let messageErr = "";
    // let sameUserName= "";

    if (username == "" || username == null) {
        messageErr = " Please fill in the information!";
        document.getElementById("nullUserName").innerText = messageErr;

    }else {
        for (let i = 0; i < listAccount.length; i++) {
            if (listAccount.username == username) {
                messageErr = " This account has already existed! "
                document.getElementById("userName").innerText = messageErr;
            }
        }
        !check;
    }
    if (displayName == "" || displayName == null) {
        messageErr = " Please fill in the information!";
        document.getElementById("nullDisplayname").innerText = messageErr;
        !check;
    }

    if (gender == "" || gender == null) {
        messageErr = " Please fill in the information!";
        document.getElementById("nullGender").innerText = messageErr;
        !check;
    }
    if (address == "" || address == null) {
        messageErr = " Please fill in the information!";
        document.getElementById("nullAddress").innerText = messageErr;
        !check;
    }
    if (phoneNumber == "" || phoneNumber == null) {
        messageErr = " Please fill in the information!";
        document.getElementById("nullPhoneNumber").innerText = messageErr;
        !check;
    }
    if (password == "" || password == null) {
        messageErr = " Please fill in the information!";
        document.getElementById("nullPassword").innerText = messageErr;
        return !check;

    }


    if (check) {
        $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/register",
            data: JSON.stringify(appUser),

            //xử lý khi thành công
            success: function (data) {

                listAccount = data

                console.log(appUser)
                alert(" Đăng ký thành công ");
                getLogin();

            },
            error: function (err) {
                console.log(err)
            }
        })


    }
}

function getLogin() {
    window.location.href = "login.html";
}


