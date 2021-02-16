function camelToSnake (str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function snakeToCamel (str) {
  return str.replace(/([_][a-z])/g, letter => letter.toUpperCase().replace('_', ''));
}

function camelKeyToSnakeKey (obj) {
  const ret = {}
  for (const key in obj) {
    ret[camelToSnake(key)] = obj[key];
  }
  return ret;
}

function snakeKeyToCamelKey (obj) {
  const ret = {}
  for (const key in obj) {
    ret[snakeToCamel(key)] = obj[key];
  }
  return ret;
}

export { camelToSnake, camelKeyToSnakeKey, };
export { snakeToCamel, snakeKeyToCamelKey, };
