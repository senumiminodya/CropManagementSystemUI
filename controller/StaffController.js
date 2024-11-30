$(document).ready(function (){
    const baseURL = "http://localhost:5050/cropManagementSystem/api/v1/staff";
    let staffId;

    $('#see-all-staff-btn').on('click', () => {
        fetchStaff();
    });

    function fetchStaff() {
        $.ajax({
            url: baseURL,
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
        $('#staff-table-tbody').empty();
        console.log(staff);

        staff.forEach((item) => {
            let record = `<tr>
                <td class="staff_id_value">${item.id}</td>
                <td class="staff_firstName_value">${item.firstName}</td>
                <td class="staff_lastName_value">${item.lastName}</td>
                <td class="staff_designation_value">${item.designation}</td>
                <td class="staff_gender_value">${item.gender}</td>
                <td class="staff_joinedDate_value">${item.joinedDate}</td>
                <td class="staff_dob_value">${item.dob}</td>
                <td class="staff_addressLine1_value">${item.addressLine1}</td>
                <td class="staff_addressLine2_value">${item.addressLine2}</td>
                <td class="staff_addressLine3_value">${item.addressLine3}</td>
                <td class="staff_addressLine4_value">${item.addressLine4}</td>
                <td class="staff_addressLine5_value">${item.addressLine5}</td>
                <td class="staff_contactNo_value">${item.contactNo}</td>
                <td class="staff_email_value">${item.email}</td>
                <td class="staff_role_value">${item.role}</td>
            </tr>`;
            $('#staff-table-tbody').append(record);
        });
    }
    $('#staff-table-tbody').on('click', 'tr', function () {
        staffId = $(this).find(".staff_id_value").text();
        $("#staff-id").val(staffId);

        $.ajax({
            url: baseURL + '/' + staffId,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log("Staff data retrieved successfully:", data);
                // Format the dates before setting them into the date fields
                const joinedDateFormatted = data.joinedDate ? new Date(data.joinedDate).toISOString().split('T')[0] : '';
                const dobFormatted = data.dob ? new Date(data.dob).toISOString().split('T')[0] : '';
                $('#update-first-name').val(data.firstName);
                $('#update-last-name').val(data.lastName);
                $('#update-designation').val(data.designation);
                $('#update-gender').val(data.gender);
                $('#update-joined-date').val(joinedDateFormatted);
                $('#update-dob').val(dobFormatted);
                $('#update-address-line1').val(data.addressLine1);
                $('#update-address-line2').val(data.addressLine2);
                $('#update-address-line3').val(data.addressLine3);
                $('#update-address-line4').val(data.addressLine4);
                $('#update-address-line5').val(data.addressLine5);
                $('#update-contact-no').val(data.contactNo);
                $('#update-email').val(data.email);
                $('#update-role').val(data.role);
            },
            error: function (xhr, status, error) {
                console.error("Failed to fetch staff data:", status, error);
            }
        });
    });
    $('#staff-update-btn').on('click', () => {
        const staffId = $('#staff-id').val();
        const data = {
            firstName: $('#update-first-name').val(),
            lastName: $('#update-last-name').val(),
            designation: $('#update-designation').val(),
            gender: $('#update-gender').val(),
            joinedDate: $('#update-joined-date').val(),
            dob: $('#update-dob').val(),
            addressLine1: $('#update-address-line1').val(),
            addressLine2: $('#update-address-line2').val(),
            addressLine3: $('#update-address-line3').val(),
            addressLine4: $('#update-address-line4').val(),
            addressLine5: $('#update-address-line5').val(),
            contactNo: $('#update-contact-no').val(),
            email: $('#update-email').val(),
            role: $('#update-role').val()
        };
        $.ajax({
            url: baseURL + '/' + staffId,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (response) {
                console.log("Staff updated successfully:", response);
                alert("Staff with ID: " + staffId + " updated successfully");
                fetchStaff();
                clearUpdateSectionStaffFields();
            },
            error: function (xhr, status, error) {
                console.error("Failed to update staff:", status, error);
            }
        });
    });
    $('#staff-delete-btn').on('click', () => {
        $.ajax({
            url: baseURL + '/' + staffId,
            type: 'DELETE',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Staff deleted successfully:', data);
                alert("Staff with ID: " + staffId + " deleted successfully");
                fetchStaff();
                clearUpdateSectionStaffFields();
            },
            error: function (xhr, status, error) {
                console.error('Failed to delete staff:', status, error);
            }
        });
    });
    $('#staff-save-btn').on('click', () => {
        const data = {
            firstName: $('#first-name').val(),
            lastName: $('#last-name').val(),
            designation: $('#designation').val(),
            gender: $('#gender').val(),
            joinedDate: $('#joined-date').val(),
            dob: $('#dob').val(),
            addressLine1: $('#address-line1').val(),
            addressLine2: $('#address-line2').val(),
            addressLine3: $('#address-line3').val(),
            addressLine4: $('#address-line4').val(),
            addressLine5: $('#address-line5').val(),
            contactNo: $('#contact-no').val(),
            email: $('#email').val(),
            role: $('#role').val()
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
                console.log('Staff data saved successfully:', response);
                alert("Staff data saved successfully");
                fetchStaff();
                clearStaffFields();
            },
            error: function (xhr, status, error) {
                console.error('Failed to save staff data:', status, error);
                // Handle error, e.g., display an error message
            }
        });
    });
    $('#staff-clear-btn').on('click', ()=>{
        clearUpdateSectionStaffFields();
    });
    function clearUpdateSectionStaffFields() {
        $("#staff-id").val('');
        $('#update-first-name').val('');
        $('#update-last-name').val('');
        $('#update-designation').val('');
        $('#update-gender').val('');
        $('#update-joined-date').val('');
        $('#update-dob').val('');
        $('#update-address-line1').val('');
        $('#update-address-line2').val('');
        $('#update-address-line3').val('');
        $('#update-address-line4').val('');
        $('#update-address-line5').val('');
        $('#update-contact-no').val('');
        $('#update-email').val('');
        $('#update-role').val('');
    }
    function clearStaffFields() {
        $('#first-name').val('');
        $('#last-name').val('');
        $('#designation').val('');
        $('#gender').val('');
        $('#joined-date').val('');
        $('#dob').val('');
        $('#address-line1').val('');
        $('#address-line2').val('');
        $('#address-line3').val('');
        $('#address-line4').val('');
        $('#address-line5').val('');
        $('#contact-no').val('');
        $('#email').val('');
        $('#role').val('');
    }
});