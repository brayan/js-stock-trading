export default class DateHelper {

    constructor() {
        throw new Error("DateHelper shouldn't be instantiated");
    }

    static parseTextToDate(text) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
            throw new Error("Date text should be in the format yyyy-MM-dd");
        }

        return new Date(...text.split("-").map((element, index) => {
            if (index == 1) {
                return element - 1;
            }
            return element;
        }));
    }

    static parseDateToShortDate(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

}