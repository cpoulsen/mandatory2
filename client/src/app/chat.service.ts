import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
import { Chat } from "./chat/chat.model";
import { Chatroom } from "./chatroom/chatroom.model";
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
    private getChatUrl = 'message/get';  // URL to web API
    private postChatUrl = 'message/post';  // URL to web API
    private getChatroomsUrl = 'chatroom/get';  // URL to web API
    private postChatroomUrl = 'chatroom/post';  // URL to web API
    constructor (private http: Http) {}
    private url = window.location.origin;
    private socket;


    getChatMessagesFromServer(selectedChatRoom): Observable<Chat[]> {
        let observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('refreshMessages', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    getInitialMessages(selectedChatRoom): Observable<Chat[]> {
        return this.http.get(this.getChatUrl + '/' + selectedChatRoom)
            .map(this.extractData)
            .catch(this.handleError);
    }


    addChatMessage(chat: Chat): Observable<Chat> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.postChatUrl, chat, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*
     * Get blog messages from server
     */

    getChatroomsFromServer(): Observable<Chatroom[]> {
        let observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('refreshChat', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
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
        return body || { };
    }
    private handleError (error: Response | any) {
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
