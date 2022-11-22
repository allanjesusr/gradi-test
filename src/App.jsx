import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Badge, Button, ButtonGroup, Checkbox, CircularProgress, Fab, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Paper, Radio, RadioGroup, Rating, styled, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import CurrencyFormat from 'react-currency-format';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";

import { grey, pink, red } from '@mui/material/colors';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import confetti from 'canvas-confetti';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Cart } from './components';
import { decrement, getProduct, increment } from './store/product';

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./index.css"
import { Box } from '@mui/system';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());
    }, []);

    const { product, quantity, isLoading, totalPay } = useSelector(state => state);

    const [valueRadioButtons, setValueRadioButtons] = useState('red');
    const [alignment, setAlignment] = useState('left');
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(28500);
    const [favCheck, setFavCheck] = useState(false);
    const [cart, setCart] = useState(false);
    const [addToCart, setAddToCart] = useState(false);
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        if (product.options) {
            setSizes(product.options[1].values)
        } else {
            setSizes([]);
        }
    }, [])

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const onChange = (e) => {
        setValueRadioButtons(e.target.value);
    };

    const handleDecrement = () => {
        dispatch(decrement({ price: currentPrice }));
    };

    const handleMultiplicate = () => {
        dispatch(increment({ price: currentPrice }));
    };

    const handleFavourite = () => {
        setFavCheck(!favCheck);
        if (favCheck) return
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.8 }
        });
    };

    const handleAddToCart = () => {
        setAddToCart(true);
    };

    return (
        <Grid container>
            {
                (isLoading) ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    :
                    <Fragment>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={6}
                        >
                            <Swiper
                                spaceBetween={10}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2"
                            >
                                {
                                    (product.images) ? product.images.map((imgs, i) => (
                                        <SwiperSlide key={i}>
                                            <img src={`https:${imgs}`} />
                                        </SwiperSlide>
                                    ))
                                        : null
                                }
                            </Swiper>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper"
                            >
                                {
                                    (product.images) ? product.images.map((imgsSec, i) => (
                                        <SwiperSlide key={i}>
                                            <img src={`https:${imgsSec}`} />
                                        </SwiperSlide>
                                    ))
                                        : null
                                }
                            </Swiper>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={6}
                        >
                            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '0.5rem' }}>
                                <Typography variant="body2" sx={{ color: '#D6DBDF', margin: '0.4rem 0px' }}>by Nike x ALYX</Typography>
                                <Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Typography variant="h4">{product.title}</Typography>
                                    <Checkbox disabled sx={{
                                        color: pink[800],
                                        '&.Mui-checked': {
                                            color: pink[600],
                                        },
                                    }} icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={favCheck} />
                                </Grid>
                                <div style={{ margin: '0.2rem 0px 0px 0px' }}>
                                    <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} format="$ ###.##" style={{ fontSize: '1.5rem', fontWeigth: 'bold', marginRight: '0.6rem' }} />

                                    <CurrencyFormat value={product.compare_at_price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} format="$ ###.##" style={{ textDecorationLine: 'line-through', color: '#D6DBDF', fontSize: '1.5rem', fontWeigth: 'bold' }} />
                                </div>
                                <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '1rem 0px' }}>
                                    <FormLabel sx={{ marginRight: '0.5rem' }}>Color:</FormLabel>
                                    <RadioGroup
                                        value={valueRadioButtons}
                                        onChange={onChange}
                                        sx={{ display: 'flex', flexDirection: 'row' }}
                                    >
                                        <FormControlLabel value="red" control={<Radio sx={{
                                            color: red[900],
                                            '&.Mui-checked': {
                                                color: red[900],
                                            },
                                        }} />} ></FormControlLabel>
                                        <FormControlLabel value="black" control={<Radio sx={{
                                            color: grey[900],
                                            '&.Mui-checked': {
                                                color: grey[900],
                                            },
                                        }} />} color=""></FormControlLabel>
                                    </RadioGroup>
                                </FormControl>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-evenly', margin: '0px 0px 1rem 0px' }}>
                                    <Typography variant='h6'>Size:</Typography>
                                    {
                                        (product != {}) ?
                                            <ToggleButtonGroup
                                                value={alignment}
                                                exclusive
                                                onChange={handleAlignment}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexWrap: 'wrap'
                                                }}
                                            >
                                                {
                                                    (sizes.length > 1) ?
                                                        sizes.map((sizes, i) => (
                                                            <ToggleButton
                                                                key={i}
                                                                fullWidth
                                                                sx={{
                                                                    margin: '0px 1rem 10px 1rem',
                                                                    flex: '0 10%',
                                                                    border: '0',
                                                                    '& .MuiToggleButtonGroup-grouped': {
                                                                        border: 0,
                                                                    },
                                                                    fontSize: '1rem',
                                                                }}
                                                                value={sizes}
                                                            >
                                                                {sizes}
                                                            </ToggleButton>
                                                        ))
                                                        : null
                                                }
                                            </ToggleButtonGroup>
                                            : null
                                    }
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: '0px 0px 1rem 0px' }}>
                                    <ButtonGroup variant="secondary">
                                        <Button onClick={handleDecrement} sx={{ border: '1px solid' }}>-</Button>
                                        <Button disabled sx={{ color: 'black', fontWeight: 'bold', fontSize: '1rem', border: '1px solid' }}>{quantity}</Button>
                                        <Button onClick={handleMultiplicate} sx={{ border: '1px solid' }}>+</Button>
                                    </ButtonGroup>
                                    <Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: '0px 0px 1rem 0px' }}>
                                        <Typography variant="h6" sx={{ color: '#D6DBDF', marginRight: '0.2rem' }}>Total Price:</Typography>
                                        <Typography variant="h6" sx={{ marginRight: '0.1rem' }}>$</Typography>
                                        <CurrencyFormat value={totalPay} displayType={'text'} style={{ fontSize: '1.5rem', fontWeigth: 'bold', marginRight: '0.6rem' }}
                                        />
                                    </Grid>

                                </div>
                            </Paper>
                            <div style={{ margin: '2rem 0px 1.2rem 0px' }}>
                                <Button variant="contained" size="large" fullWidth sx={{
                                    backgroundColor: grey[200],
                                    color: grey[900],
                                    '&:hover': {
                                        backgroundColor: grey[400],
                                        borderColor: '#0062cc',
                                        boxShadow: 'none',
                                    },
                                    width: { xs: '100%', lg: '48%' },
                                    margin: { xs: '0px 0px 0.5rem 0px', lg: '0px 1rem 0px 0px' }
                                }} onClick={handleFavourite}>
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
                                    width: { xs: '100%', lg: '48%' }
                                }} onClick={handleAddToCart}>
                                    Add to cart
                                </Button>
                            </div>
                            <Typography variant="body1">{product.description}</Typography>
                            <IconButton sx={{
                                position: 'fixed',
                                zIndex: '100',
                                right: '20px',
                                top: '20px',
                            }} onClick={() => setCart(true)}>
                                <StyledBadge badgeContent={addToCart ? 1 : 0} color="secondary">
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                            {
                                (cart) ?
                                    <Cart
                                        addToCart={addToCart}
                                        setAddToCart={setAddToCart}
                                        product={product}
                                        totalPay={totalPay}
                                        open={cart}
                                        onClose={() => setCart(false)}
                                    /> : null
                            }
                        </Grid>
                    </Fragment>
            }
        </Grid>
    )
}

export default App;