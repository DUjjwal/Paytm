import { useEffect } from "react"
import { useState } from "react"
import { useId } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Dashboard() {
    const [user, setUser] = useState("")
    const [balance, setBalance] = useState("")
    const [filter, setFilter] = useState("")
    const [users, setUsers] = useState([])
    const [from, setFrom] = useState("")
    

    const navigate = useNavigate()
    useEffect(()=> {
        async function Hi()  {
            try {
                const res = await axios.get(`${import.meta.env.VITE_DB_URL}/user/me`, {
                    headers: {
                        Authorization: "Bearer "+localStorage.getItem("token")
                    }
                })
                console.log("asdasd=", res.data.data._id)
                setFrom(res.data.data._id)
                setUser(res.data.data.firstname)
                const res2 = await axios.get(`${import.meta.env.VITE_DB_URL}/account/me`, {
                    headers: {
                        Authorization: "Bearer "+localStorage.getItem("token")
                    }
                })
                console.log("red2-", res2.data.data)
                setBalance(res2.data.data.account.balance)

            }catch(error) {
                console.log("error occurred", error)
            }
        }
        Hi()
        
    },[user, balance])


    return (
        <div className="w-full h-screen">
            <header className="flex justify-between items-center p-4 border-b-2 border-gray-300">
                <div className="flex justify-start items-center w-1/2">
                    <Heading label="Payments App" size="3xl" />
                    <Button label="Logout" onClick={async () => {
                        localStorage.removeItem("token")
                        navigate("/signin")
                    }}/>
                </div>
                <div className="flex items-center gap-4 px-4">
                    <SubHeading label={`Hello, ${user}`} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
            </header>
            <div className="px-4">
                <Heading label={`Your Balance: ${balance}`} size="3xl" />
                <div className="flex gap-4 m-3">
                    <input className="text-gray-700 w-full outline-1 rounded-lg p-1 outline-gray-200 w-[89%]" type="text" placeholder="Search users..." onChange={(e) => setFilter(e.target.value)} onKeyDown={async (e) => {
                        if(e.key === "Enter") {
                            const response = await axios.get(`${import.meta.env.VITE_DB_URL}/user/search?filter=${filter}`, {
                                headers: {
                                    Authorization: "Bearer "+localStorage.getItem("token")
                                }
                            })
                            console.log(response.data.data.user)
                            setUsers(response.data.data.user)
                        }
                    }}></input>
                </div>
            </div>
            <div>
                {users.map(user => (
                    <Display firstname={user.firstname} lastname={user.lastname} id1={user._id} id2={from}/>
                ))}
            </div>
        </div>
    )
}

export default Dashboard

function Display({firstname, lastname, id1, id2}) {
    
    
    firstname = firstname.toUpperCase()
    lastname = lastname.toUpperCase()
    const navigate = useNavigate()
    return (
        <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <Heading label={firstname+" "+lastname} size="2xl"/>
            </div>
            <Button label="Send Money" onClick={async () => {
                const url = `/send?from=${id1}&to=${id2}`
                console.log(url)
                navigate(`/send?from=${id2}&&to=${id1}`)
            }}/>
        </div>
    )
}


function SubHeading({label}) {
    return (
        <p className="text-center text-gray-700 text-xl">{label}</p>
    )
}

function Button({onClick, label}) {
    return (
        <button className="w-[10%] bg-black rounded-lg p-1 text-white text-lg" onClick={onClick}>{label}</button>
    )
}

function Heading({label, size}) {
    return (
        <h1 className={`text-${size} font-semibold m-3`}>{label}</h1>
    )
}

function InputBox({label, placeholder, onChange}) {
    const id = useId()
    return (
        <>
        <div className="m-2 text-lg">
            <label htmlFor={id}>{label}</label><br />
            <input className="text-gray-700 w-full outline-1 rounded-lg p-1 outline-gray-200" type="text" placeholder={placeholder} id={id} onChange={onChange}></input>
        </div>
        </>
    )
}