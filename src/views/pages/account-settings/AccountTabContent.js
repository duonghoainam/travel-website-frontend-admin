// ** React Imports
import { Fragment, useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
import axios from 'axios'
import jwtDefaultConfig from '../../../@core/auth/jwt/jwtDefaultConfig'
// ** Third Party Components
import Select from 'react-select'
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'
import Flatpickr from 'react-flatpickr'

// ** Reactstrap Imports
import { Row, Col, Form, Card, Input, Label, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'

// ** Utils
// import { selectThemeColors } from '@utils'

// ** Demo Components
import DeleteAccount from './DeleteAccount'
// import { getUserMe } from '../../apps/user/store'

const AccountTabs = ({ }) => {
  // const dispatch = useDispatch()
  // ** Hooks
  const defaultValues = {
    email: '',
    is_active: false,
    full_name: '',
    dob: null,
    address: '',
    phone: '',
    // password: '',
    role_name: ''
  }
  // const roleOptions = [
  //   { label: 'Admin', value: 'admin'},
  //   { label: 'Enquiry', value: 'enquiry' },
  //   { label: 'Reefer', value: 'reefer' }
  // ]
  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** States
  const [avatar, setAvatar] = useState(require('@src/assets/images/avatars/avatar-blank.png').default)
  const [picker, setPicker] = useState(new Date())

   // ** Get data on mount
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await axios.get('/api/v1/users/me')
      // console.log(new Date(response.data.data.dob.substring(0, 10)))
      
      console.log(response)
      const tmpDate = new Date(response.data.data.dob)

      if (response.data.data.avatar_url) setAvatar(`${jwtDefaultConfig.endPoint}${response.data.data.avatar_url}`)
      
      reset({
        email: response.data.data.email,
        full_name: response.data.data.full_name,
        phone: response.data.data.phone,
        address: response.data.data.address,
        role_name: response.data.data.role_name,
        dob: new Date(`${tmpDate.getFullYear()}-${`0${tmpDate.getMonth() + 1}`.slice(-2)}-${`0${tmpDate.getDate()}`.slice(-2)}`)
      })
    }
    fetchData()
  }, [])
  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])

    const formData = new FormData()
    formData.append(`file`, files[0])

    async function updateAvatar() {
      const response = await axios.post('/api/v1/users/update-avatar', formData)
      console.log('updatteed ava', response)
    }
    updateAvatar()
  }

  const onSubmit = data => {
    console.log('account detail data', data)
    // if (Object.values(data).every(field => field.length > 0)) {
    //   return null
    // } else {
    
    // }
    async function updateMe() {
      // You can await here
      let tmpDate = new Date(data.dob[0])
      tmpDate = new Date(`${tmpDate.getFullYear()}-${`0${tmpDate.getMonth() + 1}`.slice(-2)}-${`0${tmpDate.getDate()}`.slice(-2)}`)
      console.log(tmpDate)
      const response = await axios.patch('/api/v1/users/me', {
        full_name: data.full_name,
        phone: data.phone,
        address: data.address,
        dob: tmpDate
      })
      console.log('updattee', response)
        
      reset({
        email: response.data.data.email,
        full_name: response.data.data.full_name,
        phone: response.data.data.phone,
        address: response.data.data.address,
        role_name: response.data.data.role_name,
        dob: new Date(response.data.data.dob.substring(0, 10))
      })
    }
    updateMe()

    for (const key in data) {
      if (data[key] === null || data[key].length === 0) {
        // console.log(data[key])
        setError(key, {
          type: 'manual'
        })
      }
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Profile Details</CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>
          <div className='d-flex'>
            <div className='me-25'>
              <img className='rounded me-50' src={avatar} alt='Generic placeholder image' height='100' width='100' />
            </div>
            <div className='d-flex align-items-end mt-75 ms-1'>
              <div>
                <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                  Upload
                  <Input type='file' onChange={onChange} hidden accept='image/*' />
                </Button>
                <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
              </div>
            </div>
          </div>
          <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='full_name'>
                  Full Name <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='full_name'
                  control={control}
                  render={({ field }) => (
                    <Input id='full_name' placeholder='Full name' invalid={errors.full_name && true} {...field} />
                  )}
                />
                {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='userEmail'>
                  Email <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input
                      type='email'
                      id='userEmail'
                      placeholder='example@example.com'
                      disabled={true}
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col sm='6' className='mb-1'>

                <Label className='form-label' for='role_name'>
                  Role <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='role_name'
                  control={control}
                  disable={true}
                  render={({ field }) => (
                    // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                    <Input id='role_name' disabled={true} placeholder='Role' {...field} />
                  )}
                />
                {/* {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}  */}

                {/* <Label className='form-label' for='userEmail'>
                  Role <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='role_name'
                  control={control}
                  render={({ field }) => (
                    <Input
                      type='email'
                      id='userEmail'
                      placeholder='example@example.com'
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>} */}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='phone'>
                  Phone <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field }) => (
                    <Input id='phone' placeholder='(xxx) xxx-xxxx' invalid={errors.phone && true} {...field} />
                  )}
                />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='address'>
                  Address <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='address'
                  control={control}
                  render={({ field }) => (
                    <Input id='address' placeholder='address' invalid={errors.address && true} {...field} />
                  )}
                />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='dob'>
                  Date of birth
                </Label>
                <Controller
                  name='dob'
                  control={control}
                  render={({ field }) => (
                    <Flatpickr 
                      // value={picker}
                      className='form-control'
                      onChange={date => {
                        console.log(date)
                        setPicker(date[0])
                        console.log(picker)
                      }}
                      options={{
                        altInput: true,
                        altFormat: 'F j, Y',
                        dateFormat: 'Y-m-d'
                      }}
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col className='mt-2' sm='12'>
                <Button type='submit' className='me-1' color='primary'>
                  Save changes
                </Button>
                <Button color='secondary' outline onClick={() => { 
                      reset({
                      email: '',
                      is_active: false,
                      full_name: '',
                      dob: Date.now(),
                      address: '',
                      phone: '',
                      // password: '',
                      role_name: ''}) 
                    }}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default AccountTabs
