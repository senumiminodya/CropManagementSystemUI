$(document).ready(function (){
    const baseURL = "http://localhost:5050/cropManagementSystem/api/v1/fields";
    let fieldCode;
    let fieldImage1;
    let fieldImage2;

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
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Fields retrieved successfully:', data);
                loadFieldsTable(data);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch fields:', status, error);
                alert('Error fetching fields. Please try again later.');
            }
        });
    }
    function fetchStaffInFieldForm() {
        $.ajax({
            url: "http://localhost:5050/cropManagementSystem/api/v1/staff",
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Staff retrieved successfully:', data);
                loadStaffTableInField(data);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch staff:', status, error);
            }
        });
    }
    /* Load fields to the table */
    function loadFieldsTable(fields) {
        $('#field-table-tbody').empty();
        console.log(fields);
        fields.forEach((item) => {
            const staffIds = Array.isArray(item.staff) ? item.staff : [];
            const staffDisplay = staffIds.join(", "); // Convert to comma-separated string for display
            let record = `<tr>
                <td class="field_code_value">${item.fieldCode}</td>
                <td class="field_name_value">${item.fieldName}</td>
                <td class="field_location_value">${item.fieldLocation.x}, ${item.fieldLocation.y}</td>
                <td class="field_extent_size_value">${item.extentSize}</td>
                <td class="field_image1_value"><img src="${baseURL}/image/${item.fieldImage1}" alt="Field Image 1" style="width: 100px; height: 100px;"></td>
                <td class="field_image2_value"><img src="${baseURL}/image/${item.fieldImage2}" alt="Field Image 2" style="width: 100px; height: 100px;"></td>
                <td class="staff_id_value">${staffDisplay}</td>
            </tr>`;
            $('#field-table-tbody').append(record);
        });
    }
    /* Load fields to the table */
    function loadStaffTableInField(staff) {
        $('#staff-table-tbody-in-field-form').empty();
        console.log(staff);
        staff.forEach((item) => {
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
        fieldCode = $(this).find(".field_code_value").text();
        $("#fieldCode").val(fieldCode);
    });
    // Function to extract Staff IDs as an array
    function getStaffIds(staffArray) {
        if (!Array.isArray(staffArray)) {
            console.error("Invalid staff data. Expected an array.");
            return [];
        }
        return staffArray
            .map((staffString) => {
                const match = staffString.match(/id='(STAFF-[\w\d]+)'/); // Extract id using regex
                return match ? match[1] : null; // Return id if matched, otherwise null
            })
            .filter((id) => id !== null); // Filter out null values
    }
    /* Search a field from table */
    $('#field-table-tbody').on('click', 'tr', function (){
        let fieldCode = $(this).find(".field_code_value").text();
        $("#fieldCode").val(fieldCode);
        $.ajax({
            url: baseURL + '/' + fieldCode,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function(data) {
                console.log("Field data retrieved successfully:", data);
                // Populate the update form fields with fetched data
                $('#update-field-name').val(data.fieldName);
                $('#update-longitude').val(data.fieldLocation.x);
                $('#update-latitude').val(data.fieldLocation.y);
                $('#update-extent-size').val(data.extentSize);
                $('#update-staff-id-field').val(data.staff);
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
                alert("Failed to fetch field data. Please try again.")
            }
        });
    });
    $('#field-clear-btn').on('click', ()=>{
        clearUpdateSectionFieldFields();
    });
    $('#field-delete-btn').on('click', () => {
        let fieldCode = $('#fieldCode').val();

        $.ajax({
            url: baseURL + '/' + fieldCode,
            type: 'DELETE',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Field deleted successfully:', data);
                alert("Field Code: " + fieldCode + " record deleted successfully");
                fetchFields();
                clearUpdateSectionFieldFields();
            },
            error: function (xhr, status, error) {
                console.error('Failed to delete field:', status, error);
                alert("Failed to delete field. Please try again.")
            }
        });
    });
    $('#field-update-btn').on('click', () => {
        let fieldCode = $('#fieldCode').val();
        let fieldName = $('#update-field-name').val();
        let longitude = parseFloat($('#update-longitude').val());
        let latitude = parseFloat($('#update-latitude').val());
        let extentSize = parseFloat($('#update-extent-size').val());

        // Parse the staff IDs entered as a comma-separated string into an array
        let staffIds = $('#update-staff-id-field').val().split(',').map(id => id.trim());

        // Prepare FormData
        const formData = new FormData();

        // Append JSON data
        const fieldData = {
            fieldName: fieldName,
            fieldLocation: {
                x: longitude,
                y: latitude
            },
            extentSize: extentSize,
            staff: staffIds // Add staff IDs array directly here
        };
        formData.append('fieldData', JSON.stringify(fieldData));

        // Handle file inputs
        const appendFile = (inputSelector, formDataKey) => {
            const inputElement = $(inputSelector).get(0);
            if (inputElement && inputElement.files.length > 0) {
                formData.append(formDataKey, inputElement.files[0]);
            }
        };

        appendFile('#update-field-image1', 'fieldImage1');
        appendFile('#update-field-image2', 'fieldImage2');

        // Send AJAX request
        $.ajax({
            url: baseURL + "/" + fieldCode,
            type: 'PUT',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: (response) => {
                alert('Field updated successfully!');
                fetchFields();
                clearUpdateSectionFieldFields();
                console.log('Response:', response);
            },
            error: (err) => {
                alert('Error updating field.');
                console.error('Error:', err);
            }
        });
    });
    $('#field-save-btn').on('click', () => {
        // Create a FormData object to handle file uploads
        const formData = new FormData();

        // Collect field data
        const fieldData = {
            fieldName: $('#field-name').val(),
            fieldLocation: {
                x: parseFloat($('#longitude').val()),
                y: parseFloat($('#latitude').val())
            },
            extentSize: parseFloat($('#extent-size').val()),
            staff: $('#staff-id-field').val().split(',').map(id => id.trim()) // Assuming staff IDs are comma-separated
        };

        // Append JSON field data to FormData
        formData.append('fieldData', JSON.stringify(fieldData));

        // Append image files to FormData
        const fieldImage1 = $('#field-image1')[0].files[0];
        const fieldImage2 = $('#field-image2')[0].files[0];
        if (fieldImage1) {
            formData.append('fieldImage1', fieldImage1);
        }
        if (fieldImage2) {
            formData.append('fieldImage2', fieldImage2);
        }

        // Send the AJAX request
        $.ajax({
            url: baseURL,
            type: 'POST',
            data: formData,
            processData: false, // Necessary for FormData
            contentType: false, // Necessary for FormData
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: (response) => {
                alert('Field saved successfully!');
                console.log(response);
                fetchFields();
                clearFields();
            },
            error: (error) => {
                alert('Error saving field!');
                console.error(error);
            }
        });
    });
    function clearUpdateSectionFieldFields() {
        $('#fieldCode').val('');
        $('#update-field-name').val('');
        $('#update-longitude').val('');
        $('#update-latitude').val('');
        $('#update-extent-size').val('');
        $('#update-field-image1-preview').attr('src', '');
        $('#update-field-image1').val('');
        $('#update-field-image2-preview').attr('src', '');
        $('#update-field-image2').val('');
        $('#update-staff-id-field').val('');
    }
    function clearFields() {
        $('#field-name').val('');
        $('#longitude').val('');
        $('#latitude').val('');
        $('#extent-size').val('');
        $('#field-image1').val('');
        $('#field-image2').val('');
        $('#staff-id-field').val('');
    }

});