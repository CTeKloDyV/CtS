import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, List, ListItem, ListItemText, Chip } from '@mui/material';
import { loadTestCases } from '../../services/testsService';
import { generateCandidateSql } from '../../services/mockEngine';

const TestRunner: React.FC = () => {
  const [testCases, setTestCases] = useState<any[]>([]);
  const [results, setResults] = useState<any>({});

  useEffect(() => {
    setTestCases(loadTestCases());
  }, []);

  const handleRunTest = (testCase: any) => {
    const { candidateSql } = generateCandidateSql(testCase.query, 'test-session');
    const passed = candidateSql === testCase.goldSql;
    setResults((prevResults: any) => ({
      ...prevResults,
      [testCase.query]: { passed, actual: candidateSql },
    }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Запуск тестов</Typography>
      <List>
        {testCases.map((testCase, index) => (
          <ListItem key={index} secondaryAction={
            <Button variant="outlined" size="small" onClick={() => handleRunTest(testCase)}>
              Запуск
            </Button>
          }>
            <ListItemText
              primary={testCase.query}
              secondary={
                results[testCase.query] && (
                  <Chip
                    label={results[testCase.query].passed ? 'Пройден' : 'Провален'}
                    color={results[testCase.query].passed ? 'success' : 'error'}
                    size="small"
                  />
                )
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TestRunner;