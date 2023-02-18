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

export const eventValidation = yup.object().shape({
    title: yup.string().required().min(2).max(20),
    description: yup.string().min(2).max(1000),
    startTime: yup.date().required('Start Time is required'),
    endTime: yup.date().min(yup.ref('startTime')),


});

// roleValidation rules with enum

enum Role {
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    USER = 'user',
    CEO = 'ceo',
    CTO = 'cto',
    COO = 'coo',
    HR = 'hr',
    PROJECT_MANAGER = 'project_manager',
    DEVELOPER = 'developer',
    DESIGNER = 'designer',
    MARKETING = 'marketing',
    SALES = 'sales',
    CUSTOMER_SUPPORT = 'customer_support',
    ACCOUNTING = 'accounting',
    SUPER_ADMIN = 'super_admin',

}

export const roleValidation = yup.object().shape({
    name: yup.string().required().oneOf(Object.values(Role)),
});
