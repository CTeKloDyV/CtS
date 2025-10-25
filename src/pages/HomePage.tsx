import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Container, Tabs, Tab, Drawer, IconButton, Paper } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import ChatWindow from '../components/Chat/ChatWindow';
import SQLPanel from '../components/SQLPreview/SQLPanel';
import ValidationPanel from '../components/Validation/ValidationPanel';
import SchemaBrowser from '../components/Schema/SchemaBrowser';
import SourcesPanel from '../components/Sources/SourcesPanel';
import LogsViewer from '../components/Logs/LogsViewer';
import TestRunner from '../components/TestRunner/TestRunner';
import { StyledPaper } from '../styles';

const drawerWidth = 300;

const HomePage: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Безопасный Агент Запросов
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <SchemaBrowser />
          <SourcesPanel />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, transition: (theme) => theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }), marginLeft: `-${drawerWidth}px`, ...(drawerOpen && {
          transition: (theme) => theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        }) }}
      >
        <Toolbar />
        <Container maxWidth={false} sx={{ flexGrow: 1, py: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StyledPaper>
              <ChatWindow />
            </StyledPaper>
            <ValidationPanel />
            <AppBar position="static" color="default">
              <Tabs value={tab} onChange={handleChange} indicatorColor="primary" textColor="inherit">
                <Tab label="Предпросмотр SQL" />
                <Tab label="Просмотрщик логов" />
                <Tab label="Запуск тестов" />
              </Tabs>
            </AppBar>
            {tab === 0 && <StyledPaper><SQLPanel /></StyledPaper>}
            {tab === 1 && <StyledPaper><LogsViewer /></StyledPaper>}
            {tab === 2 && <StyledPaper><TestRunner /></StyledPaper>}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;