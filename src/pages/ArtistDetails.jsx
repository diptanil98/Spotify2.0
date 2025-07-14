import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong, playPause } from '../redux/features/PlayerSlice';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/ShazamCore'; // Changed from shazamCore to appleMusicApi

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { 
    data: artistData, 
    isFetching: isFetchingArtistDetails, 
    error 
  } = useGetArtistDetailsQuery(artistId);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: artistData?.data[0].views['top-songs']?.data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData?.data?.[0]} // Using optional chaining
      />

      <RelatedSongs
        data={artistData?.data[0].views['top-songs']?.data} // Apple Music tracks structure
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;