import {fieldDb} from "../db/Db.js";
import {staffDb} from "../db/Db.js";

$(document).ready(function (){
    const baseURL = "http://localhost:5050/cropManagementSystem/api/v1/fields";
    var fieldCode;
    var fieldImage1;
    var fieldImage2;

    $('#see-all-fields-btn').on('click',()=>{
        fetchFields();
    });
    $('#see-all-staff-btn-in-fields-form').on('click',()=>{
        fetchStaffInFieldForm();
    });
    function fetchFields() {
        $.ajax({
            url: baseURL,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log('Fields retrieved successfully:', data);
                fieldDb.length = 0; // Clear existing fields
                fieldDb.push(...data); // Add fetched fields
                loadFieldsTable();
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch fields:', status, error);
            }
        });
    }
    function fetchStaffInFieldForm() {
        $.ajax({
            url: "http://localhost:5050/cropManagementSystem/api/v1/staff",
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log('Staff retrieved successfully:', data);
                staffDb.length = 0; // Clear existing staff
                staffDb.push(...data); // Add fetched staff
                loadStaffTableInField();
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch staff:', status, error);
            }
        });
    }
    /* Load fields to the table */
    function loadFieldsTable() {
        $('#field-table-tbody').empty();
        console.log(fieldDb);
        fieldDb.forEach((item) => {
            let staffIds = getStaffIds(item.staff);
            let record = `<tr>
                <td class="field_code_value">${item.fieldCode}</td>
                <td class="field_name_value">${item.fieldName}</td>
                <td class="field_location_value">${item.fieldLocation.x}, ${item.fieldLocation.y}</td>
                <td class="field_extent_size_value">${item.extentSize}</td>
                <td class="field_image1_value"><img src="${baseURL}/image/${item.fieldImage1}" alt="Field Image 1" style="width: 100px; height: 100px;"></td>
                <td class="field_image2_value"><img src="${baseURL}/image/${item.fieldImage2}" alt="Field Image 2" style="width: 100px; height: 100px;"></td>
                <td class="staff_id_value">${staffIds.join(", ")}</td>
            </tr>`;
            $('#field-table-tbody').append(record);
        });
    }
    /* Load fields to the table */
    function loadStaffTableInField() {
        $('#staff-table-tbody-in-field-form').empty();
        console.log(staffDb);
        staffDb.forEach((item) => {
            let record = `<tr>
                <td class="field_form_staff_id_value">${item.id}</td>
                <td class="field_form_staff_first_name_value">${item.firstName}</td>  
                <td class="field_form_staff_last_name_value">${item.lastName}</td>
                <td class="field_form_staff_designation_value">${item.designation}</td> 
                <td class="field_form_staff_contact_no_value">${item.contactNo}</td> 
                <td class="field_form_staff_email_value">${item.email}</td> 
                <td class="field_form_staff_role_value">${item.role}</td> 
            </tr>`;
            $('#staff-table-tbody-in-field-form').append(record);
        });
    }
    // Event handler for selecting the field code
    $('#field-table-tbody').on('click', 'tr', function () {
        let fieldCode = $(this).find(".field_code_value").text();
        $("#fieldCode").val(fieldCode);
    });
    // Event handler for selecting the staff id
    $('#staff-table-tbody-in-field-form').on('click', 'tr', function () {
        let staffId = $(this).find(".field_form_staff_id_value").text();
        $("#staff-id-field").val(staffId);
    });
    // Function to extract Staff IDs as an array
    function getStaffIds(staffArray) {
        return staffArray.map(staff => {
            const match = staff.match(/id=(STAFF-[\w\d]+)/); // Extract the ID using a regex
            return match ? match[1] : null; // Return the matched ID or null if no match
        }).filter(id => id); // Filter out any null values
    }
    /* Search a field from table */
    $('#field-table-tbody').on('click', 'tr', function (){
        fieldCode = $(this).find(".field_code_value").text();
        $("#fieldCode").val(fieldCode);
        $.ajax({
            url: baseURL + '/' + fieldCode,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log("Field data retrieved successfully:", data);
                // Populate the update form fields with fetched data
                $('#update-field-name').val(data.fieldName);
                $('#update-longitude').val(data.fieldLocation.x);
                $('#update-latitude').val(data.fieldLocation.y);
                $('#update-extent-size').val(data.extentSize);
                console.log(data.staff);
                let staffIds = getStaffIds(data.staff);
                console.log("Extracted Staff IDs Array:", staffIds);
                //$('#update-staff-id-field').val(staffIds);
                // Use the array for any other purpose as required
                $('#update-staff-id-field').val(staffIds.join(", "));
                // Update the image preview if an image is available
                if (data.fieldImage1) {
                    console.log(data.fieldImage1)
                    fieldImage1 = data.fieldImage1;
                    const imageUrl = baseURL + "/image/" + data.fieldImage1;
                    const img = new Image();
                    img.onload = () => {
                        $('#update-field-image1-preview').attr('src', imageUrl);
                    };
                    img.onerror = () => {
                        console.error('Error loading image1:', imageUrl);
                        // Handle error, e.g., display an error message or a default image
                        $('#update-field-image1-preview').attr('src', 'path/to/error/image.jpg');
                    };
                    img.src = imageUrl;
                } else {
                    $('#update-field-image1-preview').attr('src', '');
                }
                if (data.fieldImage2) {
                    console.log(data.fieldImage2)
                    fieldImage2 = data.fieldImage2;
                    const imageUrl = baseURL + "/image/" + data.fieldImage2;
                    const img = new Image();
                    img.onload = () => {
                        $('#update-field-image2-preview').attr('src', imageUrl);
                    };
                    img.onerror = () => {
                        console.error('Error loading image2:', imageUrl);
                        // Handle error, e.g., display an error message or a default image
                        $('#update-field-image2-preview').attr('src', 'path/to/error/image.jpg');
                    };
                    img.src = imageUrl;
                } else {
                    $('#update-field-image2-preview').attr('src', '');
                }
            },
            error: function(xhr, status, error) {
                console.error("Failed to fetch field data:", status, error);
            }
        });
    });

});