import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { GetconfigService } from '../../services/getconfig.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventServiceService } from '../../services/event-service.service';
import { PromotionsService } from '../../services/promotions.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {
  promoObjFromEvt: any;
    
  constructor(private dialog: MatDialog,  private router: Router, private getConfig: GetconfigService, private fb: FormBuilder,
    private spinner: NgxSpinnerService, private promoDetails:PromotionsService, private eventService: EventServiceService, public route: ActivatedRoute) { }
  @ViewChild('callAPIDialog')
  callAPIDialog!: TemplateRef<any>;
  selectedDrp = 'srg';
  countryDrp = "australia";
  newPromo: boolean = false;
  brandDrp:any;
  extentDaysValue: any[] = ["1 to 7 Days"];
  tolerantDaysValue: any[] = ["14 to 30 Days"];
  startdate = new FormControl(new Date());
  enddate = new FormControl(new Date());
  saveEvent: boolean = true;
  promoFromEvent: boolean = false;
  brandFromEvent:any;
  eventCodeFromEvent: string = "";
  eventCodeValue: string = "";
  eventIdValue: string = "";
  eventNameFromEvent: string = "";
  eventNameValue: string = "";
  eventExtendableValue: string = "";
  eventToleranceValue: string = "";
  eventExtendableFromEvent: string = "";
  eventToleranceFromEvent: string = "";
  countryFromEvent: string = "";
  eventIdFromEvent: string = "";
  eventFinancialY: string = "";
  eventStartDateFromEvent = new FormControl(new Date());
  eventEndDateFromEvent= new FormControl(new Date());
  fromEventPromoType: string = "";
  getCountry:any[] = [];
  getCountryValues:any[]=[];
  getBrandValues:any[] = [];
  getPromoType:any[] = [];
  getPromoTypeValue:any[] = [];
  promoTypeDrp: string = "";
  promoTypeFromEvent: string = "";
  getExtendible: any[] = [];
  financialyearValues1: any[] = [];
  getToleranceValues: any[] = [];
  financialyear: string = "";
  toleranceDays: string = "";
  fyStartMonth: any;
  fyStartDate: any;
  fyEndMonth: any;
  fyEndDate: any;

  country: string = "";
  brand: string = "";
  updateEventForm: FormGroup = new FormGroup({});
  dateRange: boolean = false;
  eventData:any;
  promoCreateEventData:any;
  updateDisabled: boolean = false;
  createdPromos: boolean = false;
  promoList: boolean = true;
  displayedColumns: string[] = [ 
    'type', 
    'id', 
    'promotionStatus',
    'financialyear',
    'eventId',
    'eventCode',
    'country',
    'brand',
    'overview', 
    'redeemed',
    'startdate',
    'enddate',
    'advertisingChannel',
    'salesChannel',
    'toleranceDays',
    'extendableDays',
    'promoCode',
    'discounttype',
    'discountamount',
    'minimumspend',
    'coupondescription',
    'receiptdescription',
    'termsandconditions',
    'posPromotionId',
    'ecomPromotionId',
    'qrCodeColour'  
  ];

  getAdvertisingChannel: any[] = [];
  getSalesChannel: any[] = [];
  getDiscountValues: any[] = [];
  getRedamableValues: any[] = [];
  filteredPromotions:any[] = [];
  tableShow: boolean = false;
  @Input() addPromo: boolean = false;
  updatedSuccess: boolean = false;
  promData: boolean = false;
  loadD: any;
  financeYearStartDate:Date = new Date();
  financeYearEndDate:Date = new Date();
   
  ngOnInit(): void {
    this.spinner.show();
   // this.eventData = JSON.parse(this.route.snapshot.queryParams['eventData']);
    var updEvent:any = sessionStorage.getItem('updatedEvent');
    this.eventData = JSON.parse(updEvent);
    if(sessionStorage.getItem('promoCreatedFromEvt')) {
      this.dateRange = false;
      var promoCreateEvt:any = sessionStorage.getItem('promoCreatedFromEvt');
      this.promoCreateEventData = JSON.parse(promoCreateEvt); 
      this.promData = this.promoCreateEventData.postCreatePromoFromEvt;
    }

    if(this.route.snapshot.queryParams.hasOwnProperty('promData')) {
      this.promData = JSON.parse(this.route.snapshot.queryParams['promData']);
      if(typeof promoCreateEvt != "undefined") {
        if(!!Object.keys(promoCreateEvt).length) {
          this.promData = true;
        }
      }
    }
    else if(typeof promoCreateEvt !== "undefined") {
      if(!!Object.keys(promoCreateEvt).length) {
        this.promData = this.promoCreateEventData['postCreatePromoFromEvt'];
      }
    }
    this.getConfig.getConfigData().then((confData) => {
      this.getDefaultValues(confData);
    });
    this.updateEventForm = new FormGroup({
      requestType: new FormControl("UPDATE"),
      promotionEvent: new FormGroup({
        promotionEventType: new FormControl(this.promoTypeDrp, [Validators.required]),
        financialYear: new FormControl("2022"),
        country: new FormControl(this.countryDrp, [Validators.required]),
        brand: new FormControl(this.brand, [Validators.required]),
        eventId: new FormControl(this.eventIdValue, [Validators.required]),
        eventCode: new FormControl(this.eventCodeValue, [Validators.required]),
        eventName: new FormControl(this.eventNameValue, [Validators.required]),
        startDate: new FormControl(this.startdate.toString(), [Validators.required]),
        endDate: new FormControl(this.enddate.toString()),
        qrCodeColour: new FormControl(""),
        toleranceDays: new FormControl(this.toleranceDays, [Validators.required]),
        extendableDays: new FormControl(null),
      }),     
    });
    
  }

  updatedEvent(evt: any) {
    this.tableShow = true;
    this.newPromo = false;
    this.updateDisabled = true;
    this.promoObjFromEvt = JSON.parse(evt.postCreatePromoObj);
    this.promData = evt.postCreatePromoFromEvt;
    if(this.promData !== true) {
      this.enddate = this.promoObjFromEvt.endDate;
    }
    this.reloadData();
    this.dateRange = false;
  }

  loadPromos() {
    this.spinner.show();
    var search = {
      requestType: "SEARCH",
      promotionSearch: {
        promotionType: null,
        eventId: this.eventData[0].eventId,
        brand: null,
        country: null,
        advertisingChannel: null,
        salesChannel: null,
      }
    }
    this.promoDetails.getPromotions(search).subscribe(
      data => {
         if(data.promotions.length > 0) {
          this.updateDisabled = true;
          this.promoList = false;
          this.reloadData();
          this.tableShow = true;
          this.spinner.hide();
          this.dateRange = false;
      }
      },
      error => {
       // this.spinner.hide();
      });
  }


  reloadData() {
    this.spinner.show();
    var search = {
      requestType: "SEARCH",
      promotionSearch: {
        promotionType: "",
        eventId: this.eventData[0].eventId,
        brand: this.brand,
        country: this.country,
        advertisingChannel: "",
        salesChannel: "",
        
      }
    }
    if(this.startdate <= this.enddate || this.startdate != null && this.enddate != null && this.startdate <= this.enddate
      || this.startdate == null && this.enddate != null || this.startdate != null && this.enddate == null) {
    this.promoDetails.getPromotions(search).subscribe(
      data => {
        if(data) {
          if(data.promotions.length == 0) {
            this.spinner.hide();
           // this.norecords = true;
          } else {
            if(this.promData == true) {
              this.updateDisabled = true;
              this.tableShow = true;
            }
           // this.norecords = false;
          }
          this.filteredPromotions = [];
          var promT: any;
          var promCtry: any;
          var prombrd: any;
          var promAdv: any;
          var promSales: any;
          var promDiscount: any;
          var promRedeem: any;
          data.promotions.forEach((finalR:any) => {
            this.getPromoType.forEach((gpt:any) => {             
                if(finalR.promotionType == gpt.code) {
                  promT = gpt.value;
                }
            });
            this.getCountry.forEach((gctry) => {
               if(finalR.country == gctry.code) {
                promCtry = gctry.name;
              }
            });
            this.getBrandValues.forEach((brd) => {
              if(finalR.brand == this.brand) {
               prombrd = this.brandDrp;
             }
           });

           this.getAdvertisingChannel.forEach((adv) => {
            if(finalR.advertisingChannel == adv.code) {
             promAdv = adv.value;
           }
           });
            this.getSalesChannel.forEach((sales) => {
              if(finalR.salesChannel == sales.code) {
                promSales = sales.value;
            }
            });
            this.getDiscountValues.forEach((discount) => {
              if(finalR.discountType == discount.code) {
                promDiscount = discount.value;
              } 
            });
            this.getRedamableValues.forEach((redeem) => {
              if(finalR.redeemableBy == redeem.code) {
                promRedeem = redeem.value;
            }
            });
             finalR.promotionType = promT;
             finalR.country = promCtry;
             finalR.brand = prombrd;
             finalR.salesChannel = promSales;
             finalR.advertisingChannel = promAdv;
             finalR.discountType = promDiscount;
             finalR.redeemableBy = promRedeem;

             this.filteredPromotions.push(finalR);
          });
          //this.tableShow = true;
          this.spinner.hide();
          this.dateRange = false;
      }
      },
      error => {
        this.spinner.hide();
      });
    } else {
      this.spinner.hide();
      this.dateRange = true;
      this.filteredPromotions = [];
      this.tableShow = false;
    }
  }

  getDefaultValues(configData:any) {
      this.getPromoType = configData.systemConfig.configMap.PROMOTION_TYPE;
      var promType = this.getPromoType.sort((a, b) => a.order-b.order);
      this.getPromoType = promType;
      if(this.getPromoType) {
        this.getPromoType.forEach((promoT) => {
           this.getPromoTypeValue.push(promoT.value);
           this.promoTypeDrp = this.eventData[0].promotionEventType;
           this.promoTypeFromEvent = this.promoTypeDrp
        });
       }
     this.getCountry = configData.userConfig.sourceMarket;
     sessionStorage.setItem('setCountryConfig',JSON.stringify(this.getCountry));
     if(this.getCountry) {
        this.getCountry.forEach((country) => {
        this.getCountryValues.push(country.name);
          if(country.code == this.eventData[0].country || country.name == this.eventData[0].country && this.promData == false) {
            let ps = country;
            this.countryDrp = ps.name;
            this.country = ps.code;
            country.brand.forEach((element:any) => {
              this.getBrandValues.push(element.name);
              if(element.code == this.eventData[0].brand || element.name == this.eventData[0].brand && this.promData == false) {
                let pt = element;
                this.brandDrp = element.name;
                this.brand = pt.code;              
              }
            });
          } 
          if(this.promData == true) {
            this.getCountry.forEach((country) => {
              if(this.eventData[0].country == country.name) {
                this.countryDrp = country.name;
                this.country = country.code;
                country.brand.forEach((element:any) => {
                  this.getBrandValues.push(element.name);
                  if(this.eventData[0].brand == element.name) {
                    this.brandDrp = element.name;
                    this.brand = element.code;              
                  }
                });
              }
            });
          }
        });
     }
     this.getAdvertisingChannel = configData.userConfig.configMap.ADVERTISING_CHANNEL;
     this.getSalesChannel = configData.systemConfig.configMap.SALES_CHANNEL;
     this.getDiscountValues = configData.systemConfig.configMap.DISCOUNT_TYPE;
     this.getRedamableValues = configData.systemConfig.configMap.REDEEMABLE_BY;
     this.eventIdValue = this.eventData[0].eventId;
     this.eventCodeValue = this.eventData[0].eventCode;
     this.eventNameValue = this.eventData[0].eventName;
     this.startdate = this.eventData[0].startDate;
     this.enddate = this.eventData[0].endDate;
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
               //this.financialyearValues1.push(aYearFromNow + i);
               this.financialyearValues1.push((aYearFromNow + i)+"-"+(aYearFromNow + i+1));
            }
            this.financialyear = this.eventData[0].financialYear;
          }
          var financeDate = this.financialyear.toString().split("-");
          this.financeYearStartDate = new Date(parseInt(financeDate[0]), this.fyStartMonth, this.fyStartDate);
          this.financeYearEndDate = new Date(parseInt(financeDate[1]), this.fyEndMonth, this.fyEndDate);

          if(extendibleD.code == "TOLERANCEDAYS") {
            var totaldays = extendibleD.value;
            for(var i=0; i <= totaldays; i++ ){
            this.getToleranceValues.push(i);
            }
            this.toleranceDays = this.eventData[0].toleranceDays;
          }
          
        });
     }
     this.reloadData();
}
onChangeFinanceYear(evt:any) {
  this.financialyear = evt.value;
  var financeDate = evt.value.split("-");
  this.financeYearStartDate = new Date(parseInt(financeDate[0]), this.fyStartMonth, this.fyStartDate);
  this.financeYearEndDate = new Date(parseInt(financeDate[1]), this.fyEndMonth, this.fyEndDate);
}
  onChangeCountry(event: any) {
    this.country = event.value;
    this.getBrandValues = [];
    this.getCountry.forEach((country) => {
      if(event.value == country.name) {
        this.country = country.code;
        country.brand.forEach((element:any) => {
          this.getBrandValues.push(element.name);
          if(element.default == true) {
            let pt = element;
            this.brandDrp = element.name;
            this.brand = pt.code;              
          }
        });
      }
    });
}

onChangePromoType(evt:any) {
  this.promoTypeDrp = evt.value;
}

searchEvent() {
  this.router.navigate(["/searchevents"]);
}

 
  
  addNewPromo() {
    this.newPromo = true;
    this.updateDisabled = true;
    this.tableShow = false;
    this.promoFromEvent = true;
    this.fromEventPromoType = this.promoTypeDrp;
    this.brandFromEvent = this.brandDrp;
    this.eventIdFromEvent = this.eventIdValue
    this.eventCodeFromEvent = this.eventCodeValue;
    this.eventNameFromEvent = this.eventNameValue;
    this.countryFromEvent = this.countryDrp;
    this.eventStartDateFromEvent = this.startdate;
    this.eventEndDateFromEvent = this.enddate;
    this.eventFinancialY = this.financialyear;
    this.updatedSuccess = false;
    this.eventToleranceFromEvent = this.toleranceDays;
    this.dateRange = false;
   }

  onChangeBrand(event: any) {
    this.getCountry.forEach((country) => {
      if(this.countryDrp == country.name) {
        this.country = country.code;
        country.brand.forEach((element:any) => {
          this.getBrandValues.push(element.name);
          if(event.value == element.name) {
            let pt = element;
            this.brandDrp = element.name;
            this.brand = pt.code;              
          }
        });
      }
    });
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
  

updateEvent() {
    var eventC = /[a-zA-Z0-9 ]{1,200}$/.test(this.eventCodeValue);
    let finDate: any;
    if(this.startdate != this.eventData.startDate || this.enddate != undefined) {
      var arr1 = this.startdate.toString();
    var arr2 = this.convertDate(arr1);
    var  newStartDate = arr2;
    if(this.enddate instanceof Date || this.enddate) {
    var arr3 = this.enddate.toString();
    var arr4 = this.convertDate(arr3)
    var newEndDate = arr4;
    finDate = newEndDate;
    } else {
     finDate = null;
   }
    } else {
      newStartDate = this.eventData.startDate;
      finDate = this.eventData.endDate;
    }
    if(newStartDate > finDate) {
      this.dateRange = true;
      this.updatedSuccess = false;
    } else {
      this.dateRange = false;
    }
   
    if(newStartDate <= finDate && this.eventIdValue != "" && this.eventCodeValue != ""
        && this.eventNameValue != "" && eventC == true) { 
    this.spinner.show();
    this.updateEventForm.patchValue({
    requestType: "UPDATE",
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
    toleranceDays: this.toleranceDays
},
  });

this.eventService.updateEvent(this.updateEventForm.value).subscribe((data:any) => 
   { 
     if(data.hasOwnProperty('promotionEvents')){
      this.spinner.hide();
      this.updatedSuccess = true;
      this.eventCodeValue = data.promotionEvents[0].eventCode;
      sessionStorage.setItem('updatedEvent', JSON.stringify(data.promotionEvents));
      this.spinner.hide();
      this.router.navigate(["/updateevent"]);
   }
  },
   (Error:any) => {
     if(Error.error) {
       this.spinner.hide();
     } else {
      this.spinner.hide();
     };
    
   });
  } 
   

  }

  createNewEvent() {
    this.router.navigate(['/events']);
  }
  createNewPromo() {
    this.router.navigate(['/createpromotion']);
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
  
  existingPromos() {
    this.createdPromos = true;
  }

  cancelPromoCreation(evt:any) {
    this.newPromo = evt;
    if(this.filteredPromotions.length == 0) {
      this.tableShow = false;
      this.updateDisabled = false;
    }
    else {
      this.updateDisabled = true;
      this.tableShow = true;
    }
  }

  updatePromFromEvent(evt:any) {
    var updateRowData:any = [];
    this.filteredPromotions.forEach((promo:any) => {
        if(promo.promotionId == evt.promotionId) {
          updateRowData.push(promo);
        }
    });
    sessionStorage.setItem('updatedData', JSON.stringify(updateRowData[0]));
    this.spinner.hide();
    this.router.navigate(["/promotionupdate"]);
  }
}
