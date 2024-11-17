export default class FieldModel {
    constructor(field_code, field_name, field_location, extent_size, field_image1, field_image2, staff) {
        this._field_code = field_code;
        this._field_name = field_name;
        this._field_location = field_location;
        this._extent_size = extent_size;
        this._field_image1 = field_image1;
        this._field_image2 = field_image2;
        this._staff = staff;
    }

    get field_code() {
        return this._field_code;
    }

    set field_code(value) {
        this._field_code = value;
    }

    get field_name() {
        return this._field_name;
    }

    set field_name(value) {
        this._field_name = value;
    }

    get field_location() {
        return this._field_location;
    }

    set field_location(value) {
        this._field_location = value;
    }

    get extent_size() {
        return this._extent_size;
    }

    set extent_size(value) {
        this._extent_size = value;
    }

    get field_image1() {
        return this._field_image1;
    }

    set field_image1(value) {
        this._field_image1 = value;
    }

    get field_image2() {
        return this._field_image2;
    }

    set field_image2(value) {
        this._field_image2 = value;
    }

    get staff() {
        return this._staff;
    }

    set staff(value) {
        this._staff = value;
    }
}