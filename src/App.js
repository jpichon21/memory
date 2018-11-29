import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'

import HallOfFame, {FAKE_HOF} from './HallOfFame'
import Card from './Card'
import GuessCount from './GuessCount'

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750

class App extends Component {
  state= {
    cards : this.generateCards(),
    currentPair: [],
    guesses: 0,
    matchedCardIndices : [],
  }
 

  /* Bien mais pas la meilleure option
  constructor(props){
      super(props) 
      this.handleCardClick = this.handleCardClick.bind(this)
  }*/

  generateCards() {
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }

/*algo pure*/
  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)
  
    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }
  
    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }
  
    return indexMatched ? 'visible' : 'hidden'
  }


/*ici handCardClick devient un initialiseur de champ avec une fonction fléchée, mais l'intention n'est pas claire avec cette syntaxe, toujours le commenter*/

  // Fonction fléchée pour binding, syntaxe initaliseur de méthode
    handleCardClick = index => {
        const { currentPair } = this.state
    
        if (currentPair.length === 2) {
        return
        }
    
        if (currentPair.length === 0) {
        this.setState({ currentPair: [index] })
        return
        }
    
        this.handleNewPairClosedBy(index)
    }

    handleNewPairClosedBy(index) {
        const { cards, currentPair, guesses, matchedCardIndices } = this.state
    
        const newPair = [currentPair[0], index]
        const newGuesses = guesses + 1
        const matched = cards[newPair[0]] === cards[newPair[1]]
        this.setState({ currentPair: newPair, guesses: newGuesses })
        /*ici il y a ce qu'on appelle un SPREAD EZ2015, avecles anciens éléments du tableau */
        if (matched) {
          this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
        }
        /** pour relancer un sestate au bout d'un certains temps */
        setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
      }


  render() {
    const {cards, guesses, matchedCardIndices} = this.state
    const won = matchedCardIndices.lenght === cards.length
    return (
      <div className="memory">
        <GuessCount guesses={guesses} />
        {cards.map((card, index) => (

          <Card
            card={card}
            feedback={this.getFeedbackForCard(index)}
            key={index}
            index={index}
            onClick={this.handleCardClick}
           />
        ))}
         {won && <HallOfFame entries={FAKE_HOF} />}
      </div>
    )
  }
}

export default App