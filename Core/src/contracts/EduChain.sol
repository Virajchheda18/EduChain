pragma solidity ^0.5.0;

contract EduChain{
    address public owner;
    mapping(address => uint) public studentId;
    mapping(uint => Student) public students;
    mapping(address => bool) public isUniversity;
    mapping(address => bool) public isStudent;
    
    struct Student{
        uint id;
        address studentAdd;
        uint count;
        string name;
        string uniName;
        uint age;
        string course;
        string cpi;
        string passYear;
        string[] certificates;
    }
    
    event StudentRegistered(
        address from,
        address studentAdd,
        uint stdId
    );
    
    constructor() public{
        owner = msg.sender;
        isUniversity[msg.sender]=true;
    }
    
    modifier onlyOwner {
      require(msg.sender == owner,"You are not authorized to use this.");
      _;
    }
    
    modifier onlyUni {
      require(msg.sender == owner || isUniversity[msg.sender] == true,"You are not authorized to use this.");
      _;
    }
   
    function setUni(address _uniAdd) public onlyOwner(){
        require(isUniversity[_uniAdd]==false,"Already Registered address");
        isUniversity[_uniAdd] = true;
    }
    
    function setStudent(
        address _stdAdd,
        uint stdId,
        string memory _name,
        string memory _uniName,
        uint _age,
        string memory _course,
        string memory _cpi,
        string memory _passYear) public onlyUni(){
            require(isStudent[_stdAdd]==false,"Already a Student");
            isStudent[_stdAdd] = true;
            studentId[_stdAdd] = stdId;
            students[stdId].id = stdId;
            students[stdId].studentAdd = _stdAdd; 
            students[stdId].name =_name;
            students[stdId].uniName =_uniName;
            students[stdId].age =_age;
            students[stdId].course =_course;
            students[stdId].cpi =_cpi;
            students[stdId].passYear =_passYear;
            
            emit StudentRegistered(msg.sender,_stdAdd,stdId);
        }
    
    function addCertificate(uint _id,string memory ipfsHash) public onlyUni(){
        students[_id].certificates.push(ipfsHash);
        students[_id].count++;
    }
    
    function getCertificate(uint _id,uint i) public view returns (string memory){
        return students[_id].certificates[i];
    }
    
}