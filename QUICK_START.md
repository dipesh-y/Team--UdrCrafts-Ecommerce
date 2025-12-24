# 🚀 QUICK START GUIDE - Shivam Bhardwaj User Account

## ⚡ Quick Facts

| Item | Details |
|------|---------|
| **Email** | shivambhardwaj75056@gmail.com |
| **Password** | Password159@ |
| **User ID** | 694ad7da5b7c7c64d7c881e0 |
| **Server** | http://localhost:8000 |
| **Status** | ✅ Running |

---

## 🔑 Login Command (Copy & Paste)

```bash
curl -X POST http://localhost:8000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"shivambhardwaj75056@gmail.com","password":"Password159@"}'
```

**This will return:**
- ✅ Access Token
- ✅ Refresh Token  
- ✅ User Info

---

## 📋 Essential Endpoints

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | /api/user/login | Login user | ❌ |
| GET | /api/user/user-details | Get profile | ✅ |
| PUT | /api/user/:id | Update profile | ✅ |
| GET | /api/product | Get products | ❌ |
| GET | /api/cart | Get cart | ✅ |
| POST | /api/cart/add | Add to cart | ✅ |
| GET | /api/myList | Get wishlist | ✅ |

---

## 🔐 Using Access Token

After login, you'll get an access token. Use it like this:

```bash
curl -X GET http://localhost:8000/api/user/user-details \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Replace `YOUR_TOKEN_HERE` with the actual token from login response.

---

## ✅ Complete API Documentation Files

1. **API_TESTING_REPORT.md** - Full API reference guide
2. **MANUAL_API_TESTING.md** - All curl command examples
3. **SETUP_COMPLETE.md** - Complete setup summary

---

## 🧪 Testing Checklist

- [ ] Login with user credentials
- [ ] Get user details using access token
- [ ] Test logout
- [ ] Explore product APIs
- [ ] Test add to cart
- [ ] Test wishlist functions
- [ ] Try password reset flow

---

## 📞 Quick Help

**Server stopped?**
```bash
cd Server && npm run dev
```

**Want to create another user?**
```bash
cd Server && node create-user.mjs
```

**Test login API?**
```bash
cd Server && node test-login.mjs
```

---

## 📊 Current Setup Status

✅ User Created  
✅ Server Running  
✅ Database Connected  
✅ All APIs Configured  
✅ Documentation Ready  

**Everything is ready for testing! 🎉**
