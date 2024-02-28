import {Link} from "react-router-dom";
import {useContext} from "react";
import {SettingsContext} from "../../App.jsx";

const CriteriaPage = () => {
    const { criteriaData, setCriteriaData } = useContext(SettingsContext);

    let cellStyle = {
        padding: '0 10px',
        textAlign: 'center',
        border: '1px solid #000000'
    };

    const handleInputChange = (index, type) => {
        setCriteriaData(criteriaData.map((criteria, i) => {
            if(i === index) {
                return {...criteria, benefit: type === 'benefit', cost: type === 'cost'}
            }
            return criteria;
        }));
    }

    const handleWeightChange = (index, event) => {
        const newWeight = Number(event.target.value);
        let totalWeight = 0;

        criteriaData.forEach((criteria, i) => {
          if(i !== index) {
            totalWeight += Number(criteria.weight);
          }
        });

        if(totalWeight + newWeight <= 100) {
          setCriteriaData(criteriaData.map((criteria, i) => {
              if(i === index) {
                  return {...criteria, weight: newWeight}
              }
              return criteria;
          }));
        }
    }

    return (
        <div className={"flex-1 flex flex-col justify-center items-center gap-8"}>
            <form>
                <table>
                    <thead>
                    <tr>
                        <th style={cellStyle}>Kriteria</th>
                        <th style={cellStyle}>Bobot</th>
                        <th style={cellStyle}>Benefit</th>
                        <th style={cellStyle}>Cost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {criteriaData.map((criteria, index) => {
                        return (
                            <tr key={index}>
                                <td style={cellStyle}>{criteria.name}</td>
                                <td style={cellStyle}>
                                    <input
                                        type="number"
                                        value={criteria.weight}
                                        onChange={(event) => handleWeightChange(index, event)}
                                    />
                                </td>
                                <td style={cellStyle}>
                                    <input
                                        type="radio"
                                        name={criteria.name}
                                        checked={criteria.benefit}
                                        onChange={() => handleInputChange(index, 'benefit')}
                                    />
                                </td>
                                <td style={cellStyle}>
                                    <input
                                        type="radio"
                                        name={criteria.name}
                                        checked={criteria.cost}
                                        onChange={() => handleInputChange(index, 'cost')}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </form>
            <Link to={"/settings"} className={"border px-12 py-2 hover:bg-gray-400 hover:text-white rounded-lg"}>Kembali</Link>
        </div>
    );
}

export default CriteriaPage;