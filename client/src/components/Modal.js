import React, { Component } from 'react';
import axios from 'axios';


export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeLevel = this.onChangeLevel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
	const forwardEmpId = localStorage.getItem("EmpId");


    this.state = {
      Tech: "",
      Level:"",
      Emp : forwardEmpId
    }
  }


      componentWillReceiveProps(nextProps) {
          this.setState({
              Tech: nextProps.Tech,
              Level: nextProps.Level,
          });
      }

  onChangeLevel(e) {
    this.setState({
      Level: e.target.value
    })
  }



  onSubmit(e) {
    e.preventDefault();

    const up = {
      Tech: this.state.Tech,
      Level: this.state.Level
    }

    console.log(up);

    axios.post('/update/'+this.state.Emp, up)
      .then(res => console.log(res.data));

 window.location = '/profile';
  }


  render() {

    return (
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-simple modal-center">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-Tech" id="exampleModalLabel">Edit Competency</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">x</span>
                      </button>
                  </div>

                  <div class="modal-body">
                                              <div class="row">


                        <form onSubmit={this.onSubmit}>
                        <div class="panel-body">
                         <div class="form-group form-material row" data-plugin="formMaterial">
                                                  <div class="col-md-6">
                                                  <label class="form-control-label" for="inputGrid1">Technology</label>
                                                  <input type="text" required class="form-control" name="Tech" value={this.state.Tech} disabled/>
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

                                          </div>    <div class="col-md-12 float-right">
                                                  <button type="submit" value="Edit Exercise Log" className="btn btn-primary" > Update </button>
                                            </div>  </div>  </form></div>
                                            </div>










              </div>
          </div>
      </div>
    )
  }
}
