import {equipmentDb} from "../db/Db.js";
import {staffDb} from "../db/Db.js";
import {fieldDb} from "../db/Db.js";

$(document).ready(function () {
    const baseURL = "http://localhost:5050/cropManagementSystem/api/v1/equipments";
    let equipmentId;

    $('#see-all-equipments-btn').on('click', () => {
        fetchEquipments();
    });
    $('#see-all-staff-btn-in-equipment-form').on('click', () => {
        fetchStaffInEquipment();
    });
    $('#see-all-fields-btn-in-equipment-form').on('click', () => {
        fetchFieldsInEquipment();
    });

    function fetchEquipments() {
        $.ajax({
            url: baseURL,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Equipments retrieved successfully:', data);
                equipmentDb.length = 0; // Clear existing equipments
                equipmentDb.push(...data); // Add fetched equipments
                loadEquipmentTable();
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch equipments:', status, error);
            }
        });
    }

    function loadEquipmentTable() {
        $('#equipment-table-tbody').empty();
        console.log(equipmentDb);

        equipmentDb.forEach((item) => {
            let record = `<tr>
                <td class="equipment_id_value">${item.equipmentId}</td>
                <td class="equipment_name_value">${item.name}</td>
                <td class="equipment_type_value">${item.type}</td>
                <td class="equipment_status_value">${item.status}</td>
                <td class="equipment_staff_id_value">${item.staffId}</td>
                <td class="equipment_field_code_value">${item.fieldCode}</td>
            </tr>`;
            $('#equipment-table-tbody').append(record);
        });
    }

    $('#equipment-table-tbody').on('click', 'tr', function () {
        //let index = $(this).index();
        equipmentId = $(this).find(".equipment_id_value").text();
        $("#equipment-id").val(equipmentId);

        $.ajax({
            url: baseURL + '/' + equipmentId,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log("Equipment data retrieved successfully:", data);
                $('#update-equipment-name').val(data.name);
                $('#update-equipment-type').val(data.type);
                $('#update-equipment-status').val(data.status);
                $('#update-staff-id-equipment').val(data.staffId);
                $('#update-field-code-equipment').val(data.fieldCode);
            },
            error: function (xhr, status, error) {
                console.error("Failed to fetch equipment data:", status, error);
            }
        });
    });
    function fetchFieldsInEquipment() {
        $.ajax({
            url: "http://localhost:5050/cropManagementSystem/api/v1/fields",
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Fields retrieved successfully:', data);
                fieldDb.length = 0;
                fieldDb.push(...data);
                loadFieldTable();
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch fields:', status, error);
            }
        });
    }
    function loadFieldTable() {
        $('#field-table-in-equipment-table-tbody').empty();
        console.log(fieldDb);
        fieldDb.forEach((item) => {
            // Create a new record string
            let record = `<tr>
                <td class="equipment_form_field_code_value">${item.fieldCode}</td>
                <td class="equipment_form_field_name_value">${item.fieldName}</td>
                <td class="equipment_form_field_location_value">${item.fieldLocation.x}, ${item.fieldLocation.y}</td>  
                <td class="equipment_form_extent_size_value">${item.extentSize}</td>
                <td class="equipment_form_field_image">${item.fieldImage1}</td> 
            </tr>`;

            $('#field-table-in-equipment-table-tbody').append(record);
        });
    }
    function fetchStaffInEquipment() {
        $.ajax({
            url: "http://localhost:5050/cropManagementSystem/api/v1/staff",
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Staff retrieved successfully:', data);
                staffDb.length = 0;
                staffDb.push(...data);
                loadStaffTable();
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch staff:', status, error);
            }
        });
    }
    function loadStaffTable() {
        $('#staff-table-in-equipment-table-tbody').empty();
        console.log(staffDb);
        staffDb.forEach((item) => {
            // Create a new record string
            let record = `<tr>
                <td class="equipment_form_staff_id_value">${item.id}</td>
                <td class="equipment_form_staff_first_name_value">${item.firstName}</td>  
                <td class="equipment_form_staff_last_name_value">${item.lastName}</td>
                <td class="equipment_form_staff_designation_value">${item.designation}</td> 
                <td class="equipment_form_staff_contact_no_value">${item.contactNo}</td> 
                <td class="equipment_form_staff_email_value">${item.email}</td> 
                <td class="equipment_form_staff_role_value">${item.role}</td> 
            </tr>`;

            $('#staff-table-in-equipment-table-tbody').append(record);
        });
    }
    // Event handler for selecting the field code
    $('#field-table-in-equipment-table-tbody').on('click', 'tr', function () {
        let fieldCode = $(this).find(".equipment_form_field_code_value").text();
        $("#field-code-equipment").val(fieldCode);
    });
    // Event handler for selecting the staff id
    $('#staff-table-in-equipment-table-tbody').on('click', 'tr', function () {
        let staffId = $(this).find(".equipment_form_staff_id_value").text();
        $("#staff-id-equipment").val(staffId);
    });
    $('#equipment-clear-btn').on('click', ()=>{
       clearUpdateSectionEquipmentFields();
    });

    $('#equipment-delete-btn').on('click', () => {
        $.ajax({
            url: baseURL + '/' + equipmentId,
            type: 'DELETE',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Equipment deleted successfully:', data);
                alert("Equipment with ID: " + equipmentId + " deleted successfully");
                fetchEquipments();
                clearUpdateSectionEquipmentFields();
            },
            error: function (xhr, status, error) {
                console.error('Failed to delete equipment:', status, error);
            }
        });
    });

    $('#equipment-update-btn').on('click', () => {
        const equipmentId = $('#equipment-id').val();
        const data = {
            name: $('#update-equipment-name').val(),
            type: $('#update-equipment-type').val(),
            status: $('#update-equipment-status').val(),
            staffId: $('#update-staff-id-equipment').val(),
            fieldCode: $('#update-field-code-equipment').val()
        };

        $.ajax({
            url: baseURL + '/' + equipmentId,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (response) {
                console.log("Equipment updated successfully:", response);
                alert("Equipment with ID: " + equipmentId + " updated successfully");
                fetchEquipments();
                clearUpdateSectionEquipmentFields();

            },
            error: function (xhr, status, error) {
                console.error("Failed to update equipment:", status, error);
            }
        });
    });

    $('#equipment-save-btn').on('click', () => {
        const data = {
            name: $('#equipment-name').val(),
            type: $('#equipment-type').val(),
            status: $('#equipment-status').val(),
            staffId: $('#staff-id-equipment').val(),
            fieldCode: $('#field-code-equipment').val()
        };

        $.ajax({
            url: baseURL,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (response) {
                console.log('Equipment data saved successfully:', response);
                alert("Equipment data saved successfully");
                fetchEquipments();
                clearEquipmentFields();
            },
            error: function (xhr, status, error) {
                console.error('Failed to save equipment data:', status, error);
                // Handle error, e.g., display an error message
            }
        });
    });
    function clearUpdateSectionEquipmentFields() {
        $('#equipment-id').val('');
        $('#update-equipment-name').val('');
        $('#update-equipment-type').val('');
        $('#update-equipment-status').val('');
        $('#update-staff-id-equipment').val('');
        $('#update-field-code-equipment').val('');
    }

    function clearEquipmentFields() {
        $('#equipment-name').val('');
        $('#equipment-type').val('');
        $('#equipment-status').val('');
        $('#staff-id-equipment').val('');
        $('#field-code-equipment').val('');
    }


});