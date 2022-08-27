


function checkEdit() {
    let fileImg = document.getElementById("imgEdit").files;
    if (fileImg.length === 0){
        editNoUpFile();
    }else {
        editYesUpFile()
    }
}


function getEdit(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + token
        },
        url: "http://localhost:8080/admin/product/" + id,
        success: function (data) {
            showEdit(data);
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function showEdit(product) {
    console.log("product")
    console.log(product)
    document.getElementById("idProduct").value = product.idProduct;
    document.getElementById("nameProductEdit").value = product.nameProduct;
    document.getElementById("imageEdit").src = product.img;
    document.getElementById("priceEdit").value = product.price;
    document.getElementById("quantityEdit").value = product.quantity;
    document.getElementById("contentEdit").value = product.content;
    document.getElementById("descriptionEdit").value = product.description;
    document.getElementById("sizeEdit").value = product.size.idSize;
    document.getElementById("colorEdit").value = product.color.idColor;
    document.getElementById("categoryEdit").value = product.category.idCategory;
    document.getElementById("id").value = product.idProduct;
}

function editNoUpFile() {
    let id = $("#idProduct").val();
    console.log(id)
    let nameProduct = $("#nameProductEdit").val();
    let price = $("#priceEdit").val();
    let quantity = $("#quantityEdit").val();
    let content = $("#contentEdit").val();
    let description = $("#descriptionEdit").val();
    let idSize = $("#sizeEdit").val();
    let idColor = $("#colorEdit").val();
    let idCategory = $("#categoryEdit").val();
    let img = document.getElementById("imageEdit").src;
    let product = {
        idProduct:id,
        nameProduct: nameProduct,
        price: price,
        quantity: quantity,
        content: content,
        description: description,
        size : {
            idSize : idSize
        },
        color: {
            idColor : idColor
        },
        category: {
            idCategory : idCategory
        },
        img: img
    }

    console.log(product)
    callEdit(product);

}

function callEdit(product){
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + token
        },
        url: "http://localhost:8080/admin/product/edit",
        data: JSON.stringify(product),
        //xử lý khi thành công
        success: function (data) {
            getData();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function editYesUpFile() {
    let id = $("#idProduct").val();
    console.log(id)
    let nameProduct = $("#nameProductEdit").val();
    let price = $("#priceEdit").val();
    let quantity = $("#quantityEdit").val();
    let content = $("#contentEdit").val();
    let description = $("#descriptionEdit").val();
    let idSize = $("#sizeEdit").val();
    let idColor = $("#colorEdit").val();
    let idCategory = $("#categoryEdit").val();
    let fileImg = document.getElementById("imgEdit").files;
    let formData = new FormData();
    formData.append("file", fileImg[0]);
    $.ajax({
        headers: {
            "Authorization": 'Bearer ' + token
        },
        contentType: false,
        processData: false,
        type: "POST",
        data: formData,
        url: "http://localhost:8080/admin/product/upImg",
        success: function (data) {
            let product = {
                idAccount :id,
                nameProduct: nameProduct,
                price: price,
                quantity: quantity,
                content: content,
                description: description,
                size : {
                    idSize : idSize
                },
                color: {
                    idColor : idColor
                },
                category: {
                    idCategory : idCategory
                },
                img: data
            }
            callEdit(product)
        }
    });
}