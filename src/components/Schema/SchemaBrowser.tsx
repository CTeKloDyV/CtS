import React, { useEffect, useState } from 'react';
import { loadSchema } from '../../services/schemaService';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const SchemaBrowser: React.FC = () => {
  const [schema, setSchema] = useState<any>(null);

  useEffect(() => {
    setSchema(loadSchema());
  }, []);

  return (
    <Box>
      <Typography variant="h6">Просмотрщик схемы</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, overflowX: 'auto', mt: 1 }}>
        {schema?.tables.map((table: any) => (
          <Paper key={table.name} sx={{ p: 2, minWidth: 200 }}>
            <Typography variant="subtitle1">{table.name}</Typography>
            <List dense>
              {table.columns.map((column: any) => (
                <ListItem key={column.name}>
                  <ListItemText primary={`${column.name}: ${column.type}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default SchemaBrowser;