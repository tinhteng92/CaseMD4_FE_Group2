let username = localStorage.getItem("username");

function getEditUser(){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: `http://localhost:8080/profile?username=` + username,
        // xu ly khi thanh cong
        success: function (data){
            console.log(data)
            document.getElementById("showList").innerHTML = showData(data);
            totalPages = data.totalPages;
            // showData(data.content);
        },
        error: function (err){
            console.log(err)
        }
    })
}