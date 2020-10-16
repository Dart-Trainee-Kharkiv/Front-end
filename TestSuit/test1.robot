*** Settings ***
Documentation     A test suite with page tests.
Test Setup        Open Browser Disable Web Security
Test Teardown     Close Browser    
Resource          resource.robot

*** Test Cases ***



Additional data to upload with video
   When user go to calculation form
   Then data form appear
   
Ability to upload video
   When user upload video
   Then send button appeared
   
Cars speed visualization
    When user upload video
    When send button appeared
    When user choose vehicle
    When user go to calculation form
    When user click submit button
    Then green message appeared
   

