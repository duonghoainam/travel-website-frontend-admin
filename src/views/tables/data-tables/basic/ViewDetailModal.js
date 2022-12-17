// ** React Imports
import {Fragment } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Check } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText, Card, CardHeader, CardTitle, CardBody, Form, FormFeedback  } from 'reactstrap'

// ** Third Party Components
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Custom Components
import Avatar from '@components/avatar'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const ViewDetailModal = ({ open, handleModal }) => {

    const SignupSchema = yup.object().shape({
        email: yup.string().email().required(),
        lastName: yup.string().min(3).required(),
        firstName: yup.string().min(3).required(),
        password: yup.string().min(6).required()
      })
    
      // ** Hooks
      const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
      } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    
      const onSubmit = data => {
        if (Object.values(data).every(field => field.length > 0)) {
          toast(
            <div className='d-flex'>
              <div className='me-1'>
                <Avatar size='sm' color='success' icon={<Check size={12} />} />
              </div>
              <div className='d-flex flex-column'>
                <h6>Form Submitted!</h6>
                <ul className='list-unstyled mb-0'>
                  <li>
                    <strong>firstName</strong>: {data.firstName}
                  </li>
                  <li>
                    <strong>lastName</strong>: {data.lastName}
                  </li>
                  <li>
                    <strong>email</strong>: {data.email}
                  </li>
                  <li>
                    <strong>password</strong>: {data.password}
                  </li>
                </ul>
              </div>
            </div>
          )
        }
      }
    
      const handleReset = () => {
        reset({
          email: '',
          password: '',
          firstName: '',
          lastName: ''
        })
      }
  // ** State
//   const [Picker, setPicker] = useState(new Date())

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  return (
    // <Modal
    //   isOpen={open}
    //   toggle={handleModal}
    //   className='sidebar-sm'
    //   modalClassName='modal-slide-in'
    //   contentClassName='pt-0'
    // >
    //   <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
    //     <h5 className='modal-title'>New Record</h5>
    //   </ModalHeader>
    //   <ModalBody className='flex-grow-1'>
    //     <div className='mb-1'>
    //       <Label className='form-label' for='full-name'>
    //         Full Name
    //       </Label>
    //       <InputGroup>
    //         <InputGroupText>
    //           <User size={15} />
    //         </InputGroupText>
    //         <Input id='full-name' placeholder='Bruce Wayne' />
    //       </InputGroup>
    //     </div>
    //     <div className='mb-1'>
    //       <Label className='form-label' for='post'>
    //         Post
    //       </Label>
    //       <InputGroup>
    //         <InputGroupText>
    //           <Briefcase size={15} />
    //         </InputGroupText>
    //         <Input id='post' placeholder='Web Developer' />
    //       </InputGroup>
    //     </div>
    //     <div className='mb-1'>
    //       <Label className='form-label' for='email'>
    //         Email
    //       </Label>
    //       <InputGroup>
    //         <InputGroupText>
    //           <Mail size={15} />
    //         </InputGroupText>
    //         <Input type='email' id='email' placeholder='brucewayne@email.com' />
    //       </InputGroup>
    //     </div>
    //     <div className='mb-1'>
    //       <Label className='form-label' for='joining-date'>
    //         Joining Date
    //       </Label>
    //       <InputGroup>
    //         <InputGroupText>
    //           <Calendar size={15} />
    //         </InputGroupText>
    //         <Flatpickr className='form-control' id='joining-date' value={Picker} onChange={date => setPicker(date)} />
    //       </InputGroup>
    //     </div>
    //     <div className='mb-1'>
    //       <Label className='form-label' for='salary'>
    //         Salary
    //       </Label>
    //       <InputGroup>
    //         <InputGroupText>
    //           <DollarSign size={15} />
    //         </InputGroupText>
    //         <Input type='number' id='salary' />
    //       </InputGroup>
    //     </div>
    //     <Button className='me-1' color='primary' onClick={handleModal}>
    //       Submit
    //     </Button>
    //     <Button color='secondary' onClick={handleModal} outline>
    //       Cancel
    //     </Button>
    //   </ModalBody>
    // </Modal>
    <Modal
        isOpen={open}
        toggle={handleModal}
        className='sidebar-sm'
        modalClassName='modal-slide-in'
        contentClassName='pt-0'
    >
    <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
      <h5 className='modal-title'>New Record</h5>
    </ModalHeader>
    <ModalBody className='flex-grow-1'>
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Validation Schema With OnChange</CardTitle>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-1'>
                    <Label className='form-label' for='firstName'>
                    First Name
                    </Label>
                    <Controller
                    id='firstName'
                    name='firstName'
                    defaultValue=''
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='Bruce' invalid={errors.firstName && true} />}
                    />
                    {errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='lastName'>
                    Last Name
                    </Label>
                    <Controller
                    id='lastName'
                    name='lastName'
                    defaultValue=''
                    control={control}
                    render={({ field }) => <Input {...field} placeholder='Wayne' invalid={errors.lastName && true} />}
                    />
                    {errors.lastName && <FormFeedback>{errors.lastName.message}</FormFeedback>}
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='email'>
                    Email
                    </Label>
                    <Controller
                    id='email'
                    name='email'
                    defaultValue=''
                    control={control}
                    render={({ field }) => (
                        <Input {...field} type='email' placeholder='bruce.wayne@email.com' invalid={errors.email && true} />
                    )}
                    />
                    {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='password'>
                    Password
                    </Label>
                    <Controller
                    id='password'
                    name='password'
                    defaultValue=''
                    control={control}
                    render={({ field }) => (
                        <Input {...field} type='password' placeholder='Password' invalid={errors.password && true} />
                    )}
                    />
                    {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                </div>
                <div className='d-flex'>
                    <Button className='me-1' color='primary' type='submit'>
                    Submit
                    </Button>
                    <Button outline color='secondary' type='reset' onClick={handleReset}>
                    Reset
                    </Button>
                </div>
                </Form>
            </CardBody>
        </Card>
    </ModalBody>
    </Modal>
  )
}

export default ViewDetailModal
