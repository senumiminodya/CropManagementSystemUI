$(document).ready(function (){
    const baseURL = "http://localhost:5050/cropManagementSystem/api/v1/crops"
    var cropCode;
    var cropImage;
    console.log("crop controller is working")
    $('#see-all-crops-btn').on('click', () =>{
        fetchCrops();
    });
    $('#see-all-fields-btn-in-crop-form').on('click', () =>{
        fetchFieldsInCrop()
    });


    function fetchCrops() {
        $.ajax({
            url: baseURL,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Crops retrieved successfully:', data);
                loadCropTable(data);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch crops:', status, error);
            }
        });
    }
    /* Load crops to the table */
    function loadCropTable(crops) {
        $('#crop-table-tbody').empty();
        console.log(crops);
        crops.forEach((item) =>{
            let record = `<tr>
                <td class="crop_code_value">${item.cropCode}</td>
                <td class="crop_common_name_value">${item.cropCommonName}</td>
                <td class="crop_scientific_name_value">${item.cropScientificName}</td>
                <td class="crop_image_value"><img src="${baseURL}/image/${item.cropImage}" alt="Crop Image" style="width: 100px; height: 100px;"></td>
                <td class="crop_category_value">${item.category}</td>
                <td class="crop_season_value">${item.cropSeason}</td>
                <td class="field_code_value">${item.fieldCode}</td>
            </tr>`;
            $('#crop-table-tbody').append(record);
        })
    }
    /* Search a crop from table */
    $('#crop-table-tbody').on('click', 'tr', function (){
        cropCode = $(this).find(".crop_code_value").text();
        $("#crop-code").val(cropCode);
        $.ajax({
            url: baseURL + '/' + cropCode,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function(data) {
                console.log("Crop data retrieved successfully:", data);
                // Populate the update form fields with fetched data
                $('#update-crop-common-name').val(data.cropCommonName);   // Set common name
                $('#update-crop-scientific-name').val(data.cropScientificName); // Set scientific name
                $('#update-category').val(data.category);                 // Set category
                $('#update-crop-season').val(data.cropSeason);            // Set season
                $('#update-field-code').val(data.fieldCode);// Set field code
                // Update the image preview if an image is available
                if (data.cropImage) {
                    console.log(data.cropImage)
                    cropImage = data.cropImage;
                    const imageUrl = baseURL + "/image/" + data.cropImage;
                    const img = new Image();
                    img.onload = () => {
                        $('#update-crop-image-preview').attr('src', imageUrl);
                    };
                    img.onerror = () => {
                        console.error('Error loading image:', imageUrl);
                        // Handle error, e.g., display an error message or a default image
                        $('#update-crop-image-preview').attr('src', 'path/to/error/image.jpg');
                    };
                    img.src = imageUrl;
                } else {
                    $('#update-crop-image-preview').attr('src', '');
                }
            },
            error: function(xhr, status, error) {
                console.error("Failed to fetch crop data:", status, error);
                alert('Fail to fetch crop data.')
            }
        });
    });
    $('#crop-clear-btn').on('click', ()=>{
        clearUpdateSectionCropFields();
    })
    $('#crop-delete-btn').on('click', () => {
        let cropCode = $('#crop-code').val()

        $.ajax({
            url: baseURL + '/' + cropCode,
            type: 'DELETE',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Crop deleted successfully:', data);
                alert("Crop Code: " + cropCode + " record deleted successfully");
                fetchCrops();
                clearUpdateSectionCropFields();
            },
            error: function (xhr, status, error) {
                console.error('Failed to delete crop:', status, error);
                alert('Fail to delete the crop. Please try again');
            }
        });
    });
    function fetchFieldsInCrop() {
        $.ajax({
            url: "http://localhost:5050/cropManagementSystem/api/v1/fields",
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (data) {
                console.log('Fields retrieved successfully:', data);
                loadFieldTable(data);
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch fields:', status, error);
            }
        });
    }
    function loadFieldTable(fields) {
        $('#field-table-in-crop-table-tbody').empty();
        console.log(fields);

        fields.forEach((item) => {
            // Create a new record string
            let record = `<tr>
                <td class="crop_form_field_code_value">${item.fieldCode}</td>
                <td class="crop_form_field_name_value">${item.fieldName}</td>
                <td class="crop_form_field_location_value">${item.fieldLocation.x}, ${item.fieldLocation.y}</td>  
                <td class="crop_form_extent_size_value">${item.extentSize}</td>
                <td class="crop_form_field_image1_value">${item.fieldImage1}</td>
            </tr>`;

            $('#field-table-in-crop-table-tbody').append(record);
        });
    }
    $('#crop-update-btn').on('click', () => {
        let cropCode = $('#crop-code').val();
        let cropImage = $('#update-crop-image').val();

        const formData = new FormData();

        formData.append('cropCommonName', $('#update-crop-common-name').val());
        formData.append('cropScientificName', $('#update-crop-scientific-name').val());
        formData.append('category', $('#update-category').val());
        formData.append('cropSeason', $('#update-crop-season').val());
        formData.append('fieldCode', $('#update-field-code').val());

        // If a new image is provided, append it to the FormData
        if (cropImage) {
            let cropImageInput = $('#update-crop-image').get(0);
            if (cropImageInput && cropImageInput.files.length > 0) {
                formData.append('cropImage', cropImageInput.files[0]);
            }
        }

        $.ajax({
            url: baseURL + "/" + cropCode,
            type: "PUT",
            data: formData,
            contentType: false, // Important for multipart/form-data
            processData: false,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function(response) {
                console.log("Crop updated successfully:", response);
                alert("Crop Code: " + cropCode + " record updated successfully");
                fetchCrops();
                clearUpdateSectionCropFields();

            },
            error: function(xhr, status, error) {
                console.error("Failed to update crop:", status, error);
                alert("Failed to update crop. Please try again")
            }
        });
    });

    // Event handler for selecting the field code
    $('#field-table-in-crop-table-tbody').on('click', 'tr', function () {
        let fieldCode = $(this).find(".crop_form_field_code_value").text();
        $("#field-code").val(fieldCode);
    });

    $('#crop-save-btn').on('click', () => {
        const formData = new FormData();

        formData.append('cropCommonName', $('#crop-common-name').val());
        formData.append('cropScientificName', $('#crop-scientific-name').val());
        let cropImageInput = $('#crop-image').get(0);
        if (cropImageInput && cropImageInput.files.length > 0) {
            formData.append('cropImage', cropImageInput.files[0]);
        } else {
            console.error("No file selected.");
        }
        formData.append('category', $('#crop-category').val());
        formData.append('cropSeason', $('#crop-season').val());
        let fieldCode = $('#field-code').val();
        formData.append('fieldCode', fieldCode);

        $.ajax({
            url: baseURL,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            success: function (response) {
                console.log('Crop data saved successfully:', response);
                alert("Crop data saved successfully")
                fetchCrops();
                clearCropFields();
            },
            error: function (xhr, status, error) {
                console.error('Failed to save crop data:', status, error);
                alert("Failed to save crop. Please try again")
                // Handle error, e.g., display an error message
            }
        });
    });
    function clearCropFields() {
        $('#crop-common-name').val('');
        $('#crop-scientific-name').val('');
        $('#crop-image').val('');
        $('#crop-category').val('');
        $('#crop-season').val('');
        $('#field-code').val('');
    }
    function clearUpdateSectionCropFields() {
        $('#crop-code').val('');
        $('#update-crop-common-name').val('');
        $('#update-crop-scientific-name').val('');
        $('#update-crop-image-preview').attr('src', '');
        $('#update-crop-image').val('');
        $('#update-category').val('');
        $('#update-crop-season').val('');
        $('#update-field-code').val('');
    }
})