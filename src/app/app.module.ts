import { NgModule }          from '@angular/core';
import { MaterialModule }    from '@angular/material';

import { SharedModule,
         SpeakerModule }     from './modules';

import { AppComponent }      from './app.component';
import { CountryDetailsComponent,
         CountryFlagComponent,
         CountryOutlineComponent,
         CountryBordersComponent,
         CountriesBarComponent,
         CountryGalleryComponent,
         CoatOfArmsComponent,
         WorldFlagsMapComponent,
         CountriesSearchComponent,
         AnthemComponent }   from './components';

import { A2ToCountryPipe,
         A2ToCapitalPipe,
         A2ToContinentPipe,
         A2ToAnthemPipe,
         A2ToAreaPipe,
         A2ToPopulationPipe,
         A2ToWikiLinkPipe,
         CommaStylePipe,
         A3ToA2Pipe,
         MapToArrayPipe,
         SafePipe, }         from './pipes';

import { WikipediaService }  from './services';
import { ANTHEMS_DATA }      from './models';
import { AnthemsData }       from '../assets/data';

const modules = [
    SharedModule,
    SpeakerModule,
    MaterialModule.forRoot()
];

const components = [
    CountryDetailsComponent,
    CountryFlagComponent,
    CountryOutlineComponent,
    CountryBordersComponent,
    CountriesBarComponent,
    CountryGalleryComponent,
    CoatOfArmsComponent,
    WorldFlagsMapComponent,
    CountriesSearchComponent,
    AnthemComponent,
    AppComponent
];

const directives = [];

const pipes = [
    A2ToCapitalPipe,
    A2ToContinentPipe,
    A2ToCountryPipe,
    A2ToAnthemPipe,
    A2ToAreaPipe,
    A2ToPopulationPipe,
    A2ToWikiLinkPipe,
    A3ToA2Pipe,
    MapToArrayPipe,
    CommaStylePipe,
    SafePipe
];

const providers = [
    { provide: ANTHEMS_DATA, useValue: AnthemsData },
    WikipediaService,
]

@NgModule({
    declarations: [
      ...components,
      ...directives,
      ...pipes
    ],
    imports: [
      ...modules
    ],
    providers: [
      ...providers
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
