import React, { Fragment } from 'react'
import Rating from '@mui/lab/Rating'
import {
    Card,
    TextField,
    InputAdornment,
    Icon,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormControl,
    Slider,
    Checkbox,
    Fab,
    Button,
    Hidden,
} from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import { H5, H6, Small, Span } from 'app/components/Typography'

const FlexBox = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const ShopHeader = styled('div')(({ theme }) => ({
    marginTop: '8px',
    marginBottom: '16px',
    paddingLeft: '16px',
    display: 'flex',
    alignItems: 'center',
}))

const StyledCard = styled(Card)(({ theme }) => ({
    padding: '16px',
    marginBottom: '16px',
    position: 'relative',
}))

const StyledLabel = styled(FormControlLabel)(({ theme }) => ({
    height: 32,
}))

const Badge = styled('small')(({ theme }) => ({
    color: theme.palette.primary.main,
    background: `rgba(var(--primary), 0.15)`,
}))

const ShopSidenav = ({
    query,
    categories,
    brands,
    multilevel,
    categoryList,
    brandList,
    ratingList,
    shipping,
    sliderRange,
    toggleSidenav,
    handleSearch,
    handleMultilevelChange,
    handleSliderChange,
    handleCategoryChange,
    handleBrandChange,
    handleRatingClick,
    handleFreeShippingClick,
    handleClearAllFilter,
}) => {
    const { palette } = useTheme()
    const textMuted = palette.text.secondary
    const bgPaper = palette.background.paper

    return (
        <Fragment>
            <ShopHeader>
                <TextField
                    sx={{
                        mr: 2,
                        flexGrow: 1,
                        background: bgPaper,
                    }}
                    size="small"
                    margin="none"
                    name="query"
                    variant="outlined"
                    placeholder="Search here..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon fontSize="small">search</Icon>
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                ></TextField>
                <Hidden smUp>
                    <Icon onClick={toggleSidenav}>clear</Icon>
                </Hidden>
            </ShopHeader>
            <Box px={2}>
                <Card elevation={3} sx={{ p: 2, mb: 2 }}>
                    <H6 sx={{ m: 0, mb: 2 }}>Price</H6>
                    <FormControl component="fieldset" sx={{ width: '100%' }}>
                        <RadioGroup
                            aria-label="status"
                            name="status"
                            value={multilevel}
                            onChange={handleMultilevelChange}
                        >
                            <StyledLabel
                                value="0,10"
                                control={<Radio color="secondary" />}
                                label="<$10"
                                labelPlacement="end"
                            />
                            <StyledLabel
                                value="10,100"
                                control={<Radio color="secondary" />}
                                label="$10-$100"
                                labelPlacement="end"
                            />
                            <StyledLabel
                                value="100,500"
                                control={<Radio color="secondary" />}
                                label="$100-$500"
                                labelPlacement="end"
                            />
                            <StyledLabel
                                value="500"
                                control={<Radio color="secondary" />}
                                label=">$500"
                                labelPlacement="end"
                            />
                            <StyledLabel
                                value="all"
                                control={<Radio color="secondary" />}
                                label="All"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    </FormControl>
                </Card>

                <Card elevation={3} sx={{ p: 2, mb: 2 }}>
                    <FlexBox sx={{ mb: 2 }}>
                        <H5 sx={{ m: 0 }}>Slider</H5>
                        <Span sx={{ color: textMuted }}>
                            ${sliderRange[0] * 10} - ${sliderRange[1] * 10}
                        </Span>
                    </FlexBox>
                    <Slider
                        value={sliderRange}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        valueLabelFormat={(x) => x * 10}
                    />
                </Card>

                <StyledCard elevation={3}>
                    <H5 sx={{ m: 0, mb: 2 }}>Category</H5>
                    {categoryList.map((category) => (
                        <FlexBox key={category.title}>
                            <FormControlLabel
                                sx={{ flexGrow: 1 }}
                                name={category.title}
                                onChange={handleCategoryChange}
                                control={
                                    <Checkbox
                                        checked={categories.includes(
                                            category.title
                                        )}
                                    />
                                }
                                label={
                                    <Span sx={{ textTransform: 'capitalize' }}>
                                        {category.title}
                                    </Span>
                                }
                            />
                            <Badge className="badge">{category.product}</Badge>
                        </FlexBox>
                    ))}
                </StyledCard>

                <StyledCard elevation={3}>
                    <H5 sx={{ mb: 2 }}>Brands</H5>
                    <TextField
                        size="small"
                        sx={{ mb: 2 }}
                        variant="outlined"
                        placeholder="Search here..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icon fontSize="small">search</Icon>
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    ></TextField>

                    {brandList.map((brand) => (
                        <FlexBox key={brand.title}>
                            <FormControlLabel
                                sx={{ flexGrow: 1 }}
                                name={brand.title}
                                onChange={handleBrandChange}
                                control={
                                    <Checkbox
                                        checked={brands.includes(brand.title)}
                                    />
                                }
                                label={brand.title}
                            />
                            <Badge className="badge">{brand.product}</Badge>
                        </FlexBox>
                    ))}
                </StyledCard>

                <StyledCard elevation={3}>
                    <H5 sx={{ mb: 2 }}>Rating</H5>
                    {ratingList.map((rating) => (
                        <FlexBox
                            key={rating.rate}
                            value={rating.rate}
                            onClick={() => handleRatingClick(rating.rate)}
                            sx={{ pb: 2, cursor: 'pointer' }}
                        >
                            <Rating
                                size="small"
                                name="half-rating"
                                value={rating.rate}
                                precision={0.5}
                                readOnly={true}
                            />
                            <Badge className="badge">{rating.product}</Badge>
                        </FlexBox>
                    ))}
                </StyledCard>

                <StyledCard
                    elevation={3}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <H5>Toggle</H5>
                    <Fab
                        size="small"
                        variant="extended"
                        color={shipping ? 'primary' : 'inherit'}
                        onClick={handleFreeShippingClick}
                        sx={{ px: '12px', boxShadow: 'none' }}
                    >
                        <Small sx={{ mr: 2 }}>Free Shipping</Small>
                        <Icon>add</Icon>
                    </Fab>
                </StyledCard>

                <Button
                    sx={{ width: '100%' }}
                    variant="contained"
                    color="primary"
                    onClick={handleClearAllFilter}
                >
                    Clear All Filteres
                </Button>
            </Box>
        </Fragment>
    )
}

export default ShopSidenav
