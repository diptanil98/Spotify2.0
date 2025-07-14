/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const getAudioSrc = (song) => {
  // Apple Music structure
  if (song?.attributes?.previews?.[0]?.url) return song.attributes.previews[0].url;
  // ShazamCore search structure: hub.preview
  if (song?.hub?.preview?.[0]?.url) return song.hub.preview[0].url;
  // ShazamCore search structure: hub.actions (uri)
  if (song?.hub?.actions) {
    const playAction = song.hub.actions.find(a => a.type === 'uri' && a.uri);
    if (playAction) return playAction.uri;
  }
  return '';
};

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      src={getAudioSrc(activeSong)}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;