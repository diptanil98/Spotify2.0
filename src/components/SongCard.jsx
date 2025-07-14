import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './Playpause';
import { playPause, setActiveSong } from '../redux/features/PlayerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // Safely extract song data with fallbacks
  const songTitle = song?.attributes?.name || song?.title || 'Unknown Song';
  const artistName = song?.attributes?.artistName || song?.subtitle || 'Unknown Artist';
  const albumName = song?.attributes?.albumName || '';
  const songId = song?.id || song?.key || song?.attributes?.isrc || '';
  const artistId = song?.relationships?.artists?.data?.[0]?.id ||
                   song?.artists?.[0]?.adamid ||
                   '';

  // Fix artwork URL extraction and processing
  let artworkUrl = '';
  if (song?.attributes?.artwork?.url) {
    // Replace the {w}x{h} placeholder with actual dimensions
    artworkUrl = song.attributes.artwork.url
      .replace('{w}', '440')
      .replace('{h}', '440');
  } else if (song?.images?.coverart) {
    artworkUrl = song.images.coverart;
  }

  // Check if this song is currently active
  const isActive = activeSong?.id === songId;

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        {/* Image */}
        {artworkUrl ? (
          <img 
            alt={`${songTitle} cover art`}
            src={artworkUrl}
            className="w-full h-full rounded-lg object-cover"
            onError={(e) => {
              console.error('Image failed to load:', e.target.src);
              e.target.src = '/default-album-cover.png';
              e.target.onerror = null; // Prevent infinite loop if fallback fails
            }}
            onLoad={() => {
              console.log('Image loaded successfully:', artworkUrl);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">No Image</span>
          </div>
        )}
        
        {/* Overlay with play/pause button */}
        <div className={`absolute inset-0 flex justify-center items-center rounded-lg transition-opacity duration-300 ${
          isActive 
            ? 'bg-black/40 opacity-100' 
            : 'bg-black/30 opacity-0 group-hover:opacity-100'
        }`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${songId}`}>
            {songTitle}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          {artistId ? (
            <Link to={`/artists/${artistId}`}>
              {artistName}
            </Link>
          ) : (
            <span>{artistName}</span>
          )}
        </p>
        {albumName && (
          <p className="text-xs truncate text-gray-400 mt-1">
            {albumName}
          </p>
        )}
      </div>
    </div>
  );
};

export default SongCard;