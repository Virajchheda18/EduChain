import React, { Component } from 'react';

class University extends Component {

  render() {
    return (
      <div className="card" style={{width: "18rem",borderWidth:"2px",borderColor:"#000000",backgroundColor:"#d3d3d3"}}>
            <div className="card-body">
                <h5 className="card-title">Register a University</h5>
                <hr></hr>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const uniadd = this.UniHash.value
                  this.props.university(uniadd)
                }}>
                <div className="form-group">
                  <label htmlFor="UniHash">Univeristy account address</label>
                  <input type="address" className="form-control" id="UniHash" placeholder="Account Hash" ref={(input) => { this.UniHash = input }} />
                  <small id="Address" className="form-text text-muted">We'll never share your address with anyone else.</small>
                </div>
                <button type="submit" className="btn btn-primary">Register University</button>
            </form>
            </div>
        </div>
    );
  }
}

export default University;