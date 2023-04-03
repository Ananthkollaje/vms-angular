import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GetconfigService } from '../../services/getconfig.service';
import { Router } from '@angular/router';
import { VouchersService } from '../../services/vouchers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vouchersearch',
  templateUrl: './vouchersearch.component.html',
  styleUrls: ['./vouchersearch.component.scss']
})
export class VouchersearchComponent implements OnInit {

  constructor(private router: Router, private getConfig: GetconfigService, 
    private spinner: NgxSpinnerService, private voucherDetails:VouchersService) { }

  vmsPromotionId: string = "";
  promotionsDrp: string = "";
  countryDrp: string = "";
  brandDrp: string = "";
  voucherId: string = "";
  startdate:any;
  enddate:any;
  advertisingDrp: string = "";
  salesDrp: string = "";
  onlinepromocode: string = "";
  memberid: string = "";
  redeemingmemberid = "";
  subscriberid: string = "";
  emailaddress: string = "";
  firstname: string = "";
  lastname: string = "";
  salestransactionid: string = "";
  storeid: string = "";
  storename: string = "";
  posoperatorid: string = "";
  customermobilenumber: string = "";

  filteredPromoTypes: any = [];
  countryDrpValues: any = [];
  brandDrpValues: any = [];
  advertisingValues: any = [];
  salesValues: any = [];
  filteredVouchers: any = [];

  getPromoType:any = [];
  getSalesChannel: any = [];
  getAdvertisingChannel:any = [];
  getCountry:any = [];

  getRedamableValues: any[] = [];

  tableShow: boolean = false;
  dateRange: boolean = false;
  norecords: boolean = false;

  displayedColumns: string[] = [ 
    'id', 
    'promotiontype',
    'country',
    'brand',
    'redeemableby',
    'voucherId', 
    'startdate',
    'enddate',
    'advertisingchannel',
    'saleschannel',
    'tolerancedays',
    'extendabledays',
    'promocode',
    'memberid',
    'subscriberid',
    'emailaddress',
    'mobilephone',
    'firstname',
    'lastname',
    'redemptionchannel',
    'redemptiondatetime',
    'redeemingmemberid',
    'salestransactionid',
    'ordertotalbeforediscount',
    'discountamount',
    'ordertotalafterdiscount',
    'storeid',
    'storename',
    'posoperatorid'
    // 'customermobilenumber',
    // 'email',
    // 'memberid',
    // 'subscriberid'
  ];



  ngOnInit(): void {
    this.spinner.show();
    this.getConfig.getConfigData().then((confData) => {
      this.getDefaultValues(confData);
    });
    this.advertisingDrp = "all";
    this.salesDrp = "all";
  }

  home() {
    window.location.href = environment.azureurl;
  }

  convertDate(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  getDefaultValues(configData:any) {
    this.getPromoType = configData.systemConfig.configMap.PROMOTION_TYPE;
    var promType = this.getPromoType.sort((a:any, b:any) => a.order-b.order);
    this.getPromoType = promType;
    this.getRedamableValues = configData.systemConfig.configMap.REDEEMABLE_BY;
    var redBy = this.getRedamableValues.sort((a, b) => a.order-b.order);
    this.getRedamableValues = redBy;
    if(this.getPromoType) {
      this.getPromoType.forEach((promoT:any) => {
         this.filteredPromoTypes.push(promoT.value);
         if(promoT.default == true) {
          let pt = promoT.value;
          this.promotionsDrp = promoT.value;
         }
      });
     }

     this.getSalesChannel = configData.systemConfig.configMap.SALES_CHANNEL;
     var salChan = this.getSalesChannel.sort((a:any, b:any) => a.order-b.order);
     this.getSalesChannel = salChan;
      if(this.getSalesChannel) {
        this.getSalesChannel.forEach((salesC:any) => {
          this.salesValues.push(salesC);
          if(salesC.value == "Online" || salesC.value == "Instore and Online") {
            //this.salesChanL = true;
          } else {
            //this.salesChanL = false;
          }
        });
     }
     
     this.getAdvertisingChannel = configData.userConfig.configMap.ADVERTISING_CHANNEL;
     var advChan = this.getAdvertisingChannel.sort((a:any, b:any) => a.order-b.order);
     this.getAdvertisingChannel = advChan;
     if(this.getAdvertisingChannel) {
        this.getAdvertisingChannel.forEach((advertisingC:any) => {
          this.advertisingValues.push(advertisingC);
        });
     }
     
     this.getCountry = configData.userConfig.sourceMarket;
     if(this.getCountry) {
        this.getCountry.forEach((country:any) => {
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

  onChangePromoType(evt:any) {
    this.promotionsDrp = evt.value;
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

  onChangeSales(evt:any) {
    this.salesDrp = evt.value;
  }

  onChangeAdvertising(evt:any){
    this.advertisingDrp = evt.value;
  }

searchVoucher() {
  var promotionType:any;
  var promotionId: any;
  var brand: any;
  var country: any;
  var advertisingChannel: any;
  var salesChannel: any
  var onlinePromoCode: any;
  var vouchrid: any;
  var membrid: any;
  var subscribrid: any;
  var emailaddr: any;
  var fname: any;
  var lname: any;
  var salesTId: any;
  var strid: any;
  var strname: any;
  var posoid: any;
  var customrmid: any;
  var redeemingmemberid: any;

  if(this.voucherId != "") {
    vouchrid = this.voucherId;
  } else {
    vouchrid = null;
  }

  if(this.memberid != "") {
    membrid = this.memberid;
  } else {
    membrid = null;
  }

  if(this.redeemingmemberid != "") {
    redeemingmemberid = this.redeemingmemberid;
  } else {
    redeemingmemberid = null;
  }
  
  if(this.subscriberid != "") {
    subscribrid = this.subscriberid;
  } else {
    subscribrid = null;
  } 

  if(this.emailaddress != "") {
    emailaddr = this.emailaddress;
  } else {
    emailaddr = null;
  }

  if(this.firstname != "") {
    fname = this.firstname;
  } else {
    fname = null;
  }

  if(this.lastname != "") {
    lname = this.lastname;
  } else {
    lname = null;
  }

  if(this.salestransactionid != "") {
    salesTId = this.salestransactionid;
  } else {
    salesTId = null;
  }

  if(this.storeid != "") {
    strid = this.storeid;
  } else {
    strid = null;
  }

  if(this.storename != "") {
    strname = this.storename;
  } else {
    strname = null;
  }

  if(this.posoperatorid != "") {
    posoid = this.posoperatorid;
  } else {
    posoid = null;
  }

  if(this.customermobilenumber != "") {
    customrmid = this.customermobilenumber;
  } else {
    customrmid = null;
  }

  for(var i=0; i <= this.getPromoType.length; i++) {
      if(this.promotionsDrp == this.getPromoType[i].value) {
        promotionType = this.getPromoType[i].code;
        break
      } else {
        promotionType = null;
      }
    }
    
    if(this.vmsPromotionId != "") {
      promotionId = this.vmsPromotionId;
    } else {
      promotionId = null;
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
      voucherSearch: {
        promotionId: promotionId,
        promotionType: promotionType,
        country: country,
        brand: brand,
        voucherId: vouchrid,
        startDate: this.startdate,
        endDate: this.enddate,
        advertisingChannel: advertisingChannel,
        salesChannel: salesChannel,
        onlinePromoCode: onlinePromoCode,
        memberId: membrid,
        subscriberId: subscribrid,
        email: emailaddr,
        firstName: fname,
        lastName: lname,
        salesTransactionId: salesTId,
        storeId: strid,
        storeName: strname,
        posOperatorId: posoid,
        mobile: customrmid,
        redeemingMemberId: redeemingmemberid
      }
    }
    if(this.startdate <= this.enddate || this.startdate != null && this.enddate != null && this.startdate <= this.enddate
      || this.startdate == null && this.enddate != null || this.startdate != null && this.enddate == null) {
    this.voucherDetails.getVouchers(search).subscribe(
      data => {
        if(data) {
          if(data.vouchers.length == 0) {
            this.spinner.hide();
            this.norecords = true;
          } else {
            this.norecords = false;
          }
          this.filteredVouchers = [];
          var promT: any;
          var promCtry: any;
          var prombrd: any;
          var promAdv: any;
          var promSales: any;
          var promDiscount: any;
          var promRedeem: any;
          data.vouchers.forEach((finalR:any) => {
            this.getPromoType.forEach((gpt:any) => {             
                if(finalR.promotionType == gpt.code) {
                  promT = gpt.value;
                }
            });
            this.getCountry.forEach((gctry:any) => {
               if(finalR.country == gctry.code) {
                promCtry = gctry.name;
              }
            });
            this.brandDrpValues.forEach((brd:any) => {
              if(finalR.brand == brd.code) {
               prombrd = brd.name;
             }
           });
           this.getAdvertisingChannel.forEach((adv:any) => {
            if(finalR.advertisingChannel == adv.code) {
             promAdv = adv.value;
           }
           });
            this.getSalesChannel.forEach((sales:any) => {
              if(finalR.salesChannel == sales.code) {
                promSales = sales.value;
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

             if(finalR.hasOwnProperty('redemptionData')) {
              finalR.redemptionData = finalR.redemptionData
             } else {
               finalR.redemptionData = {
                discountAmount: null,
                orderTotalAfterDiscount: null,
                orderTotalBeforeDiscount: null,
                posOperatorId: null,
                redeemingMemberId: null,
                redemptionChannel: null,
                redemptionDateTime: null,
                salesTransactionId: null,
                storeId: null,
                storeName: null
               }
             }
             if(finalR.hasOwnProperty('allocatedCustomer')) {
               finalR.allocatedCustomer = finalR.allocatedCustomer;
             } else {
               finalR.allocatedCustomer = {
                email: null,
                memberId: null,
                mobile: null,
                subscriberId: null,
                firstName: null,
                lastName: null
               }
             }
             this.filteredVouchers.push(finalR);
          });
          
          this.tableShow = true;
          this.spinner.hide();
          this.dateRange = false;
      }
      },
      (error:any) => {
        this.spinner.hide();
      });
    } else {
      this.spinner.hide();
      this.dateRange = true;
      this.filteredVouchers = [];
      this.tableShow = false;
    }
  }

}