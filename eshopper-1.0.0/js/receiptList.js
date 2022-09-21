let token = localStorage.getItem("token");

let totalPages = 1;

getData(0);

function getData(pageNumber){

    if(pageNumber < 0){
        pageNumber = 0;
    }
    if(pageNumber > totalPages -1){
        pageNumber = totalPages -1;
    }
    console.log(pageNumber)
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + token

        },
        url: `http://localhost:8080/admin/receipts?page=${pageNumber}`,
        // xu ly khi thanh cong
        success: function (data){
            console.log(data)
            showListReceipt(data.content);
            totalPages = data.totalPages;
        },
        error: function (err){
            console.log(err)
        }
    })
}


function showListReceipt(data) {
    let str = "";
    for (let i = 0; i < data.length; i++) {
        let time = `${data[i].timePayment}`;
        console.log(typeof time);
        let timeP = "'".concat(data[i].timePayment,"'");
        str += `
        <tr>
            <th scope="row">${data[i].idReceipt}</th>
            <td>${data[i].totalPrice}</td>
            <td>${data[i].timePayment}</td>
            <td>${data[i].account.username}</td>
            <td><button type="button" class="btn btn-primary" onclick="showDetailReceipt(${data[i].account.idAccount},${timeP})">Detail</button></td>            
        </tr>
    `
    }

    document.getElementById("listReceipt").innerHTML = str;

}

function showDetailReceipt(idAccount,timeP){

    window.localStorage.setItem("idAccount",idAccount);
    window.localStorage.setItem("timeP",timeP);
    window.location.href="detailReceiptionAdmin.html";
}