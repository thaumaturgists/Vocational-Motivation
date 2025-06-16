import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MusicPlayer.css'; // Import the CSS file

interface Track {
  id: number;
  title: string;
  stream_url: string;
}

const MusicPlayer: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const CLIENT_ID = 'YOUR_SOUNDCLOUD_CLIENT_ID'; // Replace with your SoundCloud Client ID

  useEffect(() => {
    const fetchTracks = async () => {
      const response = await axios.get<Track[]>(`https://api.soundcloud.com/tracks?client_id=${CLIENT_ID}&limit=10`);
      setTracks(response.data);
    };

    fetchTracks();
  }, [CLIENT_ID]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const stopTrack = () => {
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  return (
    <div className="music-player">
      <h2>Now Playing</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id} onClick={() => playTrack(track)}>
            {track.title}
          </li>
        ))}
      </ul>
      {isPlaying && currentTrack && (
        <div>
          <h2>Now Playing: {currentTrack.title}</h2>
          <audio controls autoPlay>
            <source src={`${currentTrack.stream_url}?client_id=${CLIENT_ID}`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <button onClick={stopTrack}>Stop</button>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;