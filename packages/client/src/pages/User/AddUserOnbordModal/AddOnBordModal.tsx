import React from 'react';
import CustomModal from "../../../components/organisms/CustomModal/CustomModal";
import {Add} from "@mui/icons-material";
import {FORM_INPUT_PROPS, FormInputType, selectOption} from "../../../components/molecules/Form/FormInput/Form_Input";
import {useUsers} from "../../../hooks/useUsers";
import {SubmitHandler} from "react-hook-form";
import {useOnBoard} from "../../../hooks/useOnBoard";
import FormLayOut from "../../../components/organisms/Form/FormLayOut/FormLayOut";
import {OnBoardDataValidation} from "../../../utils/Validation";

interface ADD_ON_BORD_MODAL_PROPS {

}
interface IAddOnBoardData {
    user: string;
    joiningDate: string;
    jobTitle: string;
    salary: number;
    status: string;
    farewellDate?: string;

}
const defaultAddOnBoardData: IAddOnBoardData = {
    user: '',
    joiningDate: '',
    jobTitle: '',
    salary: 0,
    status: '',
    farewellDate: ''
}
interface onBordFormField {
    name: string;
    type: FormInputType;
    placeholder: string;
    smallField: boolean;
    label: string;
    selectOptions?: selectOption[];


}

export const onBoardStatus : string[] = [ 'Active', 'Inactive', 'On Leave', 'Fired', 'Resigned']

const AddOnBordModal: React.FC<ADD_ON_BORD_MODAL_PROPS> = (props): JSX.Element => {

     const {Users} = useUsers();
     const {OnBoardData,createOnBoard} = useOnBoard()

    const onBordFormFields: onBordFormField[] = [
        {
            name: 'jobTitle',
            type: 'text',
            placeholder: ' Type Job Title',
            smallField: false,
            label: 'Job Title'
        },
        {
            name: 'joiningDate',
            type: 'date',
            placeholder: ' Type Joining Date',
            smallField: true,
            label: 'Joining Date'
        },
        {
            name: 'salary',
            type: 'number',
            placeholder: ' Type Salary in $',
            smallField: true,
            label: 'Salary'
        },
        {
            name: 'status',
            type: 'select',
            placeholder: ' Type Status',
            smallField: true,
            label: 'Status',
            selectOptions: onBoardStatus.map((status) => {
                return {
                    value: status,
                    label: status
                }
            } )
        },
        {
            name: 'user',
            type: 'select',
            placeholder: ' select User',
            smallField: true,
            label: 'User',
            selectOptions: Users?.filter(user=>!OnBoardData?.some(data=> data.user === user._id)).map(user=>({
                label: user.firstName + ''+ user.lastName,
                value: user._id
            })) as selectOption[]

        }

    ]

     const onSubmit: SubmitHandler<IAddOnBoardData> = async (data) => {
         await createOnBoard(data)

     }

    return (
        <>
          <CustomModal modalId={'Add-OnBoard-Data'} modalContent={
              <FormLayOut defaultValues={defaultAddOnBoardData} btnText={`Submit`} onSubmit={onSubmit} validationRules={OnBoardDataValidation} FormInputFields={onBordFormFields as FORM_INPUT_PROPS[]}/>
          } modalBtnVariant={`outlined`} ModalBtnIcon={<Add/>} modalBtnText={`Add-OnBoard-Data`}/>

        </>
    );
};

export default AddOnBordModal;