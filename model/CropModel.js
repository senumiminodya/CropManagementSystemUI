export default class CropModel {

    constructor(crop_code, crop_common_name, crop_scientific_name, crop_image, crop_category, crop_season, field_code) {
        this._crop_code = crop_code;
        this._crop_common_name = crop_common_name;
        this._crop_scientific_name = crop_scientific_name;
        this._crop_image = crop_image;
        this._crop_category = crop_category;
        this._crop_season = crop_season;
        this._field_code = field_code;
    }

    get crop_code() {
        return this._crop_code;
    }

    set crop_code(value) {
        this._crop_code = value;
    }

    get crop_common_name() {
        return this._crop_common_name;
    }

    set crop_common_name(value) {
        this._crop_common_name = value;
    }

    get crop_scientific_name() {
        return this._crop_scientific_name;
    }

    set crop_scientific_name(value) {
        this._crop_scientific_name = value;
    }

    get crop_image() {
        return this._crop_image;
    }

    set crop_image(value) {
        this._crop_image = value;
    }

    get crop_category() {
        return this._crop_category;
    }

    set crop_category(value) {
        this._crop_category = value;
    }

    get crop_season() {
        return this._crop_season;
    }

    set crop_season(value) {
        this._crop_season = value;
    }

    get field_code() {
        return this._field_code;
    }

    set field_code(value) {
        this._field_code = value;
    }
}