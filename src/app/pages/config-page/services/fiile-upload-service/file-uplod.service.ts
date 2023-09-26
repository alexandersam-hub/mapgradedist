import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {config} from "../../../../../config";
import {Observable} from "rxjs";
@Injectable({ providedIn: 'root' })
export class FileUploadService {
  constructor(private readonly http: HttpClient) {}
  private upload(file: FormData) {
    return this.http.post<{name:string}>(config.urlUploadFile, file);
  }

  public saveImages(file: File, type: string):Observable<{ name:string }> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('type', type);
   return this.upload(formData);
  }
}
