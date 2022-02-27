let isAutomatically = true;


const solveAutomatically = () => {
    let autoElement = document.querySelectorAll('.music-content-left__music-dashboard-controls__right-auto');
    if(autoElement) {
        autoElement.forEach(item => {
            item.onclick = (e) => {
                isAutomatically = !isAutomatically;
                autoElement.forEach(itemChild => {
                    if(isAutomatically) {
                        itemChild.classList.remove('music-content-left__music-dashboard-controls__right-auto--active')

                    } else {
                        itemChild.classList.add('music-content-left__music-dashboard-controls__right-auto--active')
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
            sourceAudio: document.querySelector('.music-content-left__music-audio-source'),
            playButton: document.querySelector('.music-content-left__music-dashboard-controls__left-play'),
            range: document.querySelector('.music-content-left__music-dashboard-range'),
            currentTime: document.querySelector('.music-content-left__music-dashboard-controls__left-time-current'),
            durationTime: document.querySelector('.music-content-left__music-dashboard-controls__left-time-long'),
            volumeMusic: document.querySelector('.music-content-left__music-dashboard-controls__right-volume'),
            rangeVolume: document.querySelector('.music-content-left__music-dashboard-controls__right-volume-child-range'),
            playButtonPlaylist: document.querySelectorAll('.music-content-left__music-playlist__list-items-right-play'),
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
                if(!currentRange) {
                    currentRange = 0;
                }
                music.element.range.value = currentRange;
            },
            // Solve next the music on sidebar 
            solveNextMusicRightSideBar() {
                let list = document.querySelectorAll('.music-content-right-items');
                          
                let index = 0;
                for(let i in list) {
                    let idItem = list[i].querySelector('.music-content-right-items-link').href.split('/')[list[i].querySelector('.music-content-right-items-link').href.split('/').length - 1];
                    if(window.location.href.search(idItem) != -1) {
                        console.log('ok')
                        index = i;
                        break;
                    } 
                }

                for(let i in list) {
                    let idItem = list[i].querySelector('.music-content-right-items-link').href.split('/')[list[i].querySelector('.music-content-right-items-link').href.split('/').length - 1];
                    if(index == list.length - 1) {
                        window.location.href = list[0].querySelector('.music-content-right-items-link').href;
                    } else {
                        if(window.location.href.search(idItem) == -1 && i > index) {
                            window.location.href = list[i].querySelector('.music-content-right-items-link').href;
                            break;
                        }
                    }
                }
            },
            // Solve when currentTime equals duration
            solveCurrentTimeEqualsDuration(currentTime, durationTime) {
                if(currentTime >= durationTime) {
                    if(window.location.href.search('playlist') != -1) {
                        let theMain = 0;
                        let index = 0;
                        document.querySelectorAll('.music-content-left__music-playlist__list-items').forEach(item => {
                            if(item.classList.contains('music-content-left__music-playlist__list-items--active')) {
                                theMain = index;
                            }
                            index ++;
                        })
                        music.helper.removeClasslist(document.querySelectorAll('.music-content-left__music-playlist__list-items'), 'music-content-left__music-playlist__list-items--active')
                        if(theMain < document.querySelectorAll('.music-content-left__music-playlist__list-items').length -1) {
                            console.log(document.querySelectorAll('.music-content-left__music-playlist__list-items-left-path')[theMain + 1])
                            music.element.musicAudio.src = document.querySelectorAll('.music-content-left__music-playlist__list-items-left-path')[theMain+1].name;
                            music.element.playButton.classList.add('music-content-left__music-dashboard-controls__left-play--active');
                            music.element.musicAudio.play();
                            document.querySelectorAll('.music-content-left__music-playlist__list-items')[theMain+1].classList.add('music-content-left__music-playlist__list-items--active');
                        } else {
                            if(document.querySelector('.music-content-left__music-dashboard-controls__right-auto').classList.contains('music-content-left__music-dashboard-controls__right-auto--active')) {
                                music.helper.removeClasslist(document.querySelectorAll('.music-content-left__music-playlist__list-items'), 'music-content-left__music-playlist__list-items--active')
                                document.querySelectorAll('.music-content-left__music-playlist__list-items')[0].classList.add('music-content-left__music-playlist__list-items--active')
                                music.element.musicAudio.src = document.querySelectorAll('.music-content-left__music-playlist__list-items-left-path')[0].name;
                                music.element.playButton.classList.add('music-content-left__music-dashboard-controls__left-play--active');
                                music.element.musicAudio.play();
                            } else {
                                music.helper.solveNextMusicRightSideBar();
                            }   
                        }
    
                    } else {
                        if(document.querySelector('.music-content-left__music-dashboard-controls__right-auto').classList.contains('music-content-left__music-dashboard-controls__right-auto--active')) {
                            music.element.playButton.classList.add('music-content-left__music-dashboard-controls__left-play--active');
                            music.element.musicAudio.play();
                        } else {
                            music.helper.solveNextMusicRightSideBar();
                        }
                        
                    }
                }
            },
            // Solve range change
            solveRangeChane(valueRange, durationTime) {
                return (valueRange / 200) * durationTime;
            },
            // remove class active of classList
            removeClasslist(list, className) {
                list.forEach(item => {
                    item.classList.remove(className);
                })
              
            }
        }
        ,
        event() {
            // Turn On Music
            if(this.element.playButton) {
                this.element.playButton.onclick = (e) => {  
                    let checkPlaylist = true;
                    document.querySelectorAll('.music-content-left__music-playlist__list-items').forEach(item => {
                        if(item.classList.contains('music-content-left__music-playlist__list-items--active')) {
                            checkPlaylist = false;
                        }
                    })

                    if(checkPlaylist) {
                        if(document.querySelectorAll('.music-content-left__music-playlist__list-items')[0]) {
                            document.querySelectorAll('.music-content-left__music-playlist__list-items')[0].classList.add('music-content-left__music-playlist__list-items--active')
                        }
                    }

                    if(!this.element.playButton.classList.contains('music-content-left__music-dashboard-controls__left-play--active')) {
                        if( this.element.playButton) {
                            this.element.playButton.classList.add('music-content-left__music-dashboard-controls__left-play--active');
                        }
                        this.element.musicAudio.play();
                    } else {
                        if(this.element.playButton) {
                            this.element.playButton.classList.remove('music-content-left__music-dashboard-controls__left-play--active');
                        }
                        this.element.musicAudio.pause();
                    }
                }
            }
            // Change music
            if(music.element.range) {
                music.element.range.onchange = (e) => {
                    // music.element.musicAudio.removeAttribute('autoplay');
                    let valueRange = e.target.value;
                    let durationTime = music.element.musicAudio.duration;
                    let currentTimeChange = music.helper.solveRangeChane(valueRange, durationTime);
                    music.element.musicAudio.currentTime = currentTimeChange;
                }
            }
            // Turn On volume music
            if(music.element.rangeVolume) {
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
            }
            // Turn off volume music
            if(music.element.volumeMusic) {
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
            }

            if(this.element.playButtonPlaylist) {
                for(let i in this.element.playButtonPlaylist) {
                    this.element.playButtonPlaylist[i].onclick = (e) => {
                        const grandParent = e.target.parentNode.parentNode.parentNode.parentNode;
                        this.helper.removeClasslist(document.querySelectorAll('.music-content-left__music-playlist__list-items'), 'music-content-left__music-playlist__list-items--active')
                        grandParent.classList.add('music-content-left__music-playlist__list-items--active');

                        const path = document.querySelectorAll('.music-content-left__music-playlist__list-items-left-path')[i].name;
                        this.element.musicAudio.src = path;
                        this.element.sourceAudio.src = path;
                        this.element.playButton.classList.add('music-content-left__music-dashboard-controls__left-play--active');
                        this.element.musicAudio.play();
                        this.element.range.value = 0;                    
                    }
                }
            }
        },
        run() {
            // music.element.musicAudio.play();
            // Event
            // The music run
            this.event();
            
            if(document.querySelectorAll('.music-content-left__music-playlist__list-items')[0]) {
                document.querySelectorAll('.music-content-left__music-playlist__list-items')[0].classList.add('music-content-left__music-playlist__list-items--active')
            
            }
            if(this.element.playButton) {
                this.element.playButton.classList.add('music-content-left__music-dashboard-controls__left-play--active');
            }
            if(this.element.musicAudio) {
                this.element.musicAudio.ontimeupdate = () => {

                    // component
                    let durationTime = this.element.musicAudio.duration;
                    let currentTime = this.element.musicAudio.currentTime;

                    if(!durationTime) {
                        durationTime = 1;
                    }

                    // console.log(durationTime, currentTime);
                    
                    this.helper.validTime(currentTime, durationTime);
                    this.helper.solveRangeRunningAutomatically(currentTime, durationTime);
                    this.helper.solveCurrentTimeEqualsDuration(currentTime, durationTime);
                    // this.helper.solveRangeChane(durationTime)
                    // console.log(this.helper.solveRangeChane(durationTime));
                }
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

const setValidationTheLengthOfTitlePlaylist = (() => {
    document.querySelectorAll('.music-content-left__newMusic-list--playlist-items-title').forEach(item => {
        if(item.innerText.length > 32) {
            console.log(item.innerText.length)
            let value = item.innerText;
            let validation = value.substr(0, 32);
            validation += '...';
            item.innerText = validation;
        }
    })
    document.querySelectorAll('.music-content-left__newMusic-list--playlist-items-singers').forEach(item => {
        if(item.innerText.length > 32) {
            console.log(item.innerText.length)
            let value = item.innerText;
            let validation = value.substr(0, 42);
            validation += '...';
            item.innerText = validation;
        }
    })
})();
