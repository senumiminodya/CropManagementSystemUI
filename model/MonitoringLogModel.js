export default class MonitoringLogModel {
    constructor(log_code, log_date, observation, observed_image, fields, crops, staff) {
        this._log_code = log_code;
        this._log_date = log_date;
        this._observation = observation;
        this._observed_image = observed_image;
        this._fields = fields;
        this._crops = crops;
        this._staff = staff;
    }

    get log_code() {
        return this._log_code;
    }

    set log_code(value) {
        this._log_code = value;
    }

    get log_date() {
        return this._log_date;
    }

    set log_date(value) {
        this._log_date = value;
    }

    get observation() {
        return this._observation;
    }

    set observation(value) {
        this._observation = value;
    }

    get observed_image() {
        return this._observed_image;
    }

    set observed_image(value) {
        this._observed_image = value;
    }

    get fields() {
        return this._fields;
    }

    set fields(value) {
        this._fields = value;
    }

    get crops() {
        return this._crops;
    }

    set crops(value) {
        this._crops = value;
    }

    get staff() {
        return this._staff;
    }

    set staff(value) {
        this._staff = value;
    }
}