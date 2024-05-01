export class User{
    id : number = -1;
    userName ?: string;
    firstName ?: string;
    lastName ?: string;
    email ?: string;
    imageUrl ?: string;

    constructor(
        id ?: number, 
        userName ?: string,
        firstName ?: string,
        lastName ?: string,
        email ?: string,
        imageURL ?: string,
    ) {
        this.id = id;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.imageUrl = imageURL;
    }
}