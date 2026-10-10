import { useState } from 'react';
import './MemberForm.css';

const initialFormState = {
  firstName: '',
  lastName: '',
  dob: '',
  anniversary: '',
  city: '',
  state: '',
};

/**
 * Fake API call placeholder.
 * Replace the body with a real fetch POST once the endpoint is known, e.g.:
 *   const response = await fetch('/api/members', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(payload),
 *   });
 *   return response.json();
 */
async function submitToApi(payload) {
  console.log('Form payload:', payload);
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { ok: true, message: 'Member details submitted successfully (fake API)' };
}

function MemberForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.firstName.trim()) nextErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) nextErrors.lastName = 'Last name is required';
    if (!formData.dob) nextErrors.dob = 'Date of birth is required';
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      dob: formData.dob,
      // anniversary is optional — only include it when provided
      ...(formData.anniversary ? { anniversary: formData.anniversary } : {}),
      ...(formData.city.trim() ? { city: formData.city.trim() } : {}),
      ...(formData.state.trim() ? { state: formData.state.trim() } : {}),
    };

    try {
      const result = await submitToApi(payload);
      setStatus({ type: 'success', message: result.message });
      setFormData(initialFormState);
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong while submitting the form.' });
    }
  };

  return (
    <form className="member-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="firstName">First Name *</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span className="field-error">{errors.firstName}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="lastName">Last Name *</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span className="field-error">{errors.lastName}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="dob">Date of Birth *</label>
        <input
          id="dob"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
        />
        {errors.dob && <span className="field-error">{errors.dob}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="anniversary">Anniversary (optional)</label>
        <input
          id="anniversary"
          name="anniversary"
          type="date"
          value={formData.anniversary}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="state">State</label>
        <input
          id="state"
          name="state"
          type="text"
          value={formData.state}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>

      {status && (
        <p className={`form-status ${status.type}`}>
          {status.message}
        </p>
      )}
    </form>
  );
}

export default MemberForm;
