import {
    Icon,
    Slider,
    TextField,
    IconButton,
    InputAdornment,
    Hidden,
} from '@mui/material'
import React from 'react'
import { Box, styled } from '@mui/system'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const Container = styled(FlexBox)(() => ({
    flexWrap: 'wrap',
    justifyContent: 'space-between',
}))

const StyledSlider = styled(Slider)(() => ({
    width: 120,
    marginRight: '16px',
}))

const ListTopbar = ({
    viewMode,
    sliderValue,
    handleSldierChange,
    handleInputChange,
    handleViewChange,
}) => {
    let marks = [{ value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }]

    return (
        <Container>
            <FlexBox>
                <TextField
                    variant="standard"
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon>search</Icon>
                            </InputAdornment>
                        ),
                    }}
                ></TextField>
            </FlexBox>

            <FlexBox>
                <Hidden xsDown>
                    {viewMode === 'grid' && (
                        <StyledSlider
                            value={sliderValue}
                            min={25}
                            step={null}
                            marks={marks}
                            onChange={handleSldierChange}
                            aria-labelledby="continuous-slider"
                        />
                    )}
                    <IconButton
                        size="large"
                        color={viewMode === 'grid' ? 'primary' : 'default'}
                        onClick={() => handleViewChange('grid')}
                    >
                        <Icon>view_comfy</Icon>
                    </IconButton>

                    <IconButton
                        size="large"
                        color={viewMode === 'list' ? 'primary' : 'default'}
                        onClick={() => handleViewChange('list')}
                    >
                        <Icon>list</Icon>
                    </IconButton>
                </Hidden>
            </FlexBox>
        </Container>
    )
}

export default ListTopbar
