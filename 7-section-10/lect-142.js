//* lect 142:Sending JWT via Cookie
const cookieOptions = {
  // -------------------------------------------------------------  converting to miliseconds
  expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),

  httpOnly: true,
};
if (process.env.NODE_ENV === 'production') cookieOptions.secure = true; // enable only in production mode
res.cookie('jwt', token, cookieOptions);
userM.password = undefined; // remove password from output

//   JWT_COOKIE_EXPIRES_IN = 90 // inside congig env

/* 
  actual aise bhej te hai cookie
  uppar jo code wo humne ek function banake use kiya hai 
  res.cookie('jwt',token,{
  expires: new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), //converting to milisecond
  secure:true,v// to enable
  httpOnly: true // sirf http connection mein chalega

  }) */

//code explanation from co pilot
/* 
  Absolutely — let’s break it down step by step so you can see exactly what’s happening here.  

This snippet is from an **Express.js** server, and it’s using the `res.cookie()` method to send a cookie to the client’s browser.  

---

### **Code Breakdown**
```js
res.cookie('jwt', token, {
  expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
  secure: true,
  httpOnly: true
});
```

#### 1. **`res.cookie('jwt', token, {...})`**
- **`'jwt'`** → The name of the cookie. Here it’s storing a **JWT (JSON Web Token)**.
- **`token`** → The actual JWT value you want to store in the cookie.

---

#### 2. **`expires: new Date(...)`**
- Sets the **expiry date** for the cookie.
- `Date.now()` → Current timestamp in milliseconds.
- `process.env.JWT_COOKIE_EXPIRES_IN` → A value (in days) from your environment variables.
- `* 24 * 60 * 60 * 1000` → Converts days into milliseconds.
- Example: If `JWT_COOKIE_EXPIRES_IN = 7`, the cookie will expire in **7 days**.

---

#### 3. **`secure: true`**
- The cookie will **only** be sent over **HTTPS** connections.
- This helps prevent attackers from intercepting the cookie over insecure HTTP.

---

#### 4. **`httpOnly: true`**
- The cookie **cannot** be accessed via JavaScript in the browser (`document.cookie` won’t show it).
- This protects against **XSS (Cross-Site Scripting)** attacks, because malicious scripts can’t steal it.

---

### **Why This Is Done**
This is a **secure way** to store authentication tokens:
- **JWT** is stored in a cookie instead of localStorage/sessionStorage (safer against XSS).
- `httpOnly` + `secure` makes it much harder for attackers to steal the token.
- The expiry ensures the token isn’t valid forever.

---

💡 **Pro tip:** In production, you might also want to add:
```js
sameSite: 'strict'
```
to help prevent **CSRF (Cross-Site Request Forgery)** attacks.

---

If you want, I can also **draw a quick flow diagram** showing how this cookie is created, sent to the browser, and then used for authentication in future requests. Would you like me to do that?
 */
