import {useContext, useEffect} from "react";
import {ValueContext} from "../../App.jsx";

const Ranking = () => {
    const {WPMResult, WSMResult} = useContext(ValueContext);

    return (
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>WPM</th>
                    <th>WSM</th>
                    <th>Ranking</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>coba</td>
                    <td>{WPMResult[0].result}</td>
                    <td>{WSMResult[0].result}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Ranking;