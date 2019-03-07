import React,{Component} from 'react'
import {reset} from './UserFunctions'
// import {axios} from 'axios'

class Reset extends Component {
    constructor(){
        super()
        this.state={
            first_name: '',
            password:'',
            confirmpassword:''
        }
        this.onChange= this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
   

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit(e){
        e.preventDefault()
        const user ={
            //first_name: this.state.first_name,
            password:this.state.password,
            confirmpassword:this.state.confirmpassword
        }
        reset(user).then(res =>{
            if(res){
                this.props.history.push('/login')

            }
        })
    }
      // componentDidMount(){
    //     const user ={
    //         password:this.state.password
    //     }
    //     reset(user).then(res =>{
    //         if(res){
    //             this.props.history.push('/login')
    //         }
    //     })
    // }
    render(){
        return (
            <div className="container">
            <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
            
            <form noValidate onSubmit={this.onSubmit}>
            
            <h1 className="h3 mb-3 font-weight-normal">Reset Password</h1>
            <div className="form-group">

            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Enter password" value={this.state.password} onChange={this.onChange}/>
            
            </div>

            <div className="form-group">

                <label htmlFor="password"> Confirm Password</label>
                <input type="password" className="form-control" name="confirmpassword" placeholder="Re-Enter Password" value={this.state.confirmpassword} onChange={this.onChange}/>

          </div>
          <button type="submit" className="btn btn-lg btn-primary btn-block">
          Reset
          </button>
            </form>
            
            </div>
            </div>
            
            </div>
        )
    }
}
export default Reset
