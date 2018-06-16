var selected_color = "black";
const CELL_WIDTH = 18;
const CELL_HEIGHT = 18;

const clickPallet = (id) => {
    selected_color = id;
}
const updateWindow = () => {
    $(".cell").css("width", CELL_WIDTH).css("height", CELL_HEIGHT);
    const top = ($(window).height() - $("#main").height()) / 2;
    const left = ($(window).width() - $("#main").width()) / 2;
    $("#main").css("margin-top", top).css("margin-left", left);
    $("#clear").css("height", "50px").css("width", "100px").text("やりなおし");
}
const updateCellColor = (event) => {
    const p0 = $("#cells").offset();
    const p1 = event.changedTouches[0];
    const x = Math.floor((p1.pageX - p0.left) / (CELL_WIDTH + 1.2));
    const y = Math.floor((p1.pageY - p0.top) / (CELL_HEIGHT + 1.2));
    const id = "#cell_" + x + "_" + y;
    $(id).css("background-color", selected_color);
}
const clearCells = () => {
    for(var x = 0; x < 16; ++x){
        for(var y = 0; y < 32; ++y){
            const id = "#cell_" + x + "_" + y;
            $(id).css("background-color", "black");
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
    $("#clear").on("click", () => clearCells());
});
