saveProgressButtonClick = function () {
    for (var i = 0; i < 8; i++) {

        for (var j = 0; j < 8; j++) {
            var id = i + "" + j;
            var imageNode = document.getElementById(id);
            APP_DATA[id] = {};
            APP_DATA[id]["clicked"] = imageNode.clicked;
            APP_DATA[id]["ImageSource"] = imageNode.src;
        }
    }

    APP_DATA["Score"] = document.getElementById('score').innerHTML;
    sessionStorage.setItem("APP_DATA", JSON.stringify(APP_DATA));
    alert('Progress has been saved!');
}

reloadPreviousSavePointButtonClick = function () {
    RELOAD_SAVED_PROGRESS = true;
    document.getElementsByClassName("main-container")[0].innerHTML = "";
    document.getElementById('score').innerHTML = "64";
    init();
}