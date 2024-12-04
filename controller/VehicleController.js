$(document).ready(function (){
    const baseURL = "http://localhost:5050/cropManagementSystem/api/v1/vehicles";
    let vehicleCode;

    $('#see-all-vehicle-btn').on('click', ()=>{
        fetchVehicles();
    });

    function fetchVehicles() {
        $.ajax({
            url: baseURL,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Vehicles retrieved successfully:', data);
                loadVehiclesTable(data);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch vehicles:', status, error);
            }
        });
    }

    function loadVehiclesTable(vehicles) {
        $('#vehicle-table-tbody').empty();
        console.log(vehicles);

        vehicles.forEach((item) => {
            let record = `<tr>
                <td class="vehicleCode_value">${item.vehicleCode}</td>
                <td class="licensePlateNumber_value">${item.licensePlateNumber}</td>
                <td class="category_value">${item.category}</td>
                <td class="fuelType_status_value">${item.fuelType}</td>
                <td class="status_value">${item.status}</td>
                <td class="staffId_value">${item.staffId}</td>
                <td class="remarks_value">${item.remarks}</td>
            </tr>`;
            $('#vehicle-table-tbody').append(record);
        });
    }

    $('#vehicle-table-tbody').on('click', 'tr', function () {
        vehicleCode = $(this).find(".vehicleCode_value").text();
        $("#vehicle-code").val(vehicleCode);

        $.ajax({
            url: baseURL + '/' + vehicleCode,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log("Vehicle data retrieved successfully:", data);
                $('#update-licence-plate-no').val(data.licensePlateNumber);
                $('#update-vehicle-category').val(data.category);
                $('#update-fuel-type').val(data.fuelType);
                $('#update-vehicle-status').val(data.status);
                $('#update-vehicle-remarks').val(data.remarks);
                $('#update-staff-id-vehicle').val(data.staffId);
            },
            error: function (xhr, status, error) {
                console.error("Failed to fetch vehicle data:", status, error);
                alert("Failed to fetch vehicle data. Please try again.")
            }
        });
    });

    $('#vehicle-update-btn').on('click', () => {
        const vehicleCode = $('#vehicle-code').val();
        const data = {
            licensePlateNumber: $('#update-licence-plate-no').val(),
            category: $('#update-vehicle-category').val(),
            fuelType: $('#update-fuel-type').val(),
            status: $('#update-vehicle-status').val(),
            staffId: $('#update-staff-id-vehicle').val(),
            remarks: $('#update-vehicle-remarks').val()
        };

        $.ajax({
            url: baseURL + '/' + vehicleCode,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (response) {
                console.log("Vehicle updated successfully:", response);
                alert("Vehicle with Vehicle Code: " + vehicleCode + " updated successfully");
                fetchVehicles();
                clearUpdateSectionVehicleFields();

            },
            error: function (xhr, status, error) {
                console.error("Failed to update vehicle:", status, error);
                alert("Failed to update vehicle. Please try again.")
            }
        });
    });
    $('#vehicle-clear-btn').on('click', ()=>{
        clearUpdateSectionVehicleFields();
    });
    function clearUpdateSectionVehicleFields() {
        $('#vehicle-code').val('');
        $('#update-licence-plate-no').val('');
        $('#update-vehicle-category').val('');
        $('#update-fuel-type').val('');
        $('#update-vehicle-status').val('');
        $('#update-staff-id-vehicle').val('');
        $('#update-vehicle-remarks').val('');
    }
    $('#vehicle-delete-btn').on('click', ()=>{
        $.ajax({
            url: baseURL + '/' + vehicleCode,
            type: 'DELETE',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Vehicle deleted successfully:', data);
                alert("Vehicle with Vehicle Code: " + vehicleCode + " deleted successfully");
                fetchVehicles();
                clearUpdateSectionVehicleFields();
            },
            error: function (xhr, status, error) {
                console.error('Failed to delete vehicle:', status, error);
                alert("Failed to delete vehicle. Please try again.")
            }
        });
    });

    $('#see-all-staff-btn-in-vehicle-form').on('click', () => {
        fetchStaffInVehicle();
    });
    function fetchStaffInVehicle() {
        $.ajax({
            url: "http://localhost:5050/cropManagementSystem/api/v1/staff",
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Staff retrieved successfully:', data);
                loadStaffTable(data);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch staff:', status, error);
            }
        });
    }
    function loadStaffTable(staff) {
        $('#staff-table-in-vehicle-table-tbody').empty();
        console.log(staff);
        staff.forEach((item) => {
            let vehicleIds = [];
            try {
                if (Array.isArray(item.vehicles)) {
                    // Map vehicle objects to their vehicleCode
                    vehicleIds = item.vehicles.map((vehicle) => vehicle.vehicleCode);
                } else {
                    console.error("Error: vehicle data is not an array");
                }
            } catch (error) {
                console.error("Error processing vehicle data:", error);
            }
            // Create a new record string
            let record = `<tr>
                <td class="vehicle_form_staff_id_value">${item.id}</td>
                <td class="vehicle_form_staff_first_name_value">${item.firstName}</td>  
                <td class="vehicle_form_staff_last_name_value">${item.lastName}</td>
                <td class="vehicle_form_staff_designation_value">${item.designation}</td> 
                <td class="vehicle_form_staff_contact_no_value">${item.contactNo}</td> 
                <td class="vehicle_form_staff_email_value">${item.email}</td> 
                <td class="vehicle_form_staff_role_value">${item.role}</td> 
                <td class="vehicle_form_staff_vehicles_value">${vehicleIds.join(", ")}</td>
            </tr>`;

            $('#staff-table-in-vehicle-table-tbody').append(record);
        });
    }
    // Event handler for selecting the staff id
    $('#staff-table-in-vehicle-table-tbody').on('click', 'tr', function () {
        let staffId = $(this).find(".vehicle_form_staff_id_value").text();
        $("#staff-id-vehicle").val(staffId);
    });
    $('#vehicle-save-btn').on('click', () => {
        const data = {
            licensePlateNumber: $('#licence-plate-no').val(),
            category: $('#vehicle-category').val(),
            fuelType: $('#fuel-type').val(),
            status: $('#vehicle-status').val(),
            staffId: $('#staff-id-vehicle').val(),
            remarks: $('#vehicle-remarks').val()
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
                console.log('Vehicle data saved successfully:', response);
                alert("Vehicle data saved successfully");
                fetchVehicles();
                clearVehicleFields();
            },
            error: function (xhr, status, error) {
                console.error('Failed to save vehicle data:', status, error);
                alert("Faied to save vehicle data. Please try again.")
                // Handle error, e.g., display an error message
            }
        });
    });
    function clearVehicleFields(){
        $('#licence-plate-no').val('');
        $('#vehicle-category').val('');
        $('#fuel-type').val('');
        $('#vehicle-status').val('');
        $('#staff-id-vehicle').val('');
        $('#vehicle-remarks').val('');
    }

});