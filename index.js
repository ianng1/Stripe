const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


//you need to make your own secret key from the Stripe API
SECRET_KEY = 'sk_test_51I4KDmI4nXzWcWYxyC6qIep83cj1F20UQWsGeu59G5IWNhjlFoF49A7TpLc7ivAwBmdUu9W3GIJL5rT2IAQIzgvq00nU6oYisN'
const stripe = require('stripe', SECRET_KEY)


exports.completePaymentWithStripe = functions.https.onRequest((request, response) => {
    stripe.charges.create({
        amount:request.body.amount,
        currency:request.body.currency,
        source:'tok_mastercard'
    }).then(charge => {
        response.send(charge);
    })
    .catch(error => {
        console.log(error);
    })
})

