import { Component, Output, Inject, OnInit, EventEmitter }   from '@angular/core';
import * as _ from 'lodash';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { COUNTRIES_DATA, Countries, ICountry } from '../../modules/shared/models';

@Component({
    selector: 'countries-search',
    templateUrl: './countries-search.component.html',
    styleUrls: [ './countries-search.component.css' ],	
})

export class CountriesSearchComponent implements OnInit {
    @Output() change = new EventEmitter();

    private _countriesKeys: string[];
    private _filteredResultsKeys: string[];

    public _dataSource: Observable<string[]>;
    private _token = '';

    constructor(@Inject(COUNTRIES_DATA) private _countriesData: Countries) {}

    public ngOnInit() {
        this._countriesKeys = _.keys(this._countriesData);
        this._filteredResultsKeys = this._countriesKeys;    

        this._dataSource = Observable.create((observer: any) => {
            // Runs on every search
            observer.next(this._token);
            
        }).mergeMap((token: string) => this._getCountriesAsObservable(token));
    }
 
    private _getCountriesAsObservable(token: string): Observable<any> {
        // g - global search; i - insensitive
        let query = new RegExp(token, 'ig');
    
        this._filteredResultsKeys = this._countriesKeys.filter((key: string): boolean => {

            const countryName = this._countriesData[key].name.common;
            return query.test(countryName);
        });

        this._emitChange();

        return Observable.of(
            this._filteredResultsKeys.map((key: string) => {
                return { key: key, value: this._countriesData[key] };
            })
        );
    }

    private _onTokenChange(token: string) {
        if (!token || token.trim() === '') {
            this._filteredResultsKeys = this._countriesKeys;
            this._emitChange();
            return;
        }
        
        // why??? duplicate search
        this._getCountriesAsObservable(token);
    }

    private _onSelect(selectedCountry: any) {
        if (!selectedCountry || !selectedCountry.item || !selectedCountry.item.key)
            return;

        this._filteredResultsKeys = [ selectedCountry.item.key ];
        this._emitChange();        
    }

    private _onClear() {
        this._token = '';
        this._filteredResultsKeys = this._countriesKeys;
        this._emitChange();
   }

   private _emitChange() {
       this.change.emit(this._filteredResultsKeys);
   }
}
