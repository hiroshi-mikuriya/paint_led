var selected_color = "black";

const clickPallet = (id) => {
    selected_color = id;
}
const updateWindow = () => {
    const top = ($(window).height() - $("#main").height()) / 2;
    const left = ($(window).width() - $("#main").width()) / 2;
    $("#main").css("margin-top", top);
    $("#main").css("margin-left", left);
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
    updateWindow();
    $(window).resize(() => {
        updateWindow();
    });
});
