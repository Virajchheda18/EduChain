import React, { Component } from 'react';
import ipfs from './ipfs'

class Certificate extends Component {

  render() {
    return (
        <div>
        {this.props.certificates.length===0 ? 
            <h1 className="d-flex justify-content-center">No Certificates Yet!!!</h1>
            :
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" >
            <div class="carousel-inner" >
            {   
                this.props.certificates && this.props.certificates.map((certificate,i)=>(
                        i===0
                        ?
                                <div className="carousel-item active" key={i}>
                                    <div className="c1">
                                    <img  
                                    src={`https://ipfs.io/ipfs/${certificate}`} className="d-block w-100" alt="..."/>
                                    </div>
                                    <a href={`https://ipfs.io/ipfs/${certificate}`} className="btn btn-primary" download="true" target="_blank" style={{margin:"30px 400px"}}>View
                                    </a>
                                </div>
                        :
                                <div className="carousel-item" key={i}>
                                    <div className="c1">
                                    <img 
                                    src={`https://ipfs.io/ipfs/${certificate}`} className="d-block w-100" alt="..."/>
                                    </div>
                                    <a href={`https://ipfs.io/ipfs/${certificate}`} className="btn btn-primary" download="true" target="_blank" style={{margin:"30px 400px"}}>View</a>
                                </div>
                ))
            }
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        }
        </div>
    );
  }
}

export default Certificate;