import React from 'react'

function SignupValidation() {
    const validate = Yup.object().shape({
        name: Yup.string()
        .min(6)
        .max(25)
        .trim()
        .required('Please Enter Your Full Name')
        .matches(
            /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Name can only contain letters.'
            ),

        email: Yup.string()
        .email()
        .trim()
        .required("Please enter your email"),
        
        password: Yup.string().min(6).trim().required("Please enter your password"),
      
        
    })
      
    return (
      <div>
      
      
      </div>
    )
  }
  
  export default SignupValidation
