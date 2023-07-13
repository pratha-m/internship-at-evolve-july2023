let songs=[
    {
       songName:"Eminsessizz_Instagram_Viral_Song.mp3",
       songArtist:"artist1",
       songImage:"images/image1.jpg",
       songPath:"audios/Eminsessizz - Instagram Viral Song.mp3" 
    },
    {
       songName:"Instagram_Viral_BGM_Unle.mp3",
       songArtist:"artist2",
       songImage:"images/image2.jpg",
       songPath:"audios/Instagram Viral BGM - Unle.mp3" 
    },
    {
       songName:"Sigma_Rule_Polozhenie_Instagram_Viral_Music.mp3",
       songArtist:"artist3",
       songImage:"images/image3.jpg",
       songPath:"audios/Sigma Rule - Polozhenie ! Instagram Viral Music.mp3" 
    },
    {
       songName:"Swaha_X_Faded_Instagram_Viral_Song.mp3",
       songArtist:"artist4",
       songImage:"images/image4.jpg",
       songPath:"audios/Swaha X Faded ! Instagram Viral Song.mp3" 
    },
    {
       songName:"Tokyo_Drift_Instagram_Viral_Music.mp3",
       songArtist:"artist5",
       songImage:"images/image2.jpg",
       songPath:"audios/Tokyo Drift - Instagram Viral Music.mp3" 
    }
]
let audioElement=document.createElement("audio");
let playPauseBtnIcon=document.querySelector("#playPauseBtn>i");
let songImageTag=document.getElementById("songImageTag");
let songName=document.querySelector("#songName>p");
let songArtist=document.querySelector("#songArtist>p");
let previousBtn=document.getElementById("previousBtn");
let nextBtn=document.getElementById("nextBtn");
let songVolumeInput=document.getElementById("songVolumeInput");
let lowVolumeSpan=document.getElementById("lowVolumeSpan");
let highVolumeSpan=document.getElementById("highVolumeSpan")
let finalTime=document.getElementById("finalTime");
let initialTime=document.getElementById("initialTime");
let songSeekInput=document.getElementById("songSeekInput");
let autoplayBtn=document.getElementById("autoplayBtn");
let repeatBtn=document.getElementById("repeatBtn");
let isPlayingSong=false;
let isAutoplay=false;
let isRepeat=false;

let start=0;

window.setInterval(()=>{
    if(isPlayingSong){
        initialTime.innerText=(audioElement.currentTime/60).toFixed(2);
    }
    autoChangeSeekBar();
},1000);
function autoChangeSeekBar(){
    let totalSeconds=audioElement.duration.toFixed(2); 
    let totalPercentage=100;
    let currentSeconds=audioElement.currentTime;
    let changingPercentage=(totalPercentage/totalSeconds)*currentSeconds;
    songSeekInput.value=changingPercentage;
    if(currentSeconds==audioElement.duration){
        if(isAutoplay){
            if(start==songs.length-1){
                start=0;
                loadContent();
                playSong();
            }
            else{
                nextSong();
            }
        }
        else if(isRepeat){
            playSong();
        }
        else{
            pauseSong();
        }
    }   
}
function autoplay(){
    if(isAutoplay==true){
        isAutoplay=false;
        autoplayBtn.style.backgroundColor="gray";
    }
    else{
        isAutoplay=true;
        autoplayBtn.style.backgroundColor="#614949";
    }
}
function repeat(){
    if(isRepeat==true){
        isRepeat=false;
        repeatBtn.style.backgroundColor="gray";
    }
    else{
        isRepeat=true;
        repeatBtn.style.backgroundColor="#614949";
    }
}
function loadVolume(){
    audioElement.volume=songVolumeInput.value/100;
    if(audioElement.volume==0){
        lowVolumeSpan.style.backgroundColor="#614949";
        lowVolumeSpan.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"/></svg>`
    }
    else{
        lowVolumeSpan.style.backgroundColor="gray";
        lowVolumeSpan.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 64c0-12.6-7.4-24-18.9-29.2s-25-3.1-34.4 5.3L131.8 160H64c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64h67.8L266.7 471.9c9.4 8.4 22.9 10.4 34.4 5.3S320 460.6 320 448V64z"/></svg>`
    }
    if(audioElement.volume==1){
        highVolumeSpan.style.backgroundColor="#614949";
    }
    else{
        highVolumeSpan.style.backgroundColor="gray";
    }
    // console.log(audioElement.currentTime);
}
function changeTime(event){
    let totalSeconds=audioElement.duration.toFixed(2); 
    let currentPercentage=event.target.value;
    let totalPercentage=100;
    let changingSeconds=(totalSeconds/totalPercentage)*currentPercentage;
    audioElement.currentTime=changingSeconds;
    initialTime.innerText=(audioElement.currentTime/60).toFixed(2);
}
function changeVolume(event){
    audioElement.volume=event.target.value/100;
    loadVolume();
}
function lowVolume(){
    songVolumeInput.value=0;
    loadVolume();
}
function highVolume(){
    songVolumeInput.value=100;
    loadVolume();
}
function playPauseSong(e){
   if(playPauseBtnIcon.classList.contains("fa-play")){
       audioElement.play();
       playPauseBtnIcon.classList.remove("fa-play");
       playPauseBtnIcon.classList.add("fa-pause"); 
       isPlayingSong=true;
   }
   else{
       playPauseBtnIcon.classList.remove("fa-pause"); 
       playPauseBtnIcon.classList.add("fa-play"); 
       audioElement.pause();
       isPlayingSong=false;
   }
}
function playSong(){
    audioElement.play();
    playPauseBtnIcon.classList.remove("fa-play");
    playPauseBtnIcon.classList.add("fa-pause"); 
    isPlayingSong=true;
}
function pauseSong(){
    playPauseBtnIcon.classList.remove("fa-pause"); 
    playPauseBtnIcon.classList.add("fa-play"); 
    audioElement.pause();
    isPlayingSong=false;
}
function nextSong(){
    if(start<songs.length-1){
        start++;
        loadContent();
        playSong();
    }
}
function previousSong(){
    if(start>0){
        start--;
        loadContent();
        playSong();
    }
}
function loadContent(){
    audioElement.src=songs[start].songPath;
    songImageTag.src=songs[start].songImage;
    songName.innerText=songs[start].songName;
    songArtist.innerText=songs[start].songArtist;
    // previous btn disabled logic 
    if(start==0){
        previousBtn.disabled=true;
        previousBtn.style.backgroundColor="#614949";
    }
    else{
        previousBtn.disabled=false;
        previousBtn.style.backgroundColor="gray";
    }
    // next button disabled logic 
    if(start==songs.length-1){
        nextBtn.disabled=true;
        nextBtn.style.backgroundColor="#614949"; 
    }
    else{
        nextBtn.disabled=false;
        nextBtn.style.backgroundColor="gray";
    }

    audioElement.onloadeddata=()=>{
        finalTime.innerText=(audioElement.duration/60).toFixed(2)
    }
}
loadContent();