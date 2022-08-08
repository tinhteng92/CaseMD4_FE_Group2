let token = localStorage.getItem("token")
getEditprofile()
function showEditprofile(Account) {
    document.getElementById("username").innerHTML = Account.username;
    document.getElementById("password").value = Account.password;
    document.getElementById("displayname").value = Account.displayName;
    document.getElementById("gender").value = Account.gender;
    document.getElementById("address").value = Account.address;
    document.getElementById("phonenumber").value = Account.phoneNumber;
}
function getEditprofile(userName) {
        userName = localStorage.getItem("userName")
        console.log(userName)
        $.ajax({
            type: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            url: "http://localhost:8080/profile/" + userName,
            //xử lý khi thành công
            success: function (data) {
                showEditprofile(data);
                console.log(data)
            },
            error: function (err) {
                console.log(err)
            }
    })

}


function Editpr() {
    let idAccount = document.getElementById("idAccount").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let displayname = document.getElementById("displayname").value;
    let gender = document.getElementById("gender").value;
    let address = document.getElementById("address").value;
    let phonenumber = document.getElementById("phonenumber").value;


    let Account = {
        idAccount:idAccount,
        username:username,
        password: password,
        displayname: displayname,
        gender: gender,
        address: address,
        phonenumber: phonenumber,
    }
    callEditpr(Account);

}

function callEditpr(Account){
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        url: "http://localhost:8080/profile/edit",
        data: JSON.stringify(Account),
        //xử lý khi thành công
        success: function (data) {
            console.log(data)
            alert("Lưu thông tin thành công")
        },
        error: function (err) {
            console.log(err)
        }
    })
}
