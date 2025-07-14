import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/ShazamCore';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  // Extract songs from the nested structure
  const songs = data?.tracks?.hits?.map((song) => song.track) || [];
  
  // Also keep the original hits structure for the data prop
  const songsData = data?.tracks?.hits || [];
  
  console.log('Songs:', songs);
  console.log('Original data structure:', data);
  console.log('Songs data for SongCard:', songsData);

  if (isFetching) return <Loader title={`Searching ${searchTerm}...`} />;

  if (error) return <Error />;

  if (!songs || songs.length === 0) {
    return (
      <div className="flex flex-col">
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
          No results found for <span className="font-black">{searchTerm}</span>
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.key || song.id || i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songsData} // Pass the full hits array instead of just data
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;