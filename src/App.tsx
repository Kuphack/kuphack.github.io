import logo from '/kuphack.png'
import './App.css'
import Features from './Features';
import ScrollWidget from './ScrollWidget';

function App() {

  return (<>
    <div className="content">
      <ScrollWidget/>
      <div>
        <img src={logo} className="logo" alt="Kuphack logo" />
        <h1 className="title">Kuphack</h1>
      </div>
      <h2>
        Utility fabric mod for FlagClash
      </h2>
      <div style={{margin:32}}>
        <div style={{display:"flex", flexDirection:"column"}}>
          <a href="https://download.kuphack.cc" className="button cta" style={{margin:40}}>
              <span><i className="fa-solid fa-download"/> Download</span>
          </a>
        </div>
        <div style={{display:"flex", gap:32}}>
          <button className="button" onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              left: 0,
              behavior: "smooth",
            });
          }}>
            <i className="fa-solid fa-star"/> Features
          </button>
          <a className="button" target="_blank" href="https://discord.gg/X69dD2CYSD">
            <i className="fa-brands fa-discord"/> Discord
          </a>
        </div>
      </div>
    </div>
    <Features/>
  </>)
}

export default App
