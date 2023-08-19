import {
  Box,
  FormControlLabel,
  FormHelperText,
  TextField,
  Typography,
  Button
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Checkbox from '@mui/material/Checkbox';
import {  FormGroup,styled, } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { API } from '../../Api/api';
import { useDispatch } from 'react-redux';
import { UserSignup } from '../../Redux/action';
const Container = styled(FormGroup)`
    width:50%;
    margin: 10% auto  0 auto;
    &> div {
        margin-top:20px
    }`
const registerSchema = object({
  name: string()
    .nonempty('Name is required')
    .max(32, 'Name must be less than 100 characters'),
  email: string().nonempty('Email is required').email('Email is invalid'),
  password: string()
    .nonempty('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().nonempty('Please confirm your password'),
  terms: literal(true, {
    invalid_type_error: 'Accept Terms is required',
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});



const Signup = () => {
  const [loading, setLoading] = useState(false);
  const dispatch =  useDispatch()
const navigate = useNavigate()
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      // reset();
    }
  
  }, [isSubmitSuccessful]);

  const onSubmitHandler = async(values) => {
    try{
      const respon = await API.post("/user/signup",values)
      if(respon.data){
        dispatch(UserSignup(respon.data))
        navigate("/")
      }
    }
    catch(error){
      console.log(error.message)
    }
 
   
  };
  console.log(errors);

  return (
<>  <Container>
    <Box sx={{}}>
      <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
      Signup
      </Typography>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <TextField
          sx={{ mb: 2 }}
          label='Name'
          fullWidth
          required
          error={!!errors['name']}
          helperText={errors['name'] ? errors['name'].message : ''}
          {...register('name')}
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
          label='Password'
          fullWidth
          required
          type='password'
          error={!!errors['password']}
          helperText={errors['password'] ? errors['password'].message : ''}
          {...register('password')}
        />
        <TextField
          sx={{ mb: 2 }}
          label='Confirm Password'
          fullWidth
          required
          type='password'
          error={!!errors['passwordConfirm']}
          helperText={
            errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''
          }
          {...register('passwordConfirm')}
        />

        <FormGroup>
          <FormControlLabel
            control={<Checkbox required />}
            {...register('terms')}
            label={
              <Typography color={errors['terms'] ? 'error' : 'inherit'}>
                Accept Terms and Conditions
              </Typography>
            }
          />
          <FormHelperText error={!!errors['terms']}>
            {errors['terms'] ? errors['terms'].message : ''}
          </FormHelperText>
        </FormGroup>
        <Button onClick={()=>navigate("/login")}>
        Already have an account? Sign in
              </Button>
        <LoadingButton
          variant='contained'
          fullWidth
          type='submit'
          loading={loading}
          sx={{ py: '0.8rem', mt: '1rem' }}
        >
          Signup
        </LoadingButton>
      </Box>
    </Box>
    </Container></>
  );
};

export default Signup;

