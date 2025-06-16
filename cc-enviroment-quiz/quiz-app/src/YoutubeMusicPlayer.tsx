import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MusicPlayer.css'; // Import the CSS file

interface Video {
  id: string;
  title: string;
}

const MusicPlayer: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const API_KEY = 'AIzaSyDnn_dh4aXQ9XRKAxuDgEswwu4W6_y_Kv0'; // Replace with your YouTube API key

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          type: 'video',
          videoCategoryId: '10', // Music category
          maxResults: 10,
          key: API_KEY,
        },
      });
      const fetchedVideos = response.data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
      }));
      setVideos(fetchedVideos);
    };

    fetchVideos();
  }, [API_KEY]);

  const playVideo = (video: Video) => {
    setCurrentVideo(video);
    setIsPlaying(true);
  };

  const stopVideo = () => {
    setIsPlaying(false);
    setCurrentVideo(null);
  };

  return (
    <div className="music-player">
      <h2>Now Playing</h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id} onClick={() => playVideo(video)}>
            {video.title}
          </li>
        ))}
      </ul>
      {isPlaying && currentVideo && (
        <div>
          <h2>Now Playing: {currentVideo.title}</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`}
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button onClick={stopVideo}>Stop</button>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
