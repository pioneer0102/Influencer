import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    InputAdornment
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel, selectChannel, updateChannel } from '../store/channelSlice';

const schema = yup.object().shape({
    media: yup.string().required("You must enter a Media"),
    channel: yup.string().required("You must enter a Channel")
});

const ChannelForm = (props) => {
    const { open, onClose, action } = props;
    const dispatch = useDispatch();
    const { control, handleSubmit, reset, formState } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });
    const { isValid, dirtyFields, errors } = formState;
    const channel = useSelector(selectChannel);

    const onSubmit = (data) => {
        if (action == "add") {
            dispatch(addChannel(data));
        }
        if (action == "edit") {
            const updatedData = {
                id: channel.id,
                data: data
            }
            dispatch(updateChannel(updatedData));
        }
        onClose();
    };

    useEffect(() => {
        reset({ ...channel });
    }, [channel, reset]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    {action.charAt(0).toUpperCase() + action.slice(1)} Channel
                </DialogTitle>
                <DialogContent sx={{ maxWidth: '400px' }}>
                    <Controller
                        control={control}
                        name="media"
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                className="mt-8"
                                {...field}
                                label="Media"
                                placeholder="Media"
                                id="media"
                                error={!!errors.media}
                                helperText={errors?.media?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>
                                                material-solid:mediation
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="channel"
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                className="mt-32"
                                {...field}
                                label="Channel"
                                placeholder="Channel"
                                id="channel"
                                error={!!errors.channel}
                                helperText={errors?.channel?.message}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FuseSvgIcon size={24}>
                                                heroicons-solid:video-camera
                                            </FuseSvgIcon>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions className="mx-24 mb-8">
                    <Button
                        variant="outline"
                        color="secondary"
                        onClick={onClose}
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                    >
                        {action == "add" ? <span>Add</span> : <span>Save</span>}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default ChannelForm;