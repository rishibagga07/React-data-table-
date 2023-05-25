import React, { Component } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

export default class StudentAddForm extends Component {
    constructor () {
        
    }
  render() {
    return (<div>
      <div className="row ">
        <div>

        
        
        <div class="card text-center">
  <div class="card-header text-info">
    Add Student Details
  </div>
  <div class="card-body">
    

  <div class="form-group row m-3 p-3">
    <label for="textname" class="col-sm-2 col-form-label">Name</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="textname" placeholder="Enter Name"/>
    </div>
  </div>




  <div class="form-group row m-3 p-3 ">
    <label for="numage" class="col-sm-2 col-form-label">Age</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="numage" placeholder="Enter Age"/>
    </div>
  </div>





  <div class="form-group row m-3 p-3 ">
    <label for="textaddress" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="textaddress" placeholder="Enter Address"/>
    </div>
  </div>

   
  </div>
  <div class="card-footer text-muted ">
  <button className="btn btn-info  m-2 p-2" >Submit</button>
  </div>
  </div>
</div>



       




      </div>
      </div>
    );
  }
}


