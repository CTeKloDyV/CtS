import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { addMessage, setSessionId } from '../../store/sessionSlice';
import { generateCandidateSql, translateAndRecognize } from '../../services/mockEngine';
import MessageBubble from './MessageBubble';
import type { RootState } from '../../store/store';

const ChatWindow: React.FC = () => {
  const dispatch = useDispatch();
  const { messages, sessionId } = useSelector((state: RootState) => state.session);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    dispatch(addMessage(userMessage));

    if (!sessionId) {
      const newSessionId = Math.random().toString(36).substring(7);
      dispatch(setSessionId(newSessionId));
    }

    const translatedInput = translateAndRecognize(input);
    const response = generateCandidateSql(translatedInput, sessionId || '');
    const botMessage = {
      text: `Сгенерированный SQL: ${response.candidateSql}`,
      sender: 'bot',
      sql: response.candidateSql,
      missingParams: response.missingParams,
    };
    dispatch(addMessage(botMessage));

    setInput('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h6">Чат</Typography>
      <Paper sx={{ flexGrow: 1, overflowY: 'auto', p: 2, mb: 2 }}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} text={msg.text} sender={msg.sender} />
        ))}
      </Paper>
      <Box sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button variant="contained" onClick={handleSend} sx={{ ml: 1 }}>
          Отправить
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;