import React, {useLayoutEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import BaseLayout from "../../layouts/Base.Layout";
import FormLayOut from "../../components/organisms/Form/FormLayOut/FormLayOut";
import {InviteUsersModal} from "../event/TodayEvent/TodayEvent";
import {User} from "../../store/models/AuthModel";
import {Form_TextInput} from "../../components/molecules/Form/FormInput/styles/FormInput.style";
import {Autocomplete, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";







const Index: React.FC = (): JSX.Element => {

    const eventData = {
        _id: "63ec81bfe89e9cad5b187fcc",
        author: "63e4f1dbc389950a1edb55b7",
        title: "event today",
        description: "now",
        startTime: "2023-02-16T09:54:33.000Z",
        status: "PENDING",
        invitation: [],
        createdAt: "2023-02-15T06:54:55.724Z",
        updatedAt: "2023-02-15T06:54:55.724Z",
    }

    const authors = [
        {
            _id: "63e4eb88d2985178b2065c8e",
            firstName: "admin",
            lastName: "adminLast",
            email: "admin@mail.com",
            status: "PENDING",
            avatar: "https://res.cloudinary.com/dxqjyqz8f/image/upload/v1621361009/avatars/default-avatar.png",

        },
        {
            _id: "63e4f1dbc389950a1edb55b7",
            firstName: "admin2",
            lastName: "admin2",
            email: "admin2@gmail.com",
            status: "PENDING",
            avatar: "https://res.cloudinary.com/dxqjyqz8f/image/upload/v1621361009/avatars/default-avatar.png",

        },
        {
            _id: "63e51aaf6372baf64b04d2cb",
            firstName: "admin4",
            lastName: "admin4",
            email: "admin4@gmail.com",
            status: "PENDING",
            avatar: "https://res.cloudinary.com/dxqjyqz8f/image/upload/v1621361009/avatars/default-avatar.png",

        },
        {
            _id: "63e51f620b6a8528852d8cfe",
            firstName: "Naim",
            lastName: "Uddin",
            email: "naim@gmail.com",
            status: "PENDING",
            avatar: "https://res.cloudinary.com/dxqjyqz8f/image/upload/v1621361009/avatars/default-avatar.png",

        },
        {
            _id: "63e621b2e17ef7f0c22240d3",
            firstName: "Robert",
            lastName: "Viverette",
            email: "admin12@gmail.com",
            status: "PENDING",
            avatar: "https://res.cloudinary.com/dxqjyqz8f/image/upload/v1621361009/avatars/default-avatar.png",

        },
        {
            _id: "63ea5a91fff3d162b7316b55",
            firstName: "Bipon",
            lastName: "Biswas",
            email: "bipon770@gmail.com",
            status: "PENDING",
            avatar: "https://res.cloudinary.com/dxqjyqz8f/image/upload/v1621361009/avatars/default-avatar.png",

        }
    ]

    const selectOptions = [
        {label: "Naim Uddin", value: "63e51f620b6a8528852d8cfe"},
        {label: "Robert Viverette", value: "63e621b2e17ef7f0c22240d3"},
        {label: "Bipon Biswas", value: "63ea5a91fff3d162b7316b55"},
    ]



    const { control, handleSubmit } = useForm();

    const onSubmit = (data:any) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="autocomplete"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Autocomplete
                        {...field}
                        options={selectOptions}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Autocomplete"
                                variant="outlined"
                            />
                        )}
                    />
                )}
            />
            <input type="submit" />
        </form>
    )
            


};

export default Index;