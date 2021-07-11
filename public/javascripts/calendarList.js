$(document).ready(function(){
    console.log('여기는 들어옴');
    getCalendarList();
});

function getCalendarList(){
    $.ajax({
        method: 'GET',
        url: '/calendar/list'
    })
}