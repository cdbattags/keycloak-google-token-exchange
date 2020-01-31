function onOpen(e) {
    console.log("OPENING")
    
    SlidesApp
        .getUi()
        .createAddonMenu()
        .addItem('Log in to Keycloak', 'showSidebar')
        .addToUi()
}

function onInstall(e) {
    console.log("INSTALL")

    onOpen(e)
}

function showSidebar() {
    console.log("SHOW SIDEBAR")

    var ui = 
        HtmlService
            .createHtmlOutputFromFile('sidebar')
            .setTitle('Log in to Keycloak')

    SlidesApp
        .getUi()
        .showSidebar(ui)
}

function login() {
    var gAccessToken = ScriptApp.getOAuthToken()

    Logger.log(gAccessToken)

    return gAccessToken

    // var formData = {
    //     client_id: "newxp-addon",
    //     grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
    //     subject_token_type: "urn:ietf:params:oauth:token-type:access_token",
    //     requested_token_type: "urn:ietf:params:oauth:token-type:access_token",
    //     subject_token: gAccessToken,
    //     subject_issuer: "google"
    // }

    // var options = {
    //     method: 'post',
    //     payload: formData
    // }

    // var response = UrlFetchApp.fetch(
    //     'https://my-devci.poc.learning.amplify.com/auth/realms/Amplify/protocol/openid-connect/token',
    //     options
    // )

    // Logger.log(response)

    // if (response.getResponseCode() === 200) {
    //     return response
    // } else {
    //     throw new Error(response)
    // }
}