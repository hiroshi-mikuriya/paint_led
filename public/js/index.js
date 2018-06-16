var selected_color = "transparents";
const CELL_WIDTH = 16;
const CELL_HEIGHT = 16;

const clickPallet = (color) => {
    selected_color = color;
}
const updateWindow = () => {
    $(".cell").css("width", CELL_WIDTH).css("height", CELL_HEIGHT);
    const top = ($(window).height() - $("#main").height()) / 2;
    const left = ($(window).width() - $("#main").width()) / 2;
    $("#main").css("margin-top", top).css("margin-left", left);
}
const updateCellColor = (event) => {
    const p0 = $("#cells").offset();
    const p1 = event.changedTouches[0];
    const x = Math.floor((p1.pageX - p0.left) / (CELL_WIDTH + 3.6));
    const y = Math.floor((p1.pageY - p0.top) / (CELL_HEIGHT + 3.6));
    const id = "#cell_" + x + "_" + y;
    $(id).css("background-color", selected_color);
}
const clearCells = () => {
    for(var x = 0; x < 16; ++x){
        for(var y = 0; y < 32; ++y){
            const id = "#cell_" + x + "_" + y;
            $(id).css("background-color", "transparents");
        }
    }
}
$(document).ready(() => {
    $("#cells").on("touchstart", (event) => {
        updateCellColor(event);
    }).on("touchmove", (event) => {
        updateCellColor(event);
    });
    updateWindow();
    $(window).resize(() => {
        updateWindow();
    });
    clearCells();
    $("#trash").click(() => clearCells());
    $("#eraser").click(() => clickPallet("transparents"));
});
