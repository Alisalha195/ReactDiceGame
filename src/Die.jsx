import React from 'react'

export default function Die(props) {
   const styles = {
      backgroundColor : props.isHeld ? "#59E391" : "white"
   }
   
   function handleClick() {
      props.setClickCount(prevCount => prevCount  + 1)
      props.holdDice()
   }
   return (
      <div className='die-face' style={styles} onClick={handleClick }>
         <h2 className='die-num'> 
            {props.value}
         </h2>
      </div>
   )
}
