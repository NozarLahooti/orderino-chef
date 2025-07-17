import './App.css'

function App() {

  async function getData() {
    try{
      const response = await fetch('http://localhost: 8080')
      const data = response.json()
      console.log(data)
    } catch(e) {
      console.log(e)
    }
  }
  getData()

  return (
    <>
      Hello (from frontend)
    </>
  )
}

export default App
