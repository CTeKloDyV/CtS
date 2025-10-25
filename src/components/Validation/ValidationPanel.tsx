import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, Chip } from '@mui/material';
import type { RootState } from '../../store/store';
import { addMessage } from '../../store/sessionSlice';
import { validateParams } from '../../services/mockEngine';

const ValidationPanel: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.session.messages);
  const lastBotMessage = [...messages].reverse().find(msg => msg.sender === 'bot' && msg.missingParams);

  const handleOptionClick = (option: string) => {
    const followUpMessage = { text: option, sender: 'user' };
    dispatch(addMessage(followUpMessage));
  };

  return (
    <Box>
      <Typography variant="h6">Валидация и уточняющие вопросы</Typography>
      {lastBotMessage && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle1">
            {validateParams(lastBotMessage.sql, lastBotMessage.missingParams).followUp}
          </Typography>
          <Box sx={{ mt: 1 }}>
            {lastBotMessage.missingParams[0].options.map((option: string) => (
              <Chip
                key={option}
                label={option}
                onClick={() => handleOptionClick(option)}
                sx={{ mr: 1 }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ValidationPanel;