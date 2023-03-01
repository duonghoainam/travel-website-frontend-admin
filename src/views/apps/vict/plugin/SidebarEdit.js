// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'
import Flatpickr from 'react-flatpickr'
import axios from 'axios'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
// import { date } from 'yup'
import { DateEnv } from '@fullcalendar/core'

const defaultValues = {
  email: '',
  is_active: false,
  full_name: '',
  dob: null,
  address: '',
  phone: '',
  username: '',
  password: '',
  role_name: ''
}

const roleOptions = [
  { label: 'admin', value: 1 },
  { label: 'enquiry', value: 3 },
  { label: 'reefer', value: 2 }
]

// const checkIsValid = data => {
//   console.log('data', data)
//   Object.values(data).every(field => console.log(field))
//   return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
// }

const SidebarEditUsers = ({ open, toggleSidebar, userid }) => {
  const [picker, setPicker] = useState(new Date())

  // ** States
  const [data, setData] = useState(null)

  // ** Store Vars=
 
  // ** Vars
  const {
    control,
    setValue,
    // setError,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await axios.get(`/api/v1/users/${userid}`)
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
          dob: new Date(`${tmpDate.getFullYear()}-${`0${tmpDate.getMonth() + 1}`.slice(-2)}-${`0${tmpDate.getDate()}`.slice(-2)}`),
          role_id: response.data.data.role_id,
          is_active: true
      })
    }
    fetchData()
  }, [userid])
  // ** Function to handle form submit
  const onSubmit = data => {
    console.log('data submit', data)
    setData(data)

    let tmpDate = new Date(data.dob[0])
    tmpDate = new Date(`${tmpDate.getFullYear()}-${`0${tmpDate.getMonth() + 1}`.slice(-2)}-${`0${tmpDate.getDate()}`.slice(-2)}`)
    console.log(tmpDate)
    // console.log(checkIsValid(data))
  //   if (checkIsValid(data)) {
  // console.log("valalalalaidddiidiid")

      toggleSidebar()
      async function getMe() {
        // You can await here
        let tmpDate = new Date(data.dob[0])
        tmpDate = new Date(`${tmpDate.getFullYear()}-${`0${tmpDate.getMonth() + 1}`.slice(-2)}-${`0${tmpDate.getDate()}`.slice(-2)}`)
        console.log(tmpDate)
        const response = await axios.get(`/api/v1/users/${row.id}`)
        console.log('getttttttt yseett', response)
          
        reset({
          email: response.data.data.email,
          full_name: response.data.data.full_name,
          phone: response.data.data.phone,
          address: response.data.data.address,
          role_name: response.data.data.role_name,
          dob: new Date(response.data.data.dob.substring(0, 10)),
          role_id: response.data.data.role_id,
          is_active: true
        })
      }
      getMe()
  //   } else {
  // console.log("nononnonnnnnono")

      for (const key in data) {
        if (data[key] === null) {
          setError('country', {
            type: 'manual'
          })
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
  //   }
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Edit User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
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
        </div>
        <div className='mb-1'>
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
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          <FormText color='muted'>You can use letters, numbers & periods</FormText>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='full_name'>
            User Name <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <Input id='username' placeholder='User name' invalid={errors.username && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='password'>
            Password <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input id='password' type='password' placeholder='password' invalid={errors.password && true} {...field} />
            )}
          />
        </div>

        <div className='mb-1'>
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
        </div>
        <div className='mb-1'>
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
        </div>
        <div className='mb-1'>
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
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='role_name'>
            Role <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='role_name'
            control={control}
            render={({ field }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix='select'
                options={roleOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.role_name === null })}
                {...field}
              />
            )}
          />
        </div>
        {/* <div className='mb-1' value={plan} onChange={e => setPlan(e.target.value)}>
          <Label className='form-label' for='select-plan'>
            Select Plan
          </Label>
          <Input type='select' id='select-plan' name='select-plan'>
            <option value='basic'>Basic</option>
            <option value='enterprise'>Enterprise</option>
            <option value='company'>Company</option>
            <option value='team'>Team</option>
          </Input>
        </div> */}
        <Button type='submit' className='me-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarEditUsers
