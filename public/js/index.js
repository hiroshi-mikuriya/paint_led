var selected_color = "black";

const clickPallet = (id) => {
    selected_color = id;
}
$(document).ready(() => {
    for(var x = 0; x < 16; ++x){
        for(var y = 0; y < 32; ++y){
            id = "#cell_" + x + "_" + y;
            $(id).hover(() => {
                // over
                $(id).css("background-color", selected_color);
                console.log(selected_color + id);
            }, () => {
                // out
            });
        }
    }
});
