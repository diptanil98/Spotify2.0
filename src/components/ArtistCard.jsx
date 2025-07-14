import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  
  const artistId = track?.relationships?.artists?.data?.[0]?.id || 
                  track?.artists?.[0]?.adamid;

  
  const artworkUrl = track?.attributes?.artwork?.url || 
                    track?.images?.coverart;

  
  const artistName = track?.attributes?.artistName || 
                    track?.subtitle || 
                    track?.artists?.[0]?.name;

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => artistId && navigate(`/artists/${artistId}`)}
    >
      {artworkUrl && (
        <img 
          alt="artist_img" 
          src={artworkUrl.replace('{w}', '440').replace('{h}', '440')} 
          className="w-full h-56 rounded-lg object-cover"
        />
      )}
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {artistName}
      </p>
    </div>
  );
};

export default ArtistCard;