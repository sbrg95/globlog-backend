/* eslint-disable no-param-reassign */
export const cleanResponse = (response) => {
  let cleaned;
  if (Array.isArray(response)) {
    cleaned = [...response];
    cleaned.forEach((doc) => {
      doc.id = doc._id;
      delete doc._id;
      delete doc.__v;
    });
  } else {
    cleaned = { ...response };
    cleaned.id = cleaned._id;
    delete cleaned._id;
    delete cleaned.__v;
  }

  return cleaned;
};

// Merge a `source` object to a `target` recursively
export const merge = (target, source) => {
  /* 
    Iterate through `source` properties and if an `Object` 
    set property to merge of `target` and `source` properties
  */
  Object.keys(source).forEach((key) => {
    if (source[key] instanceof Object) {
      Object.assign(source[key], merge(target[key], source[key]));
    }
  });

  // Join `target` and modified `source`
  Object.assign(target || {}, source);
  return target;
};
