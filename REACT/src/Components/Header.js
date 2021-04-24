import React from 'react';
import '../Styles/header.css'
import Modal from 'react-modal';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      border                : 'solid 2px black',
      backgroundColor       : 'aliceblue'
    }
  };

class Header extends React.Component{
    constructor(){
        super();
        this.state ={
            signUpModalIsOPen : false,
            loginModalIsOPen  : false,
            email:'',
            FN:'',
            LN:'',
            PN:'',
            pwd:'',
            isLoggedIn:false
        }
    }

    signUp =() => {
        this.setState({ signUpModalIsOPen : true , email:'',
        FN:'',
        LN:'',
        PN:'',
        pwd:''});
    }
    handle =() => {
        this.props.history.push('/');
    }
    handleback=()=>{
        this.setState({ signUpModalIsOPen : false});
    }
    Reset=() => {
        this.setState({ signUpModalIsOPen : true, email : '',FN :'', LN:'',PN:'',pwd:''});
    }
    signIn =() => {
        this.setState({ loginModalIsOPen : true , email:'', pwd:''});
    }
    handlecancel=()=>{
        this.setState({ loginModalIsOPen : false});
    }
    handlechange=(event,state)=>{
        this.setState({ [state]:event.target.value});
    }
    handlesignup=()=>{
        const {email,FN,LN,PN,pwd}=this.state;
        const signUpObj ={
            email:email,
            FirstName:FN,
            LastName:LN,
            PhoneNumber:PN,
            Password:pwd
        };
        axios({
            method:'POST',
            url:'http://localhost:6503/api/signup',
            headers:{'content-type':'application/json'},
            data:signUpObj
        }).then(response => {
            if(response.data.message == 'User signedUp Sucessfully')
            this.setState({signUpModalIsOPen : false,
                email:'',
                FN:'',
                LN:'',
                PN:'',
                pwd:''});
            alert(response.data.message);
        })
        .catch(err=>console.log(err))
    }
    handlesignin=()=>{
        const {email,pwd}=this.state;
        const signInObj={
            email:email,
            Password:pwd
        };
        axios({
            method:'POST',
            url:'http://localhost:6503/api/login',
            headers:{'content-type':'application/json'},
            data:signInObj
        }).then(response => {
            this.setState({isLoggedIn:response.data.isAuthenticated , loginModalIsOPen : false, email:'',pwd:''});
            sessionStorage.setItem('isLoggedIn', response.data.isAuthenticated);
            alert(response.data.isAuthenticated);
        })
        .catch(err=>console.log(err))

    }
    render() {
        const {signUpModalIsOPen ,loginModalIsOPen,email,FN,LN,PN,pwd} = this.state;
        return(
            <div style={{width:'100%',height:'60px',backgroundColor:'red',color:'white'}}>
               <div className="header">
                    <div onClick={this.handle}>e!</div>
                </div>
                <div className ="group" style={{float:'right',paddingRight:'10px',paddingTop:'1px',top:'-35px'}}>
                    <button onClick={this.signIn} className="button"> Login </button>

                    <button onClick={this.signUp} className="button"> Create an account </button>
                </div>
                <Modal
                        isOpen={signUpModalIsOPen}
                        style={customStyles}
                >
                        <div>
                            <h2>Food Ordering application</h2>
                            <h3>SignUp User</h3>
                            <div><span>Email: </span><input type ="text" value={email} onChange={ (event)=> this.handlechange(event,'email')} /></div>
                            <div><span>First Name: </span><input type ="text" value={FN} onChange={ (event)=> this.handlechange(event,'FN')}/></div>
                            <div><span>Last Name: </span><input type ="text" value={LN}  onChange={ (event)=> this.handlechange(event,'LN')}/></div>
                            <div><span>Phone Number: </span><input type ="text" value={PN}  onChange={ (event)=> this.handlechange(event,'PN')}/></div>
                            <div><span>Password: </span><input type ="password" value={pwd} onChange={ (event)=> this.handlechange(event,'pwd')}/></div>
                            <button className="button1" onClick={this.handlesignup}>SignUp</button>
                            <button className="button2" onClick={this.Reset}>Reset</button>
                            <button className="button3" onClick={this.handleback}>Cancel</button>
                        </div>
                </Modal>
                <Modal
                        isOpen={loginModalIsOPen}
                        style={customStyles}
                >
                        <div>
                            <h2>Food Ordering application</h2>
                            <h3>SignIn User</h3>
                            <div><span>Email: </span><input type ="text" value={email} onChange={ (event)=> this.handlechange(event,'email')} /></div>
                            <div><span>Password: </span><input type ="password" value={pwd} onChange={ (event)=> this.handlechange(event,'pwd')}/></div>
                            <button className="button1" onClick={this.handlesignin}>LogIn</button>
                            <button className="button3" onClick={this.handlecancel}>Cancel</button>
                        </div>
                </Modal>   
            </div>
        )
    }
}
export default withRouter(Header);