const calendarModalTitle = $('#calendar-modal-title');
const hiddenCalendarId = $('#calendar-id');
const calendarTitle = $('#calendar-title');
const calendarDesc = $('#calendar-description');
const calendarColor = $('#calendar-color');
const addBtnContainer = $('.add-button-container');
const editBtnContainer = $('.edit-button-container');

//캘린더 생성 모달
function createCalendar() {
    if(loginCheck()){
        addBtnContainer.show();
        editBtnContainer.hide();
        $('#calendarModal').modal('show');
    }else{
        alertLogin();
    }
}

//캘린더 구독
function subscribeCalendar(calendarId) {
    console.log(calendarId)
    if(loginCheck()){
        $.ajax({
            method: 'POST',
            url: '/subscription/' + calendarId,
            success: function (res) {
                if (res.message === 'fail') {
                    alert('이미 구독 중인 캘린더입니다.');
                } else {
                    alert('캘린더가 추가되었습니다.')
                }
            }
        })
    }else{
        alertLogin();
    }
}

//visible 수정 컨트롤러
function changeVisible(calendarId) {
    const visible = $('#' + calendarId).is(":checked")
    console.log(visible, calendarId)
    const sendData = {
        visible: visible,
        calendarId: calendarId
    }
    $.ajax({
        method: 'PUT',
        url: '/calendar/visible',
        data: sendData,
        success: function (res) {
            calendar.refetchEvents();
        }
    })
}

//캘린더 수정 모달
function editCalendar(calendarId) {
    //console.log(calendarId)
    const sendData = {
        calendarId: calendarId
    }
    //console.log(sendData)
    $.ajax({
        method: 'GET',
        url: '/calendar/info/' + calendarId,
        success: function (res) {
            //console.log(res.resData)
            if (res.resData === 'fail') {
                alert('캘린더를 수정할 수 있는 권한이 없습니다.')
                hiddenCalendarId.val(calendarId);
                removeCalendar();

            } else {
                // console.log(JSON.stringify(res.resData))
                calendarInfo = JSON.parse(JSON.stringify(res.resData));
                //console.log(calendarInfo.title)
                calendarModalTitle.html('캘린더 수정');
                calendarTitle.val(calendarInfo.title);
                calendarDesc.val(calendarInfo.description);
                calendarColor.val(calendarInfo.color);
                calendarBound = calendarInfo.bounds;
                if (calendarBound == "public") {
                    $('#calendar-public').prop('checked', true);
                } else {
                    $('#calendar-private').prop('checked', true);
                }

                hiddenCalendarId.val(calendarInfo.calendar_id);

                addBtnContainer.hide();
                editBtnContainer.show();
                $('#calendarModal').modal('show');
            }
        }
    })
}

//캘린더 수정
function updateCalendar() {
    let bounds='';
    if($('#calendar-public').is(':checked')==true){
        bounds='public'
    }else{
        bounds='private'
    }
    sendData={
        title:calendarTitle.val(),
        description:calendarDesc.val(),
        color:calendarColor.val(),
        bounds:bounds
    }
    $.ajax({
        method: 'PUT',
        url: '/calendar/' + hiddenCalendarId.val(),
        data:sendData,
        success: function (response) {
            if (response.result == 'redirect') {
                //redirecting to main page from here.
                window.location.replace(response.url);
            }
        }
    })
}

//캘린더 삭제
function deleteCalendar() {
    if (confirm("캘린더를 삭제하시겠습니까?") == true) {
        $.ajax({
            method: 'DELETE',
            url: '/calendar/' + hiddenCalendarId.val(),
            success: function (response) {
                if (response.result == 'redirect') {
                    //redirecting to main page from here.
                    window.location.replace(response.url);
                }
            }
        })
    }     
}

//캘린더 구독 취소
function removeCalendar() {
    if (confirm("캘린더를 구독 취소하시겠습니까?") == true) {
        $.ajax({
            method: 'DELETE',
            url: '/subscription/' + hiddenCalendarId.val(),
            success: function (response) {
                if (response.result == 'redirect') {
                    //redirecting to main page from here.
                    window.location.replace(response.url);
                }
            }
        })
    }     
}

