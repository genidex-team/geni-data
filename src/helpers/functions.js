
class Functions {

    stringifyWithBigInt(obj) {
        return JSON.stringify(
            obj,
            (key, value) => typeof value === 'bigint' ? value.toString() : value,
            2
        );
    }
}

module.exports = new Functions();