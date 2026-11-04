import { inject, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Content } from "../models/content";
import { HttpClient } from "@angular/common/http";

type FirebaseInstrument = Omit<Content, 'id'> & { id?: unknown };

@Injectable({ providedIn: "root" })
export class ContentService {

    private http = inject(HttpClient)
    private apiUrl = "https://musicschool-4a24b-default-rtdb.firebaseio.com/instruments";
    private sufix = ".json";

    getAll(): Observable<Content[]> {
        return this.http
        .get<Record<string, FirebaseInstrument> | null>(this.apiUrl + this.sufix)
            .pipe(
                map((response) => {
                    if (!response) {
                        return [];
                    }
                    return Object.entries(response).map(([id, content]) => {
                        const { id: _ignoreId, ...contentData } = content;
                        return { id, ...contentData };
                    });
                }),
            );
    }

    getById(id:string): Observable<Content> {
        return this.http.get<FirebaseInstrument | null>(`${this.apiUrl}/${id}${this.sufix}`)
        .pipe(
            map((response) => {
                if (!response) {
                    throw new Error("Conteúdo não Encontrado!");
                }
                const { id: _ignoreId, ...contentData } = response;
                return { id, ...contentData };
            })
        )
    }

    delete(id:string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufix}`);
    }
}