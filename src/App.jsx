

import { useEffect, useState } from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid'


const App = () => {
   const [dice , setDice] = useState(allNewDice())
   const [finish , setFinish] = useState(false)
   const [clickCount , setClickCount] = useState(0)
   
   useEffect(()=> {
      
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      
      if(allHeld && allSameValue) {
         setFinish(true)
         // console.log("You Won !")
      }
   } , [dice])
   
   function allNewDice()  {
      let newDice = []
      for(let i = 0 ; i < 10 ; i++ ) {
         newDice.push(  getRandomDie() )
      }
      
      return newDice 
   }
   
   function rollDice() {
      
      if(finish) {
         setDice(allNewDice())
         setFinish(false)
         setClickCount(0)
         return
      }
      
      setClickCount(prevCount => prevCount  + 1)
      setDice(prevDice => prevDice.map(die => {
         
         return die.isHeld
         ?  die
         :  getRandomDie()
      }))
      
   }
   
   function holdDice(id) {
      // console.log(id)
      setDice(prevDice =>  
         
         prevDice.map(die => {
            return (
               die.id === id 
               ? {...die , isHeld : !die.isHeld}
               : die
            )
         })
         
      )
   }
   
   function getRandomDie() {
      // console.log("asdasdas")
      return {
         value : Math.ceil(Math.random() * 6) ,
         isHeld: false ,
         id: nanoid()
      }
   }
   
   return (
      <main >
         
         {finish && <h1>You Win !</h1>}
         <div className='dice-container' >
            {dice.map(die => {
               return <Die key={die.id} 
                           isHeld={die.isHeld}
                           value={die.value} 
                           
                           id={die.id}
                           holdDice = {()=> holdDice(die.id)}
                           setClickCount = {setClickCount}
               />
            })}
         </div>
         
         <button className='roll-dice' onClick={rollDice} >
            {finish ? "Reset" : "Roll"}
         </button>
         
         <h3 style={{color: "#555"}}>Clicking Count :  { clickCount}</h3>
      </main>
   )
}

export default App

