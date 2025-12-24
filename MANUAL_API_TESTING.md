# Manual API Testing Commands

## User Credentials
```
Email: shivambhardwaj75056@gmail.com
Password: Password159@
```

---

## 1. User Login (Get Access Token)

```bash
curl -X POST http://localhost:8000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "shivambhardwaj75056@gmail.com",
    "password": "Password159@"
  }'
```

**Expected Response:**
```json
{
  "message": "Login successfully",
  "error": false,
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "694ad7da5b7c7c64d7c881e0",
      "name": "Shivam Bhardwaj",
      "email": "shivambhardwaj75056@gmail.com",
      "role": "customer"
    }
  }
}
```

---

## 2. Get User Details (Using Access Token)

```bash
curl -X GET http://localhost:8000/api/user/user-details \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Note:** Replace `YOUR_ACCESS_TOKEN_HERE` with the actual token from login response

---

## 3. Update User Details

```bash
curl -X PUT http://localhost:8000/api/user/694ad7da5b7c7c64d7c881e0 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -d '{
    "mobile": "+91-9876543210",
    "name": "Shivam Bhardwaj"
  }'
```

---

## 4. Logout User

```bash
curl -X GET http://localhost:8000/api/user/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

---

## 5. Refresh Token (Get New Access Token)

```bash
curl -X POST http://localhost:8000/api/user/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN_HERE"
  }'
```

---

## 6. Upload User Avatar

```bash
curl -X POST http://localhost:8000/api/user/user-avatar \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -F "avatar=@/path/to/image.jpg"
```

---

## 7. Forgot Password (Request Reset)

```bash
curl -X POST http://localhost:8000/api/user/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "shivambhardwaj75056@gmail.com"
  }'
```

**Response:** OTP sent to email

---

## 8. Verify Forgot Password OTP

```bash
curl -X POST http://localhost:8000/api/user/verify-forgot-password-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "shivambhardwaj75056@gmail.com",
    "otp": "123456"
  }'
```

**Note:** Replace `123456` with the actual OTP received in email

---

## 9. Reset Password

```bash
curl -X POST http://localhost:8000/api/user/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "shivambhardwaj75056@gmail.com",
    "newPassword": "NewPassword@123"
  }'
```

---

## Product APIs (Examples)

### Get All Products
```bash
curl -X GET http://localhost:8000/api/product
```

### Get Single Product
```bash
curl -X GET http://localhost:8000/api/product/PRODUCT_ID
```

### Create Product (Admin Only)
```bash
curl -X POST http://localhost:8000/api/product \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -d '{
    "name": "Product Name",
    "price": 999,
    "description": "Product Description"
  }'
```

---

## Cart APIs

### Get Cart Items
```bash
curl -X GET http://localhost:8000/api/cart \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

### Add to Cart
```bash
curl -X POST http://localhost:8000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -d '{
    "productId": "PRODUCT_ID",
    "quantity": 1
  }'
```

---

## MyList / Wishlist APIs

### Get Wishlist
```bash
curl -X GET http://localhost:8000/api/myList \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

### Add to Wishlist
```bash
curl -X POST http://localhost:8000/api/myList/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -d '{
    "productId": "PRODUCT_ID"
  }'
```

### Remove from Wishlist
```bash
curl -X DELETE http://localhost:8000/api/myList/WISHLIST_ITEM_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

---

## Tips for Testing

1. **Always Copy the Access Token:** After login, copy the entire `accessToken` value
2. **Use Authorization Header:** Include it in all protected route requests
3. **Check Email for OTP:** When using password reset, check your email for the OTP
4. **Test with Postman:** For easier API testing, import these commands into Postman
5. **Keep Tokens Secure:** Never share your access tokens publicly

---

**All APIs are now ready for testing!**
