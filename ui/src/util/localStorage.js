import dayjs from "dayjs"

const get = (key) => {
    const object = JSON.parse(localStorage[key] || 'null')
    if (object && !isExpired(object.expires)) {
        return object.value;
    }
}

const set = (key, value, {expirationValue, expirationUnits = 'm'}, forceSet) => {
    const current = JSON.parse(localStorage[key] || 'null');
    if (!current || forceSet || isExpired(current.expires)) {
        const object = { value, expires: dayjs().add(expirationValue, expirationUnits)}
        localStorage[key] = JSON.stringify(object);
    }
}

const isExpired = (expires, time) => {
    return dayjs(time).isAfter(dayjs(expires))
}

export {get, set}