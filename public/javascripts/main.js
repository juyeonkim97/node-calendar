const loginMsg = $('.login-check');
var calendar = '';

//캘린더 설정 관련
$(document).ready(function () {
  var calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    height: '800px',
    initialView: 'dayGridMonth',
    editable: true, //수정가능 여부
    selectable: true,

    //일정
    events: function (info, successCallback, failureCallback) {
      loadEvent(info, successCallback, failureCallback);
    },

    //날짜 선택
    select: function (info) {
      addEvent(info); //일정 추가 js 호출
    },

    //hover 시 tooltip
    eventDidMount: function (info) {
      var tooltip = new bootstrap.Popover(info.el, { 
        title: $('<div />', {
          class: 'popoverTitleCalendar',
          text: info.event.title
        }),
        content: $('<div />', {
            class: 'popoverInfoCalendar'
          }).append('<p><strong>캘린더:</strong> ' + info.event.extendedProps.calendar_title + '</p>')
          .append('<div class="popoverDescCalendar"><strong>설명:</strong> ' + info.event.extendedProps.description + '</div>'),
        placement: 'auto',
        delay: {
          "show": 200,
          "hide": 30
        },
        html: true,
        container: 'body',
        trigger: 'hover'
      })
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
