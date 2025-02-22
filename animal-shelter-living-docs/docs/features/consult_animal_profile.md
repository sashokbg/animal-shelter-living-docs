# Feature: Consult Animal Profile

## Background:

* Given the user is on the "Animal List" page

## Scenario: View an animal's profile

* When the user selects an animal from the list
* Then the system should display the animal's profile
* And the profile should include the animal's name, species, age, and any additional notes

## Scenario: Attempt to view a profile of a non-existent animal

* When the user tries to access a profile that does not exist
* Then the system should display an error message indicating the profile is unavailable 