let id = localStorage.getItem("id");


function getDetail() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/home/" + id,
        //xử lý khi thành công
        success: function (data) {
            // document.getElementById("tbody").innerHTML =  showDetail(data);
            showDetail(data);

        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showDetail(product){
    document.getElementById("nameProduct").innerHTML =product.nameProduct;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("content").innerHTML = product.content;
    document.getElementById("image").src = product.img;
    document.getElementById("id").value = product.idProduct;
}


getDetail();


function orderProduct() {
    alert("jdngvekns");
    let id = $("#id").val();
    let name = document.getElementById("nameProduct").innerText;
    let price = document.getElementById("price").innerText;
    let img = document.getElementById("image").src;

    let size = "";
    let arr = document.getElementsByName("size");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
            size = arr[i].value;
        }
    }
    let color = "";
    let arr2 = document.getElementsByName("color");
    for (let i = 0; i < arr2.length; i++) {
        if (arr2[i].checked) {
            color = arr2[i].value;
        }
    }

    let product = {
        idProduct: id,
        nameProduct: name,
        price: price,
        size: {
            idSize: size
        },
        color: {
            idColor: color
        },
        img: img
    }

    console.log(product);
            // $.ajax({
            //     type: "POST",
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     url: "http://localhost:8080/home/" + id,
            //     data: JSON.stringify(product),
            //     //xử lý khi thành công
            //     success: function (data) {
            //         console.log("data")
            //         console.log("data")
            //         console.log("data")
            //         console.log(data)
            //         getCart();
            //     },
            //     error: function (err) {
            //         console.log(err)
            //     }
            // })
}

// function getCart(){
//     window.location.href="detailProduct.html";
// }


