//this function sets the new value and if is the same returns the old value
export const handleLocalStorage = (key: string, value?: any) => {
  //1. get previous value
  const previusValue = localStorage.getItem(key);
  //2. stringify for easy compare
  const newvalue = JSON.stringify(value);

  if (value) {
    //3. check if the value is already cached
    if (previusValue === newvalue) {
      return previusValue;
    }
    localStorage.setItem(key, newvalue);
    return newvalue;
  } else {
    if (typeof previusValue === "string") {
      return JSON.parse(previusValue);
    } else {
      return previusValue;
    }
  }
};
