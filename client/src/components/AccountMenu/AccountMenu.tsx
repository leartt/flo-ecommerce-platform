import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { AccountCircleRounded } from '@mui/icons-material';
import NavigationLink from '@src/components/NavigationLink';
import { NavigationLinkType } from '@src/shared/navigation-links';

const AccountMenu = ({ items }: { items: NavigationLinkType[] }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log('REDNERING ACCOUNT MENU');

  return (
    <>
      <IconButton
        onClick={e => {
          /* need to stop event propagation. 
            causing bug when clicked on smartphone navmenu */
          e.stopPropagation();
          handleClick(e);
        }}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <AccountCircleRounded />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {items.map(item => {
          return (
            <MenuItem key={item.path}>
              <NavigationLink to={item.path} name={item.name} />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default AccountMenu;
