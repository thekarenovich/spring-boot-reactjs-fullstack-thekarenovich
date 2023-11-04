import React, { Component } from 'react'
import PeopleService from '../services/PeopleService'

class ListPeopleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                people: []
        }
        this.addPeople = this.addPeople.bind(this);
        this.editPeople = this.editPeople.bind(this);
        this.deletePeople = this.deletePeople.bind(this);
    }

    deletePeople(id){
        PeopleService.deletePeople(id).then( res => {
            this.setState({people: this.state.people.filter(people => people.id !== id)});
        });
    }
    viewPeople(id){
        this.props.history.push(`/view-people/${id}`);
    }
    editPeople(id){
        this.props.history.push(`/add-people/${id}`);
    }

    componentDidMount(){
        PeopleService.getPeople().then((res) => {
            this.setState({ people: res.data});
        });
    }

    addPeople(){
        this.props.history.push('/add-people/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">People List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addPeople}> Add People</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> People First Name</th>
                                    <th> People Last Name</th>
                                    <th> People Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.people.map(
                                        people =>
                                        <tr key = {people.id}>
                                             <td> { people.firstName} </td>
                                             <td> {people.lastName}</td>
                                             <td> {people.emailId}</td>
                                             <td>
                                                 <button onClick={ () => this.editPeople(people.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deletePeople(people.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewPeople(people.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListPeopleComponent
