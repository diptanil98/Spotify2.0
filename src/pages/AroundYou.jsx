import {  useEffect,useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {Error,Loader,SongCard} from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/ShazamCore";

const  AroundYou = () => {
    const [loading, setLoading] = useState(true);
    const [country, setCountry] = useState('');
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    console.log(country);

useEffect(() => {
    axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_LqElraYpxdPslAnydFioLgg8aKZxw')
    .then((res)=>setCountry(res?.data?.location?.country))
    .catch((err)=>console.log(err))
    .finally(() => setLoading(false));
},[country]);

    const { data, isFetching, error } = useGetSongsByCountryQuery(country);

    if (isFetching && loading) return <Loader title="Loading songs around you..." />;
    if (error) return <Error title="Error loading songs around you" />;

    return (
        <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around you <span className="font-black">{country}</span></h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
    )
}
export default AroundYou;