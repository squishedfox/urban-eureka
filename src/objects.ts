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

  const propertyNames = Object.getOwnPropertyNames(obj);

  const newObj = {};
  let inserted = false;
  let writeIndex = 0;

  for (let i = 0; i < propertyNames.length; ++i) {
    const prop = propertyNames[i];
    if (prop === propName) {
      continue;
    }

    if (!inserted && writeIndex === newOrdinal) {
      Object.defineProperty(newObj, propName, {
        value: obj[propName],
        enumerable: true,
        writable: true,
      });

      inserted = true;
      ++writeIndex;
    }

    Object.defineProperty(newObj, prop, {
      value: obj[prop],
      enumerable: true,
      writable: true,
    });

    ++writeIndex;
  }

  if (!inserted) {
    Object.defineProperty(newObj, propName, {
      value: obj[propName],
      enumerable: true,
      writable: true,
    });
  }

  return newObj;
};
