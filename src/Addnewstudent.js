import React, { Component } from 'react'


export default class Addnewstudent extends Component {
  render() {
    return (
      <div>


<button  data-target="#editModal" data-toggle="modal" className='btn btn-info m-2 p-2'>Edit </button>

<form >
 
 <div className="modal" id="editModal" role="dialog" >
           <div className="modal-dialog">
             <div className="modal-content">
               {/* Header */}
               <div className="modal-header">
                 <div className="model-title"> Edit Role</div>
                 <button className="close" data-dismiss="modal">
                   <span>&times;</span>
                 </button>
               </div>
 
               {/* Body */}
 
               <div className="modal-body">
                 <div className="form-group row">
                   <label for="textname" className="col-sm-4">
                     Role
                   </label>
 
                   <div className="col-sm-8">
                     <input
                       type="text"
                       id="textname"
                       placeholder="Enter Department"
                       name="rolesName"
                       className="form-control"
                       
                     ></input>
                   </div>
                 </div>
 
                 {/* footer */}
 
                 <div className="modal-footer">
                   <button className="btn btn-primary" >
                     Update
                   </button>
                   <button className="btn btn-danger">Cancel</button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </form> 



      </div>
    )
  }
}
