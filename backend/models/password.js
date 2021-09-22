const passwordValidator = require('password-validator')
 
// Create a schema
const passwordSchema = new passwordValidator()
 
// Add properties to it
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(25)                                   // Maximum length 25
.has().uppercase(1)                             // Must have 1 uppercase letter
.has().lowercase(1)                             // Must have 1 lowercase letter
.has().digits(1)                                // Must have at least 1 digit
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123'])  // Blacklist these values

module.exports = passwordSchema
