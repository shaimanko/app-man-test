import React, { Component } from 'react'

import searchIcon from './search.png'
import happinessIcon from './cute.png'

import './App.css'

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      selectedCard: [],
      open: false
    }
  }

  componentDidMount() {
    fetch('http://localhost:3030/api/cards')
      .then(res => res.json())
      .then(item => this.setState({ cards: item.cards }))
  }

  openModal = () => {
    this.setState({
      open: true
    })
  }

  filterSearch = (event) => {
    fetch('http://localhost:3030/api/cards?limit=30&name=' + event.target.value)
      .then(res => res.json())
      .then(item => this.setState({ cards: item.cards }))
  }

  addItem = (itemId) => {
    
  }

  render() {
    const { cards, open } = this.state
    console.log(cards)
    return (
      <div className="App">
        <header><h1>My Pokedex</h1></header>
        <div className="button-section">
          <span onClick={this.openModal}>+</span>
        </div>
        <div className={`backdrop ${open ? "show" : "hide"}`}>
          <div className="modal">
            <div className="search-input">
              <p>
                <input placeholder="Find pokemon" onKeyUp={this.filterSearch} />
                <img src={searchIcon} alt="search" width="30" height="30" />
              </p>
            </div>
            <div className="item-section">
              {
                cards.length > 0 && cards.map((item, index) =>
                  <div
                    id={item.id}
                    key={`card-item-${index}`}
                    className="card-item"
                  >
                    <div className="grid-container">
                      <img src={item.imageUrl} alt={`card-image-${index}`} className="image" />
                      <div className="name">{item.name}</div>
                      <div className="add-button"><span onClick={() => this.addItem(item.id)}>Add</span></div>
                      <div className="hp"><b>HP</b></div>
                      <div className="hp-bar"><span>{item.hp > 100 ? 100 : item.hp}</span></div>
                      <div className="str"><b>STR</b></div>
                      <div className="str-bar"><span>{item.attacks && (item.attacks.length > 1 ? 100 : item.attacks.length === 1 ? 50 : 0)}</span></div>
                      <div className="weak"><b>WEAK</b></div>
                      <div className="weak-bar"><span>{item.weaknesses && (item.weaknesses.length === 1 ? 1 : 0)}</span></div>
                      <div className="happiness-level">
                        <img src={happinessIcon} width="30" height="30"/>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
