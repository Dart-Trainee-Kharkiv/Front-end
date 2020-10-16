*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${INDEX}            ${CURDIR}${/}../index.html
${BROWSER}          chrome 
${CALC TAB ID}      container-video-calculation
${CALC DATA FORM}   xpath=//form[@id="result-form"]
${DATA FORM DIST}   xpath=//form[@id="result-form"]/input[@name="distance"]
${DATA FORM SPEED}  xpath=//form[@id="result-form"]/input[@name="speed-limit"]
${AddFile}          ${CURDIR}${/}u4.mp4
${UploadFiletest}   css=[type='file']
${RESULT DISCRIBE}  css=[class='result-discribe']
${SELECT VEHICLE}   id:select-vehicle
${SUBMIT BUTTTON}   css=[class="btn submit"]
${WARNING RED}      css=[class="warning-red"]
${WARNING GREEN}      css=[class="warning-green"]
${COORD CAR X}      id:select_car_x
${COORD CAR Y}      id:select_car_y
${SELECT COORDS}    id:select_car_coords
${SELECT TEXT}      id:p_selected
${PROGRESS TEXT}    id:progress

${EMPTY}

*** Keywords ***

Open Browser Disable Web Security
    ${options}=  Evaluate  sys.modules['selenium.webdriver'].ChromeOptions()  sys, selenium.webdriver
    Call Method    ${options}    add_argument      disable-web-security
    Call Method    ${options}    add_argument      allow-running-insecure-content
    Create WebDriver  Chrome    chrome_options=${options}
    Go To    ${INDEX} 

Open Browser To Index Page
    Create WebDriver  Chrome    
    Go To              ${INDEX}

User go to calculation form
   Click Element     ${CALC TAB ID}
   
Data form appear
   Wait until page contains element    ${CALC DATA FORM}
   Wait until page contains element    ${DATA FORM DIST}
   Wait until page contains element    ${DATA FORM SPEED} 
    
Browser is opened to index page
    Open Browser To Indeks Page
    

User upload video    
   Choose File    ${UploadFiletest}    ${AddFile} 

Send button appeared
   Wait Until Element Is Visible   ${SELECT VEHICLE}    15
   Wait Until Element Contains     ${PROGRESS TEXT}   100   15

User Click Submit Button
   Click Element     ${SUBMIT BUTTTON}
   
Red message appeared
   Element Should Be Visible     ${WARNING RED}

Green message appeared
   Element Should Be Visible     ${WARNING GREEN}

User choose vehicle
   Input Text   ${COORD CAR X}   182
   Input Text   ${COORD CAR Y}   89
   Click Element     ${SELECT COORDS}
   Click Element     ${SELECT VEHICLE}
   Wait Until Element Is Visible    ${SELECT TEXT}    15


   