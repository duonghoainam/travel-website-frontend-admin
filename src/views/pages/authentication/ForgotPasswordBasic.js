// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
// import toast from 'react-hot-toast'
// ** Icons Imports
import { ChevronLeft, Facebook, Twitter, Mail, GitHub, Coffee, X } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
const defaultValues = {
  loginEmail: ''
}

// const ToastContent = (message) => {
//   return (
//     <div className='d-flex'>
//       <div className='me-1'>
//         <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
//       </div>
//       <div className='d-flex flex-column'>
//         <div className='d-flex justify-content-between'>
//           <X size={12} className='cursor-pointer' onClick={() => toast.dismiss()} />
//         </div>
//         <span>{message}</span>
//       </div>
//     </div>
//   )
// }

const ForgotPasswordBasic = () => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = async data => {
    console.log(data.loginEmail)
      axios({
        method: 'post',
        url: 'api/v1/auth/forgot-password',
        headers: { 
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        data: (data.loginEmail)
      }).then(function (response) {
        console.log(JSON.stringify(response.data))
        // toast(() => (
        //   <ToastContent t={response.data.detail} />
        // ))
        navigate('/pages/login-basic')
      }).catch(function (error) {
        console.log(error)
      })
  
    // if (Object.values(data).every(field => field.length > 0)) {
    //   useJwt
    //     .resetpassword(data.loginEmail)
    //     .then(res => {
    //       console.log('res login', res)
    //       // const adminAbility = [{action: 'manage', subject: 'all'}]
    //       // const data = { ...res.data.userData, accessToken: res.data.data.token, refreshToken: res.data.refreshToken, ability: adminAbility }
    //       // dispatch(handleLogin(data))
    //       // ability.update(adminAbility)
    //       // navigate(getHomeRouteForLoggedInUser('admin'))
          
    //       // toast(t => (
    //       //   <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'John Doe'} />
    //       // ))
    //     })
    //     .catch(err => console.log(err))
    // } else {
    //   for (const key in data) {
    //     if (data[key].length === 0) {
    //       setError(key, {
    //         type: 'manual'
    //       })
    //     }
    //   }
    // }
  }
  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <svg viewBox='0 0 139 95' version='1.1' height='28'>
                <defs>
                  <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                    <stop stopColor='#000000' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                  <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                    <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                    <stop stopColor='#FFFFFF' offset='100%'></stop>
                  </linearGradient>
                </defs>
                <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                    <g id='Group' transform='translate(400.000000, 178.000000)'>
                      <path
                        d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                        id='Path'
                        className='text-primary'
                        style={{ fill: 'currentColor' }}
                      ></path>
                      <path
                        d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                        id='Path'
                        fill='url(#linearGradient-1)'
                        opacity='0.2'
                      ></path>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.049999997'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                      ></polygon>
                      <polygon
                        id='Path-2'
                        fill='#000000'
                        opacity='0.099999994'
                        points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                      ></polygon>
                      <polygon
                        id='Path-3'
                        fill='url(#linearGradient-2)'
                        opacity='0.099999994'
                        points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                      ></polygon>
                    </g>
                  </g>
                </g>
              </svg>
              <h2 className='brand-text text-primary ms-1'>Vuexy</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Forgot Password? 🔒
            </CardTitle>
            <CardText className='mb-2'>
              Enter your email and we'll send you instructions to reset your password
            </CardText>
            <Form className='auth-forgot-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='loginEmail'>
                  Email
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='john@example.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <Button type='submit' color='primary' block>
                Send reset link
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/pages/login-basic'>
                <ChevronLeft className='rotate-rtl me-25' size={14} />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPasswordBasic
