import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
const CountrySelector = ({id, country, setCountry, required}) => {
//   const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

//   const changeHandler = value => {
//     setCountry(value);
//     // setValue(value);

//   }
   
  return <Select required={required} id={id} options={options} value={country} onChange={(value)=>setCountry(value)} />
}

export default CountrySelector