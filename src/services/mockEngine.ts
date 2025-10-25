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
      candidateSql: `SELECT * FROM orders WHERE status = '{status}';`,
      missingParams: [{ name: 'статус', type: 'string', options: ['в ожидании', 'отправлен', 'доставлен', 'отменен'] }],
    };
  }
  return {
    candidateSql: `-- No SQL generated for: "${text}"`,
  };
};

export const validateParams = (sql: string, missingParams: any[]) => {
  if (missingParams.length > 0) {
    const param = missingParams[0];
    let followUp = `Какой ${param.name}?`;
    let quickOptions = param.options || [];

    switch (param.type) {
      case 'date':
        followUp = 'Пожалуйста, введите дату в формате YYYY-MM-DD.';
        break;
      case 'timezone':
        followUp = 'Пожалуйста, укажите часовой пояс.';
        quickOptions = ['UTC', 'PST', 'EST'];
        break;
      case 'unit':
        followUp = 'Пожалуйста, укажите единицу измерения.';
        quickOptions = units.map(u => u.name);
        break;
      case 'email':
        followUp = 'Пожалуйста, введите действительный адрес электронной почты.';
        break;
    }

    return {
      followUp,
      quickOptions,
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

export const fillParams = (sql: string, params: { [key: string]: string }) => {
  let newSql = sql;
  for (const key in params) {
    newSql = newSql.replace(`{${key}}`, params[key]);
  }
  return newSql;
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