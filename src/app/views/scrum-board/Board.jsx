import {
    Icon,
    IconButton,
    Avatar,
    Tooltip,
    FormControlLabel,
    Checkbox,
} from '@mui/material'
import {
    getBoardById,
    addListInBoard,
    getAllMembers,
    getAllLabels,
    addMemberInBoard,
    addNewCardInList,
    deleteMemberFromBoard,
} from '../../redux/actions/ScrumBoardActions'
import React, { useEffect } from 'react'
import { MatxMenu } from 'app/components'
import { Link, useParams } from 'react-router-dom'
import ScrumBoardContainer from './ScrumBoardContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Box, styled } from '@mui/system'
import { H5, Span } from 'app/components/Typography'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    flexWrap: 'wrap',
    justifyContent: 'space-between',
}))

const StyledAvatar = styled(Avatar)(() => ({
    width: 24,
    height: 24,
    marginLeft: '-8px',
    border: '2px solid white',
}))

const Board = () => {
    const { board = {}, memberList = [] } = useSelector(
        (state) => state.scrumboard
    )
    const { id: boardId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBoardById(boardId))
        dispatch(getAllMembers())
        dispatch(getAllLabels())
    }, [boardId, dispatch])

    const handleAddList = (listTitle) => {
        if (listTitle !== '') {
            dispatch(
                addListInBoard({
                    boardId,
                    listTitle,
                })
            )
        }
    }

    const handleAddNewCard = (cardData) => {
        dispatch(
            addNewCardInList({
                boardId,
                ...cardData,
            })
        )
    }

    const handleChange = (event) => {
        let memberId = event.target.value
        let { members, id } = board

        if (members.some((member) => member.id === memberId)) {
            dispatch(deleteMemberFromBoard({ boardId: id, memberId }))
        } else dispatch(addMemberInBoard({ boardId: id, memberId }))
    }

    let { members = [], title, list = [] } = board

    return (
        <Container className="scrum-board">
            <JustifyBox mb={2}>
                <FlexBox>
                    <Link to="/scrum-board">
                        <IconButton>
                            <Icon>arrow_back</Icon>
                        </IconButton>
                    </Link>
                    <H5 sx={{ ml: 1, textTransform: 'capitalize' }}>{title}</H5>
                    <IconButton sx={{ ml: 1 }}>
                        <Icon>star_outline</Icon>
                    </IconButton>
                </FlexBox>

                <FlexBox mr={1} position="relative">
                    {members.map((member, index) => (
                        <Tooltip
                            key={index}
                            title={member.name}
                            fontSize="large"
                        >
                            <StyledAvatar src={member.avatar} />
                        </Tooltip>
                    ))}
                    <MatxMenu
                        horizontalPosition="right"
                        shouldCloseOnItemClick={false}
                        menuButton={
                            <Tooltip title={'Add'} fontSize="large">
                                <StyledAvatar sx={{ cursor: 'pointer' }}>
                                    +
                                </StyledAvatar>
                            </Tooltip>
                        }
                    >
                        {memberList.map((user) => (
                            <FormControlLabel
                                sx={{ ml: 0 }}
                                key={user.id}
                                control={
                                    <Checkbox
                                        checked={members.some(
                                            (member) => member.id === user.id
                                        )}
                                        onChange={handleChange}
                                        value={user.id}
                                    />
                                }
                                label={
                                    <FlexBox>
                                        <Avatar src={user.avatar} sizes={24} />
                                        <Span sx={{ ml: '12px' }}>
                                            {user.name}
                                        </Span>
                                    </FlexBox>
                                }
                            />
                        ))}
                    </MatxMenu>
                </FlexBox>
            </JustifyBox>

            <Box position="relative">
                <ScrumBoardContainer
                    list={list}
                    handleAddList={handleAddList}
                    handleAddNewCard={handleAddNewCard}
                ></ScrumBoardContainer>
            </Box>
        </Container>
    )
}

export default Board
