export interface IUserContext {
	user: object, 
	setUser : Function, 
	isLoggedIn : Boolean, 
	setIsLoggedIn : Function, 
	logout : Function
}