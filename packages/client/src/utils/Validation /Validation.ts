import * as yup from 'yup';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const passwordMatch = (ref:unknown, message:string) => yup.string().test({
    name: 'passwordMatch',
    exclusive: false,
    message: message || 'Passwords must match',
    test: function (value) {
        return value === this.resolve(ref);
    }
});

export const loginValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(20).matches(passwordRegex,'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'),
});

export const signupValidation = yup.object().shape({
    firstName: yup.string().required().min(2).max(20),
    lastName: yup.string().required().min(2).max(20),
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(20).matches(passwordRegex,'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'),
    confirmPassword: passwordMatch(yup.ref('password'), 'Confirm Passwords must match with Password'),
});