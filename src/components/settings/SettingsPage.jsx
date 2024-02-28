import {Link} from "react-router-dom";

const SettingsPage = () => {
    return (
        <div className={"flex-1 flex flex-col justify-center items-center gap-8"}>
            <Link to={"/settings/kriteria"} className={"border px-12 py-2 hover:bg-gray-400 hover:text-white rounded-lg"}>Kriteria</Link>
            <Link to={"/settings/table"} className={"border px-12 py-2 hover:bg-gray-400 hover:text-white rounded-lg"}>Tabel</Link>
            <Link to={"/"} className={"border px-12 py-2 hover:bg-gray-400 hover:text-white rounded-lg"}>Kembali</Link>
        </div>
    )
}

export default SettingsPage;