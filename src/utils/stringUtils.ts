export const validateInput = (str: string): boolean => {
    const rgx = new RegExp(/^[a-z\d\-_\s]*$/i);
    return rgx.test(str);
};