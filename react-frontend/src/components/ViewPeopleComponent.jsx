import React, { Component } from 'react'
import PeopleService from '../services/PeopleService'

class ViewPeopleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            people: {}
        }
    }

    componentDidMount(){
        PeopleService.getPeopleById(this.state.id).then( res => {
            this.setState({people: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View People Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> People First Name: </label>
                            <div> { this.state.people.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> People Last Name: </label>
                            <div> { this.state.people.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> People Email ID: </label>
                            <div> { this.state.people.emailId }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewPeopleComponent
