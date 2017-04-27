import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
import { Chatroom } from "./chatroom/chatroom.model";

@Injectable()
export class ChatroomService {
    private getChatroomsUrl = 'chatroom/get';  // URL to web API
    private postChatroomUrl = 'chatroom/post';  // URL to web API
    constructor (private http: Http) {}

    /*
     * Get blog messages from server
     */
    getChatroomsFromServer(): Observable<Chatroom[]> {
        return this.http.get(this.getChatroomsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addChatroom(chatroom: Chatroom): Observable<Chatroom> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postChatroomUrl, chatroom, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*
     * Data handlers
     */
    private extractData(res: Response) {
        let body = res.json();
        //console.log(body);
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
        //console.log(errMsg);
        return Observable.throw(errMsg);
    }
}
