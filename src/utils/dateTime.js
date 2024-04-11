export const getDateTimeStrings = () => {
    const time = new Date().toLocaleTimeString(); // Creates a time to a string
    const date = new Date().toLocaleDateString(); // Creates a date to a string

    return { time, date };
};
