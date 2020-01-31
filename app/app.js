const axios = require('axios')
const keycloak = require('keycloak-js')
const qs = require('qs')

let authenticated = false

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function delcookie(name) {
    setcookie(name, "", -1);
}

const kcLocal = keycloak({
    'realm': 'master',
    'clientId': 'broker',
    'url': 'http://localhost:8080/auth'
})

const kcDevci = keycloak({
    'realm': 'Amplify',
    'clientId': 'newxp-addon',
    'url': 'https://my-devci.poc.learning.amplify.com/auth'
})

const kc = kcDevci

const kcInitConfig = {}

const retry = () => {
    kc.login()
}

// kc
//     .init(kcInitConfig)
//     .success(
//         (isAuthenticated) => {
//             if (!isAuthenticated) {
//                 const url = kc.createLoginUrl({
//                     idpHint: 'google',
//                     redirectUri: 'https://local.app.amplify.com/app'
//                 })

//                 window.location.href = url
//             } else {
//                 const token = kc.token
                
//                 axios({
//                         method: 'get',
//                         url: 'https://my-devci.poc.learning.amplify.com/auth/realms/Amplify/broker/google/token',
//                         headers: {
//                             'Authorization': 'Bearer ' + token
//                         }
//                     })
//                     .then((response) => {
//                         console.log(
//                             response.data
//                         )

//                         document.getElementById('google-token').innerHTML = response.data.access_token
//                         // document.getElementById('keycloak-token').innerHTML = response.data.
//                     })

//                 authenticated = true
//             }
//         }
//     )
//     .error(
//         (error) => {
//             console.log('in error')
//             console.log(error)
//         }
//     )

const elements = {
    gAccessTokenInput: document.getElementById('g-access-token'),
    exchangeGAccessToken: document.getElementById('exchange-g-access-token'),
    googleToken: document.getElementById('google-token'),
    amplifyToken: document.getElementById('amplify-token'),
    // getEntitlements: document.getElementById('get-entitlements'),
    entitlements: document.getElementById('entitlements')
}

elements.exchangeGAccessToken.onclick = async () => {
    const gAccessToken = elements.gAccessTokenInput.value

    elements.googleToken.innerHTML = gAccessToken

    const requestBody = {
        client_id: "newxp-addon",
        grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
        subject_token_type: "urn:ietf:params:oauth:token-type:access_token",
        requested_token_type: "urn:ietf:params:oauth:token-type:refresh_token",
        subject_token: gAccessToken,
        subject_issuer: "google"
    }

    let response

    try {
        response = await axios.post(
            'https://my-devci.poc.learning.amplify.com/auth/realms/Amplify/protocol/openid-connect/token',
            qs.stringify(requestBody),
        )
            
        const amplifyToken = response.data.access_token

        elements.amplifyToken.innerHTML = amplifyToken

        const entitlements = (await axios({
                mthod: 'get',
                url: 'https://api-devci.poc.learning.amplify.com/retail/api/licensing/my/class/assets',
                headers: {
                    'Authorization': `Bearer ${amplifyToken}`
                }
            })).data

        elements.entitlements.innerHTML = JSON.stringify(entitlements, null, 2)

    } catch (e) {
        console.log(e)
    }


}

