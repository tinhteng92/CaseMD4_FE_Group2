// let soLuongList = new Array(100);

let idAccount = localStorage.getItem("idAccount");
let arrayProduct = [];
function totalOneIncrease(index) {
    // js tang so luong
    let soluong = document.getElementsByClassName("soluong");
    let storage = document.getElementsByClassName("storage");
    if (parseInt(soluong[index].value) <= parseInt(storage[index].innerText) - 1) {
        let newSoluong = parseInt(soluong[index].value) + 1;
        soluong[index].value = newSoluong;
    }

    let price = document.getElementsByClassName("giatien");
    let quantityP = document.getElementsByClassName("soluong");
    let totalOne = document.getElementsByClassName("tongtien");

    totalOne[index].innerText = parseInt(price[index].innerText) * parseInt(quantityP[index].value);
    totalPayment();
}




function totalOneDecrease(index) {
    let soluong = document.getElementsByClassName("soluong");
    let newSoluong = 1;
    if (parseInt(soluong[index].value) > 1) {
        newSoluong = parseInt(soluong[index].value) - 1;
    }
    soluong[index].value = newSoluong;

    let price = document.getElementsByClassName("giatien");
    let quantityP = document.getElementsByClassName("soluong");
    let totalOne = document.getElementsByClassName("tongtien");

    if (+totalOne[index].innerText > +price[index].innerText) {
        totalOne[index].innerText = +price[index].innerText * parseInt(quantityP[index].value);
    } else {
        totalOne[index].innerText = price[index].innerText;
    }
    totalPayment();
}

$(document).ready(
    getListProduct()
);



function getListProduct(){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/carts",
        //xử lý khi thành công
        success: function (data) {
            console.log("data");
            console.log(data);
            showListProductToCart(data);
            totalStart();
        },
        error: function (err) {
            console.log(err)
        }
    })
}




function totalStart() {
    let totalStart = 0;
    let price = document.getElementsByClassName("giatien");
    for (let i = 0; i < price.length; i++) {
        totalStart += +price[i].innerText;
    }
    document.getElementById("totalPayment").innerText = totalStart;
}




function totalPayment() {
    let totalOne = document.getElementsByClassName("tongtien");
    let totalStart = 0;
    for (let i = 0; i < totalOne.length; i++) {
        totalStart += +totalOne[i].innerText;
    }
    document.getElementById("totalPayment").innerText = totalStart;
}





function showListProductToCart(productList) {
    // getSoLuongList();
    let str = "";
    for (let i = 0; i < productList.length; i++) {
        arrayProduct.push(productList[i]);
        str += `
            <tr>
                <td class="align-middle"><img src="${productList[i].img}" alt="" style="width: 50px;">${productList[i].nameProduct}</td>
                    <td class="align-middle"><span>$</span><span class="giatien">${productList[i].price}</span></td>
                        <td class="align-middle">
                             <div class="input-group quantity mx-auto" style="width: 100px;">
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-primary btn-minus giam-soluong" onclick="totalOneDecrease(${i})">
                                        <i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" class="form-control form-control-sm bg-secondary text-center soluong" value="1">                      
                                    <div class="input-group-btn">
                                        <button class="btn btn-sm btn-primary btn-plus tang-soluong" onclick="totalOneIncrease(${i})">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                    <h6><span >Storage:<span class="storage">${productList[i].quantity}</span></span></h6>
                             </div>
                        </td>
                    <td class="align-middle"><span>$</span><span class="tongtien">${productList[i].price}</span></td>
                <td class="align-middle"><a href=""><button class="btn btn-sm btn-primary" onclick="deleteProductFromCart(${productList[i].idProduct})"><i class="fa fa-times"></i></button></a></td>
            </tr>
        `;
    }
    document.getElementById("showListToCart").innerHTML = str;
}



function deleteProductFromCart(idProduct) {
    $.ajax({
        type: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/carts/" + idProduct,
        //xử lý khi thành công
        success: function (data) {
            console.log("Delete product");
            console.log(data);
            getListProduct();
        },
        error: function (err) {
            console.log(err)
        }
    })
}





let arrayQuantity = [];
function createReceipt() {
    let quantityP = document.getElementsByClassName("soluong");
    let totalPayment = document.getElementById("totalPayment");
    let timeNow = new Date();

    for (let i = 0; i < quantityP.length; i++) {
        arrayQuantity.push(quantityP[i].value);
    }

    let receipt = {
        timePayment : timeNow,
        totalPrice : totalPayment.innerText,
        account : {
            idAccount : idAccount
        }
    }

    console.log(receipt);
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/receipts",
        data: JSON.stringify(receipt),
        //xử lý khi thành công
        success: function (data) {
            console.log("receipt")
            console.log(data)
            console.log("add to receipt api success")

        },
        error: function (err) {
            console.log(err)
        }
    })

    for (let i = 0; i < arrayQuantity.length; i++) {
        let detailReceipt = {
            product : arrayProduct[i],
            quantityOrder : arrayQuantity[i],
            timeOrder : timeNow,
            account : {
                idAccount : idAccount
            }
        }
        $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/detailReceipts",
            data: JSON.stringify(detailReceipt),
            //xử lý khi thành công
            success: function (data) {
                console.log("detailReceipt")
                console.log(data)
                console.log("add to detail receipt api success")

            },
            error: function (err) {
                console.log(err)
            }
        })

        let quantityP = arrayProduct[i].quantity - arrayQuantity[i];
        arrayProduct[i].quantity = quantityP;
        $.ajax({
            type: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/home",
            data: JSON.stringify(arrayProduct[i]),
            //xử lý khi thành công
            success: function (data) {
                console.log("update quantity")
                console.log(data)
                console.log("update quantity success")

            },
            error: function (err) {
                console.log(err)
            }
        })
    }
    alert("Thank you for buying");
    getListEmpty();
    alert("check")
}



function getListEmpty(){
    $.ajax({
        type: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/carts",
        //xử lý khi thành công
        success: function (data) {
            alert("bhbdk")
            console.log("data");
            console.log(data);
            showListProductToCart(data);
            totalStart();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

