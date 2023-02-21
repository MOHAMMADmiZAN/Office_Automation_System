import React, {memo, useState} from 'react';
import {Box, Grid} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {AnyObjectSchema} from "yup";
import Form_Input, {FORM_INPUT_PROPS} from "../../../molecules/Form/FormInput/Form_Input";
import Btn from "../../../molecules/Form/Btn";

import styled from "styled-components";
import { FiCamera } from "react-icons/fi";
import ReactFileReader from "react-file-reader";
import { Button } from "@material-ui/core";



const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  img {
    width: 186px;
    height: 186px;
    object-fit: cover;
    border-radius: 50%;
  }
  .circle {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label {
    right: 23em !important;
    position: absolute;
    width: 48px;
    height: 48px;
    background: #312e38;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #f4ede8;
    }
    &:hover {
      background: blue;
    }
  }
  .react-file-reader{
      margin-left: 75px;
  }
`;


interface defaultValueType {
    [key: string]: unknown
}

interface FORM_LAY_OUT_PROPS {
    defaultValues: object;
    FormInputFields: FORM_INPUT_PROPS[];
    validationRules: AnyObjectSchema;
    onSubmit: SubmitHandler<any>;
    btnText: string;


}

const FormLayOut: React.FC<FORM_LAY_OUT_PROPS> = ({
                                                      defaultValues,
                                                      onSubmit,
                                                      validationRules,
                                                      FormInputFields,
                                                      btnText
                                                  }): JSX.Element => {
    const {control, handleSubmit, reset} = useForm<typeof defaultValues>({
        defaultValues: {...defaultValues},
        resolver: yupResolver(validationRules),
    });


    const onSubmitWithReset: SubmitHandler<any> = async (data, event) => {
        await onSubmit(data, event);
        reset(defaultValues);

    };

    const [url, setUrl] = useState("https://picsum.photos/200");

    const handleFiles = (files) => {
      console.log('File', files);
      console.log('url', url);
      setUrl(files.base64);
    };


    return (
        <>
            <Grid container={true} justifyContent={`center`} alignItems={`center`}>
                <Grid item={true} xs={12} sm={12} md={10} lg={10} xl={10}>

                    <AvatarInput>
                        <img src={url} alt="Avatar Placeholder" />
                    </AvatarInput>

                    <ReactFileReader
                        fileTypes={[".png", ".jpg"]}
                        base64={true}
                        handleFiles={handleFiles}
                        >
                    <FiCamera style={{ width: 30, height: 30, marginLeft: 75 }} as={Button} />
                    </ReactFileReader>


                    <Box component={`form`} onSubmit={handleSubmit(onSubmitWithReset)} padding={`20px 0`}
                         display={`flex`}
                         flexWrap={`wrap`} justifyContent={`space-between`}>
                        {
                            FormInputFields.map((inputField, index) => {
                                return (
                                    <Form_Input
                                        key={index}
                                        name={inputField.name}
                                        type={inputField.type}
                                        placeholder={inputField.placeholder}
                                        smallField={inputField.smallField}
                                        label={inputField.label}
                                        control={control}
                                        selectOptions={inputField.selectOptions}
                                        isFullWidth={inputField.isFullWidth}
                                        isRequired={inputField.isRequired}
                                        id={inputField.id}


                                    />
                                );
                            })

                        }
                        <Btn type={`submit`} BtnText={btnText} variant={`contained`} size={`medium`}/>
                    </Box>

                    

                </Grid>
            </Grid>

        </>
    );
};

export default memo(FormLayOut)