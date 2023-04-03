import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventServiceService } from 'src/app/services/event-service.service';
import { GetconfigService } from '../../services/getconfig.service';

@Component({
  selector: 'app-searchevent',
  templateUrl: './searchevent.component.html',
  styleUrls: ['./searchevent.component.scss']
})
export class SearcheventComponent implements OnInit {

  constructor(private router: Router, private getConfig: GetconfigService, private fb: FormBuilder,
    private spinner: NgxSpinnerService,  private eventService: EventServiceService) { }
  selected = 'select';
  startdate:Date = new Date();;
  enddate:Date = new Date();;
  eventsDrp: string = "";
  eventslist: any;
  filteredEvents: any[] = [];
  listAllEventNames: any[] = [];
  filterdEvnts: any[] = [];
  eventss: any[] = [];
  tableShow: boolean = false;
  disablePromo: boolean = true;
  financialyear = new FormControl(new Date(2025, 11, 31));
  financialyearValues1: any[] = [];
  getExtendible: any[] = [];
  getCountry: any[] = [];
  countryDrpValues: any[] = [];
  brandDrpValues: any[] = []
  promoEventType: string = "";
  eventId: string = "";
  eventCode: string = "";
  countryDrp: string = "";
  brandDrp: string = "";
  eventName: string = "";
  fyStartMonth: any;
  fyStartDate: any;
  fyEndMonth: any;
  fyEndDate: any;

  norecords: boolean = false;
  dateRange: boolean = false;
  getPromoType: any[] = [];
  filteredPromoTypes: any[] = [];
  promotionsDrp: string = "";
  @Output() promotionAdded = new EventEmitter();
  displayedColumns: string[] = [ 
    'type', 
    'financialyear',
    'eventId',
    'eventCode',
    'country',
    'brand',
    'eventName', 
    'startdate',
    'enddate',
    'toleranceDays',
    'extendableDays',
  ];
  financeYearStartDate:Date = new Date();
  financeYearEndDate:Date = new Date();

  ngOnInit(): void {
    this.getConfig.getConfigData().then((confData) => {
      this.getDefaultValues(confData);
    });
  }

  onlyUnique(value: any, index: any, self: string | any[]) {
    return self.indexOf(value) === index;
  }
  
  onChangeCountry(evt:any) {
    this.countryDrp = evt.value;
    for(var i=0; i < this.countryDrpValues.length; i++) {
       if(this.countryDrp == this.countryDrpValues[i].name) {
        this.brandDrpValues = [];
        this.brandDrpValues = this.countryDrpValues[i].brand;
        break
       }
    }
    this.brandDrpValues.forEach((brand:any) => {
      if(brand.default == true) {
        this.brandDrp = brand.name;
      }
   });
  }

  onChangeBrand(evt:any) {
    this.brandDrp = evt.value
  }

  onChangeFinance(evt:any) {
    this.financialyear = evt.value;
    var financeDate = evt.value.split("-");
    this.financeYearStartDate = new Date(parseInt(financeDate[0]), this.fyStartMonth, this.fyStartDate);
    this.financeYearEndDate = new Date(parseInt(financeDate[1]), this.fyEndMonth, this.fyEndDate);
  }

  onChangePromoType(evt: any) {
    this.promotionsDrp = evt.value;
  }

  navigateTo() {
    this.router.navigate(['/eventandpromotions']);
  } 

  getDefaultValues(configData:any) {
      this.getPromoType = configData.systemConfig.configMap.PROMOTION_EVENT_TYPE;
      var promType = this.getPromoType.sort((a, b) => a.order-b.order);
      this.getPromoType = promType;
      if(this.getPromoType) {
        this.getPromoType.forEach((promoT) => {
           this.filteredPromoTypes.push(promoT.value);
           if(promoT.default == true) {
            this.promotionsDrp = promoT.value;
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
              // this.financialyearValues1.push(aYearFromNow + i);
              this.financialyearValues1.push((aYearFromNow + i)+"-"+(aYearFromNow + i+1));
            }
            this.financialyear = this.financialyearValues1[0];
          }
          var financeDate = this.financialyear.toString().split("-");
          this.financeYearStartDate = new Date(parseInt(financeDate[0]), this.fyStartMonth, this.fyStartDate);
          this.financeYearEndDate = new Date(parseInt(financeDate[1]), this.fyEndMonth, this.fyEndDate);
        });
     }

     this.getCountry = configData.userConfig.sourceMarket;
     if(this.getCountry) {
        this.getCountry.forEach((country) => {
        this.countryDrpValues.push(country);
          if(country.default == true) {
            let ps = country.name;
            this.countryDrp = ps;
            country.brand.forEach((element:any) => {
              this.brandDrpValues.push(element);
              if(element.default == true) {
                
                let pt = element.name;
                this.brandDrp = pt;
              }
            });
          }
        });
     }

    this.spinner.hide();
  }

  onChangeFinanceYear(evt:any) {
   
  }

  convertDate(str:any) {
  var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  createEvent() { 
    this.router.navigate(["/events"]);
  }

  searchEvent() {
    var promotionEventType:any;
    var financeyear: any;
    var evtId: any;
    var evtCode: any;
    var brand: any;
    var country: any;
    var stDate: any;
    var edDate: any
  
  
    if(this.eventId != "") {
      evtId = this.eventId;
    } else {
      evtId = null;
    }

    if(this.eventCode != "") {
      evtCode = this.eventCode;
    } else {
      evtCode = null;
    }
    
    for(var k=0; k < this.brandDrpValues.length; k++) {
        if(this.brandDrp == this.brandDrpValues[k].name) {
          brand = this.brandDrpValues[k].code;
          break
        } else {
          brand = null;
        }
    }

    
    for(var k=0; k < this.countryDrpValues.length; k++) {
        if(this.countryDrp == this.countryDrpValues[k].name) {
          country = this.countryDrpValues[k].code;
          break
        } else {
          country = null;
      }
    }

     if(this.startdate != undefined) {
     var arr1 = this.startdate.toString(); 
     var coverdatestart = this.convertDate(arr1);
      stDate = coverdatestart;
     } else {
       stDate = null;
     }
     if(this.enddate != undefined) {
     var arr3 = this.enddate.toString();
     var coverdateend = this.convertDate(arr3);
      edDate = coverdateend;
     } else {
      edDate = null;
     }
 
    this.spinner.show();
    var search = {
      requestType: "SEARCH",
      promotionEventSearch: {
        promotionEventType: this.promotionsDrp,
        financialYear: this.financialyear,
        eventId: evtId,
        eventCode: evtCode,
        brand: brand,
        country: country,
        startDate: stDate,
        endDate: edDate,
      }
    }
  
    if(this.startdate <= this.enddate || this.startdate != null && this.enddate != null && this.startdate <= this.enddate
      || this.startdate == null && this.enddate != null || this.startdate != null && this.enddate == null) {
    this.eventService.searchEvent(search).subscribe(
      data => {
        if(data) {
          
          if(data.promotionEvents.length == 0) {
            this.spinner.hide();
            this.norecords = true;
          } else {
            this.norecords = false;
          }
          this.filteredEvents = [];
          var promT: any;
          var promCtry: any;
          var prombrd: any;

          data.promotionEvents.forEach((finalR:any) => {
            this.getCountry.forEach((gctry) => {
               if(finalR.country == gctry.code) {
                promCtry = gctry.name;
              }
            });
            this.brandDrpValues.forEach((brd) => {
              if(finalR.brand == brd.code) {
               prombrd = brd.name;
             }
           });
             finalR.country = promCtry;
             finalR.brand = prombrd;
             this.filteredEvents.push(finalR);
          });
          
          this.tableShow = true;
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
      this.filteredEvents = [];
      this.tableShow = false;
    }
  
}
updateEvent(evt:any) {
  var updateRowData:any = [];
  this.filteredEvents.forEach((promo:any) => {  
      if(promo.eventId == evt.eventId) {
        updateRowData.push(promo);
      }
  });
  sessionStorage.setItem('updatedEvent', JSON.stringify(updateRowData));
  let navigationExtras: NavigationExtras = {
    queryParams: {
        "promData": true,
        "eventId": evt.eventId
    }
};
    this.spinner.hide();
    this.promotionAdded.emit(true);
    this.router.navigate(["/updateevent"], navigationExtras);
}

}
