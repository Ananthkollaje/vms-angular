export const environment = {
  production: false,
  cognito: {
    userPoolId: 'ap-southeast-2_v0nfsIGYk',
    userPoolWebClientId: '5jk94crokeedda3hit7qr8f1gq',
  },
  azureurl: "https://prodsrgvmsappuser.auth.ap-southeast-2.amazoncognito.com/oauth2/authorize?identity_provider=SRG-AD&redirect_uri=https://prd-app.srgvmsapi.com/home&response_type=TOKEN&client_id=6p3v0mlhcqdh8l34m57qr1qvni&scope=email%20openid",
  azuresignout:"https://prodsrgvmsappuser.auth.ap-southeast-2.amazoncognito.com/logout?client_id=6p3v0mlhcqdh8l34m57qr1qvni&logout_uri=https://prd-app.srgvmsapi.com/logout"
};
