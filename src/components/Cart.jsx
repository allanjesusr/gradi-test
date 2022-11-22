import React, { Fragment, useState } from 'react';

import { Alert, Box, Button, Grid, IconButton, Modal, Paper, Snackbar, Tooltip, Typography } from '@mui/material';
import CurrencyFormat from 'react-currency-format';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 335, md: 650 },
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    height: { xs: '80%', md: '85%'}
};

export const Cart = ({ addToCart, setAddToCart, product, totalPay, open, onClose }) => {

    const [openSnack, setOpenSnack] = useState(false);

    const handleClick = () => {
        setOpenSnack(true);
        setAddToCart(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleDelete = () => {
        setAddToCart(false)
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={style}>
                <Typography variant="h5" sx={{ marginBottom: '1rem' }}>Your Cart</Typography>

                {
                    (addToCart) ?
                        <Fragment>
                            <Paper elevation={2} sx={{
                                width: '100%',
                            }}>
                                <Grid item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <Typography variant="h6">{product.title}</Typography>
                                    <Tooltip title="Delete Item">
                                        <IconButton onClick={handleDelete}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>

                                <Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2">Price: ${product.price}</Typography>
                                    <Typography variant="body2">Total: ${totalPay}</Typography>
                                </Grid>
                                <Grid item sx={{ height: '300px', width: '300px' }}>
                                    <img
                                        style={{ width: '100%', height: '100%' }}
                                        src={`https:${product.featured_image}`}
                                        alt={product.handle}
                                    />
                                </Grid>
                            </Paper>
                            <Grid item sx={{ marginTop: "1rem" }}>
                                <CurrencyFormat
                                    value={totalPay}
                                    displayType={'text'}
                                    format={'Total: $ ##########'}
                                    style={{ fontSize: '1.5rem', fontWeigth: 'bold' }}
                                />
                            </Grid>
                        </Fragment>

                        : <Typography variant="h4">Add a Item</Typography>
                }


                {/* <Typography variant="h5" sx={{ marginTop: '1rem' }}>Total: ${totalPay}</Typography> */}
                <Grid item sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    {
                        (addToCart) ?
                            <Button
                                onClick={handleClick}
                                variant="outlined"
                            >
                                Shop Now!
                            </Button> : null
                    }
                    <Button
                        onClick={onClose}
                        variant="outlined"
                    >
                        Close
                    </Button>
                </Grid>
                <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Your order has been created Succesfully!
                    </Alert>
                </Snackbar>
            </Box>
        </Modal>
    )
}
