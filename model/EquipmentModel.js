export default class EquipmentModel {

    constructor(equipment_id, equipment_name, equipment_type, equipment_status, staff_id, field_code) {
        this._equipment_id = equipment_id;
        this._equipment_name = equipment_name;
        this._equipment_type = equipment_type;
        this._equipment_status = equipment_status;
        this._staff_id = staff_id;
        this._field_code = field_code;
    }

    get equipment_id() {
        return this._equipment_id;
    }

    set equipment_id(value) {
        this._equipment_id = value;
    }

    get equipment_name() {
        return this._equipment_name;
    }

    set equipment_name(value) {
        this._equipment_name = value;
    }

    get equipment_type() {
        return this._equipment_type;
    }

    set equipment_type(value) {
        this._equipment_type = value;
    }

    get equipment_status() {
        return this._equipment_status;
    }

    set equipment_status(value) {
        this._equipment_status = value;
    }

    get staff_id() {
        return this._staff_id;
    }

    set staff_id(value) {
        this._staff_id = value;
    }

    get field_code() {
        return this._field_code;
    }

    set field_code(value) {
        this._field_code = value;
    }
}