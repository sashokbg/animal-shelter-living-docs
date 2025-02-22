# Feature: Add Pet Picture

## Background:

* Given the user is on the "Add New Animal" page

## Scenario: Successfully add a pet picture

* When the user uploads a picture of the pet
* And submits the form
* Then the system should confirm the picture has been uploaded
* And the picture should be displayed on the animal's profile page

## Scenario: Upload an unsupported file format

* When the user tries to upload a file that is not an image
* Then the system should display an error message indicating the file format is not supported

## Scenario: Upload a large image file

* When the user tries to upload an image that exceeds the size limit
* Then the system should display an error message indicating the file is too large

## Notes

- Supported image formats should include JPEG, PNG, and GIF.
- The system should provide a preview of the image before submission.
- Ensure that the image upload process is user-friendly and provides feedback on success or failure. 