let isAutomatically = true;

const solveAutomatically = () => {
    let autoElement = document.querySelector('.music-content-left__music-dashboard-controls__right-auto');
    if(autoElement) {
        autoElement.onclick = (e) => {
            isAutomatically = !isAutomatically;
            if(isAutomatically) {
                autoElement.querySelector('.music-content-left__music-dashboard-controls__right-auto-yes').style.display = 'flex';
                autoElement.querySelector('.music-content-left__music-dashboard-controls__right-auto-no').style.display = 'none';
            } else {
                autoElement.querySelector('.music-content-left__music-dashboard-controls__right-auto-yes').style.display = 'none';
                autoElement.querySelector('.music-content-left__music-dashboard-controls__right-auto-no').style.display = 'flex';
            }
        } 
    }
}

solveAutomatically();