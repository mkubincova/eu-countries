
function Table ({countryList}){
    return (
      <table>
        <thead>
          <tr>
          <th>Flag</th>
          <th>Name</th>
          <th>Capital</th>
          <th>Population</th>
          <th>Currency</th>
        </tr>
        </thead>
        <tbody>
          {countryList}
        </tbody>
      </table>
  );
}

export default Table