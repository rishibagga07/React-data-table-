import axios from "axios";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import DataTable from "react-data-table-component";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Document, Page } from "react-pdf";
import { autoTable } from "jspdf-autotable";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import FileSaver from "file-saver";
import download from "downloadjs";

class DataTableStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      StudentList: [{}],
      addStudent: [{}],
      editStudent: [{}],
      rowselect: [],
      openDialog: false,
    };
  }

  openDialog(row) {
    debugger;
    this.setState({ editStudent: row });
    this.setState({ openDialog: true });
  }

  CloseopenDialog() {
    this.setState({ openDialog: false });
  }

  async getAll() {
    await axios
      .get("https://localhost:44359/api/Student")
      .then((res) => {
        debugger;
        this.setState({ StudentList: res.data });
      })
      .catch((error) => {
        alert("Wrong With Api");
      });
  }

  async componentDidMount() {
    this.getAll();
  }

  handleDeleteRow = (id) => {
    alert(id);
    debugger;
    axios
      .delete(`https://localhost:44359/api/Student/` + id)
      .then((res) => {
        alert("Delete successfully");
        this.componentDidMount();
      })
      .catch((e) => {
        alert("Wrong With API");
      });
  };

  handleButtonClick = (state) => {
    console.log("clicked");
    console.log(state.target.id);
  };

  editModal(e) {
    debugger;

    console.log("e", e);
    this.setState({ editStudent: e });
    console.log("editstudent", this.state.editStudent);
  }

  editChangeHandler = (event) => {
    debugger;
    console.log("event.target.value", event);
    let name = event.target.name;
    console.log("name", name);
    let value = event.target.value;
    console.log("value", value);
    this.state.editStudent[name] = value;
    this.setState({ editStudent: this.state.editStudent });
  };

  addChangeHandler = (event) => {
    debugger;
    console.log("event.target.value", event);
    let name = event.target.name;
    console.log("name", name);
    let value = event.target.value;
    console.log("value", value);
    this.state.addStudent[name] = value;
    this.setState({ addStudent: this.state.addStudent });
  };

  // bulkeditChangeHandler = (event) => {
  //   debugger;

  //   console.log("bulkevent.target.value", event);
  //   let name = event.target.name;
  //   console.log("bulkname", name);
  //   let value = event.target.value;

  //   console.log("bulkvalue", value);
  //   this.state.editStudent[name] = [value];
  //   this.setState({ editStudent: this.state.editStudent });

  //   console.log("this.state.rowselect", this.state.editStudent);
  //   console.log("this.state.rowselect", this.state.rowselect);
  // };

  AddStudent = () => {
    debugger;
    const obj = {
      studentID: this.state.addStudent.studentID,
      studentName: this.state.addStudent.studentName,
      studentAge: this.state.addStudent.studentAge,
      studentAddress: this.state.addStudent.studentAddress,
    };
    console.log("this.state.StudentList", this.state.addStudent);
    axios
      .post("https://localhost:44359/api/Student", obj)
      .then((res) => {
        alert("Data Save Succefully");
        this.getAll();
      })
      .catch((e) => {
        alert("Wrong With API");
      });
  };

  updateStudent = () => {
    debugger;
    console.log("item", this.state.editStudent);
    axios
      .put("https://localhost:44359/api/Student", this.state.editStudent)
      .then((res) => {
        this.CloseopenDialog();
        this.getAll();
        alert("Update Successfully");
      })
      .catch((e) => {
        alert("Wrong With API");
      });
  };

  BulkupdateStudent = () => {
    debugger;

    console.log("this.state.editStudent", this.state.editStudent);

    let id = [];
    id = this.state.rowselect.map((r) => r.studentID);
    console.log("studentID", id);

    const obj = {
      studentID: id,
      studentName: this.state.editStudent.studentName,
      studentAge: this.state.editStudent.studentAge,
      studentAddress: this.state.editStudent.studentAddress,
    };

    console.log("item", this.state.rowselect);

    axios
      .put("https://localhost:44359/api/Student/BulkUpdateStudent", obj)
      .then((res) => {
        alert("Update Successfully");
        this.getAll();
      })
      .catch((e) => {
        alert("Wrong With API");
      });
  };

  onChangefilterName = async (e) => {
    debugger;

    console.log("e", e);
    var searchData = this.state.StudentList.filter((item) => {
      if (
        item.studentName
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return item;
      }
    });
    this.setState({ StudentList: searchData });
    if (e.target.value === "") this.getAll();
  };

  onChangefilterAddress = async (e) => {
    debugger;

    console.log("e", e);
    var searchData = this.state.StudentList.filter((item) => {
      if (
        item.studentAddress
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return item;
      }
    });
    this.setState({ StudentList: searchData });
    if (e.target.value === "") this.getAll();
  };

  onChangefilterAge = async (e) => {
    debugger;

    console.log("e", e);
    var searchData = this.state.StudentList.filter((item) => {
      if (
        item.studentAge
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return item;
      }
    });
    this.setState({ StudentList: searchData });
    if (e.target.value === "") this.getAll();
  };

  columns = [
    {
      name: (
        <div>
          Name
          <input
            type="text"
            placeholder="Name"
            // value={title}
            onChange={(e) => this.onChangefilterName(e)}
            style={{ width: "80%" }}
          />
        </div>
      ),
      selector: (row) => row.studentName,
      sortable: true,
      selectableRows: "studentID",
    },

    {
      name: (
        <div>
          Age
          <input
            type="number"
            placeholder="Age"
            // value={title}
            onChange={(e) => this.onChangefilterAge(e)}
            style={{ width: "80%" }}
          />
        </div>
      ),
      selector: (row) => row.studentAge,
      sortable: true,
    },
    {
      name: (
        <div>
          Address
          <input
            type="text"
            placeholder="Address"
            // value={title}
            onChange={(e) => this.onChangefilterAddress(e)}
            style={{ width: "75%" }}
          />
        </div>
      ),
      selector: (row) => row.studentAddress,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <span>
            <button
              onClick={() => this.editModal(row)}
              data-target="#editModal"
              data-toggle="modal"
              className="btn btn-info m-2 p-2"
            >
              Edit{" "}
            </button>
          </span>
          <span>
            <button
              onClick={() => this.handleDeleteRow(row.studentID)}
              className="btn btn-danger m-2 p-2 "
            >
              Delete
            </button>
          </span>
        </div>
      ),
    },
  ];

  //  const handleChange = (item) => {

  //   const isChecked = item.target.checked;
  //   const value = item.target.value;
  //   console.log( "isChecked ,  value" , isChecked ,  value);
  //  }

  // pdf

  MyPDF = () => {
    debugger;
    return (
      <Document>
        <Page>
          <h2>{this.state.rowselect}</h2>
          {console.log(this.state.rowselect)}
        </Page>
      </Document>
    );
  };

  ExpandableComponent = (props) => (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.data.studentName}</td>
            <td>{props.data.studentAge}</td>
            <td>{props.data.studentAddress}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  //  check box bind with row data
  handleChangebindwithcheckbox = (state) => {
    this.setState({ rowselect: state.selectedRows });
  };

  // bulkDeletet = async () => {
  //   debugger;

  //   let id = [];
  //   id = this.state.rowselect.map((r) => r.studentID);

  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete:\r ${this.state.rowselect.map(
  //         (r) => r.studentName
  //       )}?`
  //     )
  //   ) {
  //     for (let i = 0; i <= id.length; i++)
  //       await axios
  //         .delete(`https://localhost:44359/api/Student/` + [id[i]])
  //         .then((res) => {
  //           this.getAll();
  //         })
  //         .catch((e) => {});
  //   }
  // };


  
  // bulkDel = async () => {
  //   debugger;

  //   let id = [];
  //   id = this.state.rowselect.map((r) => r.studentID);

  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete:\r ${this.state.rowselect.map(
  //         (r) => r.studentName
  //       )}?`
  //     )
  //   ) {
      
  //       await axios
  //         .delete(`https://localhost:44359/api/Student/` + [id])
  //         .then((res) => {
  //           this.getAll();
  //         })
  //         .catch((e) => {});
  //   }
  // };




  bulkDelete = async () => {
    debugger;

    if (
      window.confirm(
        `Are you sure you want to delete:\r ${this.state.rowselect.map(
          (r) => r.studentName
        )}?`
      )
    ) {
      this.state.rowselect.map((r) =>
        axios
          .delete("https://localhost:44359/api/Student/" + r.studentID)
          .then((res) => {
            this.getAll();
          })
      );
    }
  };




  





  generatePDF = () => {
    debugger;
    const pdf = new jsPDF();

    const columns = ["Name", "Age", "Address"];

    const rows = [];
    this.state.rowselect.map((item) => {
      rows.push([item.studentName, item.studentAge, item.studentAddress]);
    });

    let currentPage = 0;
    let rowsPerPage = 5;
    let totalPages = Math.ceil(rows.length / rowsPerPage);

    for (let page = 0; page < totalPages; page++) {
      currentPage++;

      if (page > 0) {
        pdf.addPage();
      }

      pdf.autoTable(
        columns,
        rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
      );
    }

    // Download the PDF
    pdf.save("data-table.pdf");
  };


  saveAsPNG() {
    debugger;
    var element = document.getElementById("pic");
    html2canvas(element).then(function (canvas) {
      var imgData = canvas.toDataURL("image/png");

      var link = document.createElement("a");
      link.download = "image.png";
      link.href = imgData;
      link.click();
    });
  }

  

  render() {
    return (
      <div>
        <DataTable
          title={<h2 className="text-info m-5">Student List</h2>}
          columns={this.columns}
          data={this.state.StudentList}
          pagination
          onRowClicked={(e) => this.openDialog(e).bind(this)}
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="600px"
          selectableRows
          selectableRowsHighlight
          onSelectedRowsChange={this.handleChangebindwithcheckbox}
          // for pop up window bulk delete and bulk update
          contextActions={
            <div>
              <button
                data-target="#bulkeditModal"
                data-toggle="modal"
                className="btn btn-info m-2 p-2"
              >
                Edit
              </button>
              <button
                onClick={(e) => this.bulkDelete(e.id)}
                className="btn btn-danger m-2 p-2"
              >
                Delete
              </button>

              <button
                className="btn btn-success m-2 p-2 "
                onClick={() => this.generatePDF()}
              >
                Generate PDF
              </button>

              <button
                className="btn btn-secondary active m-2 p-2 "
                data-target="#png"
                data-toggle="modal"
              >
                Generate PNG
              </button>
            </div>
          }
          theme="yellow"
          expandableRows
          expandableRowsComponent={this.ExpandableComponent}
          subHeader
          subHeaderComponent={
            <div>
              <button
                className=" btn btn-info "
                data-toggle="modal"
                data-target="#addModal"
              >
                {" "}
                Add New Student{" "}
              </button>
            </div>
          }

          // subHeaderComponent={
          //   <input
          //     type="text"
          //     placeholder="Search Here"
          //     className="from-control w-25"
          //   ></input>
          // }
        />

        <Dialog open={this.state.openDialog} onEnter={console.log("hello")} 
        
        
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "700px",  // Set your width here
            },
          },
        }}


        
        >
          <DialogTitle>Edit Student</DialogTitle>

          <DialogContent>
            <div  >
              <div className="form-group row">
                <label htmlFor="textname" className="col-sm-4">
                  Name
                </label>

                <div className="col-sm-8">
                  <input
                    type="text"
                    id="textname"
                    value={this.state.editStudent.studentName}
                    name="studentName"
                    className="form-control"
                    onChange={this.editChangeHandler.bind(this)}
                  ></input>
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="numage" className="col-sm-4">
                  Age
                </label>

                <div className="col-sm-8">
                  <input
                    type="number"
                    id="numage"
                    value={this.state.editStudent.studentAge}
                    name="studentAge"
                    className="form-control"
                    onChange={this.editChangeHandler.bind(this)}
                  ></input>
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="textaddress" className="col-sm-4">
                  Address
                </label>

                <div className="col-sm-8">
                  <input
                    type="text"
                    id="textaddress"
                    value={this.state.editStudent.studentAddress}
                    name="studentAddress"
                    className="form-control"
                    onChange={this.editChangeHandler.bind(this)}
                  ></input>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={this.updateStudent}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={this.CloseopenDialog.bind(this)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* <button  data-toggle="modal" data-target="#editModal" className='btn btn-info m-2 p-2'>Edit </button> */}

        {/* EDIT MODAL */}
        <form>
          <div className="modal" id="editModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                {/* Header */}
                <div className="modal-header">
                  <div className="model-title "> Edit Student Detail</div>
                  <button className="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>

                {/* Body */}

                <div className="modal-body">
                  <div className="form-group row">
                    <label htmlFor="textname" className="col-sm-4">
                      Name
                    </label>

                    <div className="col-sm-8">
                      <input
                        type="text"
                        id="textname"
                        value={this.state.editStudent.studentName}
                        name="studentName"
                        className="form-control"
                        onChange={this.editChangeHandler.bind(this)}
                      ></input>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="numage" className="col-sm-4">
                      Age
                    </label>

                    <div className="col-sm-8">
                      <input
                        type="number"
                        id="numage"
                        value={this.state.editStudent.studentAge}
                        name="studentAge"
                        className="form-control"
                        onChange={this.editChangeHandler.bind(this)}
                      ></input>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="textaddress" className="col-sm-4">
                      Address
                    </label>

                    <div className="col-sm-8">
                      <input
                        type="text"
                        id="textaddress"
                        value={this.state.editStudent.studentAddress}
                        name="studentAddress"
                        className="form-control"
                        onChange={this.editChangeHandler.bind(this)}
                      ></input>
                    </div>
                  </div>

                  {/* footer */}

                  <div className="modal-footer">
                    <button
                      className="btn btn-primary"
                      onClick={this.updateStudent}
                    >
                      Update
                    </button>
                    <button className="btn btn-danger">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* BULK EDIT MODAL */}

        <form>
          <div className="modal" id="bulkeditModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                {/* Header */}
                <div className="modal-header">
                  <div className="model-title "> Edit Student Detail</div>
                  <button className="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>

                {/* Body */}

                <div className="modal-body">
                  <div className="form-group row">
                    <label htmlFor="textname" className="col-sm-4">
                      Name
                    </label>

                    <div className="col-sm-8">
                      <input
                        type="text"
                        id="textname"
                        //value={this.state.editStudent.studentName}
                        name="studentName"
                        className="form-control"
                        onChange={this.editChangeHandler.bind(this)}
                      ></input>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="numage" className="col-sm-4">
                      Age
                    </label>

                    <div className="col-sm-8">
                      <input
                        type="number"
                        id="numage"
                        // value={this.state.editStudent.studentAge}
                        name="studentAge"
                        className="form-control"
                        onChange={this.editChangeHandler.bind(this)}
                      ></input>
                    </div>

                    <div className="form-group row"></div>
                    <label htmlFor="textaddress" className="col-sm-4">
                      Address
                    </label>

                    <div className="col-sm-8">
                      <input
                        type="text"
                        id="textaddress"
                        //value={this.state.editStudent.studentAddress}
                        name="studentAddress"
                        className="form-control"
                        onChange={this.editChangeHandler.bind(this)}
                      ></input>
                    </div>
                  </div>

                  {/* footer */}

                  <div className="modal-footer">
                    <button
                      className="btn btn-primary"
                      onClick={this.BulkupdateStudent}
                      data-dismiss="modal"
                    >
                      Update
                    </button>
                    <button className="btn btn-danger">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* ADD MODAL */}
        <form>
          <div className="modal" id="addModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                {/* Header */}
                <div className="modal-header">
                  <div className="model-title "> Add New Student</div>
                  <button className="close" data-dismiss="modal">
                    <span>&times;</span>
                  </button>
                </div>

                {/* Body */}

                <div className="modal-body">
                  <div className="form-group row">
                    <label htmlFor="textname" className="col-sm-4">
                      Name
                    </label>

                    <div className="col-sm-8">
                      <input
                        type="text"
                        id="textname"
                        value={this.state.editStudent.studentName}
                        name="studentName"
                        className="form-control"
                        onChange={this.addChangeHandler}
                      ></input>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="numage" className="col-sm-4">
                      Age
                    </label>

                    <div className="col-sm-8">
                      <input
                        type="number"
                        id="numage"
                        value={this.state.editStudent.studentAge}
                        name="studentAge"
                        className="form-control"
                        onChange={this.addChangeHandler}
                      ></input>
                    </div>

                    <div className="form-group row"></div>
                    <label htmlFor="textaddress" className="col-sm-4">
                      Address
                    </label>

                    <div className="col-sm-8">
                      <input
                        type="text"
                        id="textaddress"
                        value={this.state.editStudent.studentAddress}
                        name="studentAddress"
                        className="form-control"
                        onChange={this.addChangeHandler}
                      ></input>
                    </div>
                  </div>

                  {/* footer */}

                  <div className="modal-footer">
                    <button
                      className="btn btn-primary"
                      onClick={this.AddStudent}
                    >
                      Save
                    </button>
                    <button className="btn btn-danger">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* card */}
        <form>
          <div  id="pic">
          
            <div className="card-body">
              <h5 className="card-title"></h5>
              {this.state.rowselect.length > 0 ?
              <table className="table table-striped">
              
                  <tr>
                    <th >Name</th>
                    <th>Age</th>
                    <th>Address</th>
                  </tr>
                  
               
                <tbody>
                  {this.state.rowselect.map((row) => (
                    <tr key={row.studentID}>
                      <td>{row.studentName}</td>
                      <td>{row.studentAge}</td>
                      <td>{row.studentAddress}</td>
                     
                    </tr>
                  ))}
                </tbody>
                
              </table> 
              : null}
            </div>
          </div>
        </form>

        {/* png modal */}
        <div>
          <div class="modal" id="png" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Generate Image</h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <table className="table table-striped">
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Address</th>
                    </tr>
                    <tbody>
                      {this.state.rowselect.map((row) => (
                        <tr key={row.studentID}>
                          <td>{row.studentName}</td>
                          <td>{row.studentAge}</td>
                          <td>{row.studentAddress}</td>
                          {console.log("row", row.studentName)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    onClick={this.saveAsPNG}
                  >
                    Generate PNG
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataTableStudent;
