const calendarModalTitle = $('#calendar-modal-title');
const hiddenCalendarId = $('#calendar-id');
const calendarTitle = $('#calendar-title');
const calendarDesc = $('#calendar-description');
const calendarColor = $('#calendar-color');
const addBtnContainer = $('.add-button-container');
const editBtnContainer = $('.edit-button-container');

//캘린더 추가 모달
function addCalendar() {
    addBtnContainer.show();
    editBtnContainer.hide();
    $('#calendarModal').modal('show');
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
        success: function (response) {
            if (response.result == 'redirect') {
                //redirecting to main page from here.
                window.location.replace(response.url);
            }
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
        url: '/calendar/' + calendarId,
        success: function (res) {
            //console.log(res.resData)
            if (res.resData === 'fail') {
                alert('캘린더를 수정할 수 있는 권한이 없습니다.')
            } else {
                // console.log(JSON.stringify(res.resData))
                calendarInfo = JSON.parse(JSON.stringify(res.resData));
                //console.log(calendarInfo.title)
                calendarModalTitle.html('캘린더 수정');
                calendarTitle.val(calendarInfo.title);
                calendarDesc.val(calendarInfo.description);
                calendarColor.val(calendarInfo.color);
                hiddenCalendarId.val(calendarInfo.calendar_id);
                calendarBound = calendarInfo.bounds;
                if (calendarBound == "public") {
                    $('#calendar-public').prop('checked', true);
                } else {
                    $('#calendar-private').prop('checked', true);
                }
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

