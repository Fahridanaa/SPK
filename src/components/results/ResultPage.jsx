import {Link, useParams} from "react-router-dom";
import WSM from "./WSM.jsx";
import WPM from "./WPM.jsx";
import Ranking from "./Ranking.jsx";

const ResultPage = () => {
    const { id } = useParams()

    return (
        <div className={"flex-1 flex flex-col items-center justify-between gap-4 py-40"}>
            <div className={"flex flex-1 justify-center items-center"}>
                {(id === 'WSM') && <WSM/>}
                {(id === 'WPM') && <WPM/>}
                {(id === 'ranking') && <Ranking/>}
            </div>
            <div className={"flex flex-col gap-3 justify-between"}>
                <div className={"flex gap-4"}>
                    <Link to={"/result/WSM"} className={`border px-12 py-2 hover:bg-gray-400 hover:text-white rounded-lg ${(id === 'WSM' && 'bg-gray-400 text-white')}`}>WSM</Link>
                    <Link to={"/result/WPM"} className={`border px-12 py-2 hover:bg-gray-400 hover:text-white rounded-lg ${(id === 'WPM' && 'bg-gray-400 text-white')}`}>WPM</Link>
                    <Link to={"/result/ranking"} className={`border px-12 py-2 hover:bg-gray-400 hover:text-white rounded-lg ${(id === 'ranking' && 'bg-gray-400 text-white')}`}>Ranking</Link>
                </div>
                <Link to={"/"} className={"border text-center py-2 hover:bg-gray-400 hover:text-white rounded-lg"}>Kembali</Link>
            </div>
        </div>
    )
}

export default ResultPage;