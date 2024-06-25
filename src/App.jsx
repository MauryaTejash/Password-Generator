import { useCallback, useEffect, useState, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState('')

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numberAllowed){
      str+= '0123456789'
    }
    if(charAllowed){
      str+= '~!@#$%^&*()_+<>?/{}()[]'
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() *str.length +1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  //how to copy the text from input field
  const copyPasswordToClipboard = useCallback(() => {
    // this will select the copied text
    passwordRef.current?.select();

    // to select the specific range of values
    // passwordRef.current?.setSelectionRange(0,4)
    
    window.navigator.clipboard.writeText(Password)

  },[Password])
  useEffect(() => {
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-56 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center text-4xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 mt-4'>
          <input type="text" 
          value={Password}
          className='outline-none w-full py-1 px-3 mb-5 rounded-full'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 mb-5 rounded-full mx-1'>Copy</button>
        </div>
        <div className='flex text-lg gap-x-2'>
          <div className='flex items-center gap-x-1 text-xl pb-5'>
            <input type="range" 
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1 pb-5'>
            <input type="checkbox" 
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
            />
            <label>Numbers</label>
          </div>
          <div className='flex item-center gap-x-1 pb-5'>
            <input type="checkbox" 
            id="charInput" 
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
            />
            <label>Characters</label>
          </div>
        </div>
        </div>
    </>
  )
}

export default App
