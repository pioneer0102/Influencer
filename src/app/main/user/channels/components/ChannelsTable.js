import history from '@history';
// import { useQuery } from 'react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MoreHoriz } from '@mui/icons-material';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { ChannelsTableHeader } from 'src/app/model/ChannelsModel';
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import {
    Menu,
    Paper,
    Button,
    Dialog,
    MenuItem,
    IconButton,
    Typography,
    DialogActions,
    DialogContent,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
} from '@mui/material';
import ChannelForm from './ChannelForm';
import { selectAllChannels, removeChannel, getChannel } from '../store/channelSlice';

const ChannelsTable = () => {
    const dispatch = useDispatch();

    const allChannels = useSelector(selectAllChannels);
    const [openActionMeun, setActionMeun] = useState(null);
    const open = Boolean(openActionMeun);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const handleChannelEdit = (id) => {
        dispatch(getChannel(id));
        setActionMeun(null);
        setEditDialogOpen(true);
    };

    const handleChannelDelete = () => {
        setConfirmDialog(false);
        dispatch(removeChannel(selectedId));
    };

    const openConfirmDialog = (id) => {
        setSelectedId(id);
        setActionMeun(null);
        setConfirmDialog(true);
    };

    const closeConfirmDialog = () => setConfirmDialog(false);
    const closeEditDialog = () => setEditDialogOpen(false);

    return (
        <div className="w-full flex flex-col py-24 px-24 md:px-24">
            <Paper className="flex flex-col py-8 px-16 overflow-auto rounded-md">
                <Table>
                    <TableHead className="border-b-2">
                        <TableRow>
                            {ChannelsTableHeader.map((item, index) => (
                                <TableCell key={index} align={item.align}>
                                    <Typography
                                        color="text.secondary"
                                        className="font-semibold text-20 whitespace-nowrap"
                                    >
                                        {item.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            allChannels.slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage).map((channel, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="text-16"
                                            >
                                                {channel.media}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="text-16"
                                            >
                                                {channel.channel}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button onClick={() => handleChannelEdit(channel.id)}>
                                                <FuseSvgIcon size={20} className="text-green">
                                                    heroicons-solid:pencil
                                                </FuseSvgIcon>
                                                <span className="mx-8">Edit</span>
                                            </Button>
                                            <Button onClick={() => openConfirmDialog(channel.id)}>
                                                <FuseSvgIcon size={20} className="text-red">
                                                    heroicons-solid:trash
                                                </FuseSvgIcon>
                                                <span className="mx-8">Delete</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
                {allChannels.length > 0 && (
                    <div className="flex md:flex-row flex-col items-center border-t-2 mt-16 py-8 px-16">
                        <Typography
                            className="text-16 text-center font-medium"
                            color="text.secondary"
                        >
                            Total Channels : {allChannels.length}
                        </Typography>
                        <TablePagination
                            className="flex-1 overflow-scroll"
                            component="div"
                            count={allChannels.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page'
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page'
                            }}
                            onPageChange={(event, newPage) =>
                                setPage(parseInt(newPage, 10))
                            }
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(parseInt(event.target.value, 10));
                            }}
                        />
                    </div>
                )}
            </Paper>
            <Dialog
                open={confirmDialog}
                onClose={closeConfirmDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="p-24">
                    <DialogContent className="p-0">
                        <h1 className="mt-12 mb-8">
                            Are you sure to delete this channel?
                        </h1>
                    </DialogContent>
                    <DialogActions className="p-0 mt-8">
                        <Button
                            variant="outline"
                            color="secondary"
                            onClick={closeConfirmDialog}
                        >
                            <span>CANCEL</span>
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleChannelDelete}
                        >
                            OK
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
            <ChannelForm open={editDialogOpen} onClose={closeEditDialog} action="edit" />
        </div>
    );
};

export default ChannelsTable;
