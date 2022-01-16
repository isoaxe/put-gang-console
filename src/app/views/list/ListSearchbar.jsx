import {
    Icon,
    TextField,
    InputAdornment,
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

const ListSearchbar = ({
    handleInputChange,
}) => {
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
        </Container>
    )
}

export default ListSearchbar
