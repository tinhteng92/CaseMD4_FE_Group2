let id = localStorage.getItem("id");
let token = localStorage.getItem("token");


function getDetail() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + token

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
    document.getElementById("description").innerHTML = product.description;
    document.getElementById("idSize").value = product.size.idSize;
    document.getElementById("nameSize").innerHTML = product.size.nameSize;
    document.getElementById("idColor").value = product.color.idColor;
    document.getElementById("nameColor").innerHTML = product.color.nameColor;
    document.getElementById("image").src = product.img;
    document.getElementById("id").value = product.idProduct;
    document.getElementById("quantity").value = product.quantity;
    document.getElementById("idCategory").value = product.category.idCategory;
}


getDetail();


function orderProduct() {

    if (token == null){
        alert("Please login!");
        location.href="demo_detail.html";
    }else {

        let quantity = $("#quantity").val();

        if (quantity > 0) {

            let id = $("#id").val();

            let idCategory = $("#idCategory").val();
            let name = document.getElementById("nameProduct").innerText;
            let price = document.getElementById("price").innerText;
            let content = document.getElementById("content").innerText;
            let description = document.getElementById("description").innerText;
            let img = document.getElementById("image").src;

            let idSize = document.getElementById("idSize").value;
            // let arr = document.getElementsByName("size");
            // for (let i = 0; i < arr.length; i++) {
            //     if (arr[i].checked) {
            //         size = arr[i].value;
            //     }
            // }
            let idColor = document.getElementById("idColor").value;
            // let arr2 = document.getElementsByName("color");
            // for (let i = 0; i < arr2.length; i++) {
            //     if (arr2[i].checked) {
            //         color = arr2[i].value;
            //     }
            // }

            let product = {
                idProduct: id,
                nameProduct: name,
                price: price,
                quantity: quantity,
                content: content,
                description: description,
                size: {
                    idSize: idSize
                },
                color: {
                    idColor: idColor
                },
                category: {
                    idCategory: idCategory
                },
                img: img
            }

            console.log(product);


            $.ajax({
                type: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + token
                },
                url: "http://localhost:8080/user/carts",
                data: JSON.stringify(product),
                //xử lý khi thành công
                success: function (data) {
                    console.log("data")
                    console.log(data)
                    alert("add to cart api success")
                    location.href="cart.html";
                },
                error: function (err) {
                    console.log(err)
                }
            })
        } else {
            alert("Out of stock Bro!");
        }
    }

}

// function getListProduct(){
//     $.ajax({
//     type: "GET",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     url: "http://localhost:8080/carts",
//     //xử lý khi thành công
//     success: function (data) {
//         // document.getElementById("tbody").innerHTML =  showDetail(data);
//         console.log("data");
//         console.log(data);
//         // forwardToCart(data);
//     },
//     error: function (err) {
//         console.log(err)
//     }
// })
// }

// function forwardToCart(productList) {
//     window.localStorage.setItem("productList",productList);
//     window.location.href="cart.html";
// }