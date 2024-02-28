import {useContext} from "react";
import {ValueContext} from "../../App.jsx";

const WSM = () => {
    const {WSMResult} = useContext(ValueContext);

    let cellStyle = {
        padding: '0 10px',
        textAlign: 'center',
        border: '1px solid #000000'
    };

    return (
        <table className={"text-center"}>
            <thead>
                <tr>
                    <th style={cellStyle} colSpan={6}>Kriteria</th>
                </tr>
                <tr>
                    <th style={cellStyle}>Alt</th>
                    <th style={cellStyle}>C1</th>
                    <th style={cellStyle}>C2</th>
                    <th style={cellStyle}>C3</th>
                    <th style={cellStyle}>C4</th>
                    <th style={cellStyle}>C5</th>
                    <th style={cellStyle}>WSM</th>
                </tr>
            </thead>
            <tbody>
            {Array.isArray(WSMResult) ? (
                WSMResult.map((data) => (
                    <tr key={data.code}>
                        <td style={cellStyle}>{data.code}</td>
                        <td style={cellStyle}>{data.fasilitas}</td>
                        <td style={cellStyle}>{data.harga}</td>
                        <td style={cellStyle}>{data.tahun}</td>
                        <td style={cellStyle}>{data.jarak}</td>
                        <td style={cellStyle}>{data.keamanan}</td>
                        <td style={cellStyle}>{data.result}</td>
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