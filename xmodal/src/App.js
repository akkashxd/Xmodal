import React, { useState } from "react";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { username, email, phone, dob } = formData;

    if (!username || !email || !phone || !dob) {
      alert("All fields are required.");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address.");
      return false;
    }

    const dobDate = new Date(dob);
    if (dobDate > new Date()) {
      alert("Date of birth cannot be in the future.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Form submitted successfully!");
      console.log("Form Data:", formData);
      setFormData({ username: "", email: "", phone: "", dob: "" });
      setShowModal(false);
    }
  };

  return (
    <div className="App">
      <button onClick={() => setShowModal(true)} className="open-button">
        Open Form
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>User Details</h2>
            <form onSubmit={handleSubmit} className="form">
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>

              <label>
                Phone Number:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>

              <label>
                Date of Birth:
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </label>

              <div className="form-actions">
                <button type="submit">Submit</button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="close-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
