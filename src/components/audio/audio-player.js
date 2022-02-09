import React from "react";
import ReactAudioPlayer from 'react-audio-player'
import Song from '../../assets/audio/song.mp3'

const AudioPlayer = () => {

    return (
        <ReactAudioPlayer
            src={Song}
            autoPlay
            controls
        />
    )
}

export default AudioPlayer;