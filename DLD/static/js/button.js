$("#slider").roundSlider({
    sliderType: "min-range",
    handleShape: "round",
    width: 22,
    radius: 100,
    value: 45,
    circleShape: "half-top",
    lineCap: "round",
    handleSize: "+2",

    drag: function (args) {
        // handle the drag event here
    },
    change: function (args) {
        // handle the change event here
    }
});