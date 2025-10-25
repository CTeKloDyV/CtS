const forbiddenTokens = ['DROP', 'INSERT', 'UPDATE', 'DELETE', 'UNION'];

export const sanitizeSql = (sql: string) => {
  let sanitizedSql = sql;
  const warnings = [];

  for (const token of forbiddenTokens) {
    const regex = new RegExp(`\\b${token}\\b`, 'gi');
    if (regex.test(sanitizedSql)) {
      warnings.push(`Forbidden token found: ${token}`);
      sanitizedSql = sanitizedSql.replace(regex, `[${token}]`);
    }
  }

  return { sanitizedSql, warnings };
};