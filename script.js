console.log("Yokoso, watashi no Spots Society e")
// initialize varibales
let songIndex=1;
let audioElement = new Audio('songs/1.flac');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gifs = document.querySelectorAll('.gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName: "Fly me to the moon", filepath: "songs/1.flac", coverPath:"thumbs/1p.jpg"},
    {songName: "The Girl in the Drawing", filepath: "songs/2.flac", coverPath:"thumbs/2p.png"},
    {songName: "Introduction to the Snow", filepath: "songs/3.mp3", coverPath:"thumbs/34p.jpg"},
    {songName: "Stranded Lullaby", filepath: "songs/4.mp3", coverPath:"thumbs/34p.jpg"},
    {songName: "1.11  Ciel - black", filepath: "songs/5.flac", coverPath:"thumbs/56p.jpg"},
    {songName: "Si deus me relinquit", filepath: "songs/6.flac", coverPath:"thumbs/56p.jpg"},
    {songName: "このスピードの先へ", filepath: "songs/7.flac", coverPath:"thumbs/7p.png"},
    {songName: "Tender affection", filepath: "songs/8.flac", coverPath:"thumbs/8p.png"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//audioElement.play();
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gifs.forEach(gif => {
            gif.style.opacity = 1;
        });
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gifs.forEach(gif => {
            gif.style.opacity = 0;
        });
    }
}) 

//evnt listener
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value=progress;
    if(progress>=100){
        gifs.forEach(gif => {
            gif.style.opacity = 1;
        });
        if(songIndex>=8){
            songIndex=1;
        }
        else{
            songIndex+=1;
        }   
        if(songIndex!==3 && songIndex!==4){
            audioElement.src = `songs/${songIndex}.flac`;
        }
        else{
            audioElement.src = `songs/${songIndex}.mp3`;
        }    
        masterSongName.innerText=songs[songIndex-1].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = ((myProgressBar.value*audioElement.duration)/100);
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlay();
        gifs.forEach(gif => {
            gif.style.opacity = 1;
        });
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        if(songIndex!==3 && songIndex!==4){
            audioElement.src = `songs/${songIndex}.flac`;
        }
        else{
            audioElement.src = `songs/${songIndex}.mp3`;
        }    
        masterSongName.innerText=songs[songIndex-1].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    gifs.forEach(gif => {
        gif.style.opacity = 1;
    });
    if(songIndex>=8){
        songIndex=1;
    }
    else{
        songIndex+=1;
    }
    if(songIndex!==3 && songIndex!==4){
        audioElement.src = `songs/${songIndex}.flac`;
    }
    else{
        audioElement.src = `songs/${songIndex}.mp3`;
    }    
    masterSongName.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    gifs.forEach(gif => {
        gif.style.opacity = 1;
    });
    if(songIndex<=1){
        songIndex=8;
    }
    else{
        songIndex-=1;
    }
    if(songIndex!==3 && songIndex!==4){
            audioElement.src = `songs/${songIndex}.flac`;
    }
    else{
        audioElement.src = `songs/${songIndex}.mp3`;
    }    
    masterSongName.innerText=songs[songIndex-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})