import React, { Component, useState } from 'react';
import './App.css';
import Radium from 'radium';
import Person from './Person/Person';

//const app = props => {
  //const [ personsState, setPersonsState ]= useState({
    class App extends Component {
    state = {
      persons: [
        { id:'0', name: 'Max', age: 28 },
        { id:'1', name: 'Manu', age: 29 },
        { id:'2', name: 'Stephanie', age: 26 },
      ],
    otherState: 'some other value',
    showPersons: false
  };



    nameChangedHandler = (event, id ) => {
      const personIndex = this.state.persons.findIndex(p => {
        return p.id === id;
      });

      const person = {
        ...this.state.persons[personIndex]
      
      };

      //or (alternative method for above)
      //const person = Object.assign({}, this.state.persons[personIndex])

      person.name = event.target.value

      const persons = [...this.state.persons];
      persons[personIndex] = person;
      this.setState({ persons: persons})
    }

    deletePersonHandler = (personIndex) => {
      //const persons = this.state.persons.slice();
      //always update the state in an immutable way
      const persons = [...this.state.persons]
      persons.splice(personIndex, 1);
      this.setState({persons: persons})

    }
  


    togglePersonsHandler = () => {
      const doesShow = this.state.showPersons;

      this.setState({showPersons: !doesShow});
    }
  
  render (){
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      //by installing & importing radium, we can include pseudo-selectors to inline styling. 
      //pseudo-selectors must be in quotation marks and begin with a colon
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }

    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
            click={() => this.deletePersonHandler(index)}
             name={person.name} 
             age={person.age}
             key={person.id} 
             changed={(event) => this.nameChangedHandler(event, person.id)}/>

          })}
        
         </div> 
      )
      //overwriting the style from above styling
      style.backgroundColor = 'red';
      //overwritng hover in this case we use [] instead of style .dot hover because it is a string
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'

      };

    }
   const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red'); //classes=['red']
    }
    if(this.state.persons.length <= 1){
      classes.push('bold'); //classes = ['red', 'bold'];
    }

   return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button 
        style={style}
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
      {persons}
      </div>
    )
   }
  }
  

    // return React.createElement('div', {className: App}, React.createElement('h1', null)
    
  

export default Radium(App);




