import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [doctors, setDoctors] = useState([]);
    const [doctorId, setDoctorId] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    function handleConfirm(e) {
        e.preventDefault();

        if (!token) {
            alert("You must be logged in to book an appointment.");
            return;
        }

        const newAppointment = {
            doctorId,
            time: appointmentTime,
            date: appointmentDate
        };

        axios.post("http://localhost:5000/appointments/add", newAppointment, {
            headers: {
                Authorization: `Bearer ${token}` // Send token in headers
            }
        })
        .then((res) => {
            console.log(res);
            alert("Appointment booked successfully!");
            setDoctorId(null); // Close modal after booking
        })
        .catch((err) => {
            console.error("Error:", err.response.data);
            alert("Failed to book appointment. Please try again.");
        });
    }

    useEffect(() => {
        fetchDoctors();
    }, []);

    async function fetchDoctors() {
        await axios.get("http://localhost:5000/doctors")
            .then((res) => {
                console.log(res.data);
                setDoctors(res.data);
            })
            .catch((err) => {
                console.error("Error fetching doctors:", err);
            });
    }

    return (
        <div className='container'>
            <div className='row'>
                <h1 className='text-center text-danger'>Doctors</h1>
            </div>
            <div className="row mt-2">
                {
                    doctors && doctors.map((doctorItem) => {
                        return (
                            <div key={doctorItem._id} className='mt-2 col-12 col-sm-6 col-md-4 card h-100 m-2' style={{ width: "20rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">{doctorItem.specializaton}</h5>
                                    <p className="card-text">{doctorItem.name}</p>
                                    <p className="card-text">{doctorItem.email}</p>
                                    <p className="card-text">{doctorItem.mobile}</p>
                                </div>
                                <div className="card-footer">
                                    <button className='btn btn-primary' onClick={() => {
                                        setDoctorId(doctorItem._id);
                                    }}>Book Appointment</button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            {/* Modal for Booking Appointment */}
            {
                doctorId &&
                <div className="modal show d-block" role='modal' id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Appointment Schedule</h1>
                                <button onClick={() => setDoctorId(null)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">Appointment Date:</label>
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            id="recipient-name"
                                            onChange={(e) => setAppointmentDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Time:</label>
                                        <input 
                                            type="time" 
                                            className="form-control" 
                                            id="recipient-name"
                                            onChange={(e) => setAppointmentTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => setDoctorId(null)} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleConfirm} type="button" className="btn btn-success">Confirm Appointment</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
