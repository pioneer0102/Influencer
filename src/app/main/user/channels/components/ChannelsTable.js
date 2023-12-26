import history from '@history';
// import { useQuery } from 'react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MoreHoriz } from '@mui/icons-material';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { ChannelsTableHeader } from 'src/app/model/ChannelsModel';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
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
    TablePagination,
} from '@mui/material';

const ChannelsTable = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [openActionMeun, setActionMeun] = useState(null);
    const open = Boolean(openActionMeun);
    const [selectedChannelId, setSelectedChannelId] = useState(0);
    const [confirmDialog, setConfirmDialog] = useState(false);

    // const filter = useSelector(selectFilter);
    // const users = useSelector(selectAllUsers);
    // const totalCount = useSelector(selectTotalCount);

    // const { isLoading, isError } = useQuery(
    //     ['adminUsers', filter],
    //     async () => {
    //         try {
    //             const result = await getUsers(filter);
    //             dispatch(setUserEntityAdapter(result));
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // );

    const handleAction = (event) => {
        setActionMeun(event.currentTarget);
        setSelectedChannelId(event.currentTarget.getAttribute('id'));
    };

    const handleCloseActionMeun = () => setActionMeun(null);

    const handleChannelEdit = () => {
        setActionMeun(null);
    };

    const handleChannelDelete = () => {
        setConfirmDialog(false);
        // dispatch(deleteUser(selectedChannelId));
    };

    const openConfirmDialog = () => {
        setActionMeun(null);
        setConfirmDialog(true);
    };

    const closeConfirmDialog = () => setConfirmDialog(false);

    const handleChange = (type, value) => {
        if (type === 'rowsPerPage') {
            // dispatch(setFilter({ ...filter, page: 0, [type]: value }));
        } else {
            // dispatch(setFilter({ ...filter, [type]: value }));
        }
    };

    return (
        <div className="w-full flex flex-col py-24 px-24 md:px-24">
            <Paper className="flex flex-col py-16 px-16 overflow-auto rounded-md">
                <Table>
                    <Thead className="border-b-2">
                        <Tr>
                            {ChannelsTableHeader.map((item, index) => (
                                <Th key={index} align={item.align}>
                                    <Typography
                                        color="text.secondary"
                                        className="font-bold text-20 mb-16"
                                    >
                                        {item.label}
                                    </Typography>
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* {
                            !isLoading &&
                            !isError &&
                            channels.map((channel, index) => {
                                return (
                                    <Tr>
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="text-16 md:pt-16"
                                            >
                                                {channel.media}
                                            </Typography>
                                        </Td>
                                        <Td align="left">
                                            <Typography
                                                color="text.secondary"
                                                className="text-16 md:pt-16"
                                            >
                                                {channel.channel}
                                            </Typography>
                                        </Td>
                                        <Td align="left" className="md:pt-16">
                                            <IconButton
                                                id={channel.id}
                                                onClick={handleAction}
                                            >
                                                <MoreHoriz />
                                            </IconButton>
                                        </Td>
                                    </Tr>
                                );
                            })
                        } */}
                    </Tbody>
                </Table>
                {/* {users.length > 0 && (
                    <div className="flex md:flex-row flex-col items-center border-t-2 mt-16 py-8">
                        <Typography
                            className="text-16 text-center font-medium"
                            color="text.secondary"
                        >
                            {t('users.total')} : {totalCount}
                        </Typography>
                        <TablePagination
                            className="flex-1 overflow-scroll"
                            component="div"
                            count={totalCount}
                            rowsPerPage={filter.rowsPerPage}
                            page={filter.page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page'
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page'
                            }}
                            onPageChange={(event, newPage) =>
                                handleChange('page', parseInt(newPage, 10))
                            }
                            onRowsPerPageChange={(event) => {
                                handleChange(
                                    'rowsPerPage',
                                    parseInt(event.target.value, 10)
                                );
                            }}
                        />
                    </div>
                )} */}
                {/* {isLoading ? (
                    <FuseLoading />
                ) : isError || users.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center h-full py-24">
                        <Typography color="text.secondary" variant="h5">
                            {t('noData')}
                        </Typography>
                    </div>
                ) : (
                    <></>
                )} */}
            </Paper>
            <Menu
                id="user-action-menu"
                anchorEl={openActionMeun}
                open={open}
                onClose={handleCloseActionMeun}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                <MenuItem onClick={handleChannelEdit}>
                    <FuseSvgIcon size={20} color="action">
                        heroicons-solid:pencil
                    </FuseSvgIcon>
                    <span className="mx-8">Edit</span>
                </MenuItem>
                <MenuItem onClick={openConfirmDialog}>
                    <FuseSvgIcon size={20} color="action">
                        heroicons-solid:trash
                    </FuseSvgIcon>
                    <span className="mx-8">Delete</span>
                </MenuItem>
            </Menu>
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
        </div>
    );
};

export default ChannelsTable;
