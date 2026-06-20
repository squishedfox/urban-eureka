export const sort = (
  propName: string,
  newOrdinal: number,
  obj: { [key: string]: unknown },
): object => {
  if (newOrdinal > Object.keys(obj).length) {
    throw new Error(
      `newOrdinal out of range. Expected between 0 and ${Object.keys(obj).length}`,
    );
  }
  if (newOrdinal < 0) {
    throw new Error("Ordinal cannot be negative");
  }

  const newObj = {};
  const propertyNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propertyNames.length; ++i) {
    const prop = propertyNames[i];
    if (i === newOrdinal) {
      if (i !== 0) {
        Object.defineProperty(newObj, prop, {
          value: obj[prop],
          writable: true,
          enumerable: true,
        });
        // newObj[prop] = obj[prop]; // we need to push this on first;
      }
      Object.defineProperty(newObj, propName, {
        value: obj[propName],
        writable: true,
        enumerable: true,
      });
      // newObj[propName] = obj[propName];
      if (i === 0) {
        Object.defineProperty(newObj, prop, {
          value: obj[prop],
          writable: true,
          enumerable: true,
        });
        // newObj[prop] = obj[prop]; // we need to make sure this gets pushed after
      }
    } else if (prop !== propName) {
      Object.defineProperty(newObj, prop, {
        value: obj[prop],
        writable: true,
        enumerable: true,
      });
      // newObj[prop] = obj[prop];
    }
  }

  return newObj;
};
