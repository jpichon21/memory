import PropTypes from 'prop-types'
import React from 'react'
import './GuessCount.css'


// La fonction GuessCount ici…



const GuessCount = ({ guesses}) => <div className="guesses">{guesses}</div>

export default GuessCount

GuessCount.propTypes = {
  guesses: PropTypes.number.isRequired,
}