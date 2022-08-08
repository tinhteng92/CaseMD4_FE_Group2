let listUser = null;
getData();

function getData() {

    $.ajax({
        type: "GET",
        headers: {
            //kiểu dữ liệu nhận về
            // 'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/showUser",
        //xử lý khi thành công
        success: function (data) {
            listUser = data;
            showUser(data);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showUser(data) {
    let str = "";
    for (const d of data) {
        str += `
         <tr>

                    <td >${d.username}</td>
                    <td >${d.address}</td>
                    <td >${d.phoneNumber}</td>
                    <td>
                        <a  href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i onclick="deleteData(${d.idAccount})" class="material-icons" data-toggle="tooltip" " title="Delete" >&#xE872;</i></a>
                    </td>
                </tr>
                
`
        console.log(data)
    }
    document.getElementById("show").innerHTML = str;

}


function deleteData(id) {
    $.ajax({
        type: "DELETE",
        headers: {
            //kiểu dữ liệu nhận về
            'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/deleteUser/"+id,
        //xử lý khi thành công
        success: function (data) {
            // listUser = data;
            getData()
        },
        error: function (err) {
            console.log(err)
        }
    })
}






