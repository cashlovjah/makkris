/**
 * Created by cshlovjah on 02.05.16.
 */
$(function () { // document ready

    $('#calendar').fullCalendar({
        //schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        now: new Date(),
       // now: '2016-04-29',
        height: 700,
        editable: true, // enable draggable events
        aspectRatio: 1.8,
        scrollTime: '08:00', // undo default 6am scrollTime
        header: {
            left: 'today prev,next',
            center: 'title',
            right: 'timelineDay,timelineThreeDays,agendaWeek,month'
        },
        timeFormat: 'H:mm',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Ноя.', 'Дек.'],
        dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        dayNamesShort: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
        buttonText: {
            prev: "Назад",
            next: "Вперед",
            prevYear: "Предыдущий год",
            nextYear: "Следующий год",
            today: "Сегодня",
            month: "Месяц",
            week: "Неделя",
            day: "День"
        },
        defaultView: 'timelineDay',
        views: {
            timelineThreeDays: {
                type: 'timeline',
                duration: {days: 3}
            },
        },

        resourceLabelText: 'Боксы и посты',

        resources: { // you can also specify a plain string like 'json/resources.json'
            url: '/resources',
            //url: 'json/resources.json',
            error: function () {
                $('#script-warning').show();
            }
        },

        events: { // you can also specify a plain string like 'json/events.json'
            url: '/event',
            //url: 'json/events.json',
            error: function () {
                $('#script-warning').show();
            }
        },

        eventMouseover: function (event, jsEvent) {

            var tstart = moment(event.start).format('HH:mm');

            var tend = moment(event.end).format('HH:mm');

            var tooltip = '<div class="tooltipevent panel panel-primary" style="position:absolute;z-index:10001;">' +
                '<div class="panel-body">Событие #' + event.id + ' ' + event.event_name + '' +
                '</div><div class="panel-footer">' +
                '<a>Время: </a>' + tstart + ' до ' + tend + '<br>' +
                '<a>Заказчик: </a>' + event.customer_name + '<br>' +
                '<a>Исполнитель: </a>' + event.mechanic + '<br>' +
                '<a>Название авто: </a>' + event.customer_car_name + '<br>' +
                '<a>Гос номер: </a>' + event.customer_car_gv_number + '<br>' +
                '<a>VIN: </a>' + event.customer_car_vin + '<br>' +
                '<a>Километраж: </a>' + event.customer_car_mileage + '<br>' +

                '</div></div></div>';

            $("body").append(tooltip);
            $(this).mouseover(function (e) {
                $(this).css('z-index', 10000);
                $('.tooltipevent').fadeIn('500');
                $('.tooltipevent').fadeTo('10', 1.9);
            }).mousemove(function (e) {
                $('.tooltipevent').css('top', e.pageY + 10);
                $('.tooltipevent').css('left', e.pageX + 20);
            });
        },

        eventMouseout: function (event, jsEvent) {
            $(this).css('z-index', 8);
            $('.tooltipevent').remove();
        },

        eventClick: function (event) {
            console.log(event.id);
            var edit_event = getDataJson('connector.php?get=getEventById', 'event_id=' + event.id);

            _.each(edit_event, function (data) {
                editEvent(data);
            });
        }
    });
});