

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
        url: `http://localhost:8080/staff?page=${pageNumber}`,
        // xu ly khi thanh cong
        success: function (data){
            console.log(data)
            document.getElementById("tbody").innerHTML = showData(data);
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
    let arrStaff = pageable.content;
    let str = "";
    for (let i = 0; i < arrStaff.length; i++){
        str += `
        <tr>
            <td>${arrStaff[i].id}</td>
            <td>${arrStaff[i].name}</td>
            <td>${arrStaff[i].age}</td>
            <td>${arrStaff[i].salary}</td>
            <td>${arrStaff[i].department.nameDep}</td>
            
            <td><button type="button" class="btn btn-warning" onclick="edit(${arrStaff[i].id})">Edit</button></td>
            <td><button type="button" class="btn btn-danger" onclick="deleteStaff(${arrStaff[i].id})">Delete</button></td>
            <td><button type="button" class="btn btn-info" onclick="getDetail(${arrStaff[i].id})">Detail</button></td>
        </tr>`;
    }

    str += `<button onclick="getData(${pageable.number -1})">Back</button>
            <span>${pageable.number + 1}</span>/<span>${pageable.totalPages}</span>
            <button onclick="getData(${pageable.number + 1})">Next</button>`
    return str;

}

function edit(id){
    window.localStorage.setItem("id",id);
    window.location.href="edit.html";
}

function getDetail(id){
    window.localStorage.setItem("id",id);
    window.location.href="detail.html";
}
function deleteStaff(id){
    window.localStorage.setItem("id",id);
    window.location.href="delete.html";
}



function search(){
    let search = document.getElementById("search").value;
    console.log(search);
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url:"http://localhost:8080/staff/search?name=" + search,
        success: function (data) {
            showData(data);
        },
        error: function (err){
            console.log(err);
        }
    })


}






