/*** COLOR CHANGER ***/
$("#color-toggle").on("click", function () {
    var e = this.io ^= 1;
    $("#color-palate").animate({
        right: e ? 0 : -188
    }, "slow");
});

$("#color_01").on("click", function () {
    $("#switch_style").attr("href", "assets/css/style_01.css");
});
$("#color_02").on("click", function () {
    $("#switch_style").attr("href", "assets/css/style_02.css");
});
$("#color_03").on("click", function () {
    $("#switch_style").attr("href", "assets/css/style_03.css");
});
$("#color_04").on("click", function () {
    $("#switch_style").attr("href", "assets/css/style_04.css");
});
$("#color_05").on("click", function () {
    $("#switch_style").attr("href", "assets/css/style_05.css");
});
$("#color_06").on("click", function () {
    $("#switch_style").attr("href", "assets/css/style_06.css");
});