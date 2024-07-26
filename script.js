let body = document.querySelector("body");
let dark = document.getElementById("dark");
let darkText = document.getElementById("darkText");
let darkMode = false;
let header = document.getElementsByClassName("header");
let nat = document.getElementsByClassName("member")[0]; //non-bright red
let gilbert = document.getElementsByClassName("member")[1]; // orange 
let daibi = document.getElementsByClassName("member")[2];
let noah = document.getElementsByClassName("member")[3]; //blue
let pfpdivs = document.querySelectorAll("pfpDivs");
dark.style.backgroundColor = "rgba(0, 0, 0, 0.829)";
nat.onclick = function(){
    body.style.transition = "background 2s";
    body.style.backgroundColor = "maroon";
}
gilbert.onclick = function(){
    body.style.transition = "background 2s";
    body.style.backgroundColor = "DarkOrange";
}
daibi.onclick = function(){
    body.style.transition = "background 2s";
    body.style.backgroundColor = "rgb(0, 0, 150)";
}
noah.onclick = function(){
    body.style.transition = "background 2s";
    body.style.backgroundColor = "royalblue";
    dark.style.fontPallete = "white"
}
dark.onclick = function(){
    if(!darkMode){
        body.style.transition = "background 2s";
        body.style.backgroundColor = "rgb(30, 30, 30)";
        dark.style.backgroundColor = "white";
        dark.innerHTML = "Enter Light Mode";
        darkMode = true;
    }
    else{
        body.style.transition = "background 2s";
        body.style.backgroundColor = "white";
        dark.style.backgroundColor = "rgba(0, 0, 0, 0.829)";
        dark.innerHTML = "Enter Dark Mode";
        darkMode = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF'];
    let currentIndex = 0;
    let nextIndex = 1;
    let isTransitioning = true;
    let intervalId;

    const image = document.getElementById("logo")
    const duration = 2000; // Duration of color transition in milliseconds
    const steps = 100; // Number of steps for smooth transition
    const stepTime = duration / steps; // Time per step in milliseconds

    function interpolateColor(color1, color2, factor) {
        let result = color1.slice();
        for (let i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
        }
        return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
    }

    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length === 7) { // #RRGGBB
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        }
        return [r, g, b];
    }
    

    function transitionColors() {
        let startColor = hexToRgb(colors[currentIndex]);
        let endColor = hexToRgb(colors[nextIndex]);
        let step = 0;

        function animate() {
            if (step <= steps) {
                let factor = step / steps;
                body.style.backgroundColor = interpolateColor(startColor, endColor, factor);
                step++;
                setTimeout(animate, stepTime);
            } else {
                currentIndex = nextIndex;
                nextIndex = (nextIndex + 1) % colors.length;
            }
        }
        animate();
    }

    function startTransition() {
        intervalId = setInterval(transitionColors, duration)
    }

    function stopTransition() {
        clearInterval(intervalId);
    }


    image.addEventListener('click', () => {
        if (isTransitioning) {
            stopTransition();
        } else {
            startTransition();
        }
        isTransitioning = !isTransitioning;
    });
});
