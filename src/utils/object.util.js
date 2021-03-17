export const match = (object, matcher) => {
  for(const key in matcher) {
    if(object[key] !== matcher[key]) return false;
  }
  return true;
};

export const omit = (object, toOmit) => {
  const result = {};
  for (const key in object) {
    if(!toOmit.includes(key)) {
      result[key] = object[key];
    }
  }
  return result;
};

export const pick = (object, toPick) => {
  const result = {};
  for (const key in object) {
    if(toPick.includes(key)) {
      result[key] = object[key];
    }
  }
  return result;
};