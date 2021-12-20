import React, { useState, useEffect, useCallback } from 'react'
import TodoItem from './TodoItem'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import {
    getAllTodo,
    updateTodoById,
    reorderTodoList,
    getAllTodoTag,
} from './TodoService'
import { debounce } from 'lodash'
import { MatxMenu } from 'app/components'
import { Box, styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Icon, IconButton, MenuItem, Button, Card } from '@mui/material'

const StyledCard = styled(Card)(({ theme }) => ({
    margin: '30px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const ContentBox = styled(Box)(() => ({
    paddingTop: '8px',
    paddingBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const TodoList = ({ query }) => {
    const [isAlive, setIsAlive] = useState(true)
    const [todoList, setTodoList] = useState([])
    const [tagList, setTagList] = useState([])
    const [filteredTodoList, setFilteredTodoList] = useState([])

    const navigate = useNavigate()

    const getAllTodoAndTagList = useCallback(async () => {
        let [{ data: todoList }, { data: tagList }] = await Promise.all([
            getAllTodo(),
            getAllTodoTag(),
        ])
        if (isAlive) {
            setFilteredTodoList(todoList)
            setTodoList(todoList)
            setTagList(tagList)
        }
    }, [isAlive])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const search = useCallback(
        debounce((query) => {
            query = query.trim().toLowerCase()

            if (query) {
                let filteredTodoList = todoList.filter(
                    (todo) =>
                        todo.title.toLowerCase().match(query) ||
                        todo.note.toLowerCase().match(query)
                )

                if (query !== '') setFilteredTodoList([...filteredTodoList])
            }
        }, 250),
        [todoList]
    )

    useEffect(() => {
        getAllTodoAndTagList()
        return () => setIsAlive(false)
    }, [getAllTodoAndTagList])

    useEffect(() => {
        search(query)
    }, [query, search])

    const updateTodo = async (todo) => {
        const { data: updatedTodo } = await updateTodoById(todo)
        if (isAlive) {
            let list1 = todoList.map((item) => {
                if (item.id === updatedTodo.id) return updatedTodo
                return item
            })
            let list2 = filteredTodoList.map((item) => {
                if (item.id === updatedTodo.id) return updatedTodo
                return item
            })
            setTodoList([...list1])
            setFilteredTodoList([...list2])
        }
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const handleDragEnd = async (result) => {
        // dropped outside the list
        if (!result.destination) {
            return
        }

        let todoList = reorder(
            filteredTodoList,
            result.source.index,
            result.destination.index
        )

        let { data } = await reorderTodoList(todoList)

        if (isAlive) {
            setFilteredTodoList(data)
            setTodoList(data)
        }
    }

    const filterTodoListByProperty = (queryField, queryValue) => {
        if (queryField !== 'all') {
            let list = todoList.filter(
                (todo) => todo[queryField] === queryValue
            )
            setFilteredTodoList([...list])
        } else {
            setFilteredTodoList([...todoList])
        }
    }

    const filterTodoListByTag = (tagId) => {
        if (tagId !== 'all') {
            let list = todoList.filter((todo) => todo.tag.includes(tagId))
            setFilteredTodoList([...list])
        } else {
            setFilteredTodoList([...todoList])
        }
    }

    return (
        <StyledCard className="todo">
            <ContentBox>
                <div>
                    <MatxMenu
                        menuButton={
                            <IconButton size="large">
                                <Icon>arrow_drop_down</Icon>
                            </IconButton>
                        }
                    >
                        <MenuItem
                            onClick={() => filterTodoListByProperty('all')}
                        >
                            All
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                filterTodoListByProperty('read', true)
                            }
                        >
                            Read
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                filterTodoListByProperty('read', false)
                            }
                        >
                            Unread
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                filterTodoListByProperty('done', true)
                            }
                        >
                            Done
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                filterTodoListByProperty('done', false)
                            }
                        >
                            Undone
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                filterTodoListByProperty('important', true)
                            }
                        >
                            Important
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                filterTodoListByProperty('important', false)
                            }
                        >
                            Unimportant
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                filterTodoListByProperty('starred', true)
                            }
                        >
                            Starred
                        </MenuItem>
                        <MenuItem
                            onClick={() =>
                                filterTodoListByProperty('starred', false)
                            }
                        >
                            Unstarred
                        </MenuItem>
                    </MatxMenu>
                    <MatxMenu
                        menuButton={
                            <IconButton size="large">
                                <Icon>label</Icon>
                            </IconButton>
                        }
                    >
                        <MenuItem
                            sx={{ textTransform: 'capitalize' }}
                            onClick={() => filterTodoListByTag('all')}
                        >
                            all
                        </MenuItem>
                        {tagList.map((tag) => (
                            <MenuItem
                                key={tag.id}
                                sx={{ textTransform: 'capitalize' }}
                                onClick={() => filterTodoListByTag(tag.id)}
                            >
                                {tag.name}
                            </MenuItem>
                        ))}
                    </MatxMenu>
                </div>
                <Box pr={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/todo/list/add')}
                    >
                        Create Todo
                    </Button>
                </Box>
            </ContentBox>

            <div className="todo-list">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {filteredTodoList.map((todo, index) => (
                                    <Draggable
                                        key={todo.id}
                                        draggableId={todo.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={
                                                    provided.draggableProps
                                                        .style
                                                }
                                            >
                                                <TodoItem
                                                    tagList={tagList}
                                                    updateTodo={updateTodo}
                                                    key={index}
                                                    todo={todo}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </StyledCard>
    )
}

export default TodoList
