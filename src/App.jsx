import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="flex items-center justify-center min-h-screen text-6xl text-green-300">The Hub frontend page</h1>
    </>
  )
}

export default App
