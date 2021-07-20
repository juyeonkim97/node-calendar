const loginMsg = $('.login-check');
var calendar = '';

//캘린더 설정 관련
$(document).ready(function () {
  var calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    height: '800px',
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true, //select 속성 가능하도록

    //일정 가져옴
    events: function (info, successCallback, failureCallback) {
      loadEvent(info, successCallback, failureCallback);
    },
    //날짜 선택
    select: function (info) {
      addEvent(info); //일정 추가 js 호출
    },
    //일정 hover 시 tooltip
    eventDidMount: function (info) {
      eventTooltip(info);
    },
    //일정 수정
    eventClick: function (info) {
      if (loginCheck()) {
        editEvent(info);
      } else {
        alertLogin();
      }
    },
    //일정 드래그앤드롭 수정
    eventDrop: function (info) {
      if (loginCheck()) {
        dropEvent(info);
      } else {
        calendar.refetchEvents();
        alertLogin();
      }
    }
  });
  calendar.render();
});

function loginCheck() {
  if (loginMsg.val() == "login") {
    return true;
  } else {
    return false;
  }
}

function alertLogin() {
  alert('로그인 후 이용 가능합니다.');
  $('#loginModal').modal('show');
}