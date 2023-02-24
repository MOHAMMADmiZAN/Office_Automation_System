import React from 'react';
import FormLayOut from "../../../../components/organisms/Form/FormLayOut/FormLayOut";
import useUser from "../../../../hooks/useUser";
import {editUserValidation} from "../../../../utils/Validation";
import {
    FORM_INPUT_PROPS,
    FormInputType,
    selectOption
} from "../../../../components/molecules/Form/FormInput/Form_Input";
import useRole from "../../../../hooks/useRole";
import {SubmitHandler} from "react-hook-form";
import {onBoardStatus} from "../../AddUserOnbordModal/AddOnBordModal";
import useUsers, {IUpdateUserAvatarPayload, IUpdateUserPayload} from "../../../../hooks/useUsers";
import useUserInfo, {IUpdateUserInfo} from "../../../../hooks/useUserInfo";
import useOnBoard, {IUpdateOnBoard} from "../../../../hooks/useOnBoard";


interface EDIT_USER_DETAILS_PROPS {
    userId: string;

}

interface editUserDetails {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    eContactNumber: string;
    dateOfBirth: string;
    presentAddress: string;
    permanentAddress: string;
    jobTitle: string;
    role: string;
    joiningDate: string;
    salary: number;
    farewellDate?: string;
    status: string;
    avatar: Blob | Object | string;


}

interface editUserFormInput {
    name: string;
    type: FormInputType;
    label: string;
    placeholder: string;
    selectOptions?: selectOption[];
    smallField?: boolean;


}


const EditUserDetails: React.FC<EDIT_USER_DETAILS_PROPS> = ({userId}): JSX.Element => {
    const {user, userInfo, userDocument, userRole, onBoard} = useUser(userId)
    const {updateUser,updateUserAvatar} = useUsers()
    const {updateUserInfo} = useUserInfo()
    const {updateOnBoard} = useOnBoard()
    const {Roles} = useRole()

    const editUserDefaultValue: editUserDetails = {
        avatar: user?.avatar || '' ,
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        contactNumber: userInfo?.contactNumber || '',
        eContactNumber: userInfo?.eContactNumber || '',
        dateOfBirth: userInfo?.dateOfBirth || '',
        presentAddress: userInfo?.presentAddress || '',
        permanentAddress: userInfo?.permanentAddress || '',
        jobTitle: onBoard?.jobTitle || '',
        role: userRole?._id || '',
        joiningDate: onBoard?.joiningDate || '',
        salary: onBoard?.salary || 0,
        farewellDate: onBoard?.farewellDate || '',
        status: onBoard?.status || '',
    }
    const editUserFormInputFields: editUserFormInput[] = [
        {
            name: 'avatar',
            type: 'file',
            label: 'Avatar',
            placeholder: 'Upload Avatar',

        },
        {
            name: 'firstName',
            type: 'text',
            label: 'First Name',
            placeholder: 'Enter First Name',
            smallField: true,

        },
        {
            name: 'lastName',
            type: 'text',
            label: 'Last Name',
            placeholder: 'Enter Last Name',
            smallField: true,

        },
        {
            name: 'email',
            type: 'text',
            label: 'Email',
            placeholder: 'Enter Email',

        },
        {
            name: 'contactNumber',
            type: 'text',
            label: 'Contact Number',
            placeholder: 'Enter Contact Number',
            smallField: true,

        },
        {
            name: 'eContactNumber',
            type: 'text',
            label: 'Emergency Contact Number',
            placeholder: 'Enter Emergency Contact Number',
            smallField: true,
        },
        {
            name: 'dateOfBirth',
            type: 'date',
            label: 'Date Of Birth',
            placeholder: 'Enter Date Of Birth',
            smallField: true,
        },

        {
            name: 'role',
            type: 'select',
            label: 'Role',
            placeholder: 'Select Role',
            selectOptions: Roles?.map((role) => {
                return {
                    value: role._id,
                    label: role.name,
                };
            }),
            smallField: true,
        },
        {
            name: 'presentAddress',
            type: 'text',
            label: 'Present Address',
            placeholder: 'Enter Present Address',
        },
        {
            name: 'permanentAddress',
            type: 'text',
            label: 'Permanent Address',
            placeholder: 'Enter Permanent Address',

        },
        {
            name: 'jobTitle',
            type: 'text',
            label: 'Job Title',
            placeholder: 'Enter Job Title',
            smallField: true,
        },
        {
            name: 'joiningDate',
            type: 'date',
            label: 'Joining Date',
            placeholder: 'Enter Joining Date',
            smallField: true,

        },
        {
            name: 'salary',
            type: 'number',
            label: 'Salary',
            placeholder: 'Enter Salary',
            smallField: true,
        },
        {
            name: 'farewellDate',
            type: 'date',
            label: 'Farewell Date',
            placeholder: 'Enter Farewell Date',
            smallField: true,
        },
        {
            name: 'status',
            type: 'select',
            label: 'Status',
            placeholder: 'Select Status',
            selectOptions: onBoardStatus.map((status) => {
                return {
                    value: status,
                    label: status,
                };
            }),
        }
    ];

    const onSubmit: SubmitHandler<editUserDetails> = async (data, e) => {
        const userAvatar = e?.target.avatar.files[0]



        const userPayload = {
            id: user?._id,
            payload: {
                ...user,
                avatar: userAvatar || data.avatar,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role,
            }

        }

        const userInfoPayload = {
            id: userInfo?._id,
            payload: {
                ...userInfo,
                contactNumber: data.contactNumber,
                eContactNumber: data.eContactNumber,
                dateOfBirth: data.dateOfBirth,
                presentAddress: data.presentAddress,
                permanentAddress: data.permanentAddress,
            }
        }


        const onBoardPayload = {
            id: onBoard?._id,
            payload: {
                ...onBoard,
                jobTitle: data.jobTitle,
                joiningDate: data.joiningDate,
                salary: data.salary,
                farewellDate: data.farewellDate,
                status: data.status,
            }

        }
           const userAvatarPayload = {
                id: user?._id,
                payload: {

                }
            }


        await updateUser(userPayload as unknown as IUpdateUserPayload)
        await updateUserInfo(userInfoPayload as IUpdateUserInfo)
        await updateOnBoard(onBoardPayload as IUpdateOnBoard)


    }

    return (
        <>
            <FormLayOut defaultValues={editUserDefaultValue}
                        FormInputFields={editUserFormInputFields as FORM_INPUT_PROPS[]}
                        validationRules={editUserValidation} onSubmit={onSubmit} btnText={'Update'}/>

        </>
    );
};

export default EditUserDetails;