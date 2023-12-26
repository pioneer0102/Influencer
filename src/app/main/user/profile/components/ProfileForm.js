import _ from '@lodash';
import * as yup from 'yup';
import Box from '@mui/system/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { showMessage } from 'app/store/fuse/messageSlice';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
    Paper,
    Button,
    TextField,
    InputAdornment
} from '@mui/material';
import { getUser } from '../store/profileSlice';

const schema = yup.object().shape({
    firstname: yup.string().required('You must enter a Fist Name'),
    lastname: yup.string().required('You must enter a Last Name'),
    email: yup.string().required('You must enter a Email'),
    vat_number: yup.string().required('You must select a Phone'),
    address_line1: yup.string().required('You must select a Address Line1'),
    address_line2: yup.string().required('You must select a Address Line2')
});

const ProfileForm = () => {
    const dispatch = useDispatch();
    const { control, handleSubmit, reset, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const [showUpload, setShowUpload] = useState(false);

    const { isValid, dirtyFields, errors } = formState;

    const handleUpload = (state) => setShowUpload(state);
    const onSubmit = (data) => {
        console.log(data);
        const successMessage = 'User updated successfully!';
        dispatch(showMessage({ message: successMessage, variant: 'success' }));
    };

    // useEffect(() => {
    //     reset({ ...user });
    // }, [user, reset]);

    return (
        <div className="w-full min-h-full flex flex-col">
            <Paper className="flex flex-col mx-24 my-24 py-24 px-32 overflow-auto rounded-md">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-40 gap-y-16">
                    <Controller
                        control={control}
                        name="firstname"
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="First Name"
                                placeholder="First Name"
                                id="firstname"
                                error={!!errors.firstname}
                                helperText={errors?.firstname?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:user-circle
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="lastname"
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="Last Name"
                                placeholder="Last Name"
                                id="lastname"
                                error={!!errors.lastname}
                                helperText={errors?.lastname?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:user-circle
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="Email"
                                placeholder="Email"
                                id="email"
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:mail
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="vat_number"
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="Phone"
                                placeholder="Phone"
                                id="vat_number"
                                error={!!errors.vat_number}
                                helperText={errors?.vat_number?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:phone
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="address_line1"
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="Address Line1"
                                placeholder="Address Line1"
                                id="address_line1"
                                error={!!errors.address_line1}
                                helperText={errors?.address_line1?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:location-marker
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="address_line2"
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="Address Line2"
                                placeholder="Address Line2"
                                id="address_line2"
                                error={!!errors.address_line2}
                                helperText={errors?.address_line2?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:location-marker
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                </div>
                <Box className="flex flex-row justify-between items-center mt-32">
                    <div></div>
                    <Button
                        className="ml-8"
                        variant="contained"
                        color="secondary"
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Save
                    </Button>
                </Box>
            </Paper>
        </div>
    );
};

export default ProfileForm;
