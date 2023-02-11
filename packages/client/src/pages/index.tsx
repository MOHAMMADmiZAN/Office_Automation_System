import React from 'react';
import MainLayout from '../layouts/mainlayout/MainLayout'

const Index: React.FC = (): JSX.Element => {

      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      //const open = Boolean(anchorEl);
      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

 

    return (
        <>

          <MainLayout />

        </>
    );
};

export default Index;