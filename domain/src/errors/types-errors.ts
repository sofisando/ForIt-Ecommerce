//user
export class UserNotFoundError extends Error {}
export class UnauthorizedError extends Error {}
export class UserAlreadyExistsError extends Error {}
//product
export class ProductNotFoundError extends Error {}
//category
export class CategoryAlreadyExistsError extends Error {}
export class CategoryNotFoundError extends Error {}
//password
export class IncorrectPasswordError extends Error {}
export class PasswordReuseError extends Error {}
//cart
export class CartAlreadyExistsError extends Error{}
export class CartNotFoundError extends Error{}