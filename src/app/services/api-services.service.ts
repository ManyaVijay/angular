import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  static getMonitorData() {
    throw new Error('Method not implemented.');
  }

  filePath: any[]=[];

  constructor(private http:HttpClient) { }

  getMonitorData(fileNames: string[]): Observable<any[]> {
    const requests = fileNames.map(fileName => {
      const filePath = `assets/JSONmonitors/${fileName}.json`;
      return this.http.get(filePath)
                      .pipe(catchError(this.handleError))

    });
    return forkJoin(requests);
  }


  handleError(error: any){
    return throwError(  error.message || "Server Error")
  }
}
