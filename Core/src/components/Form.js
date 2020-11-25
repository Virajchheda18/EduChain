import React, { Component } from 'react';

class Form extends Component {

  render() {
    return (
      <div className="card" style={{width: "18rem",borderWidth:"2px",borderColor:"#000000", backgroundColor:"#d3d3d3"
    }}>
            <div className="card-body" >
                <h5 className="card-title">Register a Student</h5>
                <hr></hr>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const add = this.StudentHash.value
                  const name = this.name.value
                  const id = this.Id.value
                  const age = this.age.value
                  const uniname = this.uniname.value
                  const course = this.course.value
                  const cpi = this.cpi.value
                  const year = this.year.value
                  this.props.student(add,id,name,uniname,age,course,cpi,year)
                }}>
                <div className="form-group">
                  <label htmlFor="StudentHash">Account address</label>
                  <input type="address" className="form-control" id="StudentHash" placeholder="Account Hash" ref={(input) => { this.StudentHash = input }} />
                  <small id="Address" className="form-text text-muted">We'll never share your address with anyone else.</small>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter your name" ref={(input) => { this.name = input }}/>
                </div>
                <div className="form-group ">
                  <label htmlFor="Id">Id Number</label>
                  <input type="number" className="form-control" id="Id" placeholder="Enter Student Id" ref={(input) => { this.Id = input }}/>
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input type="number" className="form-control" id="age" placeholder="Enter age" ref={(input) => { this.age = input }}/>
                </div>
                <div className="form-group">
                  <label htmlFor="uniname">University Name</label>
                  <input type="text" className="form-control" id="uniname" placeholder="Enter Uni name" ref={(input) => { this.uniname = input }}/>
                </div>
                <div className="form-group">
                  <label htmlFor="course">Course</label>
                  <input type="text" className="form-control" id="course" placeholder="Enter a course" ref={(input) => { this.course = input }}/>
                </div>
                <div className="form-group">
                  <label htmlFor="cpi">CPI</label>
                  <input type="text" className="form-control" id="cpi" placeholder="Enter current CPI" ref={(input) => { this.cpi = input }}/>
                </div>
                <div className="form-group">
                  <label htmlFor="year">Passing Year</label>
                  <input type="text" className="form-control" id="year" placeholder="Enter a year" ref={(input) => { this.year = input }}/>
                </div>
                <button type="submit" className="btn btn-primary">Register Student</button>
              </form>
            </div>
        </div>
    );
  }
}

export default Form;