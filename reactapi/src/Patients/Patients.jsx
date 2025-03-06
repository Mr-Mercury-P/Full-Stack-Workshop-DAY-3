import React from 'react'

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
      const fetchPatients = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in first");
          navigate("/login");
          return;
        }
        try {
          await axios.get("http://localhost:5000", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const response = await axios.get("http://localhost:5000/patients", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPatients(response.data);
        } catch (err) {
          console.error("Error:", err.response ? err.response.data : err.message);
    
          if (err.response?.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            setError("Error fetching data");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchPatients();
    }, [navigate]);
    
  
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}
      >
        <div className="container text-white p-4">
          <h2 className="text-center mb-4">Patient List</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          <ul className="list-group">
            {patients.map((patient) => (
              <li key={patient._id} className="list-group-item bg-transparent text-white border-light">
                <strong>Name:</strong> {patient.name} <br />
                <strong>Email:</strong> {patient.email} <br />
                <strong>Disease:</strong> {patient.disease} <br />
                <strong>Mobile:</strong> {patient.mobile}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default Patients
