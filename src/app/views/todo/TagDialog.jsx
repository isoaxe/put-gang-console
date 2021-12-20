import React, { useState, useEffect, useCallback } from 'react'
import { Dialog, TextField, Button } from '@mui/material'
import { getAllTodoTag, addNewTag, deleteTag } from './TodoService'
import { generateRandomId } from 'utils'
import { Box, styled, useTheme } from '@mui/system'
import { Span } from 'app/components/Typography'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'space-between',
}))

const TagDialog = ({ open, handleClose }) => {
    const [isAlive, setIsAlive] = useState(true)
    const [name, setName] = useState('')
    const [tagList, setTagList] = useState([])

    const loadTagList = useCallback(async () => {
        let { data } = await getAllTodoTag()
        if (isAlive) setTagList(data)
    }, [isAlive])

    useEffect(() => {
        loadTagList()
        return () => setIsAlive(false)
    }, [loadTagList])

    useEffect(() => {
        return () => setIsAlive(false)
    }, [])

    const handleChange = (event) => {
        if (event.key === 'Enter') {
            handleAddNewTag()
        } else {
            setName(event.target.value)
        }
    }

    const handleAddNewTag = async (event) => {
        if (name.trim() !== '') {
            let { data: tag } = await addNewTag({
                id: generateRandomId(),
                name: name.trim(),
            })

            if (isAlive) {
                let list = [...tagList]
                list.push(tag)

                setTagList(list)
                setName('')
            }
        }
    }

    const handleDeleteTag = async (id) => {
        await deleteTag({ id, name })
        if (isAlive) {
            let list = tagList.filter((tag) => tag.id !== id)
            setTagList([...list])
        }
    }

    const { palette } = useTheme()
    const bgError = palette.error.main

    return (
        <Dialog onClose={handleClose} open={open} maxWidth="xs">
            <Box px={2} py={3}>
                <FlexBox>
                    <TextField
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                        onKeyDown={handleChange}
                        value={name}
                        label="New tag*"
                        sx={{ flexGrow: 1 }}
                    />
                    <div>
                        <Button
                            onClick={handleAddNewTag}
                            variant="contained"
                            color="primary"
                        >
                            Add
                        </Button>
                    </div>
                </FlexBox>
                <Box pt={2}>
                    {tagList.map((tag, index) => (
                        <JustifyBox my={1} key={tag.id}>
                            <span>{index + 1}</span>
                            <Span sx={{ textTransform: 'capitalize' }}>
                                {tag.name}
                            </Span>
                            <Button
                                onClickCapture={() => handleDeleteTag(tag.id)}
                                variant="contained"
                                sx={{ background: bgError }}
                            >
                                Delete
                            </Button>
                        </JustifyBox>
                    ))}
                </Box>
                <Box pt={2} textAlign="right">
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        color="secondary"
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default TagDialog
