// MUI
import {
    TableCell,
    Typography,
    Button,
    IconButton,
    Menu,
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// React
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// Components
import ClientInfo from './ClientInfo';
import DeactivateClient from './DeactivateClient';

export default function ClientTableRow({ client, clientList, StyledTableRow, classes }) {
    const history = useHistory();
    const dispatch = useDispatch();
    // State for setting location of kabob menu
    const [anchorEl, setAnchorEl] = useState(null);

    const handleActivateClient = (id) => {
        dispatch({
            type: 'ACTIVATE_CLIENT',
            id
        });
    }

    const handleManageClientClick = (id) => {
        history.push(`/manage-client/${id}`);
    }

    return (
        <StyledTableRow>
            {/* Render row differently based on whether client is registered */}
            {client.is_registered ?
                <>
                    <TableCell>
                        {/* Client name */}
                        <Typography>
                            {client.first_name}{' '}{client.last_name}
                        </Typography>
                    </TableCell>
                    {/* 
                        Check is client is active, if true show CR and kabob
                        else show button to dispatch and activate client
                    */}
                    {client.is_active ?
                        <>
                            <TableCell>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    className={classes.tableButton}
                                    onClick={() => handleManageClientClick(client.id)}
                                >
                                    Manage
                                </Button>
                            </TableCell>
                            <TableCell>
                                {/* Kebob menu with options */}
                                <IconButton
                                    onClick={(e) => setAnchorEl(e.currentTarget)}
                                    className={classes.tableButton}
                                >
                                    <MoreHorizIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                    onClick={() => setAnchorEl(null)}
                                >
                                    {/* Opens dialog to display client data */}
                                    <ClientInfo client={client} clientList={clientList} />
                                    {/* Opens dialog to confirm deactivate */}
                                    <DeactivateClient client={client} />
                                </Menu>
                            </TableCell>
                        </>
                        :
                        <TableCell>
                            <Button
                                size="small"
                                variant="outlined"
                                className={classes.tableButton}
                                onClick={() => handleActivateClient(client.id)}
                            >
                                reactivate Client
                            </Button>
                        </TableCell>
                    }

                </>
                :
                <>
                    <TableCell>
                        {/* If client is not registered, display email instead of name */}
                        <Typography>
                            {client.email}
                        </Typography>
                    </TableCell>
                    {client.is_active ?
                        <>
                            <TableCell>
                                <Typography style={{textAlign: 'right'}}>
                                    Not Registered
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {/* Kebob menu with options */}
                                <IconButton
                                    onClick={(e) => setAnchorEl(e.currentTarget)}
                                    className={classes.tableButton}
                                >
                                    <MoreHorizIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                    onClick={() => setAnchorEl(null)}
                                >
                                    {/* Opens dialog to confirm deactivate */}
                                    <DeactivateClient client={client} />
                                </Menu>
                            </TableCell>
                        </>
                        :
                        <TableCell>
                            <Button
                                size="small"
                                variant="outlined"
                                className={classes.tableButton}
                                onClick={() => handleActivateClient(client.id)}
                            >
                                reactivate Client
                            </Button>
                        </TableCell>
                    }

                </>
            }
        </StyledTableRow>
    )
}