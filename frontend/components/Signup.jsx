import { useId, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import axios from "axios"

function Signup() {
    const [ firstname, setFirstName ] = useState("")
    const [ lastname, setLastName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    
    const navigate = useNavigate()
    return (
        <div className="w-full bg-gray-300 h-screen flex justify-center">
            <div className="w-1/4 bg-gray-100 h-auto self-center rounded-xl p-4 flex-row content-around">
                <div>
                    <Heading label="Sign Up"/>
                    <SubHeading label="Enter your information to create and account" />
                </div>
                <div>
                    <InputBox label="First Name" placeholder="John" onChange={(e) => setFirstName(e.target.value)} value={firstname}/>
                    <InputBox label="Last Name" placeholder="Doo" onChange={(e) => 
                        setLastName(e.target.value)
                    } value={lastname}/>
                    <InputBox label="Email" placeholder="johndoo@gmail.com" onChange={e => setEmail(e.target.value)} value={email}/>
                    <InputBox label="Password" placeholder="" onChange={e => setPassword(e.target.value)} value={password}/>
                </div>
                <div className="mx-2 my-5 ">
                    <Button label="Sign Up" onClick={async () => {
                        const res = await axios.post("http://localhost:4000/user/signup", {
                            firstname,
                            lastname,
                            email,
                            password
                        })
                        if(res.data.status === 200) {
                            navigate("/dashboard")
                            localStorage.removeItem("token");
                            localStorage.setItem("token", res.data.data.token)
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
                            setFirstName("")
                            setLastName("")
                            setEmail("")
                            setPassword("")
                            
                        }
                    }}/>
                    
                    
                </div>
                <BottomWarning to="/signin" para="Already Have an account ? " link="Login"/>
                <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
                />
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

function InputBox({label, placeholder, onChange, value}) {
    const id = useId()
    return (
        <>
        <div className="m-2 text-lg">
            <label htmlFor={id}>{label}</label><br />
            <input className="text-gray-700 w-full outline-1 rounded-lg p-1 outline-gray-200" type="text" placeholder={placeholder} id={id} onChange={onChange} value={value}></input>
        </div>
        </>
    )
}

export default Signup