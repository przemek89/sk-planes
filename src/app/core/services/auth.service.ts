import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserInfo } from "firebase-tools";

export interface Credentials {
    email: string;
    password: string;
}

@Injectable({
    providedIn:'root'
})
export class AuthService {
    readonly authState$ = this.fireAuth.authState;
    private userData: UserInfo;

    constructor(private fireAuth: AngularFireAuth) {}

    login(credentials: Credentials) {
        return this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(userCredential => this.userData = userCredential.user)
    }

    logout() {
        return this. fireAuth.signOut();
    }

    isLoggedIn() {
        return !!this.userData;
    }

    register(credentials: Credentials) {
        return this.fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    }

    get user() {
        return this.userData;
    }
}