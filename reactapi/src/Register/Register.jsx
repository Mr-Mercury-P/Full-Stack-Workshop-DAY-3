import React, {useState} from 'react';
import axios from 'axios';

function Register()
{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disease, setDisease] = useState("");
    const [mobile, setMobile] = useState("");
    function addPatient(e)
    {
        e.preventDefault();
        const patient = {name, email, password, disease, mobile};
        if(!name || !email || !password || !disease || !mobile)
        {
            alert("All fields are required!");
            return;
        }
        console.log(patient);
        axios.post("http://localhost:5000/patients/register", patient)
        .then((res) => {
            if(res.status === 201)
            {
                alert("Patient created successfully")
            }
            console.log(res);
        })
        .catch((err) => {
            if(err.status === 400)
            {
                alert("username taken")
            }
            console.log(err);
        })

    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
            <div className="card p-4 shadow-lg border-0" style={{ width: "380px", borderRadius: "15px" }}>
                <h2 className="text-center mb-4 text-primary">Register</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">Name</label>
                        <input
                            type="text"
                            className="form-control shadow-sm"
                            id="name"
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="disease" className="form-label fw-bold">Disease</label>
                        <input
                            type="text"
                            className="form-control shadow-sm"      
                            id="disease"
                            placeholder="Enter your disease"
                            onChange={(e) => setDisease(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email address</label>
                        <input
                            type="email"
                            className="form-control shadow-sm"
                            id="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                        <input
                            type="password"
                            className="form-control shadow-sm"
                            id="password"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobilenumber" className="form-label fw-bold">Mobile Number</label>
                        <input
                            type="text"
                            className="form-control shadow-sm"
                            id="mobilenumber"
                            placeholder="Enter mobile number"
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 fw-bold shadow-sm" style={{ borderRadius: "8px" }} onClick= {addPatient}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Register;
