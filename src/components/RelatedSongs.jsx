import React from 'react';
import SongBar from './SongBar';

const RelatedSongs = ({ 
  data, 
  artistId, 
  isPlaying, 
  activeSong, 
  handlePauseClick, 
  handlePlayClick 
}) => {
  // Add error handling for handlePlayClick
  const handlePlay = (song, index) => {
    if (typeof handlePlayClick === 'function') {
      handlePlayClick(song, index);
    } else {
      console.error('handlePlayClick is not a function:', handlePlayClick);
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col">
        <h1 className="font-bold text-3xl text-white">Related Songs</h1>
        <p className="text-gray-400 mt-4">No songs found for this artist</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs</h1>

      <div className="mt-6 w-full flex flex-col">
        {data.map((song, i) => {
          // Format song data consistently
          const songData = {
            id: song.id,
            key: song.id,
            title: song.attributes?.name,
            subtitle: song.attributes?.artistName,
            images: {
              coverart: song.attributes?.artwork?.url?.replace('{w}', '300').replace('{h}', '300')
            },
            attributes: song.attributes
          };

          return (
            <SongBar
              key={`${song.id}-${i}`}
              song={songData}
              i={i}
              artistId={artistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlay}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedSongs;