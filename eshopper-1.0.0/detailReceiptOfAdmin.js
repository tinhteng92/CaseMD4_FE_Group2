let  idAccount = localStorage.getItem("idAccount");
let  timeP = localStorage.getItem("timeP");
let timePayment = timeP.replace("T"," ");

showDetailReceipt(idAccount,timePayment);
function showDetailReceipt (idAccount, timePayment){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: `http://localhost:8080/detailReceipts/${idAccount}/${timePayment}`,
        // xu ly khi thanh cong
        success: function (data){
            console.log("detail receipt");
            console.log(data);
            showListReceipt(data);
        },
        error: function (err){
            console.log(err)
        }
    })
}

function showListReceipt(data) {
    let str = "";
    for (let i = 0; i < data.length; i++) {
        let total = data[i].product.price * data[i].quantityOrder;
        str += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${data[i].product.nameProduct}</td>
            <td><img src="${data[i].product.img}" width="200" height="200"></td>
            <td>${data[i].product.size.nameSize}</td>
            <td>${data[i].product.color.nameColor}</td>
            <td>$${data[i].product.price}</td>
            <td>${data[i].quantityOrder}</td>
            <td>$${total}</td>            
        </tr>
    `
    }

    document.getElementById("showDetailReceipt").innerHTML = str;

}