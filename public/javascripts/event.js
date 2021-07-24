//캘린더 변수 참고해서 피해가기
const eventModalTitle = $('#event-modal-title');
const hiddenEventId = $('#event-id');
const eventTitle = $('#event-title');
const eventStart = $('#event-start');
const eventEnd = $('#event-end');
const eventCalendarId = $('#event-calendar-id');
const eventDesc = $('#event-description');

//일정 추가 모달
function addEvent(info) {
    if (loginCheck()) {
        //빈칸으로 만들어줘야됨
        eventTitle.val('');
        eventDesc.val('');

        eventModalTitle.html('일정 추가');
        eventStart.val(info.startStr);
        //끝나는 날 보여줄 때 -1 해서 보여주기(헷갈림 방지)
        eventEnd.val(moment(info.endStr).subtract(1,'day').format('YYYY-MM-DD'));
        console.log()
        addBtnContainer.show();
        editBtnContainer.hide();
        $('#eventModal').modal('show');
    } else {
        alertLogin();
    }
}

//일정 추가
function saveEvent() {
    //데이터베이스에 저장할 때는 다시 +1 해주기
    eventEnd.val(moment(eventEnd.val()).add(1,'day').format('YYYY-MM-DD'));
    var sendData = {
        title: eventTitle.val(),
        start: eventStart.val(),
        end: eventEnd.val(),
        calendar_id: eventCalendarId.val(),
        description: eventDesc.val()
    };
    console.log(sendData)
    if (sendData.start > sendData.end) {
        alert('끝나는 날짜가 앞설 수 없습니다.');
        return false;
    }

    if (sendData.title === '') {
        alert('일정명은 필수입니다.');
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/event",
        data: sendData,
        success: function (response) {
            $('#eventModal').modal('hide');
            //캘린더 reload
            calendar.refetchEvents();
        }
    });
}

//일정 가져옴
function loadEvent(info, successCallback, failureCallback) {
    $.ajax({
        method: 'GET',
        url: '/event/all',
        success: function (result) {
            result = JSON.parse(JSON.stringify(result.resData));
            const events = [];
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

//일정 수정 모달
function editEvent(info) {
    const eventId = info.event.id; 
    $.ajax({
        method: 'GET',
        url: '/event/edit-check/' + eventId,
        success: function (res) {
            console.log(res)
            if (res.message === 'success') {
                eventModalTitle.html('일정 수정');
                eventTitle.val(info.event.title);
                eventStart.val(info.event.startStr);
                //끝나는 날 보여줄 때 -1 해서 보여주기(헷갈림 방지)
                eventEnd.val(moment(info.event.endStr).subtract(1,'day').format('YYYY-MM-DD'));
                eventCalendarId.val(info.event.extendedProps.calendarId);
                eventDesc.val(info.event.extendedProps.description);

                hiddenEventId.val(info.event.id);

                addBtnContainer.hide();
                editBtnContainer.show();
                $('#eventModal').modal('show');
            } else {
                alert('일정을 수정할 수 있는 권한이 없습니다.')
            }
        }
    })
}

//일정 수정
function updateEvent() {    
    $('#eventModal').modal('hide');
    //데이터베이스에 저장할 때는 다시 +1 해주기
    eventEnd.val(moment(eventEnd.val()).add(1,'day').format('YYYY-MM-DD'))
    sendData = {
        title: eventTitle.val(),
        start: eventStart.val(),
        end: eventEnd.val(),
        calendar_id: eventCalendarId.val(),
        description: eventDesc.val(),
    }
    $.ajax({
        method: 'PUT',
        url: '/event/' + hiddenEventId.val(),
        data: sendData,
        success: function (response) {
            calendar.refetchEvents();
        }
    })
}

//일정 드래그앤드롭 수정 권한 확인
function dropEvent(info) {
    const eventId = info.event.id;
    $.ajax({
        method: 'GET',
        url: '/event/edit-check/' + eventId,
        success: function (res) {
            if (res.message === 'success') {
                dropUpdateEvent(info);
            } else {
                alert('일정을 수정할 수 있는 권한이 없습니다.')
                calendar.refetchEvents();
            }
        }
    })
}

//일정 드래그앤드롭 저장
function dropUpdateEvent(info) {
    sendData = {
        title: info.event.title,
        start: info.event.startStr,
        end: info.event.endStr,
        calendar_id: info.event.extendedProps.calendarId,
        description: info.event.extendedProps.description
    }
    $.ajax({
        method: 'PUT',
        url: '/event/' + info.event.id,
        data: sendData,
        success: function (response) {
            calendar.refetchEvents();
        }
    })
}

//일정 삭제
function deleteEvent() {
    if (confirm("일정을 삭제하시겠습니까?") == true) {
        $('#eventModal').modal('hide');
        $.ajax({
            method: 'DELETE',
            url: '/event/' + hiddenEventId.val(),
            success: function (response) {
                calendar.refetchEvents();
            }
        })
    }
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