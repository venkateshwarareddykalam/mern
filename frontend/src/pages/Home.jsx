import axios from "axios";
import {useState, useEffect} from "react";


function Home()
{
    const [task,setTask] = useState('')
    const [isCompleted,setisCompleted] = useState(false)
    const [allData,setallData] = useState([])
    const Send =async ()=>{
        try {
            const sent = await axios.post('http://localhost:3000/api/task',{
                task:task,
                isCompleted:isCompleted
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getAll =async ()=>{
        try {
            const got = await axios.get('http://localhost:3000/api/task')
            setallData(got.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <div>
        <input type="text" onChange={(e)=>setTask(e.target.value)} />
        <input type="checkbox" onChange={(e)=>setisCompleted(e.target.checked)}/>
        <button onClick={()=>{Send()}}>Send</button>
        <button onClick={()=>{getAll()}}>get all </button>
        <ul>
  {allData.map((item, index) => (
    <li key={item._id}>
      <strong>{item.task}</strong> - {item.isCompleted ? "✅ Done" : "🕒 Pending"}
    </li>
  ))}
</ul>
        </div>
    )
}

export default Home;