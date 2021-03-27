import React from "react";

// class Form extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "", 
//       description: ""
//     };
//   }

//   handleChange(event) {
//     const target = event.target;
//     const value = target.type === 'checkbox' ? target.checked : target.value;
//     const name = target.name;

//     this.setState({
//       [name]: value
//     });
//   }

//   handleSubmit(event) {
//     event.preventDefault();

    
//   }

//   render() {
//     return (
//       <form onSubmit={this.props.handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Name</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             name="name" 
//             id="name" 
//             placeholder="Deck Name"
//             onChange={this.handleChange.bind(this)}
//             value={this.name}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <textarea 
//             className="form-control" 
//             name="description" 
//             id="description" 
//             placeholder="Brief description of the deck"
//             onChange={this.handleChange.bind(this)}
//             value={this.description}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">{this.props.buttonLabel}</button>
//       </form>
//     );
//   }
// }

function DeckForm({handleSubmit, formData, handleChange, buttonLabel}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          className="form-control" 
          name="name" 
          id="name" 
          placeholder="Deck Name"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea 
          className="form-control" 
          name="description" 
          id="description" 
          placeholder="Brief description of the deck"
          onChange={handleChange}
          value={formData.description}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">{buttonLabel}</button>
    </form>
  );
}

export default DeckForm;
