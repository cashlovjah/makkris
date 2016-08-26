/**
 * Created by cshlovjah on 28.07.16.
 */
var mainFrame = new mainFrame();
//Администрирование

//Пользователи
$('.user-control').on('click', function () {
    mainFrame.clearFrame('mainframe');

    mainFrame.clearFrameClass('button-panel');
  
    $('#mainframe').append("<div id='user-table'></div>");
    var user = new User();
    user.pageableTable('user-table');

});

$('.boxes-control').on('click', function () {
    console.log("boxes control");
    mainFrame.clearFrame('mainframe');
    mainFrame.clearFrameClass('button-panel');
    $('#mainframe').append("<div id='box-table'></div>");
    var box = new Box();
    box.pageableBoxTable('box-table');
});

$('.posts-control').on('click', function () {
    mainFrame.clearFrame('mainframe');
    mainFrame.clearFrameClass('button-panel');
    console.log("posts control");
});

$('.typeOfWork-control').on('click', function () {
    mainFrame.clearFrame('mainframe');
    mainFrame.clearFrameClass('button-panel');
    console.log("Type of work control");
});

$('.customer-control').on('click', function () {
    mainFrame.clearFrame('mainframe');
    console.log("Customer control");
});

$('.log-control').on('click', function () {
    mainFrame.clearFrame('mainframe');
    mainFrame.clearFrameClass('button-panel');
    console.log("Log control");

});

//Заявки
$('.add-event').on('click', function () {
    mainFrame.clearFrame('mainframe');
    mainFrame.clearFrameClass('button-panel');
    console.log("Add event control");
});

$('.update-event').on('click', function () {
    mainFrame.clearFrame('mainframe');
    mainFrame.clearFrameClass('button-panel');
    console.log("Update event");
});

$('.delete-event').on('click', function () {
    mainFrame.clearFrame('mainframe');
    mainFrame.clearFrameClass('button-panel');
    console.log("Delete event");
});
