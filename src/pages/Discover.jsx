import { useDispatch, useSelector } from 'react-redux';
import { genres } from '../assests/constants';
import SongCard from '../components/SongCard';
import { useGetTopChartsQuery } from '../redux/services/ShazamCore';
import { Loader, Error } from '../components';

const Discover = () => {
    const { data, isFetching, error } = useGetTopChartsQuery();
    const genreTitle = 'Pop';
    console.log(data);
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    if (isFetching) return <Loader title="Loading songs..." />;
    if (error) return <Error title="Loading....." />
    return (
        <div className='flex flex-col'>
            <div className='w-full flex justify-between items-center
            sm:flex-row flex-col mt-4 mb-10'>
                <h2 className='font-bold text-3xl text-white text-left'>Discover</h2>
                <select name="" onChange={() => { }} value="" className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5' id="">
                    {genres.map((genre) =>
                        <option key={genre.value} value={genre.value}>{genre.title}</option>
                    )}
                </select>
            </div>
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.map((song, i) => (
                    <SongCard key={song.key || i} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={data} />
                ))}
            </div>
        </div>
    )
}
export default Discover;