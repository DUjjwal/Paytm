import { useId, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import axios from "axios"

function Signin() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    
    const navigate = useNavigate()

    return (
        <div className="w-full bg-gray-300 h-screen flex justify-center">
            <div className="w-1/4 bg-gray-100 h-auto self-center rounded-xl p-4 flex-row content-around">
                <div>
                    <Heading label="Sign In"/>
                    <SubHeading label="Enter your credentials to access your account" />
                </div>
                <div>
                    <InputBox label="Email" placeholder="johndoo@gmail.com" onChange={e => setEmail(e.target.value)}/>
                    <InputBox label="Password" placeholder="" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="mx-2 my-5 ">
                    <Button label="Sign In" onClick={async () => {
                        const res = await axios.post(`${import.meta.env.VITE_DB_URL}/user/login`, {
                            email,
                            password
                        })
                        console.log(res.data)
                        if(res.data.status === 200) {
                            localStorage.setItem("token", res.data.token)
                            navigate("/dashboard")                            
                        }
                        else {  
                            toast.error(`${res.data.error}`, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                transition: Bounce,
                                });
                            setEmail("")
                            setPassword("")
                            
                        }
                    }}/>
                    
                </div>
                <BottomWarning to="/signup" para="Dont have a account ? " link="Sign Up"/>
                <ToastContainer/>
            </div>
        </div>
    )
}

function SubHeading({label}) {
    return (
        <p className="text-center text-gray-700">{label}</p>
    )
}


function Button({onClick, label}) {
    return (
        <button className="w-full bg-black rounded-lg p-1 text-white text-lg" onClick={onClick}>{label}</button>
    )
}
function BottomWarning({para, link, to}) {
    return (
        <div className="flex text-center justify-center">
            <p className="text-gray-900">{para}</p> 
            <Link to={to} className="underline">{link}</Link>
        </div>
    )
}

function Heading({label}) {
    return (
        <h1 className="text-3xl text-center font-semibold m-3">{label}</h1>
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

export default Signin