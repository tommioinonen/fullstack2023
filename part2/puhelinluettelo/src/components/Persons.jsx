import React from 'react'
import Person from './Person'

const Persons = ({ personsToShow }) => {
  return (
    <ul>
      {personsToShow.map(person => 
        <Person key={person.name} person={person} />
      )}
    </ul>
  )
}

export default Persons
