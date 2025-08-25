import serverlist from '/feature/server-list.png'
import flagBreakTime from '/feature/flag-break-time.png'
import levelUpTime from '/feature/upgrade-time.png'
import friends from '/feature/friends.png'
import { useMobile } from './utils'

function Features() {

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 64,
      paddingTop: 48,
      paddingBottom: 48
    }}>
      <Feature title="Minehut Server List" description="Available straight from your client" img={serverlist}/>
      <Feature title="Level Up Time & Cost" description="Now you know how much you waste time on the game" img={levelUpTime}/>
      <Feature title="Flag Break Time" description="Now you know how long it takes!" img={flagBreakTime}/>
      <Feature title="Add Friends" description="Protects you from accidentally hitting your allies" img={friends}/>
      <h2>...and so much more!</h2>
    </div>
  )
}

function Feature({title, description, img} : {title: string, description: string, img: string}) {
  const mobile = useMobile();
  return <div>
    <h1>{title}</h1>
    <h2>{description}</h2>
    <img style={{marginTop:32, width:mobile ? "100vw" : "60vw"}} src={img}/>
  </div>
}

export default Features
