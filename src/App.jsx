import {createContext, useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import SettingsPage from "./components/settings/SettingsPage.jsx";
import CriteriaPage from "./components/settings/CriteriaPage.jsx";
import TablePage from "./components/settings/TablePage.jsx";
import ResultPage from "./components/results/ResultPage.jsx";

export const SettingsContext = createContext(null);
export const ValueContext = createContext(null);

function App() {
    const [criteriaData, setCriteriaData] = useState([
        {id: 0, name :'Fasilitas pendukung di apartemen', weight:30, benefit: true, cost: false},
        {id: 1, name :'Harga bangunan per meter persegi', weight:20, benefit: true, cost: false},
        {id: 2, name :'Tahun konstruksi bangunan apartemen', weight:20, benefit: true, cost: false},
        {id: 3, name :'Jarak dari tempat kerja', weight:20, benefit: false, cost: true},
        {id: 4, name :'Sistem keamanan apartemen', weight:10, benefit: true, cost: false}
    ]);

    const [alternativeData, setAlternativeData] = useState([
        {code: 'A1', name: 'Apartemen 1', fasilitas: 2, harga: 7000000, tahun: 2012, jarak: 7, keamanan: 3},
        {code: 'A2', name: 'Apartemen 2', fasilitas: 4, harga: 10000000, tahun: 2015, jarak: 2, keamanan: 3},
        {code: 'A3', name: 'Apartemen 3', fasilitas: 3, harga: 8500000, tahun: 2010, jarak: 4, keamanan: 4},
    ])

    const [WPMResult, setWPMResult] = useState([]);
    const [WSMResult, setWSMResult] = useState([]);
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        const idFieldMapping = {
            0: 'fasilitas',
            1: 'harga',
            2: 'tahun',
            3: 'jarak',
            4: 'keamanan'
        };

        const normalized = alternativeData.map((data) => {
            let harga = data.harga >= 10000000 ? 1 : data.harga >= 5000000 ? 2 : 3;
            let tahun = data.tahun >= 2015 ? 3 : data.tahun >= 2010 ? 2 : 1;
            let jarak = data.jarak > 5 ? 3 : data.jarak >= 3 ? 2 : 1;
            return { ...data, harga, tahun, jarak };
        });

        const formatFloat = (value) => parseFloat(value.toFixed(3));

        const finalNormalized = normalized.map((data) => {
            let normalizedData = {};
            for (let i = 0; i < criteriaData.length; i++) {
                let id = criteriaData[i].id;
                let normalizedValue = 0;
                if(criteriaData[i].benefit) {
                    normalizedValue = formatFloat(data[idFieldMapping[id]]/Math.max(...normalized.map(data => data[idFieldMapping[id]])));
                } else {
                    normalizedValue = formatFloat(Math.min(...normalized.map(data => data[idFieldMapping[id]]))/data[idFieldMapping[id]]);
                }

                normalizedData[idFieldMapping[id]] = normalizedValue;
            }

            return {...data, ...normalizedData};
        });

        const WPMNormalize = finalNormalized.map(data => {
            let fasilitas = formatFloat(Math.pow(data.fasilitas, criteriaData[0].weight / 100));
            let harga = formatFloat(Math.pow(data.harga, criteriaData[1].weight/100));
            let tahun = formatFloat(Math.pow(data.tahun, criteriaData[2].weight/100));
            let jarak = formatFloat(Math.pow(data.jarak, criteriaData[3].weight / 100));
            let keamanan = formatFloat(Math.pow(data.keamanan, criteriaData[4].weight / 100));
            return {...data, fasilitas, harga, tahun, jarak, keamanan};
        })

        const WPMMultiple = WPMNormalize.map((data) => {
            let result = formatFloat(data.fasilitas * data.harga * data.tahun * data.jarak * data.keamanan);
            return {...data, result};
        })

        const WSMNormalize = finalNormalized.map(data => {
            let fasilitas = data.fasilitas * criteriaData[0].weight / 100;
            let harga = data.harga * criteriaData[1].weight / 100;
            let tahun = data.tahun * criteriaData[2].weight / 100;
            let jarak = data.jarak * criteriaData[3].weight / 100;
            let keamanan = data.keamanan * criteriaData[4].weight / 100;
            return {...data, fasilitas, harga, tahun, jarak, keamanan};
        })

        const WSMSum = WSMNormalize.map((data) => {
            let result = formatFloat(data.fasilitas + data.harga + data.tahun + data.jarak + data.keamanan);
            return {...data, result};
        })


        setWPMResult(WPMMultiple);
        setWSMResult(WSMSum);

    }, [alternativeData, criteriaData]);

    return (
        <Router>
            <div className={"flex min-h-screen"}>
                <main className="flex flex-grow">
                    <SettingsContext.Provider value={{ criteriaData, alternativeData, setCriteriaData, setAlternativeData }}>
                        <ValueContext.Provider value={{WPMResult, WSMResult}}>
                            <Routes>
                                <Route path="/" element={<HomePage/>}/>
                                <Route path="/result" element={<ResultPage/>}/>
                                <Route path={"/result/:id"} element={<ResultPage/>}/>
                                <Route path="/settings" element={<SettingsPage/>}/>
                                <Route path="/settings/kriteria" element={<CriteriaPage/>}/>
                                <Route path="/settings/table" element={<TablePage/>}/>
                            </Routes>
                        </ValueContext.Provider>
                    </SettingsContext.Provider>
                </main>
            </div>
        </Router>
    )
}

export default App
