*** Settings ***
Documentation     A test suite with page tests.
Test Setup        Open Browser To Home Page
Test Teardown     Close Browser
Resource          resource.robot

*** Test Cases ***

Additional data to upload with video
   When user go to calculation form
   Then data form appear
   
Ability to upload video
   

