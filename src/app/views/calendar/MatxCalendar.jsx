import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@mui/material'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import CalendarHeader from './CalendarHeader'
import * as ReactDOM from 'react-dom'
import { getAllEvents, updateEvent } from './CalendarService'
import EventEditorDialog from './EventEditorDialog'
import { Box, styled } from '@mui/system'
import moment from 'moment'
import { convertHexToRGB } from 'utils'
import Breadcrumb from 'app/components/Breadcrumb/Breadcrumb'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        margin: '30px',
        [theme.breakpoints.down('sm')]: {
            margin: '16px',
        },
    },
}))

const CalendarRoot = styled('div')(({ theme }) => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    '& .rbc-event': {
        background: `rgba(${convertHexToRGB(theme.palette.primary.main)},1)`,
    },
    '& .rbc-selected': {
        background: `rgba(${convertHexToRGB(theme.palette.secondary.main)},1)`,
    },
    '& .rbc-calendar': {
        height: 'auto',
        flexGrow: 1,
    },
    '& .rbc-header': {
        padding: '12px 16px !important',
        '& a': {
            paddingBottom: '8px !important',
        },
        '& span': {
            fontSize: '15px !important',
            fontWeight: 500,
        },
    },
}))

const localizer = momentLocalizer(moment)
const DragAndDropCalendar = withDragAndDrop(Calendar)
let viewList = Object.keys(Views).map((key) => Views[key])

const MatxCalendar = () => {
    const [events, setEvents] = useState([])
    const [newEvent, setNewEvent] = useState(null)
    const [shouldShowEventDialog, setShouldShowEventDialog] = useState(false)
    const headerComponentRef = useRef(null)

    const updateCalendar = () => {
        getAllEvents()
            .then((res) => res.data)
            .then((events) => {
                events = events?.map((e) => ({
                    ...e,
                    start: new Date(e.start),
                    end: new Date(e.end),
                }))
                setEvents(events)
            })
    }

    const handleDialogClose = () => {
        setShouldShowEventDialog(false)
        updateCalendar()
    }
    const handleEventMove = (event) => {
        handleEventResize(event)
    }
    const handleEventResize = (event) => {
        updateEvent(event).then(() => {
            updateCalendar()
        })
    }
    const openNewEventDialog = ({ action, ...event }) => {
        if (action === 'doubleClick') {
            setNewEvent(event)
            setShouldShowEventDialog(true)
        }
    }
    const openExistingEventDialog = (event) => {
        setNewEvent(event)
        setShouldShowEventDialog(true)
    }

    useEffect(() => {
        updateCalendar()
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Calendar' }]} />
            </div>

            <Button
                sx={{ mb: 2 }}
                variant="contained"
                color="secondary"
                onClick={() =>
                    openNewEventDialog({
                        action: 'doubleClick',
                        start: new Date(),
                        end: new Date(),
                    })
                }
            >
                Add Event
            </Button>
            <CalendarRoot>
                <Box ref={headerComponentRef} />
                <DragAndDropCalendar
                    selectable
                    localizer={localizer}
                    events={events}
                    onEventDrop={handleEventMove}
                    resizable
                    onEventResize={handleEventResize}
                    defaultView={Views.MONTH}
                    defaultDate={new Date()}
                    startAccessor="start"
                    endAccessor="end"
                    views={viewList}
                    step={60}
                    showMultiDayTimes
                    components={{
                        toolbar: (props) => {
                            return headerComponentRef.current ? (
                                ReactDOM.createPortal(
                                    <CalendarHeader {...props} />,
                                    headerComponentRef.current
                                )
                            ) : (
                                <div>Header component not found</div>
                            )
                        },
                    }}
                    // onNavigate={handleNavigate}
                    onSelectEvent={(event) => {
                        openExistingEventDialog(event)
                    }}
                    onSelectSlot={(slotDetails) =>
                        openNewEventDialog(slotDetails)
                    }
                />
            </CalendarRoot>
            {shouldShowEventDialog && (
                <EventEditorDialog
                    handleClose={handleDialogClose}
                    open={shouldShowEventDialog}
                    event={newEvent}
                />
            )}
        </Container>
    )
}

export default MatxCalendar
