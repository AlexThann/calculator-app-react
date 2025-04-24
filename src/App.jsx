
import { useEffect, useState } from 'react'
import CalculatorBody from "./CalculatorBody.jsx";
import './App.css'

function App() {

  const [theme,setTheme] = useState(()=>{
    const localTheme = localStorage.getItem("THEME");
    if(localTheme==null) return "theme1";
    return JSON.parse(localTheme)
  })

  useEffect(()=>{
    localStorage.setItem("THEME", JSON.stringify(theme));
  },[theme])


  function handleChange(e){
    setTheme(e.target.value);
  }


  return (
    <main className={"main-container " + theme}>
        <div className="calculator-container">
          <div className="themes-container">
            <p className="calc-header">calc</p>
            <div className="themes-right">
              <p className="theme-header">THEME</p>
              <div>
                <div className="num-container">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                </div>
                <div className="slider">
                  <label htmlFor="theme1-radio">
                    <input type="radio" name="theme" value="theme1" checked={theme==="theme1"} id="theme1-radio" onChange={(e)=>handleChange(e)} />
                    <span className="indicator"></span>
                  </label>
                  <label htmlFor="theme2-radio">
                    <input type="radio" name="theme" value="theme2" checked={theme==="theme2"} id="theme2-radio" onChange={(e)=>handleChange(e)} />
                    <span className="indicator"></span>
                  </label>
                  <label htmlFor="theme3-radio">
                    <input type="radio" name="theme" value="theme3" checked={theme==="theme3"} id="theme3-radio" onChange={(e)=>handleChange(e)}/>
                    <span className="indicator"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <CalculatorBody/>
        </div>
    </main>
  )
}

export default App
