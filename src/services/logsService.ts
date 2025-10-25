export const persistLog = (log: any) => {
  // Mock implementation
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push(log);
  localStorage.setItem('logs', JSON.stringify(logs));
};

export const loadLogs = () => {
  // Mock implementation
  return JSON.parse(localStorage.getItem('logs') || '[]');
};