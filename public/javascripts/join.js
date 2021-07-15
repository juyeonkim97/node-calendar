//아이디 중복 확인
$(function () {
    $("#email").on("keyup", emailCheck);
    $("#pw2").on("keyup", passwordCheck);
})
function emailCheck() {
    const email = $("#email").val();
    const sendData = {
        "email": email
    }
    $.ajax({
        method: 'POST',
        url: '/user/email-check',
        data: sendData,
        success: function (res) {
            if (res.message == 'fail') {
                $('#emailcheck').css('color', 'red');
                $('#emailcheck').html("이미 등록된 이메일입니다.");
                flag = false;
            } else {
                $('#emailcheck').css('color', 'blue');
                $('#emailcheck').html("사용할 수 있는 이메일입니다.");
                flag = true;
            }
        }
    })
}

//비밀번호 재확인
function passwordCheck() {
    const pw1 = $("#pw1").val();
    const pw2 = $("#pw2").val();
    if (pw1 != "" || pw2 != "") {
        if (pw1 == pw2) {
            $('#pwcheck').css('color', 'blue');
            $('#pwcheck').html("비밀번호가 일치합니다.");
            flag = true;
        } else {
            $('#pwcheck').css('color', 'red');
            $('#pwcheck').css('font-size', '15px');
            $('#pwcheck').html("비밀번호가 일치하지 않습니다.");
            flag = false;
        }
    }
}