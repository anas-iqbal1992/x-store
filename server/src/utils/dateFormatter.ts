import dateFormats from "dateformat";

export const dateFormat = (date:Date) => {
    return dateFormats(date,"mediumDate");
};

