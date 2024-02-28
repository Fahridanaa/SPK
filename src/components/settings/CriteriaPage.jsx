import {Link} from "react-router-dom";
import {useContext} from "react";
import {SettingsContext} from "../../App.jsx";

const CriteriaPage = () => {
    const { criteriaData, setCriteriaData } = useContext(SettingsContext);

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
                        <th>Kriteria</th>
                        <th>Bobot</th>
                        <th>Benefit</th>
                        <th>Cost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {criteriaData.map((criteria, index) => {
                        return (
                            <tr key={index}>
                                <td>{criteria.name}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={criteria.weight}
                                        onChange={(event) => handleWeightChange(index, event)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="radio"
                                        name={criteria.name}
                                        checked={criteria.benefit}
                                        onChange={() => handleInputChange(index, 'benefit')}
                                    />
                                </td>
                                <td>
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