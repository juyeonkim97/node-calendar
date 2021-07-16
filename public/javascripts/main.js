//캘린더 설정 관련
$(document).ready(function(){
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        height:'800px',
        initialView: 'dayGridMonth',
        editable:true, //수정가능 여부
        selectable: true,
        //날짜 선택
        select: function (info) {
            addEvent(info); //일정 추가 js 호출
        }
    });
    calendar.render();
    
});

$('#alertLogin').on("click", ()=> {
    alert('로그인 후 이용 가능합니다.');
    $('#login-btn').click();
});

function alertLogin() {
    alert('로그인 후 이용 가능합니다.');
    $('#login-btn').click();
}

//visible 수정
function changeVisible(calendarId) {
    const visible=$('#'+calendarId).is(":checked")
    console.log(visible,calendarId)
    const sendData = {
        visible: visible,
        calendarId: calendarId
    } 
    $.ajax({
        method: 'PUT',
        url: '/calendar/visible',
        data: sendData
    })
}