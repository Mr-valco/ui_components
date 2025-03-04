import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KPICard from './components/KPICard'
import KPICardLoader from './components/rcl/KPICardLoader'
import DeviceFinder from './components/DeviceFinder'
import ReportBuilder from './components/ReportBuilder'
import ReportBuilderv3 from './components/ReportBuilderv3'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <KPICard title='Title' kpi='100' subtitle='Subtitle 100%'  />
      <KPICardLoader />

<DeviceFinder />
<ReportBuilder />
<br />

<ReportBuilderv3 />
    </>
  )
}

export default App
