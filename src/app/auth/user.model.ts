//This model is used to help store user data, and helps validate tokens
export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    // To gain acces the _token. You are required to do it in a way that will check the validity.
    private _tokenExpirationDate: Date
    ) {}

//  this getter looks like a function but will be accessed as a property.
get token()  {
  if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
    return null;
  }
  return this._token;
}

}
