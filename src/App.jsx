import './App.css'
import { fetchData } from './sevices/fetchData/fetchData'
import { useEffect, useState } from 'react'
import HomePage from './pages/homepage/homepage'
function App() {
  const [data, setData] = useState(null)
  useEffect(() => {
    const getData = async () => {const data = await fetchData()
    console.log(data)
    setData(data)}
    getData()
  }, [])
  return (
    <>
      <HomePage />
    </>
  )
}

export default App