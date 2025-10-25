import { loadSchema } from './schemaService';
import customers from '../data/lookups/customers.json';
import units from '../data/lookups/units.json';
import statuses from '../data/lookups/statuses.json';

export const generateCandidateSql = (text: string, sessionId: string) => {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('customer')) {
    return {
      candidateSql: `SELECT * FROM customers;`,
    };
  }
  if (lowerText.includes('order')) {
    return {
      candidateSql: `SELECT * FROM orders;`,
      missingParams: [{ name: 'статус', type: 'string', options: ['в ожидании', 'отправлен', 'доставлен', 'отменен'] }],
    };
  }
  return {
    candidateSql: `-- No SQL generated for: "${text}"`,
  };
};

export const validateParams = (sql: string, missingParams: any[]) => {
  // In a real app, this would be a more complex validation.
  // For now, we'll just return the first missing param.
  if (missingParams.length > 0) {
    return {
      followUp: `Какой ${missingParams[0].name}?`,
    };
  }
  return {};
};

export const ragLookup = (entities: string[]) => {
  const lowerEntities = entities.map(e => e.toLowerCase());
  const lookups: any = {
    customers,
    units,
    statuses,
  };

  for (const entity of lowerEntities) {
    if (lookups[entity]) {
      return {
        join: `JOIN ${entity} ON ...`,
        data: lookups[entity],
      };
    }
  }

  return {};
};

export const translateAndRecognize = (text: string) => {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('покажи') && lowerText.includes('клиентов')) {
    return 'Show me all customers';
  }
  if (lowerText.includes('покажи') && lowerText.includes('заказы')) {
    return 'Show me all orders';
  }
  return text;
};