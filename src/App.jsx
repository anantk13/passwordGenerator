import { useState,useCallback , useEffect , useRef} from 'react'

function App() {
  const [length, setlength] = useState(0)
  const [numberAllowed , setnumberAllowed] = useState(false)
  const [charAllowed , setcharAllowed] = useState(false)
  const [password , setpassword] = useState("")

  //useRef hook , it provides reference which thing is only required for particular action , like here if copy button is pressed then password should be copied , so copy btn needs reference of password
  const passwordRef = useRef(null)

  // useCallback is used to re-render function in a component in cache
  // it is not responsible for running but helps to memoise or optimize if there is change in dependencies then it will keep it in cache and hence  optimize 
  const passwordGenerator = useCallback(() => {  
  let pass ="" 
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghhijklmnopqrstuvwxyz"
  if(numberAllowed) str += "0123456789"
  if(charAllowed) str += "!@#$%&~"

  for (let i = 1; i <=length; i++) {
    let char = Math.floor(Math.random() * str.length+1)
    pass += str.charAt(char)

  }
  setpassword(pass)
},[length,numberAllowed,charAllowed,setpassword])
 
// below method is used to copy message to clipboard
const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  // passwordRef.current?.setSelectionRange(0,3);
  window.navigator.clipboard.writeText(password)
},[password])

 // useEffect is used to call or synchronize the method i.e passwordGenerator
 // it is responsible for running 
 useEffect(() => {
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator]) // if there is any change in these 4 dependencies run it again
  return (
    <>
     <div className ='w-full max-w-md mx-auto shadow-md 
     rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='className="flex shadow rounded-lg overflow-hidden
        mb-4"'>
      <input
      type="text"
      value = {password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef}
      />
      
      <button
      onClick={copyPasswordToClipboard}
       className='outline-none bg-blue-700 text-white
      px-3 py-0.5 shrink-0'>Copy</button>
      
     </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input
        type = "range"
        min = {6}
        max = {100}
        value = {length}
        className='cursor-pointer'
        onChange = {(e) => {setlength(e.target.value)}}
        />
        <label>Length: {length}</label>
      </div>
      <div className='flex items-color gap-x-1'>
        <input
        type="checkbox"
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={() => {
          setnumberAllowed((prev) => !prev);
        }}
        />
        <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setcharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
     </div>
     </div>
    </>
  )
}
export default App
