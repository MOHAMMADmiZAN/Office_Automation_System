import React from 'react';
import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import IconTooltip from '../../src/components/molecules/IconTooltip/IconTooltip';


const Index: React.FC = (): JSX.Element => {

      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    

    return (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Notification">
                  <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'notification-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                  >
                      <Avatar sx={{ width: 32, height: 32 }}>N</Avatar>
                  </IconButton>
                </Tooltip>
              <IconTooltip />
            </Box>
        </>
    );
};

export default Index;