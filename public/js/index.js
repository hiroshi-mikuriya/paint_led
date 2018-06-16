var selected_pallet;
var current_cells; // Array [16][32]
const PALLETS = {
    pallet0: { color: "transparent", unselected: "black", selected: "red", value: "000000" },
    pallet1: { color: "white", unselected: "black", selected: "red", value: "FFFFFF" },
    pallet2: { color: "red", unselected: "black", selected: "blue", value: "FF0000" },
    pallet3: { color: "yellow", unselected: "black", selected: "red", value: "FFFF00" },
    pallet4: { color: "lightgreen", unselected: "black", selected: "red", value: "00FF00" },
    pallet5: { color: "aqua", unselected: "black", selected: "red", value: "00FFFF" },
    pallet6: { color: "blue", unselected: "black", selected: "red", value: "0000FF" },
    pallet7: { color: "pink", unselected: "black", selected: "red", value: "FF0088" },
    pallet8: { color: "violet", unselected: "black", selected: "red", value: "FF00FF" },
};
const CELL_WIDTH = 16;
const CELL_HEIGHT = 16;

const setPallet = pallet => {
    selected_pallet = pallet;
    for(let id in PALLETS){
        const border_color = id === selected_pallet? PALLETS[id].selected : PALLETS[id].unselected;
        $("#" + id).css("border-color", border_color);
    }
}
const updateWindow = () => {
    $(".cell").css("width", CELL_WIDTH).css("height", CELL_HEIGHT);
    const top = ($(window).height() - $("#main").height()) / 2;
    const left = ($(window).width() - $("#main").width()) / 2;
    $("#main").css("margin-top", top).css("margin-left", left);
}
const setCell = (x, y, pallet) => {
    const id = "#cell_" + x + "_" + y;
    $(id).css("background-color", PALLETS[pallet].color);
    current_cells[x][y] = PALLETS[pallet].value;
}
const updateCellColor = event => {
    const p0 = $("#cells").offset();
    const p1 = event.changedTouches[0];
    const x = Math.floor((p1.pageX - p0.left) / (CELL_WIDTH + 3.6));
    const y = Math.floor((p1.pageY - p0.top) / (CELL_HEIGHT + 3.6));
    setCell(x, y, selected_pallet);
}
const clearCells = () => {
    for(var x = 0; x < 16; ++x){
        for(var y = 0; y < 32; ++y){
            setCell(x, y, "pallet0");
        }
    }
}
const postCells = () => {
    $.ajax({
        url:'./led',
        type:'POST',
        data:{ 'led' : current_cells }
    }).done(data => {}).fail(data => {});
}
$(document).ready(() => {
    $("#cells").on("touchstart", event => {
        updateCellColor(event);
    }).on("touchmove", event => {
        updateCellColor(event);
    });
    updateWindow();
    $(window).resize(() => {
        updateWindow();
    });
    current_cells = new Array(16);
    for(let x = 0; x < current_cells.length; ++x) {
        current_cells[x] = new Array(32).fill(0);
    }
    clearCells();
    $("#trash").click(() => clearCells());
    $("#transparent").click(() => clickPallet("transparent"));
    for(let id in PALLETS){
        var obj = $("#" + id);
        const pallet = PALLETS[id];
        obj.addClass("pallet").on("click", () => setPallet(id)).css("background-color", pallet.color);
        if(pallet.color === "transparent"){
            const img = $("<img>").attr("border", 0).attr("src", "assets/eraser.png").attr("width", "50px").attr("height", "50px");
            obj.css("background-color", "lightgray").append(img);
        }
    }
    setPallet("pallet0");
    setInterval(postCells, 100);
});
