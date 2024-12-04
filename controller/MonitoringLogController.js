$(document).ready(function (){
    const baseURL = "http://localhost:5050/cropManagementSystem/api/v1/logs";
    let logCode;
    let observedImage;

    $('#see-all-logs-btn').on('click', ()=>{
        fetchLogs();
    });
    $('#see-all-fields-btn-in-log').on('click', ()=>{
       fetchFieldsInLogsForm();
    });
    $('#see-all-crops-btn-in-log').on('click',()=>{
        fetchCropsInLogsForm();
    });
    $('#see-all-staff-btn-in-log').on('click',()=>{
        fetchStaffInLogsForm();
    });
    function fetchLogs() {
        $.ajax({
            url: baseURL,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Logs retrieved successfully:', data);
                loadLogsTable(data);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch logs:', status, error);
                alert('Error fetching logs. Please try again later.');
            }
        });
    }
    function fetchFieldsInLogsForm() {
        $.ajax({
            url: "http://localhost:5050/cropManagementSystem/api/v1/fields",
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Fields retrieved successfully:', data);
                loadFieldTableInLogs(data);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch fields:', status, error);
                alert('Error fetching fields. Please try again later.');
            }
        });
    }
    function loadFieldTableInLogs(fields) {
        $('#field-table-in-logs-table-tbody').empty();
        console.log(fields);

        fields.forEach((item) => {
            // Create a new record string
            let record = `<tr>
                <td class="logs_form_field_code_value">${item.fieldCode}</td>
                <td class="logs_form_field_name_value">${item.fieldName}</td>
                <td class="logs_form_field_location_value">${item.fieldLocation.x}, ${item.fieldLocation.y}</td>  
                <td class="logs_form_extent_size_value">${item.extentSize}</td>
                <td class="logs_form_field_image1_value">${item.fieldImage1}</td>
            </tr>`;

            $('#field-table-in-logs-table-tbody').append(record);
        });
    }
    $('#field-table-in-logs-table-tbody').on('click', 'tr', function () {
        let fieldCode = $(this).find(".crop_form_field_code_value").text();
        $("#field-code").val(fieldCode);
    });
    function fetchCropsInLogsForm() {
        $.ajax({
            url: "http://localhost:5050/cropManagementSystem/api/v1/crops",
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Crops retrieved successfully:', data);
                loadCropTableInLogs(data);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch crops:', status, error);
                alert('Error fetching crops. Please try again later.');
            }
        });
    }
    function loadCropTableInLogs(crops) {
        $('#crop-table-tbody-in-log-form').empty();
        console.log(crops);
        crops.forEach((item) => {
            let record = `<tr>
                <td class="crop_code_value_in_logs">${item.cropCode}</td>
                <td class="crop_common_name_value_in_logs">${item.cropCommonName}</td>
                <td class="crop_scientific_name_value_in_logs">${item.cropScientificName}</td>
                <td class="crop_image_value_in_logs"><img src="${"http://localhost:5050/cropManagementSystem/api/v1/crops"}/image/${item.cropImage}" alt="Crop Image" style="width: 100px; height: 100px;"></td>
                <td class="crop_category_value_in_logs">${item.category}</td>
                <td class="crop_season_value_in_logs">${item.cropSeason}</td>
            </tr>`;
            $('#crop-table-tbody-in-log-form').append(record);
        });
    }
    function fetchStaffInLogsForm() {
        $.ajax({
            url: "http://localhost:5050/cropManagementSystem/api/v1/staff",
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Staff retrieved successfully:', data);
                loadStaffTableInLogs(data);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch staff:', status, error);
            }
        });
    }
    function loadStaffTableInLogs(staff) {
        $('#staff-table-tbody-in-log-form').empty();
        console.log(staff);
        staff.forEach((item) => {
            let record = `<tr>
                <td class="logs_form_staff_id_value">${item.id}</td>
                <td class="logs_form_staff_first_name_value">${item.firstName}</td>  
                <td class="logs_form_staff_last_name_value">${item.lastName}</td>
                <td class="logs_form_staff_designation_value">${item.designation}</td> 
                <td class="logs_form_staff_contact_no_value">${item.contactNo}</td> 
                <td class="logs_form_staff_email_value">${item.email}</td> 
                <td class="logs_form_staff_role_value">${item.role}</td> 
            </tr>`;
            $('#staff-table-tbody-in-log-form').append(record);
        });
    }
    function loadLogsTable(logs) {
        $('#logs-table-tbody').empty();
        console.log(logs);
        logs.forEach((item)=>{
            const cropIds = Array.isArray(item.crops) ? item.crops : [];
            const cropDisplay = cropIds.join(", ");
            const fieldIds = Array.isArray(item.fields) ? item.fields : [];
            const fieldDisplay = fieldIds.join(", ");
            const staffIds = Array.isArray(item.staff) ? item.staff : [];
            const staffDisplay = staffIds.join(", ");
            let record = `<tr>
                <td class="log-code-value">${item.logCode}</td>
                <td class="log-date-value">${item.logDate}</td>
                <td class="log-observation-value">${item.observation}</td>
                <td class="log-image-value"><img src="${baseURL}/image/${item.observedImage}" alt="Field Image 1" style="width: 100px; height: 100px;"></td>
                <td class="log-crops-value">${cropDisplay}</td>
                <td class="log-fields-value">${fieldDisplay}</td>
                <td class="log-staff-value">${staffDisplay}</td>
            </tr>`;
            $('#logs-table-tbody').append(record);
        });
    }
    $('#logs-table-tbody').on('click','tr', function (){
        let logCode = $(this).find(".log-code-value").text();
        $('#log-code').val(logCode);
        $.ajax({
            url: baseURL + '/' + logCode,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function(data) {
                console.log("Log data retrieved successfully:", data);
                // Populate the update form fields with fetched data
                const logDateFormatted = data.logDate ? new Date(data.logDate).toISOString().split('T')[0] : '';
                $('#update-log-date').val(logDateFormatted);
                $('#update-observation').val(data.observation);
                $('#update-fields-log').val(data.fields);
                $('#update-crops-log').val(data.crops);
                $('#update-staff-log').val(data.staff);
                // Update the image preview if an image is available
                if (data.observedImage) {
                    console.log(data.observedImage)
                    observedImage = data.observedImage;
                    const imageUrl = baseURL + "/image/" + data.observedImage;
                    const img = new Image();
                    img.onload = () => {
                        $('#update-observed-image-preview').attr('src', imageUrl);
                    };
                    img.onerror = () => {
                        console.error('Error loading observed image:', imageUrl);
                        // Handle error, e.g., display an error message or a default image
                        $('#update-observed-image-preview').attr('src', 'path/to/error/image.jpg');
                    };
                    img.src = imageUrl;
                } else {
                    $('#update-observed-image-preview').attr('src', '');
                }
            },
            error: function(xhr, status, error) {
                console.error("Failed to fetch log data:", status, error);
                alert("Failed to fetch log data. Please try again.")
            }
        });
    })
    $('#log-update-btn').on('click', () => {
        let logCode = $('#log-code').val();
        let logDate = $('#update-log-date').val();
        let logObservation = $('#update-observation').val();
        // Parse the field IDs entered as a comma-separated string into an array
        let fieldIds = $('#update-fields-log').val().split(',').map(fieldCode => fieldCode.trim());
        // Parse the field IDs entered as a comma-separated string into an array
        let cropIds = $('#update-crops-log').val().split(',').map(cropCode => cropCode.trim());
        // Parse the staff IDs entered as a comma-separated string into an array
        let staffIds = $('#update-staff-log').val().split(',').map(id => id.trim());

        // Prepare FormData
        const formData = new FormData();

        // Append JSON data
        const logData = {
            logDate: logDate,
            observation: logObservation,
            fields: fieldIds,
            crops: cropIds,
            staff: staffIds // Add staff IDs array directly here
        };
        formData.append('logData', JSON.stringify(logData));

        // Handle file inputs
        const appendFile = (inputSelector, formDataKey) => {
            const inputElement = $(inputSelector).get(0);
            if (inputElement && inputElement.files.length > 0) {
                formData.append(formDataKey, inputElement.files[0]);
            }
        };

        appendFile('#update-observed-image', 'observedImage');

        // Send AJAX request
        $.ajax({
            url: baseURL + "/" + logCode,
            type: 'PUT',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: (response) => {
                alert('Log updated successfully!');
                fetchLogs();
                clearUpdateSectionLogs();
                console.log('Response:', response);
            },
            error: (err) => {
                alert('Error updating log.');
                console.error('Error:', err);
            }
        });
    });
    function clearUpdateSectionLogs() {
        $('#log-code').val('');
        $('#update-log-date').val('');
        $('#update-observation').val('');
        $('#update-observed-image-preview').attr('src', '');
        $('#update-observed-image').val('');
        $('#update-fields-log').val('');
        $('#update-crops-log').val('');
        $('#update-staff-log').val('');
    }
    $('#log-clear-btn').on('click', ()=>{
        clearUpdateSectionLogs();
    })
    $('#log-delete-btn').on('click',()=>{
        let logCode = $('#log-code').val();

        $.ajax({
            url: baseURL + '/' + logCode,
            type: 'DELETE',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Log deleted successfully:', data);
                alert("Log Code: " + logCode + " record deleted successfully");
                fetchLogs();
                clearUpdateSectionLogs();
            },
            error: function (xhr, status, error) {
                console.error('Failed to delete log:', status, error);
                alert("Failed to delete log. Please try again.")
            }
        });
    })
    $('#log-save-btn').on('click', () => {
        // Prepare FormData
        const formData = new FormData();

        // Append JSON data
        const logData = {
            logDate: $('#log-date').val(),
            observation: $('#observation').val(),
            fields: $('#fields-log').val().split(',').map(id => id.trim()),
            crops: $('#crops-log').val().split(',').map(id => id.trim()),
            staff: $('#staff-log').val().split(',').map(id => id.trim())
        };
        formData.append('logData', JSON.stringify(logData));

        // Append image files to FormData
        const observedImage = $('#observed-image')[0].files[0];
        if (observedImage) {
            formData.append('observedImage', observedImage);
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
                alert('Log saved successfully!');
                console.log(response);
                fetchLogs();
                clearLogFields();
            },
            error: (error) => {
                alert('Error saving field!');
                console.error(error);
            }
        });
    });
    function clearLogFields() {
        $('#log-date').val('');
        $('#observation').val('');
        $('#observed-image').val('');
        $('#fields-log').val('');
        $('#crops-log').val('');
        $('#staff-log').val('');
    }
});