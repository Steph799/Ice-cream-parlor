exports.connect = 'Connected to MongoDB...' //index
exports.connectionFailed = `Could not connect to MongoDB:`
exports.port = process.env.PORT || 4000;
exports.portListening = `Listening on port`

exports.minPrice=5
exports.maxRate=5
exports.reqString = { type: String, required: true }
exports.reqName = { type: String, required: true, minLength: 2, maxLength: 50 }

exports.minId = 10000000 //cart
exports.maxId = 99999999999
//exports.reqNum = { type: Number, min: 1, required: true };
exports.descriptionMaxLen=100

exports.re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //for email validation
exports.matchedEmailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
exports.emailFormatError = 'Please fill a valid email address'
exports.idMsg ="Value must be an integer"

exports.successfulPurchase="order succeeded"
exports.processFailed = 'Something failed during the process:'

exports.noToken = 'User Access denied. no token provided' //middleware/auth

exports.invalid = 'Invalid username or password.'; // routes/auth
exports.userExist = 'User is already in the system'
exports.successfulRegistered = 'User successfully registered'
exports.defaultRounds=10
exports.CreditCardLength= 19 //1111-2222-3333-4444
exports.successfulUserDelete ="The user has been successfully removed"
exports.msgSent = "Message has been send successfully"
exports.orderDeleted = "order successfully deleted"