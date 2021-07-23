const calendarId=$('#calendar-id');

//미리보기 캘린더 설정
$(document).ready(function () {
    var calendarEl = document.getElementById('preview-calendar');
    var previewCalendar = new FullCalendar.Calendar(calendarEl, {
        height: '800px',
        initialView: 'dayGridMonth',

        //일정 가져옴
        events: function (info, successCallback, failureCallback) {
            loadEvent(info, successCallback, failureCallback);
        },

        //일정 hover 시 tooltip
        eventDidMount: function (info) {
            eventTooltip(info);
        }
    });
    previewCalendar.render();
});

//일정 가져옴
function loadEvent(info, successCallback, failureCallback) {
    $.ajax({
        method: 'GET',
        url: '/event/'+calendarId.val(),
        success: function (result) {
            
            result = JSON.parse(JSON.stringify(result.resData));
            const events = [];
            console.log(result)
            $(result).each(function (index) {
                events.push({
                    id: result[index].event_id,
                    title: result[index].title,
                    start: result[index].start,
                    end: result[index].end,
                    backgroundColor: result[index].color,
                    borderColor: result[index].color,
                    extendedProps: {
                        calendarId: result[index].calendar_id,
                        calendarTitle: result[index].calendar_title,
                        description: result[index].description
                    }
                });
            });
            successCallback(events);
        }
    });
}

//일정 hover 시 tooltip
function eventTooltip(info) {
    const eventTooltip = new bootstrap.Popover(info.el, {
        title: $('<div />', {
            class: 'popoverTitleCalendar',
            text: info.event.title
        }),
        content: $('<div />', {
                class: 'popoverInfoCalendar'
            }).append('<p><strong>캘린더:</strong> ' + info.event.extendedProps.calendarTitle + '</p>')
            .append('<div class="popoverDescCalendar"><strong>설명:</strong> ' + info.event.extendedProps.description + '</div>'),
        placement: 'auto',
        delay: {
            "show": 400,
            "hide": 30
        },
        html: true,
        container: 'body',
        trigger: 'hover'
    })
}