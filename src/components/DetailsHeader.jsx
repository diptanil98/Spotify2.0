import React from 'react';
import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => (
  <div className="relative w-full flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

    <div className="absolute inset-0 flex items-center">
      <img
        alt="profile"
        src={
          artistId 
            ? artistData?.attributes?.artwork?.url
                .replace('{w}x{h}', '500x500')
                .replace('{f}', 'jpg')
            : songData?.attributes?.artwork?.url
                .replace('{w}x{h}', '500x500')
                .replace('{f}', 'jpg')
        }
        className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
      />

      <div className="ml-5">
        <p className="font-bold sm:text-3xl text-xl text-white">
          {artistId ? artistData?.attributes?.name : songData?.attributes?.name}
        </p>
        
        {!artistId && (
          <Link to={`/artists/${songData?.relationships?.artists?.data[0]?.id}`}>
            <p className="text-base text-gray-400 mt-2">
              {songData?.attributes?.artistName}
            </p>
          </Link>
        )}

        <p className="text-base text-gray-400 mt-2">
          {artistId
            ? artistData?.attributes?.genreNames?.[0]
            : songData?.attributes?.genreNames?.[0]}
        </p>
      </div>
    </div>

    <div className="w-full sm:h-44 h-24" />
  </div>
);

export default DetailsHeader;