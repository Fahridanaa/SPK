import {useContext} from "react";
import {ValueContext} from "../../App.jsx";
import '../../styles/table.css'

const WPM = () => {
    const {WPMResult} = useContext(ValueContext);

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
                <th>WPM</th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(WPMResult) ?
                WPMResult.map((data, index) => (
                    <tr key={`A${index+1}`}>
                        <td>{`A${index+1}`}</td>
                        <td>{data.fasilitas}</td>
                        <td>{data.harga}</td>
                        <td>{data.tahun}</td>
                        <td>{data.jarak}</td>
                        <td>{data.keamanan}</td>
                        <td>{data.result}</td>
                    </tr>
                ))
            : (
                 <tr>
                     <td>Loading...</td>
                 </tr>
             )}
            </tbody>
        </table>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default WPM;