//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3")
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongInfo=document.getElementById('masterSongInfo');
let duration1=document.getElementsByClassName('duration1')[0];
let currentTime1=document.getElementsByClassName('currentTime1')[0];

// let timeStamp=document.getElementsByClassName('duration');




let songs = [
    { songName: "Wario NCS", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    { songName: "Cielo-Huma Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    { songName: "Deaf Kev - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    { songName: "Different Heaven", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    { songName: "Rabba", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiya", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },

]
songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByTagName('span')[0].innerText = songs[i].songName;



});
function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
  
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
  
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
  
    return ret;
  }
  
//   console.log(
//     fancyTimeFormat(1),
//     fancyTimeFormat(10),
//     fancyTimeFormat(100),
//     fancyTimeFormat(1000),
//     fancyTimeFormat(10000),
  

//Handle Pause/Play
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
        console.log(audioElement.duration)
        let time=audioElement.duration;
        console.log(time);
        duration1.innerText=fancyTimeFormat(time);
        
        setInterval(() => {
            let ctime=fancyTimeFormat(audioElement.currentTime)
            currentTime1.innerText=ctime;
        }, 100);
        audioElement.loop=true;
        
    }

    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        // let time=audioElement.duration;
        // console.log(time);
        // duration1.innerText=fancyTimeFormat(time);
        // setInterval(() => {
        //     let ctime=fancyTimeFormat(audioElement.currentTime)
        //     currentTime1.innerText=ctime;
        // }, 100);
    }


})
//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate')
    //Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress)
    myProgressBar.value = progress
    let time=audioElement.duration;
    duration1.innerText=fancyTimeFormat(time);
    setInterval(() => {
        let ctime=fancyTimeFormat(audioElement.currentTime)
        currentTime1.innerText=ctime;
    }, 100);


})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * (audioElement.duration / 100);
})
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused){
        //console.log(e.target);
        makeAllPlay(element);
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex}.mp3`;
        console.log('Current Time :  ',audioElement.currentTime)
        audioElement.currentTime=0;
        audioElement.play();
        let time=audioElement.duration;
        console.log(time);
        duration1.innerText=fancyTimeFormat(time);
        setInterval(() => {
            let ctime=fancyTimeFormat(audioElement.currentTime)
            currentTime1.innerText=ctime;
        }, 100);
        masterSongInfo.innerText=songs[songIndex-1].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        audioElement.loop=true;
    }
    else{
        // Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
        //     element.addEventListener('click', (e) => {
                //console.log(e.target);
                // makeAllPlay(element);
                // songIndex = parseInt(e.target.id);
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                audioElement.pause();
                console.log('Current Time :  ',audioElement.currentTime)
                // audioElement.src = `songs/${songIndex}.mp3`;
                // audioElement.currentTime = 0;
                // audioElement.play();
                // let time=audioElement.duration;
                // console.log(time);
                // duration1.innerText=fancyTimeFormat(time);
                // setInterval(() => {
                //     let ctime=fancyTimeFormat(audioElement.currentTime)
                //     currentTime1.innerText=ctime;
                // }, 100);
                // masterSongInfo.innerText=songs[songIndex-1].songName;
                // masterPlay.classList.remove('fa-play-circle');
                // masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 0;
        
        
        
            }
        });
    });


//testing







document.getElementById('next').addEventListener('click', () => {
    if (songIndex >=7) {
        songIndex = 1
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    let time = audioElement.duration;
    console.log(time);
    duration1.innerText=fancyTimeFormat(time);
    setInterval(() => {
        let ctime=fancyTimeFormat(audioElement.currentTime)
        currentTime1.innerText=ctime;
    }, 100);
    audioElement.loop=true;
    masterSongInfo.innerText=songs[songIndex-1].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

})
document.getElementById('prev').addEventListener('click', () => {
    if (songIndex <= 1) {
        songIndex = 7
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    
    let time=audioElement.duration;
    console.log(time);
    duration1.innerText=fancyTimeFormat(time);
    setInterval(() => {
        let ctime=fancyTimeFormat(audioElement.currentTime)
        currentTime1.innerText=ctime;
    }, 100);
    audioElement.loop=true;
    masterSongInfo.innerText=songs[songIndex-1].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})
