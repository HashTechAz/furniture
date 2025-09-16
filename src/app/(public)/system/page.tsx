import React from 'react'
import SystemHero from './components/SystemHero/SystemHero'
import SystemAbout from "./components/SystemAbout/SystemAbout"
import Size from './components/Size/Size'

const page = () => {
  return (
    <>
    <div id="header-trigger" style={{ height: 1, backgroundColor: '#2C3587' }} />
     <SystemHero/>
     <SystemAbout/>
     <Size/>
    </>
  )
}

export default page