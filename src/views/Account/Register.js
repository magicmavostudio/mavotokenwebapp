import React, { Component } from 'react';
import { getTranslate } from 'react-localize-redux';
import TextField from 'material-ui/TextField';
import CustomCheckboxField from '../../components/MaterialUi/CustomCheckboxField';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import textFieldStyles from '../Styles/textFieldStyles';
import * as actions from '../../redux/login/actions';
import * as topnavActions from '../../redux/topNav/actions';

const checkboxLabel=props =>{
    return (
        <span>&nbsp;{props.translate('iHaveReadAndAgreeToThe')}&nbsp;
            <a
            href={'https://www.mavotoken.com/'}
            target="_blank"
            >
            {props.translate('termsNCondition')}
            </a>
            &nbsp;{props.translate('and')}&nbsp; 
            <a
            href="https://www.mavotoken.com/"
            target="_blank"
            >
           {props.translate('privacyPolicy')}
            </a>
            .
        </span>
    )
}

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: null,
            firstNameError: null,
            lastName: null,
            lastNameError: null,
            email: null,
            emailError: null,
            password: null,
            passwordError: null,
            confirmPassword: null,
            confirmPasswordError: null,
            checkBoxTnC: false
        }
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleCreateAccountSubmit = this.handleCreateAccountSubmit.bind(this);
    }

    handleFirstNameChange(e){
        const value = e.target.value;
        if (value) {
            this.setState({firstName: value, firstNameError: null});
        }else {
            this.setState({firstNameError: 'First Name is required!'})
        }
    }

    handleLastNameChange(e){
        const value = e.target.value;
        if (value) {
            this.setState({lastName: value, lastNameError: null});
        }else {
            this.setState({lastNameError: 'Last Name is required!'})
        }
    }
    
    handleEmailChange(event){
        const value = event.target.value;
        if (value &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
          ) {
             this.setState({emailError: this.props.translate('invalidEmailAddress')})
        }else {
            this.setState({email: value, emailError: null});
        }
    }

    handlePasswordChange(event){
        const value = event.target.value;
        if (value){
            if (value.length < 6){
                this.setState({passwordError: this.props.translate('passwordIsTooShort')})
            }else {
                this.setState({password: value, passwordError: null});
            }
        }
    }
    handleConfirmPasswordChange(event){
        const value = event.target.value;
        if (value){
            if (!(value===this.state.password)){
                this.setState({confirmPasswordError: this.props.translate('passwordDoesNotMatch')})
            }else {
                this.setState({confirmPassword: value, confirmPasswordError: null});
            }
        }
    }

    handleCreateAccountSubmit(){
        console.log('handleCreateAccountSubmit')
        const { firstName, lastName, email, password, confirmPassword} = this.state;

        this.props.createAccount(firstName,lastName,email,password);
    }

    renderSubmitButton = () => {
        const { firstName, firstNameError, lastName, lastNameError, email, emailError, password, 
            passwordError, confirmPassword, confirmPasswordError, checkBoxTnC} = this.state;
        let isValid=true;
        if ( firstNameError || lastNameError || emailError || passwordError || confirmPasswordError){
            isValid=false;
        }
        if (checkBoxTnC && isValid && firstName && lastName && email && password && confirmPassword) {
            return (
                <button className="btn btn-primary btn-lg" type="submit" onClick={this.handleCreateAccountSubmit}>
                  {this.props.translate('createAccount')}
                </button> 
            )
        }else {
            return (
                <button className="btn btn-secondary btn-lg disabled" type="submit">
                   {this.props.translate('createAccount')}
                </button> 
            )
        }
    }

    displayError = login => {
        if (login.error){
            return (
                <div className='row'>
                  <div className='col-sm'>
                    <div className="alert alert-danger" role="alert">
                    {login.error}
                    </div>
                   </div> 
                </div>
            )
        }
    }

    checkBoxTnCOnClick=(e)=>{
        this.setState({checkBoxTnC: e.target.checked});
    }

    componentDidMount(){
        this.props.topnavUpdate()
    }

    render(){
        if (this.props.login.accountCreated){
            return <Redirect to="/registerThankYou"/>;
        }
        return (
            <div className="container">
                <div className='row'>
                    <br />
                </div>
                <div className='row'>
                    <div className='col-sm'>
                        <h2>{this.props.translate('createYourAccount')}</h2>
                    </div>
                </div> 
                 
                {this.displayError(this.props.login)}
                
                {/*
                <div className='row'>
                    <div className='col-sm'>
                        <div className="d-flex flex-row">
                            <div className="p-2">
                                <TextField
                                    name="firstName"
                                    label="First Name"
                                    onChange={this.handleFirstNameChange}
                                    error={this.state.firstNameError?true:false}
                                    helperText={this.state.firstNameError}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm'>
                        <div className="d-flex flex-row">
                            <div className="p-2">
                                <TextField
                                    name="lastName"
                                    label="Last Name"
                                    onChange={this.handleLastNameChange}
                                    error={this.state.lastNameError?true:false}
                                    helperText={this.state.lastNameError}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                */}
                <div className='row'>
                    <div className='col-sm'>
                        <div className="d-flex flex-row">
                            <div className="p-2">
                                <TextField
                                    name="email"
                                    label={this.props.translate('emailAddress')}
                                    onChange={this.handleEmailChange}
                                    error={this.state.emailError?true:false}
                                    helperText={this.state.emailError}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm'>
                        <div className="d-flex flex-row">
                            <div className="p-2">
                            <TextField
                                    name="password"
                                    type="password"
                                    label={this.props.translate('password')}
                                    onChange={this.handlePasswordChange}
                                    error={this.state.passwordError?true:false}
                                    helperText={this.state.passwordError}
                                />
                            </div>
                        </div>  
                    </div>
                </div>

                <div className='row'>
                    <div className='col-sm'>
                        <div className="d-flex flex-row">
                            <div className="p-2">
                            <TextField
                                    name="confirmPassword"
                                    type="password"
                                    label={this.props.translate('confirmPassword')}
                                    onChange={this.handleConfirmPasswordChange}
                                    error={this.state.confirmPasswordError?true:false}
                                    helperText={this.state.confirmPasswordError}
                                />
                            </div>
                        </div>   
                    </div>
                </div> 
                
                <div className='row'>
                    <div className='col-sm'>
                        <div className="d-flex flex-row">
                            <div className="p-2">
                                <input type="checkbox" onClick={(e)=> this.checkBoxTnCOnClick(e)}  />
                                {checkboxLabel(this.props)}
                            </div>
                        </div>  
                    </div>
                </div>

                <div className='row'> 
                    <div className='col-sm'>
                        <div className="d-flex flex-row">
                            <div className="p-2">
                                    {this.renderSubmitButton()}
                            </div> 
                        </div> 
                    </div>
                </div>  
            </div>    
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        login: state.login,
        translate: getTranslate(state.locale)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      createAccount: (firstName,lastName,email,password) => {
         dispatch(actions.createAccount(firstName,lastName,email,password))  
      },
      topnavUpdate: () => {
        dispatch(topnavActions.topnavUpdate())
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)