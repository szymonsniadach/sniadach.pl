$("#contact-form").submit(function(e) {
    e.preventDefault();
    submitForm();
});

function submitForm() {
    var name = $("#form-name").val();
    var email = $("#form-email").val();
    var phone = $("#form-phone").val();
    var message = $("#form-message").val();

    $.ajax({
        type: "POST",
        url: "email.php",
        data: "name=" + name + "&email=" + email + "&phone=" + phone + "&message=" + message,
        success: function(text) {
            if (text == "success") {
                formSuccess();
            }else{
                formError();
            }
        }
    });
}

function formSuccess() {
    $("#contact-form")[0].reset();
    UIkit.notification({
        message: 'Wiadomość została wysłana! :)',
        status: 'success',
        pos: 'bottom-center',
        timeout: 5000
    });
}

function formError() {
    UIkit.notification({
        message: 'Ups. Sprawdź czy wszystkie pola zostały wypełnione.',
        status: 'danger',
        pos: 'bottom-center',
        timeout: 5000
    });
}