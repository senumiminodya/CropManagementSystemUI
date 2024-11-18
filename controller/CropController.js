import {cropDb} from "../db/Db.js";
import {fieldDb} from "../db/Db.js";

$(document).ready(function (){
    var baseURL = "http://localhost:5050/cropManagementSystem/api/v1/crops"
    console.log("crop controller is working")
    $('#see-all-crops-btn').on('click', () =>{
        fetchCrops();
    });
    $('#see-all-fields-btn-in-crop-form').on('click', () =>{
        fetchFields()
    });


    function fetchCrops() {
        $.ajax({
            url: baseURL,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log('Crops retrieved successfully:', data);
                cropDb.length = 0; // Clear existing crops
                cropDb.push(...data); // Add fetched crops
                loadCropTable();
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch crops:', status, error);
            }
        });
    }
    /* Load crops to the table */
    function loadCropTable() {
        $('#crop-table-tbody').empty();
        console.log(cropDb);
        cropDb.forEach((item) =>{
            let record = `<tr>
                <td class="crop_code_value">${item.cropCode}</td>
                <td class="crop_common_name_value">${item.cropCommonName}</td>
                <td class="crop_scientific_name_value">${item.cropScientificName}</td>
                <td class="crop_image_value">${item.cropImage}</td>
                <td class="crop_category_value">${item.category}</td>
                <td class="crop_season_value">${item.cropSeason}</td>
                <td class="field_code_value">${item.fieldCode}</td>
            </tr>`;
            $('#crop-table-tbody').append(record);
        })
    }
    function fetchFields() {
        $.ajax({
            url: "http://localhost:5050/cropManagementSystem/api/v1/fields",
            type: 'GET',
            dataType: 'json',
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
        $('#field-table-in-crop-table-tbody').empty();
        console.log(fieldDb);
        fieldDb.forEach((item) => {
            let record = `<tr>
                <td class="crop_form_field_code_value">${item.fieldCode}</td>
                <td class="crop_form_field_name_value">${item.fieldName}</td>
                <td class="crop_form_field_location_value">${item.fieldLocation}</td>
                <td class="crop_form_extent_size_value">${item.extentSize}</td>
                <td class="crop_form_field_image1_value">${item.fieldImage1}</td>
                <td class="crop_form_field_image2_value">${item.fieldImage2}</td>
                <td class="crop_form_staff_value">${item.staff}</td>
            </tr>`;
            $('#field-table-in-crop-table-tbody').append(record);
        })
    }
})