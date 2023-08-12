// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let timeing=document.getElementById('timeing');
let play=0;

let songs = [
    {songName: "Ham Katha Sunate", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" ,timeing:"00:29"},
    {songName: "Namo Namo Sankara", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" ,timeing:"00:31"},
    {songName: "kanha so ja jara", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" ,timeing:"00:30"},
    {songName: "Achutyam Kesavam", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", timeing:"00:31"},
    {songName: "Adharam Madhuram", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" ,timeing:"00:30"},
    {songName: "Gobinda bolo hare", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" ,timeing:"02:34"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

audioElement.addEventListener("ended", () =>{
    if(songIndex<5){
    songIndex++;
    console.log(songIndex);
    audioElement.currentTime=0;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.play();
    document.getElementById(`${songIndex-1}`).classList.remove('fa-pause-circle');
    document.getElementById(`${songIndex-1}`).classList.add('fa-play-circle');
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songIndex].songName;
    timeing.innerText= songs[songIndex].timeing;
    }
    else{
        songIndex=0;
        audioElement.currentTime=0;
        audioElement.src=`songs/${songIndex+1}.mp3`;
        audioElement.play();
        document.getElementById(5).classList.remove('fa-pause-circle');
        document.getElementById(5).classList.add('fa-play-circle');
        document.getElementById(0).classList.remove('fa-play-circle');
        document.getElementById(0).classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName;
        timeing.innerText= songs[songIndex].timeing;
    }
    })
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        timeing.style.display='inline';
        timeing.innerText=songs[songIndex].timeing;
        document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
        document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        timeing.style.display='none';
        document.getElementById(`${songIndex}`).classList.remove('fa-pause-circle');
        document.getElementById(`${songIndex}`).classList.add('fa-play-circle');
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if(play==0){ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        timeing.innerText= songs[songIndex].timeing;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        timeing.style.display='inline';
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        play=1;
        }
        else{
            songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.pause();
        gif.style.opacity = 0;
        timeing.style.display='none';
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        play=0;
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    timeing.innerText=songs[songIndex].timeing;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    if(songIndex>0 && songIndex<=5){
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
    document.getElementById(`${songIndex-1}`).classList.remove('fa-pause-circle');
    document.getElementById(`${songIndex-1}`).classList.add('fa-play-circle');
    }
    else{
        if(songIndex==0){
            document.getElementById('5').classList.remove('fa-pause-circle');
            document.getElementById('5').classList.add('fa-play-circle');
            document.getElementById('0').classList.remove('fa-play-circle');
            document.getElementById('0').classList.add('fa-pause-circle');
        }
    }
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 5
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    timeing.innerText=songs[songIndex].timeing;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    if(songIndex>=0 && songIndex<5){
        document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
    document.getElementById(`${songIndex+1}`).classList.remove('fa-pause-circle');
    document.getElementById(`${songIndex+1}`).classList.add('fa-play-circle');
    }
    else{
        if(songIndex==5){
            document.getElementById('0').classList.remove('fa-pause-circle');
            document.getElementById('0').classList.add('fa-play-circle');
            document.getElementById('5').classList.remove('fa-play-circle');
            document.getElementById('5').classList.add('fa-pause-circle');
        }
    }
})

burger=document.querySelector('.burger');
navbar=document.querySelector('.navbar');
navList=document.querySelector('.nav-list');


burger.addEventListener('click',()=>{
    navList.classList.toggle('v-class-resp');
    navbar.classList.toggle('h-nav-resp');
})