import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div className={"flex-1 flex flex-col justify-center items-center gap-8"}>
            <Link to={"/result/WSM"} className={"border px-12 py-2 hover:bg-gray-400 hover:text-white rounded-lg"}>Result</Link>
            <Link to={"/settings"} className={"border px-12 py-2 hover:bg-gray-400 hover:text-white rounded-lg"}>settings</Link>
        </div>
    )
}

export default HomePage;