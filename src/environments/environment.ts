// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  cognito: {
    userPoolId: 'ap-southeast-2_v0nfsIGYk',
    userPoolWebClientId: '5jk94crokeedda3hit7qr8f1gq',
  },
  azureurl: "https://prodsrgvmsappuser.auth.ap-southeast-2.amazoncognito.com/oauth2/authorize?identity_provider=SRG-AD&redirect_uri=https://prd-app.srgvmsapi.com/home&response_type=TOKEN&client_id=6p3v0mlhcqdh8l34m57qr1qvni&scope=email%20openid",
  azuresignout:"https://prodsrgvmsappuser.auth.ap-southeast-2.amazoncognito.com/logout?client_id=6p3v0mlhcqdh8l34m57qr1qvni&logout_uri=https://prd-app.srgvmsapi.com/logout" 
};
//https://prodsrgvmsappuser.auth.ap-southeast-2.amazoncognito.com/saml2/idpresponse
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
