import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import classroomService from '../../services/classroom-service';
import { Button } from 'react-bootstrap';
import  Select from 'react-select';
import { Redirect } from 'react-router-dom';

const validations = {
  title: (value) => {
  let message;
  if(!value){
    message = 'Enter new title or the previous one will remain'
  }
  return message;
},
  accountPay: (value) => {
  let message;
  if(!value){
    message = 'Enter some account number pay or the previous one will remain'
  }
  return message;
}}



class EditClassroom extends Component{

  state = {
    disabled: true,
    classroom: {
      students: [],
      title: this.props.classroom.title,
      accountPay: this.props.classroom.accountPay
    },
    errors: {
      title: validations.title(),
      accountPay: validations.accountPay()
    },
    studentSelected:[],
    touch: {},
    students:[],
    redirect: false

  }

  handleChange = (event) => {

    const { name, value } = event.target;

    this.setState({ 
      classroom: {
        ...this.state.classroom,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      },
      disabled: false
    })
  }

  handleBlur = (e) => {
    this.setState({
      touch: {
        ...this.state.touch,
        [e.target.name]: true
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    classroomService.editClassroom(this.props.classroom.id, this.state.classroom)
    .then(this.setState({ redirect: true}))
  }

  componentDidMount(){
    const opt = this.props.classroom.students
      .map(student => { return { value: student.id, label: student.name } })
    this.setState({
       students: opt}
    )
  }

  handleStudentSelect = (studentSelected) => {
    const values = studentSelected.map(stu => stu.value);
    this.setState({ studentSelected: values });

    const resultStudents = this.props.classroom.students.filter(option => 
      !values.some(values => option.id === values))
    const idResultStudent = resultStudents.map( stu => stu.id)
    this.setState({ classroom: { students: idResultStudent}, disabled: false})
  }

  render(){
    const { disabled, studentSelected, touch, errors, students, redirect } = this.state
    const value = studentSelected && studentSelected.value;

    if(redirect){
      return <Redirect to="./home"/>
    }
    return(
      <div className="container-editClassroom">
        <h1>Edit your classroom "{this.props.classroom.title}"</h1>
        
        <div className="mt-4">
          <label htmlFor="studentSelector" className="text-info">Select students for delete to this classroom</label>
          <Select
          id="studentSelector"
          className="mt-2"
          value={value}
          onChange={this.handleStudentSelect}
          options={students}
          isMulti
          />
        </div>
        <div className="mt-4">
          <label htmlFor="titleClassroom" className="text-info">Classroom title</label>
          <input type="text" 
            className={`form-control ${touch.title && errors.title && 'is-invalid'}`} 
            id="titleClassroom"
            placeholder={this.props.classroom.title} 
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            name="title"
            autoComplete="off"
          />
          <div className="invalid-feedback">{errors.title}</div>
        </div>
        <div className="mt-4">
          <label htmlFor="accountPayClassroom" className="text-info">Account pay for this class events</label>
          <input type="text" 
            className={`form-control ${touch.accountPay && errors.accountPay && 'is-invalid'}`} 
            id="accountPayClassroom"
            placeholder={this.props.classroom.accountPay} 
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            name="accountPay"
            autoComplete="off"
          />
          <div className="invalid-feedback">{errors.accountPay}</div>
        </div>
        <div className="btn-editClassroom">
           <Button variant="outline-secondary"  onClick={this.handleSubmit} disabled={disabled}>Edit classroom</Button>
        </div>
      </div>
    )
  }
}

export default withAuthConsumer(EditClassroom)
