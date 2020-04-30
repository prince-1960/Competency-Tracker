import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Modal from './Modal'


export default class CompetencyList extends Component {
  constructor(props) {
    super(props);


        this.onChangeTech = this.onChangeTech.bind(this);
        this.onChangeLevel = this.onChangeLevel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

	const forwardEmpId = localStorage.getItem("EmpId");


    this.state = {exercises: {Competency: []}, Comp:[],   Tech: '', Level:'',  EmpI : forwardEmpId, Tec:"", Lev:"" };
  }






  onChangeTech(e) {
    this.setState({
      Tech: e.target.value
    })
  }

onChangeLevel(e) {
  this.setState({
    Level: e.target.value
  })
}

  onSubmit(e) {
    e.preventDefault();

    const comp = {
      Tech: this.state.Tech,
      Level: this.state.Level
    }



      axios.post('/Add/'+  this.state.EmpI, comp)
          .then(response => {
              console.log('Saved');
              this.setState(prevState=>({
                Comp: [comp, ...prevState.Comp]
              }))
              console.log(response.data);

          });

    this.setState({
        Tech: '',
        Level:'',

    })
  }
  replaceModalItem(index) {
     this.setState({
       requiredItem: index
     });
   }
  componentDidMount() {
    axios.get('/fetchdataById/'+ this.state.EmpI)
      .then(response => {
        this.setState({ exercises: response.data, Comp: response.data.Competency })

      })
      .catch((error) => {
        console.log(error);
      })
  }


  render() {

    const Exercise = this.state.Comp.map((item, index) => {
      return (
        <tr key={index}>
        <td class="Agry  font-size-16">{item.Tech}</td>
        <td class="Agry font-size-16">{item.Level}</td>

          <td>
          <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
          onClick={() => this.setState({Tec: item.Tech, Lev: item.Level}) }>edit</button>
         </td>
        </tr>
      )
    });



    return (
      <div>
{this.state.Comp.length > 0 ? (
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Technology</th>
            <th>Competecny</th>
            <th>Action</th>
          </tr>
        </thead>
          <tbody>
            { Exercise }
          </tbody>
        </table>
) :
<div class="alert alert-warning alert-dismissible" role="alert">
  No Competecny Found.
  <br /> <br />
  Please add acquired competency from below
</div>
}

                <form onSubmit={this.onSubmit}><br/><br/>
                    <div class="form-group form-material row" data-plugin="formMaterial">



                      <div class="col-md-6">
                        <label class="form-control-label" for="inputGrid1">Technology</label>
                        <input type="text" required class="form-control" name="Tech" value={this.state.Tech} onChange={this.onChangeTech}/>
                      </div>
                      <div class="col-md-6">
                        <label class="form-control-label" for="inputGrid1">Competency</label>

                        <select name="Level" value={this.state.Level} onChange={this.onChangeLevel} class="form-control" required>
                <option disabled="disabled" value="">Choose</option>
                          <option value="E0">E0</option>
                          <option value="E1">E1</option>
                          <option value="E2">E2</option>

                        </select>
                      </div>
                      <div class="p-10">
                                          <button class="btn btn-primary btn-round submit float-right mr-10 waves-effect waves-light waves-round">
                                         <i class="fa fa-plus" aria-hidden="true"></i> Add
                                        </button>
                                      </div>

                </div>      </form>
                <Modal
                         Tech={this.state.Tec}
                         Level={this.state.Lev}

                       />

      </div>
    )
  }
}
