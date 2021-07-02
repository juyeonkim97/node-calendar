//일정 추가
var addEventModal = $('#addEventModal');
var calendarModalTitle = $('.calendar.modal-title');
var editAllDay = $('#edit-allDay');
var editTitle = $('#edit-title');
var editStart = $('#edit-start');
var editEnd = $('#edit-end');
var editType = $('#edit-type');
var editColor = $('#edit-color');
var editDesc = $('#edit-desc');
var addBtnContainer = $('.modalBtnContainer-addEvent');
var modifyBtnContainer = $('.modalBtnContainer-modifyEvent');

var addEvent = function (info) {
    calendarModalTitle.html('새로운 일정');
    editTitle.val('');
    editStart.val(info.startStr);
    editEnd.val(info.endStr);
    editDesc.val('');
    addBtnContainer.show();
    modifyBtnContainer.hide();
    addEventModal.modal('show'); //일정 추가 모달 show

    //새로운 일정 저장버튼 클릭
    $('#addEvent').unbind();
    $('#addEvent').on('click', function () {
        var eventData = {
            title: editTitle.val(),
            start: editStart.val(),
            end: editEnd.val(),
            description: editDesc.val(),
            type: editType.val(),
            username: '사나',
            backgroundColor: editColor.val(),
            allDay: false
        };

        if (eventData.start > eventData.end) {
            alert('끝나는 날짜가 앞설 수 없습니다.');
            return false;
        }

        if (eventData.title === '') {
            alert('일정명은 필수입니다.');
            return false;
        }

        /* var realEndDay;

        if (editAllDay.is(':checked')) {
            eventData.start = moment(eventData.start).format('YYYY-MM-DD');
            //render시 날짜표기수정
            eventData.end = moment(eventData.end).add(1, 'days').format('YYYY-MM-DD');
            //DB에 넣을때(선택)
            realEndDay = moment(eventData.end).format('YYYY-MM-DD');

            eventData.allDay = true;
        }

        //$("#calendar").fullCalendar('renderEvent', eventData, true); */
        //eventModal.find('input, textarea').val('');
        //editAllDay.prop('checked', false);
        addEventModall.modal('hide');
        //새로운 일정 저장
        /* $.ajax('/add', {
            'method': 'POST',
            'data': {
                'eventData': eventData
            }
        }); */
        $.post('/add', {'eventData': eventData});
    });
};