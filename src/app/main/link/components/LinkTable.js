import history from '@history';
// import { useQuery } from 'react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MoreHoriz } from '@mui/icons-material';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { LinkTableHeader } from 'src/app/model/LinkModel';
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
import { selectAllLinks } from '../store/linkSlice';

const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
};

const LinkTable = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const allLinks = useSelector(selectAllLinks);

    const [openActionMeun, setActionMeun] = useState(null);
    const open = Boolean(openActionMeun);
    const [selectedChannelId, setSelectedChannelId] = useState(0);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

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

    return (
        <div className="w-full flex flex-col py-24 px-24 md:px-24">
            <Paper className="flex flex-col py-16 px-16 overflow-auto rounded-md">
                <Table>
                    <Thead className="border-b-2">
                        <Tr>
                            {LinkTableHeader.map((item, index) => (
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
                        {
                            allLinks.slice(rowsPerPage * page, rowsPerPage * page + rowsPerPage)
                                .map((link, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="text-16 md:pt-16"
                                                >
                                                    {new Date(link.created_at).toLocaleDateString(
                                                        'en-US',
                                                        options
                                                    )}
                                                </Typography>
                                            </Td>
                                            <Td align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="text-16 md:pt-16"
                                                >
                                                    {link.game.name}
                                                </Typography>
                                            </Td>
                                            <Td align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="text-16 md:pt-16"
                                                >
                                                    {link.utm_medium.split('_').slice(1).join('/')}
                                                </Typography>
                                            </Td>
                                            <Td align="left">
                                                <Typography
                                                    color="text.secondary"
                                                    className="text-12 md:pt-16"
                                                >
                                                    {link.link_game_home}
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    className="text-12 md:pt-16"
                                                >
                                                    {link.link_landing}
                                                </Typography>
                                            </Td>
                                        </Tr>
                                    );
                                })
                        }
                    </Tbody>
                </Table>
                {allLinks.length > 0 && (
                    <div className="flex md:flex-row flex-col items-center border-t-2 mt-16 py-8">
                        <Typography
                            className="text-16 text-center font-medium"
                            color="text.secondary"
                        >
                            Total Links : {allLinks.length}
                        </Typography>
                        <TablePagination
                            className="flex-1 overflow-scroll"
                            component="div"
                            count={allLinks.length}
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

export default LinkTable;
