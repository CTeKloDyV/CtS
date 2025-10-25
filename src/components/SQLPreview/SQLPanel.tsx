import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper, Button } from '@mui/material';
import type { RootState } from '../../store/store';

import { sanitizeSql } from '../../utils/sqlSanitizer';
import { Alert } from '@mui/material';

const SQLPanel: React.FC = () => {
  const messages = useSelector((state: RootState) => state.session.messages);
  const lastBotMessage = [...messages].reverse().find(msg => msg.sender === 'bot' && msg.sql);

  const { sanitizedSql, warnings } = lastBotMessage?.sql ? sanitizeSql(lastBotMessage.sql) : { sanitizedSql: '-- SQL еще не сгенерирован', warnings: [] };

  const handleCopy = () => {
    if (lastBotMessage?.sql) {
      navigator.clipboard.writeText(sanitizedSql);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Предпросмотр SQL</Typography>
      {warnings.length > 0 && (
        <Alert severity="warning" sx={{ mt: 1 }}>
          {warnings.join(', ')}
        </Alert>
      )}
      <Paper sx={{ p: 2, mt: 1, position: 'relative' }}>
        <pre>
          <code>
            {sanitizedSql}
          </code>
        </pre>
        <Button
          size="small"
          variant="outlined"
          onClick={handleCopy}
          sx={{ position: 'absolute', top: 8, right: 8 }}
          disabled={!lastBotMessage?.sql}
        >
          Копировать
        </Button>
      </Paper>
    </Box>
  );
};

export default SQLPanel;