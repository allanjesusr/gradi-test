import React, { useEffect, useState } from 'react';

import { Button, ButtonGroup, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

import { getProduct } from './store/product';
import { grey, red } from '@mui/material/colors';

export const App = () => {

    const dispatch = useDispatch();
    const { product, isLoading } = useSelector(state => state.product);
    // console.log(product.options[1])

    const [valueRadioButtons, setValueRadioButtons] = useState('');
    const [alignment, setAlignment] = React.useState('left');

    useEffect(() => {
        dispatch(getProduct());
    }, [])

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const onChange = (e) => {
        setValueRadioButtons(e.target.value);
    }

    return (
        <Grid container>
            <Grid
                item
                xs={12}
            >
                <Paper
                    elevation={4}
                    sx={{
                        border: '1px solid grey', p: { xs: 0, md: '1rem' }, borderRadius: '5px',
                    }}
                >

                </Paper>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Typography variant="body2" sx={{ color: '#D6DBDF' }}>by Nike x ALYX</Typography>
                <Typography variant="6">{product.title}</Typography>
                <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} format="$ ###.##" />
                <CurrencyFormat value={product.compare_at_price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} format="$ ###.##" style={{ textDecorationLine: 'line-through', color: '#D6DBDF' }} />

                <FormControl>
                    <FormLabel>Color:</FormLabel>
                    <RadioGroup
                        value={valueRadioButtons}
                        onChange={onChange}
                    >
                        <FormControlLabel value="color1" control={<Radio sx={{
                            color: red[900],
                            '&.Mui-checked': {
                                color: red[900],
                            },
                        }} />} ></FormControlLabel>
                        <FormControlLabel value="color2" control={<Radio sx={{
                            color: grey[900],
                            '&.Mui-checked': {
                                color: grey[900],
                            },
                        }} />} color=""></FormControlLabel>
                    </RadioGroup>
                </FormControl>

                <Typography variant='h6'>Size:</Typography>
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                >
                    {
                        product.options[1].values.map((sizes, i) => (
                            <ToggleButton
                                value={sizes}
                            >
                                {sizes}
                            </ToggleButton>
                        ))
                    }
                </ToggleButtonGroup>
                <ButtonGroup variant="secondary">
                    <Button>+</Button>
                    <Button disabled>1</Button>
                    <Button>-</Button>
                </ButtonGroup>

                <Typography variant="body1">Total price: $455</Typography>

                <Button variant="contained" size="large" fullWidth sx={{
                    backgroundColor: grey[200],
                    color: grey[900],
                    '&:hover': {
                        backgroundColor: grey[400],
                        borderColor: '#0062cc',
                        boxShadow: 'none',
                      },
                }}>
                    Add to favourite
                </Button>
                <Button variant="contained" size="large" fullWidth sx={{
                    backgroundColor: grey[900],
                    color: grey[100],
                    '&:hover': {
                        backgroundColor: grey[800],
                        borderColor: '#0062cc',
                        boxShadow: 'none',
                      },
                }}>
                    Add to cart
                </Button>
                <Typography variant="body1">{product.description}</Typography>
            </Grid>
        </Grid>
    )
}

export default App;