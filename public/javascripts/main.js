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

$('#sign').on('click', function () { // 회원가입 창으로 넘어가기
    $.get('/test')
});