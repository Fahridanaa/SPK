import {useContext} from "react";
import {ValueContext} from "../../App.jsx";
import '../../styles/table.css'

const WSM = () => {
    const {WSMResult} = useContext(ValueContext);

    return (
        <table className={"text-center"}>
            <thead>
                <tr>
                    <th colSpan={6}>Kriteria</th>
                </tr>
                <tr>
                    <th>Alt</th>
                    <th>C1</th>
                    <th>C2</th>
                    <th>C3</th>
                    <th>C4</th>
                    <th>C5</th>
                    <th>WSM</th>
                </tr>
            </thead>
            <tbody>
            {Array.isArray(WSMResult) ? (
                WSMResult.map((data) => (
                    <tr key={data.code}>
                        <td>{data.code}</td>
                        <td>{data.fasilitas}</td>
                        <td>{data.harga}</td>
                        <td>{data.tahun}</td>
                        <td>{data.jarak}</td>
                        <td>{data.keamanan}</td>
                        <td>{data.result}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td>Loading...</td>
                </tr>
            )}
            </tbody>
        </table>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default WSM;