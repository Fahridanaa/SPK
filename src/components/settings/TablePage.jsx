import {Link} from "react-router-dom";
import {useContext, useState, useRef, useEffect} from "react";
import {SettingsContext} from "../../App.jsx";

const TablePage = () => {
    const {alternativeData, setAlternativeData} = useContext(SettingsContext);
    const [editingCell, setEditingCell] = useState({rowIndex: null, columnName: null});
    const inputRef = useRef(null);
    const [newApartment, setNewApartment] = useState("");

    let cellStyle = {
        padding: '0 10px',
        textAlign: 'center',
        border: '1px solid #000000'
    };

    const rows = [
        { criterion: 'Fasilitas pendukung', field: 'fasilitas' },
        { criterion: 'Harga bangunan / m2', field: 'harga' },
        { criterion: 'Tahun konstruksi bangunan', field: 'tahun' },
        { criterion: 'Jarak dari tempat kerja', field: 'jarak' },
        { criterion: 'Sistem keamanan apartemen', field: 'keamanan' },
    ];

    const handleEditStart = (index, columnName) => {
        setEditingCell({ rowIndex: index, columnName });
    }

    const handleCellValueChange = (event, rowIndex, columnName) => {
        const newData = [...alternativeData];
        newData[rowIndex][columnName] = event.target.value;
        setAlternativeData(newData);
    }

    const handleAddApartment = () => {
        setAlternativeData([
            ...alternativeData,
            { name: newApartment, fasilitas: "", harga: "", tahun: "", jarak: "", keamanan: "" }
        ]);
        setNewApartment("");
    };

    const handleRemoveApartment = (index) => {
        setAlternativeData(alternativeData.filter((_, i) => i !== index));
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setEditingCell({ rowIndex: null, columnName: null });
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [inputRef]);

    return (
        <div className={"flex-1 flex flex-col justify-center items-center gap-8"}>
            <table>
                <thead>
                <tr>
                    <th style={cellStyle}>Kriteria</th>
                    {alternativeData.map((data, index) =>
                        <th style={cellStyle} key={index}>
                            {data.name}
                            <button onClick={() => handleRemoveApartment(index)} className={"ml-2 text-red-400"}>-</button>
                        </th>
                    )}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <td style={cellStyle}>{row.criterion}</td>
                        {alternativeData.map((data, dataIndex) =>
                            dataIndex === editingCell.rowIndex && row.field === editingCell.columnName ?
                                <td style={cellStyle} key={dataIndex} ref={inputRef}>
                                    <input value={data[row.field]} onChange={event => handleCellValueChange(event, dataIndex, row.field)} onBlur={() => setEditingCell({ rowIndex: null, columnName: null })} />
                                </td>
                            :
                                <td style={cellStyle} key={dataIndex} onClick={() => handleEditStart(dataIndex, row.field)}>{data[row.field]}</td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex flex-col items-center gap-2">
                <input value={newApartment} className={"border border-black"} onChange={(e) => setNewApartment(e.target.value)} placeholder="Nama apartemen baru" />
                <button onClick={handleAddApartment} className={"border px-12 py-2 hover:bg-gray-400 hover:text-white rounded-lg"}>Tambah Kolom</button>
            </div>
            <Link to={"/settings"} className={"border px-12 py-2 hover:bg-gray-400 hover:text-white rounded-lg"}>Kembali</Link>
        </div>
    );
};

export default TablePage;