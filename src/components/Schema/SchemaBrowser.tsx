import React, { useEffect, useState } from 'react';
import { loadSchema } from '../../services/schemaService';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const SchemaBrowser: React.FC = () => {
  const [schema, setSchema] = useState<any>(null);

  useEffect(() => {
    setSchema(loadSchema());
  }, []);

  return (
    <Box>
      <Typography variant="h6">Просмотрщик схемы</Typography>
      <List>
        {schema?.tables.map((table: any) => (
          <ListItem key={table.name}>
            <ListItemText
              primary={table.name}
              secondary={
                <List>
                  {table.columns.map((column: any) => (
                    <ListItem key={column.name}>
                      <ListItemText
                        primary={`${column.name}: ${column.type}`}
                      />
                    </ListItem>
                  ))}
                </List>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SchemaBrowser;