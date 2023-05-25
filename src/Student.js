import axios from "axios";
import MaterialReactTable from 'material-react-table';

import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, IconButton, Typography } from '@mui/material';
import React from "react";
import { Delete, Edit } from "@mui/icons-material";
//  import 'react-table/react-table.css'

class Student extends React.Component {
  constructor() {
    super();
    this.state = {
      StudentList: [{}],
      loadding : true
    };
  }

//   async getUsersData() {
//     debugger;
//     const res = await axios.get("https://localhost:44362/api/Student");
//     console.log("Check Data", res.data);

//     this.setState({ loading: false, StudentList: res.data });
//   }



handleEdit = (updatedData) => {
    axios.put('/api/data', updatedData)
      .then(res => {
        this.setState({StudentList: res.data});
      })
      .catch(err => {
        console.log(err);
      });
  }



  async componentDidMount() {
    

    await axios
      .get("https://localhost:44362/api/Student")
      .then((res) => {
        debugger;
        this.setState({ loadding : false ,  StudentList: res.data });
    console.log("resdata" , res.data)
    console.log("fgkjdhfkj",this.state);
    console.log("StudentList", this.state.StudentList);
    })
      .catch((error) => {
        alert("Wrong With Api");
      });
  }

 

  render() {


    
    const columns = [
    //   {
    //     Header: "ID",
    //     accessorKey: "studentID",
    
        
    //   },
      {
        Header: "Name",
        accessorKey: "studentName",
        enableSorting: true
        
      },

      {
        Header: "Age",
        accessorKey: "studentAge",
      },
      {
        Header: "Address",
        accessorKey: "studentAddress",
      },
    ];

    return <MaterialReactTable
    columns={columns}
    data={this.state.StudentList}
   enableSorting={false}
  
  // initialState={{ density: 'compact' }}
    enableColumnOrdering
    enableRowSelection 
    enableExpanding
    enableRowActions
    enableEditing={true}  
    editingMode="row"
    onEditingRowSave={this.handleEdit}


    
    
   // enableExpandAll
   // enableGlobalFilter={false}
   



    

    renderDetailPanel={({ row }) => (
        <Box
          sx={{
            display: 'grid',
            margin: 'auto',
            gridTemplateColumns: '1fr 1fr',
            width: '100%',
          }}
        >
          <Typography>Name: {row.original.studentName}</Typography>
          <Typography>Age: {row.original.studentAge}</Typography>
          <Typography>Address: {row.original.studentAddress}</Typography>
          
        </Box>
      )}


      renderRowActions={(row, index) => (
        <Box>
          <IconButton onClick={() => alert ("ldhfsudfhsjdfusdh") }>
           
            <Edit/>

          </IconButton>
          <IconButton onClick={() => console.info('Delete')}>
           
            <Delete/>
          </IconButton>
        </Box>
      )}

     
      

    /> ;
  }
}

export default Student;
