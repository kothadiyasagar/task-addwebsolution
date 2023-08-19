

import {
    Box,
    TextField,
    FormControl, FormGroup, Input, InputLabel, Typography, styled, MenuItem
} from '@mui/material';
import { useForm, } from 'react-hook-form';
import { object, string, } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import { API } from '../../Api/api';
import { AddStudent, EditStudent, UserSignup } from '../../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { Fab, Select } from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
const Container = styled(FormGroup)`
      width:50%;
      margin: 15% auto  0 auto  ;
      &> div {
          margin-top:20px
      }`
const registerSchema = object({
    firstname: string()
        .nonempty('First Name is required')
        .max(32, 'First Name must be less than 100 characters'),
    lastname: string()
        .nonempty('Last Name is required')
        .max(32, 'Last Name must be less than 100 characters'),
    email: string().nonempty('Email is required').email('Email is invalid'),
    address: string()
        .nonempty('Address is required'),
    number: string().nonempty('Number is required').max(10, 'number must be less than 10 digit'),
    country: string().nonempty('Number is required')


})

const StudentRegistrationFrom = ({ studentRegistrationProps = false, editRegistration = null, defaultValues = {
    firstname: "",
    lastname: "",
    address: "",
    number: "",
    email: "",
    dob: "",
    img: "",
    gender: "",
    country: "",
    img: ""
}, handleEditClose }) => {
    console.log(editRegistration, " editRegistration)")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const students = useSelector((state) => state?.student?.student)
    const [selectedGender, setSelectedGender] = useState('');

    const [images, setImages] = useState([]);
    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
        control
    } = useForm({
        resolver: zodResolver(registerSchema), defaultValues
    });
    console.log(errors)
    useEffect(() => {
        if (!editRegistration) return

        setSelectedGender(defaultValues.gender)
        setValue(defaultValues.dob)
        setImages(defaultValues.img)

    }, [editRegistration])
    const [value, setValue] = useState('');


    useEffect(() => {
        if (isSubmitSuccessful) {
            // reset();
        }

    }, [isSubmitSuccessful]);

    const onSubmitHandler = async (values) => {

        if (!editRegistration) {
            const formattedDate = dayjs(value).format('DD/MM/YYYY');
            const data = { ...values, gender: selectedGender, img: images, id: uuid().slice(0, 8), dob: formattedDate }

            try {
                const respon = await API.post("/student", data)
                if (respon.data) {
                    dispatch(AddStudent(respon.data))
                    navigate("/view-students")
                }
            }
            catch (error) {
                console.log(error.message)
            }
        }
        else {
            const formattedDate = dayjs(value).format('DD/MM/YYYY') || value;
            const data = { ...values, gender: selectedGender, img: images, id: editRegistration, dob: formattedDate }
            try {
                const respon = await API.patch(`/student/:${editRegistration}`, data)
                if (respon.data) {
                    dispatch(EditStudent(respon.data))
                    handleEditClose()
                }
            }
            catch (error) {
                console.log(error.message)
            }

        }
    };

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const handleFileUpload = (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        file: files[i],
                        previewUrl: e.target.result,
                    },
                ]);
            };
            reader.readAsDataURL(files[i]);
        }
    };
    return (

        <Container>
            <Typography variant="h4">{`${studentRegistrationProps ? "Register" : "Edit Student Infromation"}`}</Typography>
            <Box
                component='form'
                noValidate
                style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px", paddingBottom: "50px" }}
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <TextField
                    label='First Name'
                    fullWidth
                    required
                    error={!!errors['firstname']}
                    helperText={errors['firstname'] ? errors['firstname'].message : ''}
                    {...register('firstname')}

                />


                <TextField
                    label='Last Name'
                    fullWidth
                    required
                    error={!!errors['lastname']}
                    helperText={errors['lastname'] ? errors['lastname'].message : ''}
                    {...register('lastname')}
                />


                <TextField
                    sx={{ mb: 2 }}
                    label='Email'
                    fullWidth
                    required
                    type='email'
                    error={!!errors['email']}
                    helperText={errors['email'] ? errors['email'].message : ''}
                    {...register('email')}
                />


                <TextField
                    sx={{ mb: 2 }}
                    multiline
                    rows={2}
                    maxRows={4}
                    label="address"
                    fullWidth
                    required
                    error={!!errors['address']}
                    helperText={errors['address'] ? errors['address'].message : ''}
                    {...register('address')}
                />



                <TextField
                    sx={{ mb: 2 }}
                    label='Phone Number'
                    fullWidth
                    required
                    type='number'
                    error={!!errors['number']}
                    helperText={errors['number'] ? errors['number'].message : ''}
                    {...register('number')}
                />
                <Select
                    defaultValue={`${defaultValues.country ? defaultValues.country : "India"}`}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="country"
                    {...register('country')}
                >
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="Us">Us</MenuItem>
                </Select>


                <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                label="DOB"
                                value={value || defaultValues.dob}
                                onChange={(newValue) => setValue(newValue)}

                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </FormControl>
                <FormControl>
                    <Typography variant="h7">Gender</Typography>
                    <div>

                        <label>
                            <input
                                type="radio"
                                value="male"
                                checked={selectedGender === 'male'}
                                onChange={handleGenderChange}
                            />
                            Male
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="female"
                                checked={selectedGender === 'female'}
                                onChange={handleGenderChange}
                            />
                            Female
                        </label>
                    </div>
                    <FormControl>
                        <Typography style={{ marginTop: "20px" }} variant="h7"> Photos</Typography>
                        <label htmlFor="upload-photo">
                            <input
                                style={{ display: "none" }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                multiple

                                onChange={handleFileUpload}
                            />
                            <Fab
                                color="secondary"
                                size="small"
                                component="span"
                                aria-label="add"
                                variant="extended"
                            >
                                Upload photo
                            </Fab>
                        </label>

                    </FormControl>
                </FormControl>

                <LoadingButton
                    variant='contained'
                    fullWidth
                    type='submit'
                    loading={loading}
                    sx={{ py: '0.8rem', mt: '1rem' }} onClick={handleSubmit}>{`${studentRegistrationProps ? "Register" : "Edit Student Submit"}`}</LoadingButton>


            </Box>
        </Container>

    );
};

export default StudentRegistrationFrom;



