import './App.css'
import Updowngame from './updowngame/Updowngame'

export default function App() {
  return (
    <main className="app-shell">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">UDG</span>
          <div>
            <p className="brand-kicker">Number Game</p>
            <h1>The Flipped Number</h1>
          </div>
        </div>

        <nav className="site-nav" aria-label="Primary">
          <a href="#game">Game</a>
          <a href="#how-to-play">How to play</a>
          <a href="#restart">Restart</a>
        </nav>
      </header>

      <section className="page-content">
        <Updowngame />
      </section>
    </main>
  )
}
