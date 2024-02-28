import {useContext} from "react";
import {ValueContext} from "../../App.jsx";
import '../../styles/table.css'

const Ranking = () => {
    const {ranking} = useContext(ValueContext);

    return (
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Nama</th>
                    <th>WPM</th>
                    <th>WSM</th>
                </tr>
            </thead>
            <tbody>
                {ranking.map((res) => (
                    <tr key={res.rank}>
                        <td>{res.rank}</td>
                        <td>{res.name}</td>
                        <td>{res.WPM}</td>
                        <td>{res.WSM}</td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    )
}

export default Ranking;