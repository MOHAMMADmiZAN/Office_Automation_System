import * as yup from 'yup';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const passwordMatch = (ref: unknown, message: string) => yup.string().test({
    name: 'passwordMatch',
    exclusive: false,
    message: message || 'Passwords must match',
    test: function (value) {
        return value === this.resolve(ref);
    }
});

export const loginValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(20).matches(passwordRegex, 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'),
});

export const signupValidation = yup.object().shape({
    firstName: yup.string().min(2).max(20).required(),
    lastName: yup.string().min(2).max(20).required(),
    email: yup.string().email().required(),
    password: yup
        .string()
        .min(8)
        .max(20)
        .matches(
            passwordRegex,
            'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
        )
        .required(),
    role: yup.string().required(),
    avatar: yup
        .mixed()
        .test('fileType', 'Invalid file type', (value) => {

            const supportedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon', 'image/jp2', 'image/jpx', 'image/jpm', 'image/heif', 'image/heic'];
            // Define the supported file types
            return supportedTypes.includes(value.type); // Check if the file type is supported
        }).required(`Avatar is required`),
});


export const eventValidation = yup.object().shape({
    title: yup.string().required().min(2).max(20),
    description: yup.string().min(2).max(1000),
    startTime: yup.date().required('Start Time is required'),
    endTime: yup.date().min(yup.ref('startTime')),
});

export const changePasswordValidation = yup.object().shape({
    oldPassword: yup.string().required().min(2).max(20),
    password: yup
        .string()
        .min(8)
        .max(20)
        .matches(
            passwordRegex,
            'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
        )
        .required(),
    confirmPassword: yup.string().required().matches(
        passwordRegex,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character'
    ),
});

// roleValidation rules with enum

export enum Role {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    SUPPORT = 'support',
    USER = 'user',
}

export const roleValidation = yup.object().shape({
    name: yup.string().required().oneOf(Object.values(Role)),
});

export const userinfoValidation = yup.object().shape({
    contactNumber: yup.string().required().min(11).max(15),
    presentAddress: yup.string().required().min(2).max(100),
    permanentAddress: yup.string().required().min(2).max(100),
    dateOfBirth: yup.date().required(),
    eContactNumber: yup.string().min(11).max(15),

});

export const DocumentValidation = yup.object().shape({
    title: yup.string().required().min(2).max(20),
    document: yup
        .mixed()
        .test('fileType', 'Invalid file type', (value) => {
            const supportedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']; // Define the supported file types
            return supportedTypes.includes(value.type); // Check if the file type is supported
        }).required(`Document is required`),
    user: yup.string().required(),
});

export const OnBoardDataValidation = yup.object().shape({

    user: yup.string().required(),
    joiningDate: yup.string().required(),
    jobTitle: yup.string().required().min(2).max(20),
    salary: yup.number().required().min(3),
    status: yup.string().required(),
    farewellDate: yup.string()


})
export const editUserValidation = yup.object().shape({
    avatar: yup
        .mixed()
        .test('type', 'Invalid file type', (value) => {
            const supportedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon', 'image/jp2', 'image/jpx', 'image/jpm', 'image/heif', 'image/heic'];
            if (value === undefined) return true; // If th// e file is not uploaded, then return true
            if (typeof value === 'string') return true; // If the file is already uploaded, then return true
            return supportedTypes.includes(value.type); // Check if the file type is supported
        }),
    firstName: yup.string().min(2).max(20).required(),
    lastName: yup.string().min(2).max(20).required(),
    email: yup.string().email().required(),
    contactNumber: yup.string().required().min(11).max(15),
    eContactNumber: yup.string().min(11).max(15),
    presentAddress: yup.string().required(),
    permanentAddress: yup.string().required(),
    dateOfBirth: yup.date().required(),
    jobTitle: yup.string().required().min(2).max(20),
    role: yup.string().required(),
    salary: yup.number().required().min(3),
    joiningDate: yup.string().required(),
    status: yup.string().required(),
    farewellDate: yup.string(),


});
