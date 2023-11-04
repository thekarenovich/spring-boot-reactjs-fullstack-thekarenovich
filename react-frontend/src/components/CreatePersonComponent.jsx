import React, { Component } from 'react'
import PeopleService from '../services/PeopleService';

class CreatePeopleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdatePeople = this.saveOrUpdatePeople.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            PeopleService.getPeopleById(this.state.id).then( (res) =>{
                let people = res.data;
                this.setState({firstName: people.firstName,
                    lastName: people.lastName,
                    emailId : people.emailId
                });
            });
        }        
    }
    saveOrUpdatePeople = (e) => {
        e.preventDefault();
        let people = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId};
        console.log('people => ' + JSON.stringify(people));

        if(this.state.id === '_add'){
            PeopleService.createPeople(people).then(res =>{
                this.props.history.push('/people');
            });
        }else{
            PeopleService.updatePeople(people, this.state.id).then( res => {
                this.props.history.push('/people');
            });
        }
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/people');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add People</h3>
        }else{
            return <h3 className="text-center">Update People</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdatePeople}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreatePeopleComponent
