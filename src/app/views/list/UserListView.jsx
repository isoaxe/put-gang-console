import {
    Card,
    Avatar,
    Grid,
} from '@mui/material'
import React, { useState } from 'react'
import { Box, styled, useTheme } from '@mui/system'
import ReceiptsModal from './../modal/ReceiptsModal';
import { displayReceipts } from './../../utils/helpers';
import { Small, Span, Paragraph } from 'app/components/Typography'
import { themeShadows } from 'app/components/MatxTheme/themeColors'
import {
  Person
} from '@mui/icons-material';

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const ListCard = styled(Card)(({ theme }) => ({
    padding: '8px',
    position: 'relative',
    transition: 'all 0.3s ease',
    boxShadow: themeShadows[12],
    '& .card__button-group': {
        display: 'none',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        zIndex: 1,
        background: theme.palette.background.paper,
    },
    '&:hover': {
        cursor: 'pointer',
        '& .card__button-group': {
            display: 'flex',
            alignItems: 'center',
        },
    },
}))

const UserListView = ({ list = [] }) => {
    const [visible, setVisible] = useState(false);
    const [receipts, setReceipts] = useState([]);
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;
    const msSinceEpoch = Date.now();

    function actionImage (expiry) {
      const msSinceEpochToExpiry = new Date(expiry).getTime();
      if (msSinceEpoch < msSinceEpochToExpiry) {
        return <Person color="success" />;
      } else if (msSinceEpoch > msSinceEpochToExpiry) {
        return <Person color="disabled" />;
      } else {
        return <Person color="info" />;
      }
    }

    return (
        <div>
            {list.map((item, index) => (
                <ListCard
                    key={item.id}
                    elevation={3}
                    sx={{ mb: index < list.length && 2 }}
                    onClick={() => displayReceipts(item.uid, setReceipts, setVisible)}
                >
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item md={0}>
                            <FlexBox>
                                <Avatar src={item.userImage}></Avatar>
                                <Span sx={{ ml: '16px' }}>{item.userName}</Span>
                            </FlexBox>
                        </Grid>
                        <Grid item md={10}>
                            <FlexBox>
                                {actionImage(item.expiryDate)}
                                <Box ml={2}>
                                    <Paragraph sx={{ mb: 1 }}>
                                        {item.statement}
                                    </Paragraph>
                                    <Box display="flex">
                                        <Small sx={{ color: textMuted }}>
                                            Join: {new Date(item.joinDate).toLocaleString().slice(0, 10)}
                                        </Small>
                                        <Small sx={{ ml: 3, color: textMuted }}>
                                            Expire: {new Date(item.expiryDate).toLocaleString().slice(0, 10)}
                                        </Small>
                                        <Small sx={{ ml: 3, color: textMuted }}>
                                            {item.email}
                                        </Small>
                                    </Box>
                                </Box>
                            </FlexBox>
                        </Grid>
                        <Grid item md={0}>
                            <FlexBox>
                                <Avatar src={item.userImage}></Avatar>
                                <Span sx={{ ml: '16px' }}>{item.userName}</Span>
                            </FlexBox>
                        </Grid>
                    </Grid>
                </ListCard>
            ))}
            <ReceiptsModal
								visible={visible}
								setVisible={setVisible}
                receipts={receipts}
							/>
        </div>
    )
}

export default UserListView
