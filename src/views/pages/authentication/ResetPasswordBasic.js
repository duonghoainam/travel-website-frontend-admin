// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
// ** Icons Imports
import { ChevronLeft, Facebook, Twitter, Mail, GitHub, Coffee, X } from 'react-feather'
import themeConfig from '@configs/themeConfig'

// ** Custom Components
import InputPassword from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Button } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const defaultValues = {
  current_password: '',
  new_password: '',
  confirm_password: '' 
}
const ResetPasswordBasic = () => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = async data => {
    console.log(data)
      axios({
        method: 'post',
        url: 'api/v1/users/change-password',
        headers: { 
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        data: JSON.stringify(data)
      }).then(function (response) {
        console.log(JSON.stringify(response.data))
        // toast(() => (
        //   <ToastContent t={response.data.detail} />
        // ))
        navigate('/pages/login-basic')
      }).catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <span className='brand-logo'>
                <img src={themeConfig.app.appLogoImage} alt='logo' className='login-logo'/>
              </span>
              <h2 className='brand-text text-primary ms-1' style={{alignItems: 'center', display:'flex'}}>Yourtour</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Reset Password 🔒
            </CardTitle>
            <CardText className='mb-2'>Your new password must be different from previously used passwords</CardText>
            <Form className='auth-reset-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-1'>
                <Label className='form-label' for='current_password'>
                  Current Password
                </Label>
                <Controller 
                  id='current_password'
                  name='current_password'
                  control={control}
                  render={({ field }) => (
                    <InputPassword
                      autoFocus
                      invalid={errors.current_password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='new-password'>
                  New Password
                </Label>
                <Controller 
                  id='new_password'
                  name='new_password'
                  control={control}
                  render={({ field }) => (
                    <InputPassword
                      autoFocus
                      invalid={errors.new_password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='confirm_password'>
                  Confirm Password
                </Label>
                <Controller 
                  id='confirm_password'
                  name='confirm_password'
                  control={control}
                  render={({ field }) => (
                    <InputPassword
                      autoFocus
                      invalid={errors.confirm && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <Button type='submit' color='primary' block>
                Set New Password
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

export default ResetPasswordBasic
