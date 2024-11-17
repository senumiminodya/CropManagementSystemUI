export default class VehicleModel {
    constructor(vehicle_code, licence_plate_no, vehicle_category, fuel_type, vehicle_status, staff_id, remarks) {
        this._vehicle_code = vehicle_code;
        this._licence_plate_no = licence_plate_no;
        this._vehicle_category = vehicle_category;
        this._fuel_type = fuel_type;
        this._vehicle_status = vehicle_status;
        this._staff_id = staff_id;
        this._remarks = remarks;
    }

    get vehicle_code() {
        return this._vehicle_code;
    }

    set vehicle_code(value) {
        this._vehicle_code = value;
    }

    get licence_plate_no() {
        return this._licence_plate_no;
    }

    set licence_plate_no(value) {
        this._licence_plate_no = value;
    }

    get vehicle_category() {
        return this._vehicle_category;
    }

    set vehicle_category(value) {
        this._vehicle_category = value;
    }

    get fuel_type() {
        return this._fuel_type;
    }

    set fuel_type(value) {
        this._fuel_type = value;
    }

    get vehicle_status() {
        return this._vehicle_status;
    }

    set vehicle_status(value) {
        this._vehicle_status = value;
    }

    get staff_id() {
        return this._staff_id;
    }

    set staff_id(value) {
        this._staff_id = value;
    }

    get remarks() {
        return this._remarks;
    }

    set remarks(value) {
        this._remarks = value;
    }
}