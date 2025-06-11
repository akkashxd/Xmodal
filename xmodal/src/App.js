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

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!formData.username) errs.username = "Username is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Valid email is required";
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      errs.phone = "Valid 10-digit phone number is required";
    }
    if (!formData.dob) errs.dob = "Date of birth is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      setShowModal(false);
      setFormData({ username: "", email: "", phone: "", dob: "" });
      setErrors({});
    }
  };

  return (
    <div className="App">
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </label>

              <label>
                Email:
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </label>

              <label>
                Phone:
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </label>

              <label>
                Date of Birth:
                <input
                  id="dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <p className="error">{errors.dob}</p>}
              </label>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
