/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

import PlayPause from './Playpause';
import { playPause, setActiveSong } from '../redux/features/PlayerSlice';
import { useGetTopChartsQuery } from '../redux/services/ShazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {
  // Extract data from Apple Music API structure
  const songTitle = song.attributes?.name || 'Unknown Song';
  const artistName = song.attributes?.artistName || 'Unknown Artist';
  const artwork = song.attributes?.artwork?.url || '';
  const songId = song?.id || 
                 song?.attributes?.isrc || 
                 song?.href?.split('/').pop().split('?')[0] || 
                 '';
  const artistId = song?.relationships?.artists?.data?.[0]?.id || 
                  song?.artists?.[0]?.adamid;

  // Get artwork URL with proper dimensions
  const getArtworkUrl = (url, width = 80, height = 80) => {
    if (!url) return '';
    return url.replace('{w}', width).replace('{h}', height);
  };

  return (
    <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.attributes?.name === songTitle ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img 
          className="w-20 h-20 rounded-lg" 
          src={getArtworkUrl(artwork)} 
          alt={songTitle}
          onError={(e) => {
            e.target.src = '/default-album-cover.png';
          }}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${songId}`}>
            <p className="text-xl font-bold text-white">
              {songTitle}
            </p>
          </Link>
          <Link to={`/artists/${artistId}`}>
            <p className="text-base text-gray-300 mt-1">
              {artistName}
            </p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // Get artwork URL helper for artists section
  const getArtworkUrl = (url, width = 200, height = 200) => {
    if (!url) return '';
    return url.replace('{w}', width).replace('{h}', height);
  };

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/TopCharts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/TopArtists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          centeredSlides
          centeredSlidesBounds
          className="mt-4"
        >
          {topPlays?.slice(0, 5).map((artist) => (
            <SwiperSlide
              key={artist?.id}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${artist?.id}`}>
                <img
                  src={getArtworkUrl(artist?.attributes?.artwork?.url)}
                  alt={artist?.attributes?.artistName || 'Artist'}
                  className="rounded-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = '/default-artist-image.png';
                  }}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;