import { useState } from 'react';

function Home() {
   const [text, setText] = useState('');
   
   const handleClick = (e) => {
      alert(text);
   }
   
   return (
      <>
         <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
         />
         <button onClick={handleClick}>Print</button>
      </>
   )
}

export default Home;