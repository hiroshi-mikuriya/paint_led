var selected_color = "black";
const CELL_WIDTH = 18;
const CELL_HEIGHT = 18;

const clickPallet = (id) => {
    selected_color = id;
}
const updateWindow = () => {
    const top = ($(window).height() - $("#main").height()) / 2;
    const left = ($(window).width() - $("#main").width()) / 2;
    $("#main").css("margin-top", top);
    $("#main").css("margin-left", left);
}
const updateCellColor = (event) => {
    const p0 = $("#cells").offset();
    const p1 = event.changedTouches[0];
    const x = Math.floor((p1.pageX - p0.left) / CELL_WIDTH);
    const y = Math.floor((p1.pageY - p0.top) / CELL_HEIGHT);
    const id = "#cell_" + x + "_" + y;
    $(id).css("background-color", selected_color);
}
$(document).ready(() => {
    $("#cells").on("touchstart", (event) => {
        updateCellColor(event);
    });
    $("#cells").on("touchmove", (event) => {
        updateCellColor(event);
    });
    $("#cells").on("touchend", (event) => {
        updateCellColor(event);
    });
    $(".cell").css("width", CELL_WIDTH);
    $(".cell").css("height", CELL_HEIGHT);
    updateWindow();
    $(window).resize(() => {
        updateWindow();
    });
});
