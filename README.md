# Ice-cream-parlor
A website of an Ice cream parlor and manages all shipments, employees, messages and comments.

Follow the steps in order to run the application:

- Create a .env file and write there your jwtPrivateKey and your DB connection string
- On postman, make a post request to the users api in order to create an admin. be aware that before the call, you must cancel the condition of 
authentication & authorization [userAuth, admin] on the users route (in the post method).
The schema of the user should be:
{
    "firstName": "your first name",
    "lastName": "your last name",
    "id": your Id,
    "email": "your mail",
    "phone": { "code": "your code (like 052)", "phoneNum": your phone number},
    "role": "your role",
    "birthDate": "your birthdate in a format like this: 1989-02-24",
    "hireDate": "your hire Date in a format like this: 2019-12-11",
    "address": {"streetName": "your streen name", "houseNum": your house number, "city": "your city", "zipCode": your zip code (optional)},
    "password": "your password",
    "isAdmin": true
}
