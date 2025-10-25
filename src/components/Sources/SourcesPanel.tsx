import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import type { RootState } from '../../store/store';
import { ragLookup } from '../../services/mockEngine';

const SourcesPanel: React.FC = () => {
  const messages = useSelector((state: RootState) => state.session.messages);
  const lastBotMessage = [...messages].reverse().find(msg => msg.sender === 'bot' && msg.sql);

  let lookupResult: any = null;
  if (lastBotMessage?.sql) {
    const entities = lastBotMessage.sql.match(/FROM\s+(\w+)/i);
    if (entities) {
      lookupResult = ragLookup([entities[1]]);
    }
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Источники</Typography>
      {lookupResult?.data && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">{lookupResult.join}</Typography>
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {Object.keys(lookupResult.data[0]).map(key => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {lookupResult.data.slice(0, 3).map((row: any, index: number) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value: any, i: number) => (
                      <TableCell key={i}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default SourcesPanel;