import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import CardEditorDialog from './CardEditorDialog'
import Scrollbar from 'react-perfect-scrollbar'
import BoardList from './BoardList'
import {
    Avatar,
    Card,
    ClickAwayListener,
    TextField,
    InputAdornment,
    IconButton,
    Icon,
    Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
    reorderCardInList,
    reorderList,
    moveCardInList,
} from '../../redux/actions/ScrumBoardActions'
import { Box, styled, useTheme } from '@mui/system'
import { Span } from 'app/components/Typography'

const StyledScrollBar = styled(Scrollbar)(() => ({
    width: '100%',
    display: 'flex',
    position: 'relative',
    paddingBottom: '16px',
}))

const StyledCard = styled(Card)(() => ({
    padding: '16px',
    minWidth: 288,
    cursor: 'pointer',
    marginLeft: '12px',
    marginRight: '12px',
}))

const ScrumBoardContainer = ({
    list = [],
    handleAddList,
    handleAddNewCard,
}) => {
    const [card, setCard] = useState(null)
    const [shouldOpenDialog, setShouldOpenDialog] = useState(false)
    const [shouldOpenAddList, setShouldOpenAddList] = useState(false)
    const [columnTitle, setColumnTitle] = useState('')

    const dispatch = useDispatch()
    const { board = {} } = useSelector((state) => state.scrumboard)

    const handleCardClick = (card) => {
        setCard(card)
        setShouldOpenDialog(true)
    }

    const handleDialogClose = () => {
        setShouldOpenDialog(false)
    }

    const handleAddListToggle = (value) => {
        setShouldOpenAddList(value)
    }

    const handleChange = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleAddList(columnTitle)
            setColumnTitle('')
        } else setColumnTitle(event.target.value)
    }

    const onDragEnd = (result) => {
        const { source, destination } = result

        // if dropped outside of list
        if (!destination) {
            return
        }

        if (source.droppableId === 'horizontal-droppable') {
            dispatch(reorderList(board.id, source.index, destination.index))
        } else {
            if (source.droppableId === destination.droppableId) {
                dispatch(
                    reorderCardInList(
                        board.id,
                        source.droppableId,
                        source.index,
                        destination.index
                    )
                )
            } else {
                dispatch(
                    moveCardInList(
                        board.id,
                        source.droppableId,
                        destination.droppableId,
                        source,
                        destination
                    )
                )
            }
        }
    }

    const { palette } = useTheme()
    const bgError = palette.error.main

    return (
        <StyledScrollBar>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="horizontal-droppable"
                    direction="horizontal"
                >
                    {(provided) => (
                        <Box
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            display="flex"
                        >
                            {list.map((column, index) => (
                                <Draggable
                                    key={column.id}
                                    draggableId={column.id}
                                    index={index}
                                    type="column"
                                >
                                    {(provided, snapshot) => (
                                        <BoardList
                                            data={{
                                                provided,
                                                snapshot,
                                                column,
                                            }}
                                            handleCardClick={handleCardClick}
                                            handleDialogClose={
                                                handleDialogClose
                                            }
                                            handleAddNewCard={handleAddNewCard}
                                        ></BoardList>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>

            <div>
                {shouldOpenAddList ? (
                    <ClickAwayListener
                        onClickAway={() => handleAddListToggle(false)}
                    >
                        <StyledCard elevation={3}>
                            <TextField
                                size="small"
                                sx={{ mb: '12px' }}
                                variant="outlined"
                                name="columnTitle"
                                value={columnTitle}
                                fullWidth
                                onChange={handleChange}
                                onKeyDown={handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    handleAddListToggle(false)
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
                                    onClick={() => {
                                        handleAddList(columnTitle)
                                        setColumnTitle('')
                                    }}
                                    variant="contained"
                                    color="primary"
                                >
                                    Add
                                </Button>
                            </Box>
                        </StyledCard>
                    </ClickAwayListener>
                ) : (
                    <StyledCard
                        elevation={3}
                        onClick={() => handleAddListToggle(true)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgba(0, 0, 0, 0.01)',
                        }}
                    >
                        <Avatar sizes={24} sx={{ background: bgError }}>
                            +
                        </Avatar>
                        <Span sx={{ ml: 4, fontWeight: '500' }}>Add List</Span>
                    </StyledCard>
                )}
            </div>

            {shouldOpenDialog && (
                <CardEditorDialog
                    card={card}
                    open={shouldOpenDialog}
                    handleClose={handleDialogClose}
                ></CardEditorDialog>
            )}
        </StyledScrollBar>
    )
}

export default ScrumBoardContainer
