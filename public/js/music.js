let isAutomatically = true;

const solveAutomatically = () => {
    let autoElement = document.querySelectorAll('.music-content-left__music-dashboard-controls__right-auto');
    if(autoElement) {
        autoElement.forEach(item => {
            item.onclick = (e) => {
                isAutomatically = !isAutomatically;
                autoElement.forEach(itemChild => {
                    if(isAutomatically) {
                        itemChild.querySelector('.music-content-left__music-dashboard-controls__right-auto-yes').style.display = 'flex';
                        itemChild.querySelector('.music-content-left__music-dashboard-controls__right-auto-no').style.display = 'none';
                    } else {
                        itemChild.querySelector('.music-content-left__music-dashboard-controls__right-auto-yes').style.display = 'none';
                        itemChild.querySelector('.music-content-left__music-dashboard-controls__right-auto-no').style.display = 'flex';
                    }
                })
            } 
        })
    }
}

solveAutomatically();

const music = function() {
    return {
        element: {
            musicAudio: document.querySelector('.music-content-left__music-audio'),
            playButton: document.querySelector('.music-content-left__music-dashboard-controls__left-play'),
            range: document.querySelector('.music-content-left__music-dashboard-range'),
            currentTime: document.querySelector('.music-content-left__music-dashboard-controls__left-time-current'),
            durationTime: document.querySelector('.music-content-left__music-dashboard-controls__left-time-long'),
            volumeMusic: document.querySelector('.music-content-left__music-dashboard-controls__right-volume'),
            rangeVolume: document.querySelector('.music-content-left__music-dashboard-controls__right-volume-child-range'),
        },
        helper: {
            solveValidTime (time){
                time = Math.floor(time);
                let minuteTime = Math.floor(time / 60);
                minuteTime = (minuteTime >= 10) ? minuteTime : ('0' + minuteTime);
                let secondTime = Math.floor(time % 60);
                secondTime = secondTime > 10 ? secondTime : ('0' + secondTime);

                let answer = `${minuteTime}:${secondTime}`;

                return answer;
            },
            // Insert valid time to music
            validTime(currentTime, durationTime) {
                music.element.currentTime.innerHTML = music.helper.solveValidTime(currentTime);
                music.element.durationTime.innerHTML = music.helper.solveValidTime(durationTime);
            },
            // Solve range running
            solveRangeRunningAutomatically(currentTime, durationTime) {
                let currentRange = Math.floor((currentTime / durationTime) * 200); 
                music.element.range.value = currentRange;
            },
            // Solve when currentTime equals duration
            solveCurrentTimeEqualsDuration() {

            },
            // Solve range change
            solveRangeChane(valueRange, durationTime) {
                return (valueRange / 200) * durationTime;
            }
        }
        ,
        event() {
            // Turn On Music
            this.element.playButton.onclick = (e) => {
                if(!this.element.playButton.classList.contains('music-content-left__music-dashboard-controls__left-play--active')) {
                    this.element.playButton.classList.add('music-content-left__music-dashboard-controls__left-play--active');
                    this.element.musicAudio.play();
                } else {
                    this.element.playButton.classList.remove('music-content-left__music-dashboard-controls__left-play--active');
                    this.element.musicAudio.pause();
                }
            }
            // Change music
            music.element.range.onchange = (e) => {
                let valueRange = e.target.value;
                let durationTime = music.element.musicAudio.duration;
                let currentTimeChange = music.helper.solveRangeChane(valueRange, durationTime);
                music.element.musicAudio.currentTime = currentTimeChange;
            }
            // Turn On volume music
            music.element.rangeVolume.onclick = (e) => {
                e.stopPropagation();
                let currentRangeVolume = music.element.rangeVolume.value;
                let valueVolume = music.element.musicAudio.volume;
                if(+currentRangeVolume === 0) {
                    music.element.volumeMusic.classList.add('music-content-left__music-dashboard-controls__right-volume--active');
                } else {
                    music.element.volumeMusic.classList.remove('music-content-left__music-dashboard-controls__right-volume--active');
                }
                music.element.musicAudio.volume = (currentRangeVolume / 10);                
            }
            // Turn off volume music
            music.element.volumeMusic.onclick = (e) => {
                if(!music.element.volumeMusic.classList.contains('music-content-left__music-dashboard-controls__right-volume--active')) {
                    music.element.volumeMusic.classList.add('music-content-left__music-dashboard-controls__right-volume--active');
                    music.element.rangeVolume.value = 0;
                    music.element.musicAudio.volume = 0;
                } else {
                    music.element.volumeMusic.classList.remove('music-content-left__music-dashboard-controls__right-volume--active');
                    music.element.rangeVolume.value = 10;
                    music.element.musicAudio.volume = 1;
                }

            }
        },
        run() {
            // Event
            this.event();
             // The music run
            this.element.musicAudio.ontimeupdate = () => {
                // component
                let durationTime = this.element.musicAudio.duration;
                let currentTime = this.element.musicAudio.currentTime;
                
                this.helper.validTime(currentTime, durationTime);
                this.helper.solveRangeRunningAutomatically(currentTime, durationTime);
                // this.helper.solveRangeChane(durationTime)
                // console.log(this.helper.solveRangeChane(durationTime));
            }
        }
    }
}();

music.run();

if(document.querySelector('.music-content-left__music-subtitle__left-create-subtitle-child__button')) {
    document.querySelector('.music-content-left__music-subtitle__left-create-subtitle-child__button').onclick = (e) => {
        document.querySelector('.music-content-left__music-subtitle__left-create-form').submit();
    }
}

// Solve event onclick turn on create subtitle

const appearAndAbsentCreateSubtitle = (() => {
    if(document.querySelector('.music-content-left__music-subtitle__left-create-subtitle-child')) {
        document.querySelector('.music-content-left__music-subtitle__left-create-subtitle-button').onclick = (e) => {
            document.querySelector('.music-content-left__music-subtitle__left-create-subtitle-child').style.display = 'block';
        } 

    }

    


})();

if(document.querySelector('.music-content-left__music-subtitle__left-create-subtitle-close')) {
    document.querySelector('.music-content-left__music-subtitle__left-create-subtitle-close').onclick = (e) => {
        document.querySelector('.music-content-left__music-subtitle__left-create-subtitle-child').style.display = 'none';
    }
}