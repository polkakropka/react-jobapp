// import React, {useState, useEffect} from 'react'

//class App extends React.Component {
// const ComponentTemplate: React.FC= () => {
//     const[firstName, setValue] = useState('')
//     const [windowWidth, setWindowWith] = useState(window.innerWidth)

//     const onChange = (e: any) => setValue(e.target.value)
//     const handleResize = () => {
//         setWindowWith(window.innerWidth)
//     }

//     useEffect(() => {
//         window.addEventListener('resize', handleResize)
//         return () => {
//             window.removeEventListener('resize', handleResize)
//         }
//     })
//     return (
//         <div>
//             <h1>Window Width: {windowWidth}</h1>

//             <input
//                 type="text"
//                 value={firstName}
//                 onChange={onChange}
//             />

//             <p>{firstName}</p>
//         </div>
//     );
// }
// export default ComponentTemplate;
export {}