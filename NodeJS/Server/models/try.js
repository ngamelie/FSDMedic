// // import React, { useState } from 'react';
// React = require('react');
// useState = require('react')

// function App() {
//   const [returnedData, setReturnedData] = useState(['Hello']);
//   const fetchData = async () => {
//     const newData = await fetch('/hello', {
//       method: 'GET',
//       header: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       }
//     })
//       .then(res => res.json())
//     console.log(newData);
//     setReturnedData(newData.result)
//   }
//   return (

//     <div>
//       <button onClick={() => fetchData()}> click</button>
//       {returnedData}
//     </div>
//   );
// }

// export default App;