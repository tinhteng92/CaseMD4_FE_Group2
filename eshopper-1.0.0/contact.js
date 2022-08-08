function sendMessage () {
    let emailMes = document.getElementById("email");
    let subjectMes = document.getElementById("subject");
    let message = document.getElementById("message");
    let timeMessage = new Date();

    if (validate(emailMes, subjectMes, message)) {
        let userQuestion = {
            email : emailMes.value,
            subject : subjectMes.value,
            message : message.value,
            timeMessage : timeMessage,
            account : {
                idAccount : 1
            }
        }

        $.ajax({
            type: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/userQuestions",
            data: JSON.stringify(userQuestion),
            //xử lý khi thành công
            success: function (data) {
                console.log("user question")
                console.log(data)
                console.log("add to userQuestion api success")

            },
            error: function (err) {
                console.log(err)
            }
        })
        alert("We have received your question and will respond as soon as possible");
        resetFormMessage(emailMes, subjectMes, message);
    }

}

function resetFormMessage(emailMes, subjectMes, message) {
    emailMes.value = "";
    subjectMes.value = "";
    message.value = "";
}

function validate(emailMes, subjectMes, message) {
    let regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if( emailMes.value === "" ) {
        document.getElementById("emailValidate").innerText = "Please enter your email";
        emailMes.focus() ;
        return false;
    }
    if( !regexEmail.test(emailMes.value)) {
        document.getElementById("emailValidate").innerText = "Please press email according to the syntax: info@example.com";
        emailMes.focus() ;
        return false;
    }
    if( subjectMes.value === "" ) {
        document.getElementById("subjectValidate").innerText = "Please enter a subject";
        subjectMes.focus() ;
        return false;
    }
    if( message.value === "" ) {
        document.getElementById("messageValidate").innerText = "Please enter your message";
       message.focus() ;
        return false;
    }

    return true ;
}