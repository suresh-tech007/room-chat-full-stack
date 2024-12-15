import { useState } from 'react'
import JoinCreateChat from './componets/JoinCreateChat'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JoinCreateChat/>
    </>
  )
}

export default App
