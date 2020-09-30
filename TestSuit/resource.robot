*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary

*** Variables ***
${INDEX}            file:///D:/Users/MarkG/SummerPracticeDataArt/project/git/index.html
${BROWSER}          chrome  
${CALC TAB ID}      container-video-calculation
${CALC DATA FORM}   xpath=//form[@id="result-form"]
${DATA FORM DIST}   xpath=//form[@id="result-form"]/input[@name="distance"]
${DATA FORM SPEED}  xpath=//form[@id="result-form"]/input[@name="speed-limit"]
${AddFile}          D:/Users/MarkG/SummerPracticeDataArt/project/git/video/cars2.mp4
${UploadFiletest}   css=[type='file']
${RESULT DISCRIBE}  css=[class='result-discribe']
${SUBMIT BUTTTON}   css=[class="btn submit"]
${WARNING RED}   css=[class="warning-red"]

${EMPTY}

*** Keywords ***

Open Browser Disable Web Security
    ${options}=  Evaluate  sys.modules['selenium.webdriver'].ChromeOptions()  sys, selenium.webdriver
    Call Method    ${options}    add_argument      disable-web-security
    Call Method    ${options}    add_argument      allow-running-insecure-content
    Create WebDriver  Chrome    chrome_options=${options}
    Go To    ${INDEX} 

Open Browser To Home Page
    Open Browser       ${BROWSER}

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

First frame appeared
   Wait Until Element Is Visible     ${RESULT DISCRIBE}    10

User Click Submit Button
   Click Element     ${SUBMIT BUTTTON}
   
Red message appeared
   Element Should Be Visible     ${WARNING RED}
   