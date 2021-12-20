import React, { Fragment } from 'react'
import { Box, styled } from '@mui/system'
import {
    Tooltip,
    Radio,
    RadioGroup,
    Icon,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@mui/material'
import { themeColors } from '../MatxTheme/themeColors'
import { themeShadows } from '../MatxTheme/themeColors'

const ThemeName = styled('div')(({ theme }) => ({
    marginBottom: '16px',
    color: theme.palette.text.secondary
}))

const ToolbarContainer = styled('div')(() => ({
    margin: "8px",
    display: "flex",
    flexWrap: "wrap",
}))

const ToolbarContent = styled('div')(({ color, theme }) => ({
    width: 40,
    height: 40,
    margin: '8px',
    cursor: 'pointer',
    borderRadius: '4px',
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: themeShadows[3],
    background: theme.palette.primary.main,
}))

const Layout2Customizer = ({ settings, handleChange, handleControlChange }) => {
    return (
        <Fragment>
            <Box mb="16px" mx="12px">
                <ThemeName>Topbar theme</ThemeName>
                <ToolbarContainer>
                    {Object.keys(themeColors).map((color, i) => (
                        <Tooltip key={i} title={color} placement="top">
                            <ToolbarContent
                                color={color}
                                onClick={() =>
                                    handleChange(
                                        'layout2Settings.topbar.theme',
                                        color
                                    )
                                }
                            >
                                {settings.layout2Settings.topbar.theme ===
                                    color && <Icon>done</Icon>}
                                <div
                                    className={settings.themes[color].palette.type}
                                ></div>
                            </ToolbarContent>
                        </Tooltip>
                    ))}
                </ToolbarContainer>
            </Box>

            <Box mb="16px" mx="12px">
                <ThemeName>Navbar theme</ThemeName>
                <div>
                    {Object.keys(themeColors).map((color, i) => (
                        <Tooltip key={i} title={color} placement="top">
                            <div
                                onClick={() =>
                                    handleChange(
                                        'layout2Settings.navbar.theme',
                                        color
                                    )
                                }
                                sx={{ background: themeColors[color].palette.primary.main }}
                            >
                                {settings.layout2Settings.navbar.theme ===
                                    color && <Icon>done</Icon>}
                                <div
                                    className={settings.themes[color].palette.type}
                                ></div>
                            </div>
                        </Tooltip>
                    ))}
                </div>
            </Box>

            <Box mb="24px" mx="12px">
                <FormControl component="fieldset">
                    <FormLabel component="legend">Layout mode</FormLabel>
                    <RadioGroup
                        aria-label="layout-mode"
                        name="layoutMode"
                        value={settings.layout2Settings.mode}
                        onChange={handleControlChange('layout2Settings.mode')}
                    >
                        <FormControlLabel
                            value="full"
                            control={<Radio />}
                            label="Full"
                        />
                        <FormControlLabel
                            value="contained"
                            control={<Radio />}
                            label="Contained"
                        />
                        <FormControlLabel
                            value="boxed"
                            control={<Radio />}
                            label="Boxed"
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Fragment>
    )
}

export default Layout2Customizer
