
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled, Button, Modal, Box, Typography } from "@mui/material"
import { DeleteStudent, GetStudent } from '../../Redux/action';
import StudentRegistrationFrom from '../../comopent/StudentRegistrationFrom/StudentRegistrationFrom';
import { API } from '../../Api/api';


const StyledTable = styled(Table)`
    width:90%;
    margin: 150px auto  0 auto;
    
`
const THead = styled(TableRow)`
    background:#000000;
    & > th {
        color : #ffff;
       font-size:20px;
    }
`
const TBody = styled(TableRow)`
  &> td {
    font-size:20px;
  }
 `

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};

const ShowStudent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const students = useSelector((state) => state?.student?.student)
    const [deleteItem, setdeleteItem] = React.useState(false);
    const [editStudent, seteditStudent] = React.useState(false);
    const [editStudentdataId, seteditStudentdataId] = React.useState(null);
    const [defaultData, setdefaultData] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const handledeleteItem = (id) => {
        setDeleteId(id)
        setdeleteItem(true)
    };
    const handeleOpenEdit = (id) => {
        seteditStudentdataId(id)
        const studentFilterData = students.find((elem) => elem.id === id)
        console.log(studentFilterData, "studentFilterData")
        setdefaultData({
            firstname: studentFilterData?.firstname,
            lastname: studentFilterData?.lastname,
            address: studentFilterData?.address,
            number: studentFilterData?.number,
            email: studentFilterData?.email,
            dob: studentFilterData?.dob,
            img: studentFilterData.img,
            gender: studentFilterData.gender,
            country: studentFilterData?.country,
            id: studentFilterData?.id
        })

        seteditStudent(true)
    }
    const handleClose = () => setdeleteItem(false);
    const handleEditClose = () => seteditStudent(false)
    const studentDelete = async () => {

        try {
            const respon = await API.delete(`/student/:${deleteId}`)
            if (respon.data) {
                await dispatch(DeleteStudent(deleteId))
                handleClose()
            }
        }
        catch (error) {
            console.log(error.message)
        }

    
    }
    const  getData = async() =>{

        try {
            const respon = await API.get(`/student/`)
            if (respon.data) {
                await dispatch(GetStudent())
          
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=>{
       getData()
    },[])
    return (
        <>
            <Modal
                open={deleteItem}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are Sure you want to delete this student information ?
                    </Typography>
                    <Button type='submit' variant="outlined" onClick={() => {
                        studentDelete()
                    }}
                        color="error" >Delete </Button>
                </Box>
            </Modal>

            <Modal
                open={editStudent}
                onClose={handleEditClose}

                style={{ overflow: "scroll", margin: "auto", marginTop: "0px" }}
            >
                <Paper sx={styleBox} style={{ background: "white", paddingTop: "100PX" }}>
                    <StudentRegistrationFrom studentRegistrationProps={false} editRegistration={editStudentdataId} defaultValues={defaultData} handleEditClose={handleEditClose} />
                </Paper>
            </Modal>
            <StyledTable >

                <TableHead>
                    <THead>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>DOB</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>phone No</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </THead>
                </TableHead>
                {students ? <TableBody>
                    {
                        students.map((elem, index) => (
                            <TBody key={elem.id}>

                                <TableCell>{`${elem?.firstname} ${elem?.lastname}`}</TableCell>
                                <TableCell>{elem?.email}</TableCell>
                                <TableCell>{elem?.dob}</TableCell>
                                <TableCell>{elem?.gender}</TableCell>
                                <TableCell>{elem?.number}</TableCell>

                                <TableCell>{elem.country}</TableCell>
                                <TableCell>     <Button type='submit' variant="contained" onClick={() => {
                                    handeleOpenEdit(elem.id)

                                }}  >edit</Button></TableCell>
                                <TableCell><Button type='submit' variant="outlined" onClick={() => {
                                    handledeleteItem(elem.id)
                                }}
                                    color="error" >Delete </Button></TableCell>

                            </TBody>
                        ))
                    }
                </TableBody> : "...loding"}


            </StyledTable>
        </>


    );
}

export default ShowStudent





