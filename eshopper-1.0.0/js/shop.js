let totalPages = 1;

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
            'Content-Type': 'application/json'
        },
        url: `http://localhost:8080/home?page=${pageNumber}`,
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
getData(0);

function showData(pageable){
    let arrProduct = pageable.content;
    let str = "<div class=\"col-12 pb-1\">\n" +
        "                    <div class=\"d-flex align-items-center justify-content-between mb-4\">\n" +
        "                        <form action=\"\">\n" +
        "                            <div class=\"input-group\">\n" +
        "                                <input type=\"text\" class=\"form-control\" placeholder=\"Search by name\" id=\"search\" >\n" +
        "                                <div class=\"input-group-append\">\n" +
        "                                        <span class=\"input-group-text bg-transparent text-primary\" onclick='search()'>\n" +
        "                                            <i class=\"fa fa-search\"></i>\n" +
        "                                        </span>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </form>\n" +
        "                        <div class=\"dropdown ml-4\">\n" +
        "                            <button class=\"btn border dropdown-toggle\" type=\"button\" id=\"triggerId\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n" +
        "                                    aria-expanded=\"false\">\n" +
        "                                Sort by\n" +
        "                            </button>\n" +
        "                            <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"triggerId\">\n" +
        "                                <a class=\"dropdown-item\" href=\"#\">Latest</a>\n" +
        "                                <a class=\"dropdown-item\" href=\"#\">Popularity</a>\n" +
        "                                <a class=\"dropdown-item\" href=\"#\">Best Rating</a>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>";
    for (let i = 0; i < arrProduct.length; i++){
        str += `
        <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
                    <div class="card product-item border-0 mb-4">
                        <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                            <img class="img-fluid w-100" src="${arrProduct[i].img}" alt="">
                        </div>
                        <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                            <h6 class="text-truncate mb-3">${arrProduct[i].nameProduct}</h6>
                            <div class="d-flex justify-content-center">
                                <h6>$${arrProduct[i].price}</h6><h6 class="text-muted ml-2"><del></del></h6>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-between bg-light border">
                           <button type="button" class="btn btn-info" onclick="getDetail(${arrProduct[i].idProduct})">Add to cart</button>
                        </div>
                    </div>
                </div>
                
       `;
    }

    str += `<div class="col-12 pb-1">
                    <nav aria-label="Page navigation">
                    <div class="pagination justify-content-center mb-3">
                    <button onclick="getData(${pageable.number - 1})">Previous</button>
                    <span>${pageable.number + 1}</span>/<span>${pageable.totalPages}</span>
                    <button onclick="getData(${pageable.number + 1})">Next</button>
                    </div>
                    
                    </nav>
                </div>`
    return str;

}

function getDetail(id){
    window.localStorage.setItem("id",id);
    window.location.href="detail.html";

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
        url: "http://localhost:8080/home/search?name=" + search,
        //xử lý khi thành công
        success: function (data) {
            console.log(data);
            console.log("data");

           showDataSearch(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}





function showDataSearch(data){
    let str = "<div class=\"col-12 pb-1\">\n" +
        "                    <div class=\"d-flex align-items-center justify-content-between mb-4\">\n" +
        "                        <form action=\"\">\n" +
        "                            <div class=\"input-group\">\n" +
        "                                <input type=\"text\" class=\"form-control\" placeholder=\"Search by name\" id=\"search\" >\n" +
        "                                <div class=\"input-group-append\">\n" +
        "                                        <span class=\"input-group-text bg-transparent text-primary\" onclick='search()'>\n" +
        "                                            <i class=\"fa fa-search\"></i>\n" +
        "                                        </span>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </form>\n" +
        "                        <div class=\"dropdown ml-4\">\n" +
        "                            <button class=\"btn border dropdown-toggle\" type=\"button\" id=\"triggerId\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n" +
        "                                    aria-expanded=\"false\">\n" +
        "                                Sort by\n" +
        "                            </button>\n" +
        "                            <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"triggerId\">\n" +
        "                                <a class=\"dropdown-item\" href=\"#\">Latest</a>\n" +
        "                                <a class=\"dropdown-item\" href=\"#\">Popularity</a>\n" +
        "                                <a class=\"dropdown-item\" href=\"#\">Best Rating</a>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </div>";
    for (const d of data) {
        str += `
        <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
                    <div class="card product-item border-0 mb-4">
                        <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                            <img class="img-fluid w-100" src="${d.img}" alt="">
                        </div>
                        <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                            <h6 class="text-truncate mb-3">${d.nameProduct}</h6>
                            <div class="d-flex justify-content-center">
                                <h6>$${d.price}</h6><h6 class="text-muted ml-2"><del></del></h6>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-between bg-light border">
                           <button type="button" class="btn btn-info" onclick="getDetail(${d.idProduct})">Add to cart</button>
                        </div>
                    </div>
                </div>

       `;
    }
    // str += `<div class="col-12 pb-1">
    //                 <nav aria-label="Page navigation">
    //                 <div class="pagination justify-content-center mb-3">
    //                 <button onclick="getData(${pageable.number - 1})">Previous</button>
    //                 <span>${pageable.number + 1}</span>/<span>${pageable.totalPages}</span>
    //                 <button onclick="getData(${pageable.number + 1})">Next</button>
    //                 </div>
    //
    //                 </nav>
    //             </div>`

    document.getElementById("showList").innerHTML = str;
}




            // HIỂN THỊ TÌM KIẾM THEO PAGEABLE ĐỂ SAU TÌM HIỂU
// function search(pageNumber){
//
//     if(pageNumber < 0){
//         pageNumber = 0;
//     }
//     if(pageNumber > totalPages -1){
//         pageNumber = totalPages -1;
//     }
//     console.log(pageNumber)
//     let search = document.getElementById("search").value;
//     console.log(search);
//
//     $.ajax({
//         type: "GET",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         url:  `http://localhost:8080/home?name="` + search + `&page=${pageNumber}`,
//         // xu ly khi thanh cong
//         success: function (data){
//             console.log(data)
//             alert("1111")
//             document.getElementById("showList").innerHTML = showData(data);
//             totalPages = data.totalPages;
//             alert("2222")
//             // showData(data.content);
//         },
//         error: function (err){
//             console.log(err)
//         }
//     })
// }
//
// search(0);