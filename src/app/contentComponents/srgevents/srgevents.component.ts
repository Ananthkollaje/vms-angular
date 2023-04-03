import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { GetconfigService } from '../../services/getconfig.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventServiceService } from '../../services/event-service.service';
@Component({
  selector: 'app-srgevents',
  templateUrl: './srgevents.component.html',
  styleUrls: ['./srgevents.component.scss']
})
export class SrgeventsComponent implements OnInit {
  
  constructor(private dialog: MatDialog,  private router: Router, private getConfig: GetconfigService, private fb: FormBuilder,
    private spinner: NgxSpinnerService, private eventService: EventServiceService) { }
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  selectedDrp = 'srg';
  countryDrp = "australia";
  newPromo: boolean = false;
  brandDrp: string = "";
  extentDaysValue: any[] = ["1 to 7 Days"];
  tolerantDaysValue: any[] = ["14 to 30 Days"];
  brandDrpValues: any[] = ["Spotlight-AU", "Spotlight-NZ", "Spotlight-MY", "Spotlight-SG", "Anaconda-AU", "Mountain Design-AU", "Harris Scarfe-AU"]
  startdate = new FormControl(new Date());
  enddate = new FormControl(new Date());
  saveEvent: boolean = true;
  promoFromEvent: boolean = false;
  brandFromEvent: string = "";
  eventCodeFromEvent: string = "";
  eventCodeValue: string = "";
  eventIdValue: string = "";
  eventNameFromEvent: string = "";
  eventNameValue: string = "";
  eventExtendableValue: string = "";
  eventToleranceValue: string = "";
  eventExtendableFromEvent: string = "";
  eventToleranceFromEvent: string = "";
  eventStartDateFromEvent = new FormControl(new Date());
  eventEndDateFromEvent= new FormControl(new Date());
  
  getCountry:any[] = [];
  getCountryValues:any[]=[];
  getBrandValues:any[] = [];
  getPromoType:any[] = [];
  getPromoTypeValue:any[] = [];
  getToleranceValues: any[] = [];
  getExtendible: any[] = [];
  financialyearValues1: any[] = [];
  toleranceDays: string = "";
  promoTypeDrp: string = "";
  financialyear: string = "";

  country: string = "";
  brand: string = "";
  createEventForm: FormGroup = new FormGroup({});
  dateRange: boolean = false;
  postpromoerror: boolean = true;
  postpromoerrormessage: string = "";
  financeYearStartDate:Date = new Date();
  financeYearEndDate:Date = new Date();
  fyStartMonth: any;
  fyStartDate: any;
  fyEndMonth: any;
  fyEndDate: any;

  ngOnInit(): void {
    this.spinner.show();
    this.getConfig.getConfigData().then((confData) => {
      this.getDefaultValues(confData);
    });
    this.createEventForm = new FormGroup({
      requestType: new FormControl("CREATE"),
      promotionEvent: new FormGroup({
        promotionEventType: new FormControl(this.promoTypeDrp, [Validators.required]),
        financialYear: new FormControl(null),
        country: new FormControl(this.countryDrp, [Validators.required]),
        brand: new FormControl(this.brand, [Validators.required]),
        eventId: new FormControl(this.eventIdValue, [Validators.required]),
        eventCode: new FormControl(this.eventCodeValue, [Validators.required]),
        eventName: new FormControl(this.eventNameValue, [Validators.required]),
        startDate: new FormControl(this.startdate.value.toString(), [Validators.required]),
        endDate: new FormControl(this.enddate.value.toString()),
        qrCodeColour: new FormControl("TEST"),
        toleranceDays: new FormControl(this.toleranceDays, [Validators.required]),
        extendableDays: new FormControl(null),
      }),     
    });
  }

  onChangeCountry(event: any) {
    this.country = event.value.code;
    this.getBrandValues = [];
    this.getBrandValues = event.value.brand;
    this.getBrandValues.forEach((brand:any) => {
       if(brand.default == true) {
         this.brandDrp = brand;
       }
    });
}

onChangePromoType(evt:any) {
  this.promoTypeDrp = evt.value;
}

getDefaultValues(configData:any) {
      this.getPromoType = configData.systemConfig.configMap.PROMOTION_EVENT_TYPE;
      var promType = this.getPromoType.sort((a, b) => a.order-b.order);
      this.getPromoType = promType;
      if(this.getPromoType) {
        this.getPromoType.forEach((promoT) => {
           this.getPromoTypeValue.push(promoT.value);
           if(promoT.default == true) {
             this.promoTypeDrp = promoT.value;
           }
        });
       }
     this.getCountry = configData.userConfig.sourceMarket;
     if(this.getCountry) {
        this.getCountry.forEach((country) => {
        this.getCountryValues.push(country);
          if(country.default == true) {
            let ps = country;
            this.countryDrp = ps;
            this.country = ps.code;
            country.brand.forEach((element:any) => {
              this.getBrandValues.push(element);
              if(element.default == true) {
                let pt = element;
                this.brandDrp = pt;
                this.brand = pt.code;              }
            });
          }
        });
     }
     this.getExtendible = configData.userConfig.configMap.CONFIG;
     if(this.getExtendible) {
        this.getExtendible.forEach((extendibleD) => {       
          if(extendibleD.code == "FINANCIALYEAR") {
            var finyears = extendibleD.value;
            var sDate = this.getExtendible[1];
            var fDate = this.getExtendible[2];
            if(sDate.code == "FINANCIALYEAR_STARTDATE"){
              var finStDate = sDate.value;
              var stMonth = finStDate.toString().split("/");
              var finStMonth : any;
              finStMonth = stMonth[1]-1;
              var startDate = stMonth[0];
              this.fyStartDate = startDate;
              this.fyStartMonth = finStMonth;
            }
            if(fDate.code == "FINANCIALYEAR_ENDDATE"){
              var finEndDate = fDate.value;
              var endMonth = finEndDate.toString().split("/");
              var finEndMonth : any;
              finEndMonth = endMonth[1]-1;
              var endDate = endMonth[0];
              this.fyEndDate = endDate;
              this.fyEndMonth = finEndMonth; 
            }
            var aYearFromNow = new Date().getFullYear();
            let month = new Date().getMonth();
            let date = new Date().getDate();
            var totalyears = finyears - aYearFromNow;
            if(month <= finEndMonth && date <= endDate){
              aYearFromNow = aYearFromNow - 1;
            }
            for(var i = 0; i <= totalyears; i++) {
              this.financialyearValues1.push((aYearFromNow + i)+"-"+(aYearFromNow + i+1));
              //this.financialyearValues1.push(aYearFromNow + i);
            }
            this.financialyear = this.financialyearValues1[0];
          }
          var financeDate = this.financialyear.toString().split("-");
          this.financeYearStartDate = new Date(parseInt(financeDate[0]), this.fyStartMonth, this.fyStartDate);
          this.financeYearEndDate = new Date(parseInt(financeDate[1]), this.fyEndMonth, this.fyEndDate);
          if(extendibleD.code == "TOLERANCEDAYS") {
            var totaldays = extendibleD.value;
            for(var i=0; i <= totaldays; i++ ){
            this.getToleranceValues.push(i);
            }
            this.toleranceDays = this.getToleranceValues[0];
          }
          
        });
     }
    this.spinner.hide();
}

onChangeFinanceYear(evt:any) {
  this.financialyear = evt.value;
  var financeDate = evt.value.split("-");
  this.financeYearStartDate = new Date(parseInt(financeDate[0]), this.fyStartMonth, this.fyStartDate);
  this.financeYearEndDate = new Date(parseInt(financeDate[1]), this.fyEndMonth, this.fyEndDate);
}
  
  addNewPromo() {
    this.newPromo = true;
    this.promoFromEvent = true;
    this.brandFromEvent = this.brandDrp;
    this.eventCodeFromEvent = this.eventCodeValue;
    this.eventNameFromEvent = this.eventNameValue;
    this.eventExtendableFromEvent = this.eventExtendableValue;
    this.eventToleranceFromEvent = this.eventToleranceValue;
    this.startdate = this.eventStartDateFromEvent;
    this.enddate = this.eventEndDateFromEvent;
  }
  onChangeBrand(event: any) {
    this.brand = event.value.code;
  }
  eventNo() {
    this.saveEvent = true;
  }
  eventYes() {
    this.saveEvent = false;
  }
  convertDate(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  searchEvent() {
    this.router.navigate(["/searchevents"]);
  }
 
  createEvent() {
    var eventC = /[a-zA-Z0-9 ]{1,200}$/.test(this.eventCodeValue);
    let finDate: any;
    var arr1 = this.startdate.value.toString();
    var arr2 = this.convertDate(arr1);
    let newStartDate = arr2;
    
    if(this.enddate.value instanceof Date) {
    var arr3 = this.enddate.value.toString();
    var arr4 = this.convertDate(arr3)
    var newEndDate = arr4;
    finDate = newEndDate;
    } else {
     finDate = null;
    }
    if(finDate < newStartDate) {
      this.dateRange = true;
    } else {
      this.dateRange = false;
    }


    if(newStartDate <= finDate && this.eventCodeValue != ""
        && this.eventNameValue != "" && eventC == true) { 
    this.spinner.show();
    this.createEventForm.patchValue({
    requestType: "CREATE",
    promotionEvent: {
    promotionEventType: this.promoTypeDrp,
    financialYear: this.financialyear,
    country: this.country,
    brand: this.brand,
    eventId: this.eventIdValue,
    eventCode: this.eventCodeValue.toUpperCase(),
    eventName: this.eventNameValue,
    startDate: newStartDate.toString(),
    endDate: finDate,
    qrCodeColour: "TEST",
    toleranceDays: this.toleranceDays,
    extendableDays: null
},
  });
this.eventService.saveEvent(this.createEventForm.value).subscribe((data:any) => 
   { 
    if(data.hasOwnProperty("promotionEvents") == false) {
      this.postpromoerror = true;
      this.spinner.hide();
     this.postpromoerrormessage = data.error[0].message;
    } else {
      this.spinner.hide();
      sessionStorage.setItem('updatedEvent', JSON.stringify(data.promotionEvents));
      let navigationExtras: NavigationExtras = {
        queryParams: {
           // "eventData": JSON.stringify(data.promotionEvents),
            "promData": false
        }
    };
    this.spinner.hide();
    this.router.navigate(["/updateevent"], navigationExtras);
  }
  },
   (Error:any) => {
     if(Error.error) {
      this.postpromoerror = true;
      this.postpromoerrormessage = Error.message;
      this.spinner.hide();
     } else {
      this.spinner.hide();
     };
    
   });
  } 
   

  }
  onSaveEvent() {
    
    let dialogRef = this.dialog.open(this.callAPIDialog);
        dialogRef.afterClosed().subscribe(result => {
            // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
            if (result !== undefined) {
                if (result === 'yes') {
                    // TODO: Replace the following line with your code.
                } else if (result === 'no') {
                    // TODO: Replace the following line with your code.
                }
            }
        })
  }
}
