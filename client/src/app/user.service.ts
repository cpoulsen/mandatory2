import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
import {User} from "./login/user.model";

@Injectable()
export class UserService {
    private getUsersUrl = 'user/get';  // URL to web API
    private postUsersUrl = 'user/post';  // URL to web API
    private authenticateUserUrl = 'user/auth/';
    constructor (private http: Http) {}


    /*
     * Get blog messages from server
     */
    getUsersFromServer(): Observable<User[]> {
        return this.http.get(this.getUsersUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    loginUser(username): Observable<User[]> {
        return this.http.post(this.authenticateUserUrl + 'user', {username: username})
            .map(this.extractData)
            .catch(this.handleError);
    };

    addUser (user: User): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postUsersUrl, user, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     * Data handlers
     */
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
