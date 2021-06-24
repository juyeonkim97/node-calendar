document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        //날짜 선택
        select: function (info) {
            alert('selected ' + info.startStr + ' to ' + info.endStr);
        }
    });
    calendar.render();
});