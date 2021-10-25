import React from 'react';
import Table from './Table';

function App() {
  const [originalData, setOriginalData] = React.useState(null);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {setData(data); setOriginalData(data)});
  }, []);

  const countryList = (data) ? 
    ((data.length) ? (
        data.map(country => {
            return(
                <tr className="country" key={country.name}>
                  <td><img src={country.flags.svg} alt="flag" /></td>
                  <td>{country.name}</td>
                  <td>{country.capital}</td>
                  <td>{String(country.population).replace(/(.)(?=(\d{3})+$)/g,'$1,')}</td>
                  <td>{country.currencies[0].name}</td>
                </tr>
            )
         }) 
        ) : (null)
    ) : (
      <tr><td>Loading...</td></tr>
  )

  const handleChange = function (e){
    const newData = (e.target.value === "") ? originalData : originalData.filter(country => {
      let query = e.target.value.toLowerCase()
      let queryCap = query.charAt(0).toUpperCase() + query.slice(1);

      const res = country.name.includes(query) || country.name.includes(queryCap);
        return res;
    });

    setData(newData);
  }

  return (
    <div className="App">
      <h1>Countries of the EU</h1>
      <input type="text" id="name" onChange={handleChange} placeholder="Start typing the country name you are looking for..." />

      <Table countryList={countryList} />
    </div>
  );
}

export default App;
