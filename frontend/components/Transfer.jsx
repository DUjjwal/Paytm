import { useId, useState, useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import axios, { AxiosError } from "axios"

//send?from=asdasdasdasd&to=asdasdasdasdasd
//send in body to and amount to /transfer

function Transfer() {
    const [ amount, setAmount ] = useState("")
    const [searchParams] = useSearchParams()
    //get from and to user using useparama
    
    const to = searchParams.get("to")
    
    const [name, setName] = useState("")

    useEffect(() => {
        async function fun() {
            const res = await axios.get(`${import.meta.env.VITE_DB_URL}/user/get/${to}`)
            setName(res.data.data.firstname+" "+res.data.data.lastname)
        }
        fun()
    }, [])
    
    const navigate = useNavigate()

    return (
        <div className="w-full bg-gray-300 h-screen flex justify-center">
            <div className="w-1/4 bg-gray-100 h-auto self-center rounded-xl p-4 flex-row content-around">
                <div>
                    <Heading label="Send Money" size="4xl"/>
                    <div className="w-full flex items-center justify-start">
                        <div className="w-15">
                            <div className="w-15 h-15 rounded-full bg-green-500 p-1 flex justify-center items-center">
                                <p className="text-3xl text-white">{name[0]?.toLocaleUpperCase()}</p>
                            </div>
                        </div>
                        <div>
                            <Heading  label={name} size="lg"/>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <InputBox label="Amount (in Rs)" placeholder="Enter amount" onChange={e => setAmount(e.target.value)} value={amount} />
                    
                </div>
                <div className="mx-2 my-5">
                    <Button label="Initiate Transfer" onClick={async () => {
                        const res = await axios.post(`${import.meta.env.VITE_DB_URL}/account/transfer`,{
                            to,
                            amount
                        }, {
                            headers: {
                                Authorization: "Bearer "+localStorage.getItem("token")
                            }
                        });
                        if(res.data.status === 200) {
                            navigate("/dashboard");
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
                            setAmount("");
                        }
                    }}/>
                    <Button label="Return to dashboard" onClick={async () => {
                        navigate("/dashboard")
                    }}/>
                    
                    
                </div>
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
        <button className="w-full bg-green-500 rounded-lg p-1 text-white text-lg my-1" onClick={onClick}>{label}</button>
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

function Heading({label, size}) {
    return (
        <h1 className={`text-${size} text-center font-semibold m-3`}>{label}</h1>
    )
}

function InputBox({label, placeholder, onChange, value}) {
    const id = useId()
    return (
        <>
        <div className="m-2 text-lg">
            <label htmlFor={id}>{label}</label><br />
            <input className="text-gray-700 w-full outline-1 rounded-lg p-1 outline-gray-200" type="number" placeholder={placeholder} id={id} onChange={onChange} value={value}></input>
        </div>
        </>
    )
}

export default Transfer