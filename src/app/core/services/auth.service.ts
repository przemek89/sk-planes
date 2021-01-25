import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserInfo } from "firebase-tools";

@Injectable({
    providedIn:'root'
})
export class AuthService {
    private userData: UserInfo;

    constructor(private fireAuth: AngularFireAuth) {}

    login(credentials: {email: string, password: string}) {
        return this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(userCredential => this.userData = userCredential.user)
    }

    logout() {
        return this. fireAuth.signOut();
    }

    get user() {
        return this.userData;
    }
}