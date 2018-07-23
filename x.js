// /api/genres
// /api/movies/
// /api/customers
// /api/rentals
// /api

// Authentication - process of user identyfaing
// Authorization - determining if the user has the right permission to perform the given operation

// Register: POST /api/users {name, email, password}
// Login: POST /api/logins

// Section 14. TDD.

// POST /api/returns { customerId, movieId }
/*
-- negative cases
01) Retuen 401 if client is not logged in
02) Return 400 if customerId is not provided
03) Return 400 if movieId is not provided
04) Return 404 if no rental found for this customer / movie
05) Return 400 if rental already processed
-- positive cases
06) Return 200 if valid request
 - Set the return date
 - Calculate the rental fee
 - Increase the stock
 - Return the rental
*/