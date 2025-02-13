import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DocumentUpload from './components/DocumentUpload'
import DocumentView from './components/DocumentView'


function App() {

  return (
    <>
    {/* // time is getting out so please allow me to use ai tools  only 15 minutes left */}
 <div className="flex gap-8 m-12">
 <DocumentUpload />
 <DocumentView />
 </div>
    </>
  )
}

export default App
