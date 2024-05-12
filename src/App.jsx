import { useState,useCallback,useEffect,useRef} from 'react';


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setChar] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef=useRef(null)

  const copyPasswordToClipboard=()=>{
    window.navigator.writeText(password)
    passwordRef.current.select()
  }
  const generatePassword=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(specialCharAllowed) str+="!@#$%^&*()_+"
    for(let i=1;i<=length;i++){
      const char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }

    setPassword(pass)
  },[length,numberAllowed,specialCharAllowed])

useEffect(()=>{
  generatePassword()
},[length,numberAllowed,specialCharAllowed])

const copyPasswordtoClipboard=()=>{
   window.navigator.clipboard.writeText(password)
   passwordRef.current.select()
  }
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-900'>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex items-center rounded-lg overflow-hidden'>
          <input
            type='text'
            value={password}
            className='outline-none flex-grow py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordtoClipboard} className='outline-none bg-blue-700 text-white px-3 py-1'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={8}
              max={30}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>setLength(e.target.value)}
              name=""
              id="" />
              <label htmlFor='length'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input
                type='checkbox'
                defaultChecked={numberAllowed}
                name=""
                id=""
                onChange={()=>
                  setNumberAllowed((prev)=>!prev )
                } />
              <label htmlFor='number'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
              <input
                type='checkbox'
                defaultChecked={specialCharAllowed}
                name=""
                id=""
                onChange={()=>
                  setChar((prev)=>!prev )
                } />
              <label htmlFor='speacialcharacters'>Special Characters</label>
          </div>


        </div>
      </div>
    </div>
  );
}

export default App;

