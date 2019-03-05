import React,{Component} from 'react'
import {forgot} from './UserFunctions'

class Forgot extends Component {
    constructor(){
        super()
        this.state={
            email:'',
           
        }
        this.onChange= this.onChange.bind(this)
        this.onSubmit = this.sendEmail.bind(this)
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    sendEmail = (e) => {
        e.preventDefault()
        const user ={
            email:this.state.email,
          
        }
        forgot(user).then(res =>{
            if(res){
                // <h1>A link has been sent to your email to reset the password Set your password and login here</h1>
                this.props.history.push('/login')

            }
        })
    }
    render(){
        return (
            <div className="container">
            <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
            
            <form noValidate onSubmit={this.sendEmail}>
            
                 <h1 className="h3 mb-3 font-weight-normal">Forgot Password</h1>
                <div className="form-group">

                <label htmlFor="email">Email Address</label>
                <input type="email" className="form-control" name="email" placeholder="Enter Email" value={this.state.email} onChange={this.onChange}/>
            
                </div>

               
              
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                Submit
                </button>
            </form>
            
            </div>
            </div>
            
            </div>
        )
    }
}
export default Forgot
