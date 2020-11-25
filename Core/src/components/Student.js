import React, { Component } from 'react';

class Student extends Component {

  render() {
    return (
      <div className="card" style={{width: "18rem",borderWidth:"2px",borderColor:"#000000",backgroundColor:"#d3d3d3"}}>
            <div className="card-body">
                <h5 className="card-title">View a Student Profile</h5>
                <hr></hr>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const stdId = this.stdId.value
                  this.props.getStudent(stdId)
                }}>
                <div className="form-group">
                  <label htmlFor="stdId"> Student Id </label>
                  <input type="number" className="form-control" id="stdId" placeholder="Student Id" ref={(input) => { this.stdId = input }} />
                </div>
                <button type="submit" className="btn btn-primary">View Profile</button>
            </form>
            </div>
        </div>
    );
  }
}

export default Student;