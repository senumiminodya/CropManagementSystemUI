export default class StaffModel {
    constructor(staff_id, first_name, last_name, designation, gender, joined_date, dob, address_line1, address_line2, address_line3, address_line4, address_line5, contact_no, email, role, vehicles) {
        this._staff_id = staff_id;
        this._first_name = first_name;
        this._last_name = last_name;
        this._designation = designation;
        this._gender = gender;
        this._joined_date = joined_date;
        this._dob = dob;
        this._address_line1 = address_line1;
        this._address_line2 = address_line2;
        this._address_line3 = address_line3;
        this._address_line4 = address_line4;
        this._address_line5 = address_line5;
        this._contact_no = contact_no;
        this._email = email;
        this._role = role;
        this._vehicles = vehicles;
    }

    get staff_id() {
        return this._staff_id;
    }

    set staff_id(value) {
        this._staff_id = value;
    }

    get first_name() {
        return this._first_name;
    }

    set first_name(value) {
        this._first_name = value;
    }

    get last_name() {
        return this._last_name;
    }

    set last_name(value) {
        this._last_name = value;
    }

    get designation() {
        return this._designation;
    }

    set designation(value) {
        this._designation = value;
    }

    get gender() {
        return this._gender;
    }

    set gender(value) {
        this._gender = value;
    }

    get joined_date() {
        return this._joined_date;
    }

    set joined_date(value) {
        this._joined_date = value;
    }

    get dob() {
        return this._dob;
    }

    set dob(value) {
        this._dob = value;
    }

    get address_line1() {
        return this._address_line1;
    }

    set address_line1(value) {
        this._address_line1 = value;
    }

    get address_line2() {
        return this._address_line2;
    }

    set address_line2(value) {
        this._address_line2 = value;
    }

    get address_line3() {
        return this._address_line3;
    }

    set address_line3(value) {
        this._address_line3 = value;
    }

    get address_line4() {
        return this._address_line4;
    }

    set address_line4(value) {
        this._address_line4 = value;
    }

    get address_line5() {
        return this._address_line5;
    }

    set address_line5(value) {
        this._address_line5 = value;
    }

    get contact_no() {
        return this._contact_no;
    }

    set contact_no(value) {
        this._contact_no = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }

    get vehicles() {
        return this._vehicles;
    }

    set vehicles(value) {
        this._vehicles = value;
    }
}