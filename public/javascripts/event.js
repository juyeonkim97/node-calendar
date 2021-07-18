//캘린더 변수 참고해서 피해가기
const eventModalTitle = $('#event-modal-title');
const hiddenEventId = $('#event-id');
const eventTitle = $('#event-title');
const eventStart = $('#event-start');
const eventEnd = $('#event-end');
const eventCalendarId = $('#event-calendar-id');
const eventDesc = $('#event-description');

//이벤트 추가 모달
function addEvent(info) {
    if (loginCheck()) {
        //빈칸으로 만들어줘야됨
        eventTitle.val('');
        eventDesc.val('');

        eventModalTitle.html('일정 추가');
        eventStart.val(info.startStr);
        eventEnd.val(info.endStr);

        addBtnContainer.show();
        editBtnContainer.hide();
        $('#eventModal').modal('show');
    } else {
        alertLogin();
    }
}

//이벤트 저장
function saveEvent() {
    $('#eventModal').modal('hide');
    var sendData = {
        title: eventTitle.val(),
        start: eventStart.val(),
        end: eventEnd.val(),
        calendar_id: eventCalendarId.val(),
        description: eventDesc.val()
    };

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
                    extendedProps: {
                        calendar_title: result[index].calendar_title,
                        description: result[index].description
                    },
                    
                });
            });
            successCallback(events);
        }
    });
}