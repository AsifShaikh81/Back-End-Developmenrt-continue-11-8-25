//Topic:108:Data Validation: Built-ln Validators

/*  
1. maxlength
Definition: Validates that a string’s length does not exceed the specified maximum.
ex:
maxlength:[40,'A tour name must have less or equal then 40 characters'],

2. minlength 
Definition: Validates that a string’s length is at least the specified minimum.
ex:
minlength:[10,'A tour name must have more or equal then 10 characters']

3. max and min
max:Validates that a number is less than or equal to the specified maximum.
ex:max:[5,'Rating must be below 5.0']
min:Validates that a number is greater than or equal to the specified minimum.
ex:min:[1,'Rating must be above 1.0'],

4. enum:Ensures that a string field matches one of the given values (like multiple choice).
wx:
enum:{
values:['easy','medium','difficult'],
message:'Difficulty is either: easy, medium, difficult'
} */
