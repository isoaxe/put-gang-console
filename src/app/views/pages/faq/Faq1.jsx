import React, { useState, Fragment } from 'react'
import { Breadcrumb } from 'app/components'
import {
    TextField,
    Icon,
    Button,
    Card,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material'
import clsx from 'clsx'
import { Box, styled, lighten, useTheme } from '@mui/system'
import { H1, H4, H5, Paragraph, Small } from 'app/components/Typography'
import { convertHexToRGB } from 'utils'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const StyledButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    paddingLeft: '28px',
    paddingRight: '28px',
    overflow: 'hidden',
    borderRadius: '300px',
    background: theme.palette.primary.main,
}))

const Heading = styled(H1)(() => ({
    fontSize: '40px',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: '32px',
}))

const StyledP = styled(Paragraph)(({ theme }) => ({
    fontSize: '16px',
    textAlign: 'center',
    marginBottom: '64px',
    color: theme.palette.text.secondary,
}))

const StyledCard = styled(Card)(({ theme, index, tabIndex }) => ({
    margin: '8px',
    padding: '22px 32px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    border:
        index === tabIndex &&
        `1px solid rgba(${convertHexToRGB(theme.palette.primary.main)}, 1)`,
    '& .icon': {
        fontSize: '40px',
        marginBottom: '8px',
        color: index === tabIndex && theme.palette.primary.main,
    },
}))

const Faq1 = () => {
    const [tabIndex, setTabIndex] = useState(0)
    console.log(tabIndex)
    const [expandedIndex, setExpandedIndex] = useState(-1)

    const handleExpansionClick = (ind) => {
        if (ind === expandedIndex) setExpandedIndex(-1)
        else setExpandedIndex(ind)
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Pages', path: '/faq' },
                        { name: 'FAQ 1' },
                    ]}
                />
            </div>
            <JustifyBox py={8} flexDirection="column">
                <Heading>Hi, How can we help you?</Heading>
                <Box sx={{ minWidth: 400 }}>
                    <TextField
                        sx={{ width: '100%' }}
                        variant="outlined"
                        placeholder="Search knowledge base"
                        size="small"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <Icon fontSize="small" sx={{ mr: '8px' }}>
                                    search
                                </Icon>
                            ),
                            endAdornment: <StyledButton>Search</StyledButton>,
                            style: {
                                borderRadius: 300,
                                paddingRight: 0,
                            },
                        }}
                    />
                </Box>
            </JustifyBox>
            <StyledP>Or Browse by category</StyledP>
            <Box mb={4}>
                <JustifyBox m={-1} flexWrap="wrap">
                    {categoryList.map((item, ind) => (
                        <StyledCard
                            index={ind}
                            tabIndex={tabIndex}
                            key={ind}
                            onClick={() => setTabIndex(ind)}
                        >
                            <Icon className="icon">{item.icon}</Icon>
                            <H4>{item.title}</H4>
                        </StyledCard>
                    ))}
                </JustifyBox>
            </Box>

            {/* {tabIndex === 0 && <div>put your options here</div>} */}

            <Fragment>
                {categoryList[tabIndex].questionList?.map((item, ind) => (
                    <Accordion
                        key={ind}
                        elevation={0}
                        expanded={expandedIndex === ind}
                        onClick={() => handleExpansionClick(ind)}
                    >
                        <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                            {item.question}
                        </AccordionSummary>
                        <AccordionDetails>{item.answer}</AccordionDetails>
                    </Accordion>
                ))}
            </Fragment>
        </Container>
    )
}

const categoryList = [
    {
        icon: 'home',
        title: 'Getting Started',
        questionList: [
            {
                question: 'How to install?',
                answer: 'Open command line in root directory of your project and type npm install',
            },
            {
                question: 'How to debug?',
                answer: 'Delete node_modules from your project folder. Open command line in root directory of your project and type npm install',
            },
        ],
    },
    {
        icon: 'layers',
        title: 'Plans & Pricing',
        questionList: [
            {
                question: "What's the price?",
                answer: '$2356',
            },
            {
                question: 'How long will I get suppot?',
                answer: 'Life time support',
            },
        ],
    },
    {
        icon: 'contact_support',
        title: 'Sales Questions',
        questionList: [
            {
                question: 'When are you availabe?',
                answer: 'Monday to Friday from 10:00am to 6pm EST',
            },
            {
                question: 'When are you availabe?',
                answer: 'Monday to Friday from 10:00am to 6pm EST',
            },
        ],
    },
    {
        icon: '360',
        title: 'Usage Guide',
        questionList: [
            {
                question: 'How to install in Mac?',
                answer: "Open command line in your project's root directory and type yarn and hit enter",
            },
            {
                question: 'How to install in Mac?',
                answer: "Open command line in your project's root directory and type yarn and hit enter",
            },
        ],
    },
]

export default Faq1
