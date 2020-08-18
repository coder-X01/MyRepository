function computeRem() {
    var winWidth = document.documentElement.clientWidth;
    var winHeight = document.documentElement.clientHeight;
    winWidth = Math.min(winWidth, winHeight * 0.56)
    var targetRem = parseInt(winWidth / 375 * 100);
    if (targetRem % 2) {
        targetRem++;
    }
    document.documentElement.style.fontSize = targetRem + "px";
}

window.addEventListener("resize", computeRem);

computeRem();