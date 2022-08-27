//
//
//
// function filterBySize(){
//     let size = "";
//     let arr = document.getElementsByName("size");
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].checked === true) {
//             size = arr[i].value;
//         }
//         console.log(arr[i].value)
//     }
//
//
//     $.ajax({
//         type: "GET",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//
//         },
//         url: "http://localhost:8080/home/size/" + size,
//         //xử lý khi thành công
//         success: function (data) {
//             console.log(data)
//             // document.getElementById("tbody").innerHTML =  showDetail(data);
//
//             showDetail(data);
//
//         },
//         error: function (err) {
//             console.log(err)
//         }
//     })
// }
//
// filterBySize();