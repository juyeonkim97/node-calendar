//아이디 중복 확인
$(function(){
	$("#email").on('keyup',emailCheck);
})

function emailCheck(){
    const email = $("#email").val();
    const sendData = {"email":email}
    $.ajax({
        method : 'POST',
        url : '/user/emailCheck',
        data : sendData,
        success : function(res){
            if(res.message=='fail'){
                $('#emailcheck').css('color','red');
                $('#emailcheck').html("이미 등록된 이메일입니다.");
                flag=false;
            }else{
                $('#emailcheck').css('color','blue');
                $('#emailcheck').html("사용할 수 있는 이메일입니다.");
                flag=true;
            }}
    })	
}