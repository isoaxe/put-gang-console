import {
    Card,
    Grid,
    Button,
    ClickAwayListener,
    TextField,
    InputAdornment,
    IconButton,
    Icon,
} from '@mui/material'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { getAllBoard, addNewBoard } from '../../redux/actions/ScrumBoardActions'
import { useDispatch, useSelector } from 'react-redux'
import { Box, styled } from '@mui/system'
import { H1 } from 'app/components/Typography'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const H5 = styled('h5')(() => ({
    margin: 0,
    fontWeight: '500',
    textTransform: 'capitalize',
    whiteSpace: 'pre-wrap',
}))

const StyledCard = styled(Card)(({ theme }) => ({
    padding: '24px',
    height: 150,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .textBox': {
        textAlign: 'center',
        fontWeight: '500',
        color: theme.palette.primary.main,
    },
}))

const AppScrumBoard = () => {
    const [open, setOpen] = useState(false)
    const [textFieldValue, setTextFieldValue] = useState('')

    const { boardList = [] } = useSelector((state) => state.scrumboard)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBoard())
    }, [dispatch])

    const openEditorDialog = (value) => {
        setOpen(value)
    }

    const handleChange = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleAddNewBoard()
        } else setTextFieldValue(event.target.value)
    }

    const handleAddNewBoard = () => {
        let title = textFieldValue.trim()
        if (title !== '') {
            dispatch(addNewBoard(title))
            setTextFieldValue('')
        }
    }

    return (
        <Container>
            <Grid container spacing={2}>
                {boardList.map((board) => (
                    <Grid key={board.id} item lg={3} md={3} sm={12} xs={12}>
                        <Link to={`/scrum-board/${board.id}`}>
                            <Card
                                elevation={3}
                                sx={{ p: 3, height: 152, cursor: 'pointer' }}
                            >
                                <H5>{board.title}</H5>
                            </Card>
                        </Link>
                    </Grid>
                ))}
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    {open ? (
                        <ClickAwayListener
                            onClickAway={() => openEditorDialog(false)}
                        >
                            <Card
                                elevation={3}
                                sx={{ p: 3, height: 152, width: 288 }}
                            >
                                <TextField
                                    size="small"
                                    onChange={handleChange}
                                    onKeyDown={handleChange}
                                    sx={{ mb: '12px' }}
                                    variant="outlined"
                                    label="Board Title"
                                    value={textFieldValue}
                                    autoFocus
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                        openEditorDialog(false)
                                                    }
                                                >
                                                    <Icon fontSize="small">
                                                        clear
                                                    </Icon>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Box display="flex" justifyContent="flex-end">
                                    <Button
                                        onClick={handleAddNewBoard}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Add
                                    </Button>
                                </Box>
                            </Card>
                        </ClickAwayListener>
                    ) : (
                        <StyledCard
                            elevation={3}
                            onClick={() => openEditorDialog(true)}
                        >
                            <div className="textBox">
                                <H1>+</H1>
                                <div>Create New Board</div>
                            </div>
                        </StyledCard>
                    )}
                </Grid>
            </Grid>
        </Container>
    )
}

export default AppScrumBoard
