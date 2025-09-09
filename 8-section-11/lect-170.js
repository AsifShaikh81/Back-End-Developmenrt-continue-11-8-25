// 170. Preventing Duplicate Reviews

/* Is lecture mein duplicate reviews ko prevent karne par focus kiya gaya hai, jo ki ek tour review system mein hota hai. Speaker ne bataya ki ek real-world scenario mein, har user sirf ek specific tour par ek baar hi review de sakta hai. Agar same user ek hi tour ID ke liye multiple reviews submit karta hai, toh ye duplicate review kehlayega.

Is problem ko solve karne ke liye, lecture mein ek unique compound index create karne ka process explain kiya gaya hai. Ye index user ID aur tour ID dono ko combine karke ensure karta hai ki dono ka combination unique ho. Speaker ne emphasize kiya ki sirf in fields ko unique set karna kaafi nahi hoga, kyunki isse har tour ke liye sirf ek review aur har user ke liye sirf ek review allowed hoga. Hume user aur tour dono ka combination unique banana hai. */


//inside review model
reviewSchema.index({tour:1,user:1},{unique:true }) //lect 170

set: val => Math.round(val * 10)/10 //4.66666, 46.6666. 47, 4.7
// tour => tour id
// user => user id 