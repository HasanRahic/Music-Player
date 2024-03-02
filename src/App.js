import{ useRef, useState }from 'react';
import './App.css';

function App() {

  const [currentMusicDetails, setcurrentMusicDetails] = useState ({
    songName:'Ne Volim',
    songArtist: 'Buba Corelli & Jala Brat & Elena',
    songSrc:'./Assets/Songs/Buba Corelli & Jala Brat & Elena - Ne Volim.mp3',
    songAvatar:'./Assets/Images/image1.jpg'
  })
  const [audioProgress, setAudioProgress] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [musicIndex, setmusicIndex] = useState(0)
  const [musicTotalLength, setmusicTotalLength] = useState('04 : 38')
  const [musicCurrentTime, setmusicCurrentTime] = useState('00 : 00')
  const [videoIndex, setvideoIndex] = useState(0)

  const currentAudio = useRef()

  const handleMusicProgressBar = (e) =>{
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }

  let avatarClass = ['objectFitCover', 'objectFitContain', 'none']
  const [avatarClassIndex, setAvatarClassIndex] = useState(0)

  const handleAvatar = () =>{
    if(avatarClassIndex >= avatarClass.length - 1){
      setAvatarClassIndex(0)
    }else{
      setAvatarClassIndex(avatarClassIndex + 1)
    }
  }
  const handleAudioPlay= () => {
    if(currentAudio.current.paused){
      currentAudio.current.play();
      setIsAudioPlaying(true);
    }else{
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  }

  const musicApi = [
    {
      songName:'Ne Volim',
      songArtist: 'Buba Corelli & Jala Brat & Elena',
      songSrc:'./Assets/Songs/Buba Corelli & Jala Brat & Elena - Ne Volim.mp3',
      songAvatar:'./Assets/Images/image1.jpg'
    },
    {
      songName: 'Mama',
      songArtist: 'Rasta',
      songSrc:'./Assets/Songs/Rasta - Mama (Official Video).mp3',
      
      songAvatar:'./Assets/Images/image2.jpg'
    },
    {
      songName:'Rosalia (GOAT SEASON PART ONE)',
      songArtist: 'Jala Brat & Buba Corelli',
      songSrc:'./Assets/Songs/Jala Brat & Buba Corelli - Rosalia (GOAT SEASON PART ONE).mp3',
      songAvatar:'./Assets/Images/image3.jpg'
    },
    {
      songName:'Jao Mama',
      songArtist: 'Coby x Rouzi',
      songSrc:'./Assets/Songs/Coby x Rouzi - Jao Mama.mp3',
      songAvatar:'./Assets/Images/image4.jpg'
    },
    {
      songName:'Ljubavi Moja',
      songArtist: 'Elitni Odredi',
      songSrc:'./Assets/Songs/Ljubavi Moja.mp3',
      songAvatar:'./Assets/Images/image5.jpg'
    },
    {
      songName:'Kao ja',
      songArtist: 'Buba Corelli & Jala & Sedž Matoruga',
      songSrc:'./Assets/Songs/Kao ja feat. Sedž Matoruga.mp3',
      
      songAvatar:'./Assets/Images/image6.jpg'
    },
    {
      songName:'Sreda',
      songArtist: 'Lacku',
      songSrc:'./Assets/Songs/Sreda.mp3',
      songAvatar:'./Assets/Images/image7.jpg'
    }
  ]

  const handlePrevSong = () =>{
    if(musicIndex === 0){
      let setNumber = musicApi.length - 1;
      setmusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber)
    }else{
      let setNumber = musicIndex - 1;
      setmusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber)
    }
  }

  const handleNextSong = () =>{
    if(musicIndex >= musicApi.length - 1){
      let setNumber = 0;
      setmusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber)
    }else{
      let setNumber = musicIndex + 1;
      setmusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber)
    }
  }


  const updateCurrentMusicDetails = (number) =>{
    let musicObject = musicApi[number]
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setcurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar
    })
    setIsAudioPlaying(true);
    
  }

  const handleAudioUpdate = () =>{
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10? `0${minutes}` : minutes} : ${seconds < 10? `0${seconds}` : seconds}`;
    setmusicTotalLength(musicTotalLength0);

    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10? `0${currentMin}` : currentMin} : ${currentSec < 10? `0${currentSec}` : currentSec}`;
    setmusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress)? 0 : progress)
  }

  const vidArray = ['./Assets/Videos/video3.mp4', './Assets/Videos/video2.mp4', './Assets/Videos/video1.mp4', './Assets/Videos/video4.mp4', './Assets/Videos/video5.mp4']

  const handleChangeBackground = () =>{
    if(videoIndex > vidArray.length - 1){
      setvideoIndex(0);
    }else{
      setvideoIndex(videoIndex + 1)
    }
  }

  return (
    <>
    <div className="container">
      <audio src='./Assets/Songs/Buba Corelli & Jala Brat & Elena - Ne Volim.mp3' ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
      <video src={vidArray[videoIndex]} loop muted autoPlay className='backgroundVideo'></video>
      <div className="blackScreen"></div>
      <div className="music-Container">
        <p className="musicPlayer">Music Player</p>
        <p className="music-Head-Name">{currentMusicDetails.songName}</p>
        <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>
        <img src={currentMusicDetails.songAvatar} className={avatarClass[avatarClassIndex]} onClick={handleAvatar} alt="song Avatar" id="songAvatar" />
        <div className="musicTimerDiv">
          <p className="musicCurrentTime">{musicCurrentTime}</p>
          <p className="musicTotalLength">{musicTotalLength}</p>
        </div>
        <input type="range" name="musicProgressBar" className="musicProgressBar" value={audioProgress} onChange={handleMusicProgressBar} />
        <div className="musicControlers">
          <i className="fa-solid fa-backward musicControler" onClick={handlePrevSong}></i>
          <i className={`fa-solid ${isAudioPlaying? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
          <i className="fa-solid fa-forward musicControler" onClick={handleNextSong}></i>
        </div>
      </div>
      <div className="changeBackBtn" onClick={handleChangeBackground}>
        Change Background
      </div>
    </div>
    </>
  );
}

export default App;
