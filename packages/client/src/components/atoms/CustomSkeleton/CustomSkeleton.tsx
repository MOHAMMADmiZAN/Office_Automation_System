import React from 'react';
import { Avatar, Box, Skeleton, Typography } from "@mui/material";

const ROW_COUNT = 10;

export interface ICustomSkeleton {
    withAvatar?: boolean
}

const CustomSkeleton: React.FC<ICustomSkeleton> = ({ withAvatar = false }): JSX.Element => {
    const arr = new Array(ROW_COUNT).fill(1)
    return (
        <Box data-testid="wrapper">
            {withAvatar && <Box data-testid="avatar" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Skeleton variant="circular" style={{ marginRight: 20 }}>
                    <Avatar />
                </Skeleton>
                <Skeleton width="100%" />
            </Box>}
            <Box width="100%" data-testid="skeleton-wrapper">
                {arr.map((_, index: number) => <Typography data-testid={index} variant="h3" key={index}><Skeleton /></Typography>)}
            </Box>
        </Box>
    )
}
export default CustomSkeleton;