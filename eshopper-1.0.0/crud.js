getData();

function show(page) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/product?page="+page,
        //xử lý khi thành công
        success: function (data) {
            console.log(data)
            showData(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}



function create(data) {
    let nameProduct = $("#nameProduct").val();
    let price = $("#price").val();
    let quantity = $("#quantity").val();
    let content = $("#content").val();
    let description = $("#description").val();
    let idSize = $("#size").val();
    let idColor = $("#color").val();
    let idCategory = $("#category").val();
    let product = {
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

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/product",
        data: JSON.stringify(product),
        success: function (data) {
            getData();
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function getData() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/product",
        //xử lý khi thành công
        success: function (data) {
            console.log("data")
            console.log(data)
            showData(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function showData(data) {
    let page = data.content;
    let str = "";
    let str1="";
    for (const p of page) {
        str += `
         <tr>
            <td>${p.idProduct}</td>
            <td>${p.nameProduct}</td>
            <td><img src="${p.img}" width="200" height="200"></td>
            <td>${p.price}</td>
            <td>${p.quantity}</td>
            <td>${p.content}</td>
            <td>${p.description}</td>
            <td>${p.size.nameSize}</td>
            <td>${p.color.nameColor}</td>
            <td>${p.category.nameCategory}</td>
            <td><button type="button" class="btn btn-warning"  data-toggle="modal" data-target="#myModalEdit" onclick="getEdit(${p.idProduct})">Edit</button></td>
            <td><button type="button" class="btn btn-danger" onclick="deleteProduct(${p.idProduct})">Delete</button></td>
        </tr>`;
    }
    document.querySelector("#show").innerHTML = str;
    for (let i = 0; i < data.totalPages; i++) {
        str1 +=`<div style="display: inline-block; display: flex"><button style="float: right; padding: 8px 16px; border: 1px; text-decoration: none"  href="#" onclick="show(${i})">${i+1}</></div>`
    }
    document.querySelector(".phan-trang").innerHTML = str1

}

function uploadFile() {
    let fileImg = document.getElementById("img").files;
    if (fileImg.length === 0) {
        alert("ảnh chưa up");
        return;
    }
    let formData = new FormData();
    formData.append("file", fileImg[0]);
    $.ajax({
        contentType: false,
        processData: false,
        type: "POST",
        data: formData,
        url: "http://localhost:8080/product/upImg",
        success: function (data) {
            create(data);
        }
    });
}

function deleteProduct(id) {

    confirm("bạn muốn xóa không ?") ?

        $.ajax({
            type: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/product/delete/" + id,


            success: function (data) {

                getData();
            },
            error: function (err) {
                console.log(err)
            }
        }) :""
}


function search() {
    let search = document.getElementById("search").value;
    console.log(search)
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/product/search?nameProduct=" + search,
        //xử lý khi thành công
        success: function (data) {
            showData(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

