/**
 * Created by cshlovjah on 28.07.16.
 */
function mainFrame() {
}

//Очистка содержимого div
mainFrame.prototype.clearFrame = function (framenameid) {
    console.log(framenameid);
    $('#'+framenameid).empty();
};

mainFrame.prototype.clearFrameClass = function (framenameid) {
    console.log(framenameid);
    $('.'+framenameid).empty();
};

mainFrame.prototype.addFrame = function (framenameid, newframenameid){
    console.log("Добавить внутрь новый фрейм");
    $('#'+framenameid).append( "<div id="+newframenameid+">");
};

//переименовываем выбранный id
mainFrame.prototype.renameFrame = function (framenameid, newframenameid) {

    $('#'+framenameid).attr('id', newframenameid);
};

mainFrame.prototype.deleteFrame = function (framenameid, newframenameid) {
    console.log(framenameid);
};


