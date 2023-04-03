import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { PromotionsService } from '../../services/promotions.service';
import { Observable } from 'rxjs';
import { GetconfigService } from '../../services/getconfig.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-promotionsearch',
  templateUrl: './promotionsearch.component.html',
  styleUrls: ['./promotionsearch.component.scss']
})
export class PromotionsearchComponent implements OnInit {
  promotionLists: any;
  

  constructor(private router: Router, private promoDetails:PromotionsService
    ,private getConfig: GetconfigService, private spinner: NgxSpinnerService) { }
  selected = 'select';
  startdate:any;
  enddate:any;
  eventsDrp: string = "";
  vmsPromotionId: string = "";
  brandDrp: string = "";
  countryDrp: string = "";
  voucherId: string = "";
  advertisingDrp: string = "";
  advertisingValues: any[] = [];
  salesDrp:string = "";
  salesValues: any[] = [];
  onlinepromocode: string = "";
  memberid: string = "";
  subscriberid: string = "";
  emailaddress: string = "";
  firstname: string = "";
  lastname: string = "";
  salestransactionid: string = "";
  storeid: string = "";
  storename: string = "";
  posoperatorid: string = "";
  eventslist: any;
  filteredPromoTypes: any[] = [];
  fyStartMonth: any;
  fyStartDate: any;
  fyEndMonth: any;
  fyEndDate: any;
  
  getPromoType: any[] = [];

  listAllEventNames: any[] = [];
  filterdEvnts: any[] = [];
  eventss: any[] = [];
  filteredPromotions: any[] = [];
  tableShow: boolean = false;
  disablePromo: boolean = true;
  promotionsDrp: string = "";
  promotionOverview: string = "";
  dateRange: boolean = false;
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
    // 'requireQrcode',
    'qrCodeColour'  
  ];
  
  brandDrpValues: any[] = []
  countryDrpValues: any[] = [];
  getCountry: any[] = [];
  getAdvertisingChannel: any[] = [];
  getSalesChannel: any[] = [];
  
  promotionDetails: any[] = [];
  getDiscountValues: any[] = [];
  getRedamableValues: any[] = [];
  getExtendible: any[] = [];
  getFinancialYearValues: any[] = [];
  financialyear: string = "";
  eventId: string = "";
  eventCode: string = "";
  norecords: boolean = false;
  redeemBy: string = "";
  redeemByValues: any = [];
  getRedeemedBy: any[] = [];
  getRedeemedByValues: any[] = [];
  getPromoStatus: any[] = [];
  getPromoStatusValues: any[] = [];
  promotionStatus: string = "";
  salesChanL: boolean = false;
  financeYearStartDate:Date = new Date();
  financeYearEndDate:Date = new Date();

  ngOnInit(): void {
  this.spinner.show();
  this.getConfig.getConfigData().then((confData) => {
    this.getDefaultValues(confData);
  });
  this.salesDrp = 'all';
  this.advertisingDrp = 'all';
  this.financialyear = 'all';
  this.redeemBy = "all";
  this.promotionStatus = "all";
  }

  home() {
    window.location.href = environment.azureurl;
  }

  getDefaultValues(configData:any) {
    this.getDiscountValues = configData.systemConfig.configMap.DISCOUNT_TYPE;
    var discType = this.getDiscountValues.sort((a, b) => a.order-b.order);
     this.getDiscountValues = discType;

    this.getRedamableValues = configData.systemConfig.configMap.REDEEMABLE_BY;

    this.getPromoType = configData.systemConfig.configMap.PROMOTION_TYPE;
    var promType = this.getPromoType.sort((a, b) => a.order-b.order);
    this.getPromoType = promType;
    if(this.getPromoType) {
      this.getPromoType.forEach((promoT) => {
         this.filteredPromoTypes.push(promoT.value);
         if(promoT.default == true) {
          let pt = promoT.value;
          this.promotionsDrp = promoT.value;
         }
      });
     }


     this.getSalesChannel = configData.systemConfig.configMap.SALES_CHANNEL;
     var salChan = this.getSalesChannel.sort((a, b) => a.order-b.order);
     this.getSalesChannel = salChan;
      if(this.getSalesChannel) {
        this.getSalesChannel.forEach((salesC) => {
          this.salesValues.push(salesC);
          if(salesC.value == "Online" || salesC.value == "Instore and Online") {
            this.salesChanL = true;
          } else {
            this.salesChanL = false;
          }
        });
     }

     
     this.getAdvertisingChannel = configData.userConfig.configMap.ADVERTISING_CHANNEL;
     var advChan = this.getAdvertisingChannel.sort((a, b) => a.order-b.order);
     this.getAdvertisingChannel = advChan;
     if(this.getAdvertisingChannel) {
        this.getAdvertisingChannel.forEach((advertisingC) => {
          this.advertisingValues.push(advertisingC);
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
               //this.getFinancialYearValues.push(aYearFromNow + i);
               this.getFinancialYearValues.push((aYearFromNow + i)+"-"+(aYearFromNow + i+1));
            }
          }
          var financeDate = this.financialyear.toString().split("-");
          this.financeYearStartDate = new Date(parseInt(financeDate[0]), this.fyStartMonth, this.fyStartDate);
          this.financeYearEndDate = new Date(parseInt(financeDate[1]), this.fyEndMonth, this.fyEndDate);
        });
     }
     this.getRedeemedBy = configData.systemConfig.configMap.REDEEMABLE_BY;
     var redBy = this.getRedeemedBy.sort((a, b) => a.order-b.order);
     this.getRedeemedBy = redBy;
     if(this.getRedeemedBy) {
        this.getRedeemedBy.forEach((redemBy) => {
          this.getRedeemedByValues.push(redemBy);
        });
     }

     this.getPromoStatus = configData.systemConfig.configMap.PROMOTION_STATUS;
     var promStatus = this.getPromoStatus.sort((a, b) => a.order-b.order);
     this.getPromoStatus = promStatus;
     if(this.getPromoStatus) {
        this.getPromoStatus.forEach((promoS) => {
          this.getPromoStatusValues.push(promoS);
        });
     }

    this.spinner.hide(); 
    
}

  promodetails(id: any){
    this.router.navigate(['/']);
  }

  onlyUnique(value: any, index: any, self: string | any[]) {
    return self.indexOf(value) === index;
  }
  
  filterEvents() {
      this.promotionDetails.forEach((promotionsList) => {
        const promoD = JSON.parse(promotionsList);
        this.promotionLists = JSON.parse(promotionsList);
        this.listAllEventNames.push(promoD.promotionType);
      })
      var unique = this.listAllEventNames.filter(this.onlyUnique);
      this.filteredPromoTypes = unique;
  }

  onChangeEventID(event: any) {
    this.tableShow = true;
    this.disablePromo = false;
    this.eventss = [];
    this.promotionDetails.forEach((promotionsList) => {
      const promoD = JSON.parse(promotionsList);
      this.promotionLists = JSON.parse(promotionsList);
      this.eventss.push(promoD);
    })
  }
  
  convertDate(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  onChangePromoType(evt: any) {
    this.promotionsDrp = evt.value;
  }
  onChangePromoStatus(evt: any) {
    this.promotionStatus = evt.value;
  }

  onChangeBrand(evt:any) {
    this.brandDrp = evt.value
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

  onChangeSales(evt:any) { 
    this.salesDrp = evt.value;
    if(evt.value == "Online" || evt.value == "Instore and Online" || evt.value == "all") {
      this.salesChanL = true;
      if(this.displayedColumns.indexOf("ecomPromotionId") === -1) {
        this.displayedColumns.push("ecomPromotionId");
      }
      if(this.displayedColumns.indexOf("promoCode") === -1) {
        this.displayedColumns.push("promoCode");
      }
      
    } else {
      this.salesChanL = false;
            const index = this.displayedColumns.indexOf("promoCode");
            const index1 = this.displayedColumns.indexOf("ecomPromotionId");
            if (index > -1) { 
              this.displayedColumns.splice(index, 1); 
            } 
            if (index1 > -1) { 
              this.displayedColumns.splice(index1, 1); 
            }
    }
  }

  onChangeAdvertising(evt:any) {
    this.advertisingDrp = evt.value;
  }

  onChangeFinance(evt:any) {
    this.financialyear = evt.value;
    var financeDate = this.financialyear.toString().split("-");
    this.financeYearStartDate = new Date(parseInt(financeDate[0]), this.fyStartMonth, this.fyStartDate);
    this.financeYearEndDate = new Date(parseInt(financeDate[1]), this.fyEndMonth, this.fyEndDate);
    
  }
  
  onChangeRedeem(evt:any) {
    this.redeemBy = evt.value;
  }
  updateProm(evt:any) {
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
  searchPromotion() {
    var promotionType:any;
    var promotionId: any;
    var financeyear: any;
    var brand: any;
    var country: any;
    var promotionOverview: any;
    var advertisingChannel: any;
    var salesChannel: any
    var onlinePromoCode: any;
    var evtId: any;
    var evtCode: any;
    var redeem: any = null;
    var promotionStatus: any = null;
    
    for(var i=0; i <= this.getPromoType.length; i++) {
      if(this.promotionsDrp == this.getPromoType[i].value) {
        promotionType = this.getPromoType[i].code;
        break
      } else {
        promotionType = null;
      }
    }
    if(promotionStatus != "all") {
    for(var i=0; i <= this.getPromoStatus.length-1; i++) {
      if(this.promotionStatus == this.getPromoStatus[i].value) {
        promotionStatus = this.getPromoStatus[i].code;
        break
      } else {
        promotionStatus = null;
      }
    }
  }
    if(this.vmsPromotionId != "") {
      promotionId = this.vmsPromotionId;
    } else {
      promotionId = null;
    }
    if(redeem != "all") {
    for(var l=0; l <= this.getRedeemedByValues.length-1; l++) {
      if(this.redeemBy == this.getRedeemedByValues[l].value) {
        redeem = this.getRedeemedByValues[l].code;
        break;
      } else {
        redeem = null;
      }
    }
  }
  
    if(this.financialyear != "all") {
      financeyear = this.financialyear;
    } else {
      financeyear = null;
    }

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

    for(var k=0; k <= this.brandDrpValues.length; k++) {
      if(this.brandDrp == this.brandDrpValues[k].name) {
        brand = this.brandDrpValues[k].code;
        break
      } else {
        brand = null;
      }
    }

    
    for(var k=0; k <= this.countryDrpValues.length; k++) {
      if(this.countryDrp == this.countryDrpValues[k].name) {
        country = this.countryDrpValues[k].code;
        break
      } else {
        country = null;
      }
    }

    if(this.promotionOverview != "") {
      promotionOverview = this.promotionOverview;
    } else {
      promotionOverview = null;
    }

    salesChannel = null;
    if(this.salesDrp != "all") {
    for(var k=0; k <= this.salesValues.length; k++) {
      if(this.salesDrp == this.salesValues[k].value) {
       salesChannel = this.salesValues[k].code;
        break
      } else {
        salesChannel = null;
      }
    }
   }
    advertisingChannel = null;
    if(this.advertisingDrp != "all") {
      for(var k=0; k <= this.advertisingValues.length; k++) {
        if(this.advertisingDrp == this.advertisingValues[k].value) {
         advertisingChannel = this.advertisingValues[k].code;
          break
        } else {
          advertisingChannel = null;
        }
      }
     }


    if(this.onlinepromocode != "") {
      onlinePromoCode = this.onlinepromocode;
    } else {
      onlinePromoCode = null;
    }

     if(this.startdate != undefined) {
     var arr1 = this.startdate.toString(); 
     var coverdatestart = this.convertDate(arr1);
     this.startdate = coverdatestart;
     } else {
       this.startdate = null;
     }
     if(this.enddate != undefined) {
     var arr3 = this.enddate.toString();
     var coverdateend = this.convertDate(arr3);
     this.enddate = coverdateend;
     } else {
       this.enddate = null;
     }

    this.spinner.show();
    var search = {
      requestType: "SEARCH",
      promotionSearch: {
        promotionType: promotionType,
        promotionId: promotionId,
        promotionStatus: promotionStatus,
        financialYear: financeyear,
        eventId: evtId,
        eventCode: evtCode,
        brand: brand,
        country: country,
        promotionOverview: promotionOverview,
        redeemableBy: redeem,
        startDate: this.startdate,
        endDate: this.enddate,
        advertisingChannel: advertisingChannel,
        salesChannel: salesChannel,
        onlinePromoCode: onlinePromoCode,
      }
    }
    if(this.startdate <= this.enddate || this.startdate != null && this.enddate != null && this.startdate <= this.enddate
      || this.startdate == null && this.enddate != null || this.startdate != null && this.enddate == null) {
    this.promoDetails.getPromotions(search).subscribe(
      data => {
        if(data) {
          if(data.promotions.length == 0) {
            this.spinner.hide();
            this.norecords = true;
          } else {
            this.norecords = false;
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
            this.brandDrpValues.forEach((brd) => {
              if(finalR.brand == brd.code) {
               prombrd = brd.name;
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
      this.filteredPromotions = [];
      this.tableShow = false;
    }
  
  }
  navigateTo() {
    this.router.navigate(['/eventandpromotions']);
  } 

}
