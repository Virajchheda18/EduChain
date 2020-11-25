import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import ipfs from './ipfs'
import EduChain from '../abis/EduChain.json';
import Navbar from './Navbar';
import Form from './Form';
import University from './University';
import Student from './Student';
import StudentProfile from './StudentProfile';
import Certificate from './Certificate';



class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = EduChain.networks[networkId]
    if(networkData) {
      const eduChain = web3.eth.Contract(EduChain.abi, networkData.address)
      this.setState({ eduChain })
      
    } else {
      window.alert('EduChain contract not deployed to detected network.')
    }
  }

  async student(add,id,name,uniname,age,course,api,year) {
    let isUni = await this.state.eduChain.methods.isUniversity(this.state.account).call()
    console.log(isUni)
    if(isUni){
      let isStd = await this.state.eduChain.methods.isStudent(add).call()
      console.log(isStd)
      if(!isStd){
        this.state.eduChain.methods.setStudent(add,id,name,uniname,age,course,api,year).send({ from: this.state.account })
        window.alert('Student has been registered')
      }else{window.alert('This student is alredy registered.')}
    }else{window.alert('You are not registered to do this.')}
  }

  async university(uniadd) {
    let owner = await this.state.eduChain.methods.owner().call()
    if(owner == this.state.account){
      let isUni = await this.state.eduChain.methods.isUniversity(uniadd).call()
      if(!isUni){
        this.state.eduChain.methods.setUni(uniadd).send({ from: this.state.account })
        window.alert('University has been registered')
      }else{window.alert('This university is alredy registered.')}
    }else{window.alert('You are not allowed to register university.')}
  }

  async getStudent(stdId) {
    let Std = await this.state.eduChain.methods.students(stdId).call()
    if(parseInt(Std.id._hex,16)!==0){
      const studentPro=await this.state.eduChain.methods.students(stdId).call()
      const cnt = parseInt(studentPro.count._hex,16)
      this.setState({ studentPro ,
        certificates : [],
        })
      for(let j=0;j<cnt;j++){
        let certificate = await this.state.eduChain.methods.getCertificate(stdId,j).call()
        this.setState({certificates : [...this.state.certificates,certificate]})
      }
      this.setState({ studentPro ,
        toggle : true,
        })
        console.log(this.state.certificates)
    }else{window.alert('This student is not registered.')}
  }

  changetoggle(){
    this.setState({ toggle : false})
  }

  async captureFile(event) {
    event.preventDefault()
    let isallow = await this.state.eduChain.methods.isUniversity(this.state.account).call()
    if(isallow){
    const file = this.fileInput.current.files[0]
    this.setState({loading :true})
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
      this.setState({loading :false})
    }
    }else{window.alert('You are not allowed to upload certficates')}
  }

  async onSub(event) {
    event.preventDefault()
    let isallowed = await this.state.eduChain.methods.isUniversity(this.state.account).call()
    if(isallowed){
      this.setState({loading :true})
    ipfs.files.add(this.state.buffer,(error, result) => {
      if(error) {
        console.error(error)
        return
      }
      let ID =parseInt(this.state.studentPro.id._hex,16)
      console.log(ID)
      this.state.eduChain.methods.addCertificate(ID,result[0].hash).send({from: this.state.account}).then((r) =>{
        return this.setState({certificates : [...this.state.certificates,result[0].hash]})
        console.log(this.state.certificates)
      })
      this.setState({certificates : [...this.state.certificates,result[0].hash]})
      console.log(this.state.certificates)
      window.alert('Certificate uploaded')
      this.setState({loading :false})
    })
    }else{window.alert('You are not allowed to upload certficates')}
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      eduChain: null,
      studentPro: null,
      toggle: false,
      certificates : [],
      buffer : null,
      loading :false,
    }

    this.fileInput=React.createRef()

    this.student = this.student.bind(this)
    this.university = this.university.bind(this)
    this.getStudent = this.getStudent.bind(this)
    this.changetoggle = this.changetoggle.bind(this)
    this.onSub = this.onSub.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  render() {
    return (
      <div className="main">
        <Navbar account = {this.state.account}/>
        {this.state.toggle 
          ? <div class="page2">
            <div class="out2">
            <Certificate certificates={this.state.certificates}/>
            </div>
            <div class="out3">
            <div class="out1">
            <StudentProfile studentPro={this.state.studentPro} changetoggle={this.changetoggle} />
            </div>
            <div className="card" style={{width: "18rem",borderWidth:"3px",borderColor:"#000000"}}>
            <div className="card-body">
                {this.state.loading ? 
                  <h5 className="card-title">Uploading..</h5>
                  :
                  <React.Fragment>
                  <h5 className="card-title">Upload a file</h5>
                  <hr></hr>
                <div className="input-group">
                <div className="custom-file">
                    <input type="file" ref={this.fileInput} className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" onChange={this.captureFile}/>
                    <label className="custom-file-label" htmlFor="inputGroupFile04">Choose file</label>
                </div>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" onClick={this.onSub}>Upload</button>
                </div>
                </div> 
                </React.Fragment>}
            </div>
            </div>
            </div>
            </div>
          : <div className="page1"> 
            <div className="f1">
            <div className="in1">
            <University university = {this.university}/>
            </div>
            <div className="in2">
            <Student getStudent = {this.getStudent}/>
            </div>
            </div>
            <div className="f2">
            <Form student= {this.student}/>
            </div>
            </div>
        }
      </div>
    );
  }
}

export default App;
