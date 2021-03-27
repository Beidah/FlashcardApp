import React from "react";

function CardForm({handleSubmit, setFormData, formData, submitButtonLabel, cancelButtonLabel, handleCancel}) {
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea 
          className="form-control" 
          name="front" 
          id="front" 
          placeholder="Front side of the card"
          onChange={handleChange}
          value={formData.front}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea 
          className="form-control" 
          name="back" 
          id="back" 
          placeholder="Back side of the card"
          onChange={handleChange}
          value={formData.back}
          required
        />
      </div>
      <button onClick={handleCancel} className="btn btn-secondary mr-2">{cancelButtonLabel}</button>
      <button type="submit" className="btn btn-primary">{submitButtonLabel}</button>
    </form>
  );
}

export default CardForm;