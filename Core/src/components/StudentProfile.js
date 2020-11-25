import React, { Component } from 'react';
import Identicon from 'identicon.js';

class StudentProfile extends Component {

  render() {
      console.log(this.props.studentPro)
    return (
        <div className="card" style={{width: "18rem",borderWidth:"2px",borderColor:"#000000"}}>
            <div className="card-body">
                <h5 className="card-title">Student Profile           
                <img
                className='ml-2'
                width='50'
                height='50'
                src={`data:image/png;base64,${new Identicon(this.props.studentPro.studentAdd, 30).toString()}`}
                />
                </h5>
                <hr></hr>
                <p className="card-text">
                <p><strong>Name         :</strong> {this.props.studentPro.name}</p>
                <p><strong>Id           :</strong> {parseInt(this.props.studentPro.id._hex,16)}</p>
                <p><strong>Age          :</strong> {parseInt(this.props.studentPro.age._hex,16)}</p>
                <p><strong>University   :</strong> {this.props.studentPro.uniName}</p>
                <p><strong>Course       :</strong> {this.props.studentPro.course}</p>
                <p><strong>Passing Year :</strong> {this.props.studentPro.passYear}</p>
                </p>
                <button type="button" className="btn btn-primary" onClick={(event) => {
                    this.props.changetoggle()
                  }}
                >Back</button>
            </div>
        </div>
        
    );
  }
}

export default StudentProfile;