import * as merge from 'deepmerge';
import * as jsyaml from 'js-yaml';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';

export interface ITranslationResource {
  prefix: string;
  suffix: string;
}

export class MultiTranslateLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private resources: ITranslationResource[]
  ) {}

  public getTranslation(lang: string): Observable<any> {
    const requests = this.resources.map((resource) => {
      const isYaml = resource.suffix.includes('yaml');
      const path = resource.prefix + lang + resource.suffix;

      return this.http
        .get(path, {
          responseType: 'text',
        })
        .pipe(
          catchError(() => {
            console.error('Could not find translation file:', path);
            return of({});
          }),
          map((res) => {
            if (!res) {
              return {};
            }
            if (isYaml) {
              return jsyaml.safeLoad(res.toString());
            } else {
              return JSON.parse(res.toString());
            }
          })
        );
    });
    return forkJoin(requests).pipe(map((response) => merge.all(response)));
  }
}
