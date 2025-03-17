import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { ImageUpload } from './home'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className= "h-screen w-screen flex justify-center items-center">
      <ImageUpload className= ""/>

      </div>
    </>
  )
}

export default App
