import React, { useState } from 'react'
import { RichTextEditor, Breadcrumb } from 'app/components'
import { styled } from '@mui/system'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    "& .breadcrumb": {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    }
}))

const EditorForm = () => {
    const [content, setContent] = useState(
        `<h1>Matx | Matx Pro Admin Template</h1><p><a href="http://matx-react.ui-lib.com/" target="_blank"><strong>Matx</strong></a></p><p><br></p><p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>`
    )

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Forms', path: '/forms' },
                        { name: 'Editor' },
                    ]}
                />
            </div>
            <RichTextEditor
                content={content}
                handleContentChange={(content) => setContent(content)}
                placeholder="insert text here..."
            />
        </Container>
    )
}

export default EditorForm
