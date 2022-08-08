let token = localStorage.getItem("token");


getData();


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
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + token
        },
        url: "http://localhost:8080/admin/product",
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
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + token
        },
        url: "http://localhost:8080/admin/product",
        //xử lý khi thành công
        success: function (data) {
            showData(data.content);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showData(data) {
    let str = "";
    for (const d of data) {
        str += ` 
         <tr>
            <td>${d.idProduct}</td>
            <td>${d.nameProduct}</td>
            <td><img src="${d.img}" width="200" height="200"></td>
            <td>${d.price}</td>
            <td>${d.quantity}</td>
            <td>${d.content}</td>
            <td>${d.description}</td>
            <td>${d.size.nameSize}</td>
            <td>${d.color.nameColor}</td>
            <td>${d.category.nameCategory}</td>
            <td><button type="button" class="btn btn-warning"  data-toggle="modal" data-target="#myModalEdit" onclick="getEdit(${d.idProduct})">Edit</button></td>
            <td><button type="button" class="btn btn-danger" onclick="deleteProduct(${d.idProduct})">Delete</button></td>
        </tr>`;


    }
    document.getElementById("show").innerHTML = str;

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
        headers: {
            "Authorization": 'Bearer ' + token
        },
        contentType: false,
        processData: false,
        type: "POST",
        data: formData,
        url: "http://localhost:8080/admin/product/upImg",
        success: function (data) {
            create(data);
        }
    });
}

function deleteProduct(id) {
    console.log(id + "id")
    confirm("bạn muốn xóa không ?") ?

        $.ajax({
            type: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + token
            },
            url: "http://localhost:8080/admin/product/delete/" + id,


            success: function (data) {
                console.log("dgtfh")
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
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + token
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