import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PromotionsService } from '../../services/promotions.service';
import { GetconfigService } from '../../services/getconfig.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-promotionupdate',
  templateUrl: './promotionupdate.component.html',
  styleUrls: ['./promotionupdate.component.scss']
})
export class PromotionupdateComponent implements OnInit {

  adlevelcountry: any;
  adlevelstate: boolean = false;
  adlevelstore: boolean = false;
  qrCodeImage: string = "";
  evtCode: any;
  advchannel: any;
  qrCodeImageOnUpdate: string = "";
  includedArticleIdValues: any[] = [];
  excludedArticleIdValues: any[] = [];
  articleIds: string = "";
  excludeArticleIds: string = "";
  lineCount: number = 0;
  lineCountExcluded: number = 0;
  articleErrorMessage: boolean = false;
  articleExcludedMessage: boolean = false;
  maxNumLines: number = 9999;
  showDiscountAmountError: boolean = false;
  artDisable: boolean = false;
  
  constructor(private router: Router, public route: ActivatedRoute, private getConfig: GetconfigService,
    private promotionService: PromotionsService, 
    private fb: FormBuilder,
    private spinner: NgxSpinnerService) { }
  promoId: string = "";
  // createNewHeader: string = "Uptate Promotion";
  promoData:any = [];
  selectedDrp: string = 'srg';
  countryDrp: string = "";
  articleDrp: string = 'article001';
  articleId: string = "";
  statusDrp: string = "active";
  channelDrp: string = "";
  brandDrp: string = "Select brand";
  adChannelDrp: string = "email";
  promoTypeDrp: string = "";
  promoTypeDrpChange = new EventEmitter<any>();
  enforceDrp: string = "anyone";
  redeemedBy: string = "";
  promoLevelDrp: any;
  adLevelDrp: any;
  newPromo: boolean = false;
  startdate = new FormControl(new Date());
  financialyear = new FormControl(new Date(2025, 11, 31));
  financialyearValues: any[] = ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];
  financialyearValues1: any[] = [];
  enddate = new FormControl("");
  enddates = new Date().getTime() + 2;
  statesDrp: string = "";
  adLocationState: string = "";
  storesDrp: string = "";
  changedStates: any[] = [];
  changedStores: any[] = [];
  ecompromoid: any;
  selectOnline: boolean = false;
  selectRegionEcom: boolean = false;
  selectRegionPOS: boolean = true;
  redeem: boolean = false;
  // abc: any[] = [];
  storeShow: boolean = false;
  stateChecked: any;
  stateunChecked: any;
  promolevelstate: boolean = false;
  promolevelstore: boolean = false
  // count: string = "Australia";
  panelOpenState = false;
  panelOpenState1 = false;
  
  promoLevelStore: any = "";
  adLocationStore: any = "";
  
  updatePromotionForm: FormGroup = new FormGroup({});
  createPromotionDetails: FormGroup = new FormGroup({});
  promolevelcountry: string = "";
  promolevelcountries: boolean = false;
  adlevelcountries: boolean = false;
  promoOverview: any;
  onlinePromoCode:any;
  articleIdValue: string = "";
  discountType: string = "";
  // discountTypeValue: any[] = ['Dollar Off', 'Percentage Off'];
  discountAmount: any;
  discountPercent: any;
  minimumSpend:any;
  couponDescriptionValue: string = "";
  receiptDescriptionValue: string = "";
  termsAndConditionsValue: string = "";
  country: string = "";
  adLocationCountry: string = "";
  posPromoCodeValue: any;
  ecomPromoCode: any;
  eventName: string = "";
  eventCode: string = "";
  extendableDays: string = "";
  toleranceDays: string = "";
  ifFromEvent: boolean = false;
  fyStartMonth: any;
  fyStartDate: any;
  fyEndMonth: any;
  fyEndDate: any;
  @Input() fromEvent: boolean = false;
  @Input() brand: string = "";
  @Input() eventCodeFromEvent: string = "";
  @Input() eventNameFromEvent: string = "";
  @Input() eventExtendableFromEvent: string = "";
  @Input() eventToleranceFromEvent: string = "";
  @Input() eventStartDateFromEvent = new FormControl(new Date());
  @Input() eventEndDateFromEvent = new FormControl(new Date());
  createNewHeader: string = "Update Promotion";
  extentDaysValue: any[] = ["1 to 7 Days"];
  tolerantDaysValue: any[] = ["14 to 30 Days"];
  selectAll: any;
  allStatesSelect: any[] = [];
  allStoresSelect: any[] = [];
  statesChecked: any;

  getPromoType: any[] = [];
  getPromType: any[] = [];
  @Input() getPromoTypeValue: any[] = [];

  getPromoStatus: any[] = [];
  getPromoStatusValues: any[] = [];

  getRedeemedBy: any[] = [];
  getRedeemedByValues: any[] = [];

  getSalesChannel: any[] = [];
  getSalesChannelValues: any[] = [];

  getDiscountType: any[] = [];
  getDiscountTypeValues: any[] = [];

  getAdvertisingChannel: any[] = [];
  getAdvertisingChannelValues: any[] = [];

  getExtendible: any[] = [];
  getExtendibleValues: any[] = [];
  getToleranceValues: any[] = [];

  getCountry:any[] = [];
  getCountryValues: any[] = [];

  getBrand: any[] = [];
  getBrandValues: any[] = [];

  getStates: any[] = [];
  getStatesValues: any[] = [];
  getStatesValuesL: any[] = [];

  getStores: any[] = [];
  getStoresValues: any[] = [];

  percentOff: boolean = false;
  allStates: any;
  allStatesLoc: any;

  ecomProCode: boolean = false;

  //validation patterns

  alphaneumaric = "^[a-zA-Z0-9]{10}$";
  onlychars = "^[a-zA-Z]+$";
  onlynumbers = "^[0-9]*$";

  todayDate: any;
  financeYearStartDate:Date = new Date();
  financeYearEndDate:Date = new Date();
  @Input() min: Date = new Date();
  maxDate: Date = new Date ();
  minDate: Date = new Date(new Date().getTime() + 86400000);
  stateslocChk: any;
  selectAllfirst: any;
  storeslocChk: any;
  storeFirst: any;

  selectallstates: any[] = [];
  selectallstatesL: any[] = [];

  salesLocationsStates: any[] = [];
  advertisingLocationStates: any[] = [];

  selectallstatesFormArray = this.fb.array([]);
  selectallstatesFormArrayL = this.fb.array([]);
  
  totallocations = this.fb.array([]);
  totallocationsS = this.fb.array([]);

  storeschecked: any[] = [];

  postpromoerror: boolean = false;
  postpromoerrormessage: string = "";

  ifallstatesselect: boolean = false;
  ifstoresselect: boolean = false;
  allstatesselect: boolean = false;

  dataload: boolean = false;
  ifNotified:boolean = false;
  ifActive: boolean = false;
  datemismatcherror: boolean = false;
  updateDisable: boolean = true;
  activateBtn: boolean = true;
  activatePromo: boolean = false;
  readyToactivatePromo: boolean = false;
  sendEmail: boolean = false;
  activeChk: boolean = false;
  updatedSuccess: boolean = false;
  readyToNotifyPromo: boolean = false;
  readyToA: boolean = false;
  updateDisabled: boolean = false;
  notify: boolean = false;
  notified: boolean = false;
  activated:boolean = false;
  finalactivation: boolean = false;
  activateSuccess: boolean = false;
  readytoactivateSuccess: boolean = false;
  emailnotify: boolean = false;
  downQrCodeImage: boolean = false;
  minSpend:boolean = false;
  dollarOff: boolean = false;
  percentageOff: boolean = true;
  emailNotification: boolean = false;
  notificationChk: boolean = true;
  setActiveStatus: boolean = false;
  artiIds: boolean = false;
  toleranceMessage: boolean = false;
  extactive: boolean = false;
  tolactive: boolean = false;
  userName: string = "";
  resendemail: boolean = false;

  ngOnInit(): void {
      var upd:any = sessionStorage.getItem('updatedData');
      this.promoData = JSON.parse(upd);
      this.userName = "admin";
    if(this.promoTypeDrp == "Generic" && this.promoData.discountType == "% Off") {
      this.minSpend = true;
      this.dollarOff = false;
      this.percentageOff = true;
    } else {
      this.minSpend = false;
      this.dollarOff = true;
      this.percentageOff = false;
    } 
    this.promoId = this.promoData.promotionId;
    this.promoOverview = this.promoData.promotionOverview;
    this.startdate = this.promoData.startDate
    this.enddate = this.promoData.endDate;
    this.onlinePromoCode = this.promoData.promoCode;
    this.discountAmount = this.promoData.discountAmount;
    this.minimumSpend = this.promoData.minimumSpend;
    this.couponDescriptionValue = this.promoData.couponDescription;
    this.receiptDescriptionValue = this.promoData.receiptDescription;
    this.termsAndConditionsValue = this.promoData.termsAndConditions;
    if(this.promoData.hasOwnProperty('articleIds')) {
      this.articleIds = this.promoData.articleIds.join('\n');
    }
    if(this.promoData.hasOwnProperty('excludeArticleIds')) {
      this.excludeArticleIds = this.promoData.excludeArticleIds.join('\n');
    }
    this.posPromoCodeValue = this.promoData.posPromotionId;
    this.ecomPromoCode = this.promoData.ecomPromotionId;
    this.advchannel = this.promoData.advertisingChannel;
    this.evtCode = this.promoData.eventCode;
    this.displayQrcode();
    this.spinner.show();
    this.todayDate = new Date();
    this.getConfig.getConfigData().then((confData) => {
      this.getDefaultValues(confData);
    });
   var promotion = {
     promotionType: new FormControl(this.promoTypeDrp, [Validators.required]),
   };
   
   this.updatePromotionForm = new FormGroup({
     requestType: new FormControl("CREATE"),
     promotion: new FormGroup({
       promotionType: new FormControl(this.promoTypeDrp, [Validators.required]),
       promotionStatus: new FormControl(this.statusDrp, [Validators.required]),
       promotionId: new FormControl(""),
       financialYear: new FormControl(this.financialyear, [Validators.required]),
       eventId: new FormControl(""),
       eventCode: new FormControl(""),
       brand: new FormControl(this.brand, [Validators.required]),
       country: new FormControl(this.countryDrp, [Validators.required]),
       articleIds: new FormControl(this.articleIds, [Validators.required]),
       excludeArticleIds: new FormControl(this.excludeArticleIds, [Validators.required]),
       discountType: new FormControl(this.discountType, [Validators.required]),
       discountAmount: new FormControl(this.discountAmount, [Validators.required]),
       minimumSpend: new FormControl(this.minimumSpend, [Validators.required]),
       receiptDescription: new FormControl(this.receiptDescriptionValue, [Validators.required]),
       requireQrcode: new FormControl(true),
       qrCodeColour: new FormControl(""),
       promotionOverview: new FormControl(this.promoOverview, [Validators.required]),
       redeemableBy: new FormControl(this.redeemedBy, [Validators.required]),
       startDate: new FormControl(this.startdate, [Validators.required]),
       endDate: new FormControl(""),
       salesChannel: new FormControl(this.channelDrp, [Validators.required]),
       advertisingChannel: new FormControl(this.adChannelDrp, [Validators.required]),
       toleranceDays: new FormControl(this.toleranceDays, [Validators.required]),
       extendableDays: new FormControl(this.extendableDays, [Validators.required]),
       promoCode: new FormControl(this.onlinePromoCode, [Validators.required]),
       couponDescription: new FormControl(this.couponDescriptionValue, [Validators.required]),
       termsAndConditions: new FormControl(this.termsAndConditionsValue, [Validators.required]),
       posPromotionId: new FormControl(this.posPromoCodeValue),
       ecomPromotionId: new FormControl(this.ecomPromoCode),
       salesLocation:  this.totallocationsS,
       advertisingLocation: this.totallocations,
       sendEmail: new FormControl(this.emailNotification),
       notified: new FormControl(this.readyToactivatePromo),
       emailNotification: new FormControl(this.emailNotification),
       userName: new FormControl(this.userName),
     }),     
   });
   if(this.fromEvent == true) {
     this.brandDrp = this.brand;
     this.eventCode = this.eventCodeFromEvent;
     this.eventName = this.eventNameFromEvent;
     this.extendableDays = this.eventExtendableFromEvent;
     this.toleranceDays = this.eventToleranceFromEvent;
     this.startdate = this.eventStartDateFromEvent;
     this.enddate = this.eventEndDateFromEvent;
     this.ifFromEvent = true;
   } 
  this.ecompromoid = "";
  if(this.promoTypeDrp == "Personalised") {
    this.redeem = true;
  }

  if(this.stateChecked == true) {
    this.storeShow = true;
  }

  this.stateChecked = -1;
  this.stateunChecked = -1;
  if(this.promoData.promotionStatus == "READY_TO_ACTIVATE") {
    this.notify = true;
    this.readyToNotifyPromo = true;
    this.readyToactivatePromo = true;
    this.statusDrp = "Ready to activate"
    this.ifNotified = true;
    this.activateBtn = true;
    this.readyToA = true;
    this.activeChk = false;
    this.activatePromo = false;
    this.activated = true;
    this.emailnotify = false;
    this.artDisable = true;
    this.tolactive = true;
    this.extactive = true;
    this.redeem = true;
  }
  if(this.promoData.promotionStatus == "ACTIVE" ) {
    this.ifActive = true;
    this.ifNotified = true
    this.activateBtn = true;
    this.activeChk = true;
    this.readyToA = true;
    this.activatePromo= true;
    this.readyToactivatePromo = true;
    this.notify = true;
    this.readyToNotifyPromo = true;
    this.updateDisabled = true;
    this.finalactivation = true;
    this.emailnotify = false;
    this.notificationChk = true;
    this.artDisable = true;
    this.tolactive = true;
    this.extactive = true;
    this.resendemail = true;
    this.emailNotification = true;
    this.redeem = true;
  }
  if(this.promoData.promotionStatus == "READY_TO_NOTIFY") {
    this.statusDrp = "Ready to notify";
    this.activeChk = true;
    this.notify = true;
    this.readyToNotifyPromo = true;
    this.readyToA = false;
    this.notified = true;
    this.notificationChk = false;
    this.artDisable = true;
   // data.promotion.promotionStatus = data.promotion.promotionStatus;
  } 
  
  if(this.promoData.promotionStatus == "INACTIVE") {
    this.statusDrp = "Inactive";
    this.activeChk = true;
    this.notify = false;
    this.readyToNotifyPromo = false;
    this.readyToA = true;
    this.readyToactivatePromo = false;
    this.notified = false;
    this.emailnotify = false;
  }
  if(this.promoData.hasOwnProperty("advertisingLocation")) {
  this.promoData.advertisingLocation.forEach((ad:any) => {
     if(ad.checked == false) {
      this.allStatesLoc = false;
     } else {
      this.allStatesLoc = true;
     }
  });
 }
 if(this.promoData.hasOwnProperty("salesLocation")) {
  this.promoData.salesLocation.forEach((sl:any) => {
    if(sl.checked == false) {
     this.allStates = false;
    } else {
     this.allStates = true;
    }
 });
}
  }

activate() {
  this.ifActive = true;
  this.statusDrp = "Active";
 // this.updatePromotion();
}
activateChk(evt:any){
  if(evt.checked == true) {
    this.statusDrp = "Active";
    this.ifActive = true;
  } else {
    this.ifActive = false;
    this.statusDrp = "Ready to activate"
  }
  this.activatePromo = evt.checked;
}



minDateChange() {
  //this.minDate = new Date(this.startdate)
}
getDefaultValues(configData:any) {
  this.getPromoType = configData.systemConfig.configMap.PROMOTION_TYPE;
  var promType = this.getPromoType.sort((a, b) => a.order-b.order);
  this.getPromoType = promType;
  if(this.getPromoType) {
    this.getPromoType.forEach((promoT) => {
              this.getPromoTypeValue.push(promoT.value);
               if(promoT.code == this.promoData.promotionType || promoT.value == this.promoData.promotionType) {
                this.promoTypeDrp = promoT.value;
               } 
            });
   }

   this.getPromoStatus = configData.systemConfig.configMap.PROMOTION_STATUS;
   var promStatus = this.getPromoStatus.sort((a, b) => a.order-b.order);
   this.getPromoStatus = promStatus;
   if(this.getPromoStatus) {
      this.getPromoStatus.forEach((promoS) => {
        this.getPromoStatusValues.push(promoS.value);
        if(this.promoData.promotionStatus == promoS.value.toUpperCase()) {
          let ps = promoS.value;
          this.statusDrp = ps;
        }
      });
   }

   this.getRedeemedBy = configData.systemConfig.configMap.REDEEMABLE_BY;
   var redBy = this.getRedeemedBy.sort((a, b) => a.order-b.order);
   this.getRedeemedBy = redBy;
   if(this.getRedeemedBy) {
      this.getRedeemedBy.forEach((redemBy) => {
        this.getRedeemedByValues.push(redemBy.value);
        if(this.promoData.redeemableBy == redemBy.code || this.promoData.redeemableBy == redemBy.code || this.promoData.redeemableBy == redemBy.value) {
          if(this.promoTypeDrp  == "Generic") {
            this.redeemedBy = redemBy.value;
            this.redeem = true;
            this.selectOnline = true;
          } else if(this.promoTypeDrp  == "Journey" ) {
            this.redeemedBy = redemBy.value;
            this.redeem = false;
            this.selectOnline = false;
          } else if(this.promoTypeDrp  == "Personalised" || this.promoTypeDrp  == "Public") {
            this.redeemedBy = redemBy.value
            this.redeem = false;
            this.selectOnline = false;
          } else {
            this.redeemedBy = redemBy.value
            this.redeem = false;
          }

        }
      });
   }

   this.getSalesChannel = configData.systemConfig.configMap.SALES_CHANNEL;
   var salChan = this.getSalesChannel.sort((a, b) => a.order-b.order);
   this.getSalesChannel = salChan;
    if(this.getSalesChannel) {
      this.getSalesChannel.forEach((salesC) => {
        this.getSalesChannelValues.push(salesC.value);
        if(this.promoData.salesChannel == salesC.code || this.promoData.salesChannel == salesC.value) {
          let ps = salesC.value;
          this.channelDrp = ps;
          if(this.channelDrp == "Instore") {
            this.selectOnline = false;
            this.selectRegionEcom = true;
            this.selectRegionPOS = true;
            this.ecomProCode = false;
          } else if(this.channelDrp == "Online" && this.promoTypeDrp == "Generic"){
            this.selectOnline = true;
            this.selectRegionEcom = true;
            this.selectRegionPOS = false;
            this.ecomProCode = true;
          }
          else if(this.channelDrp == "Instore and Online" && this.promoTypeDrp == "Generic"){
            this.selectOnline = true;
            this.selectRegionEcom = true;
            this.selectRegionPOS = true;
            this.ecomProCode = true;
          }
          if(this.channelDrp == "Instore and Online" && this.promoTypeDrp == "Journey"
             || this.channelDrp == "Instore and Online" && this.promoTypeDrp == "Personalised"){
            this.selectOnline = false;
            this.selectRegionEcom = true;
            this.selectRegionPOS = true;
            this.ecomProCode = true;
          } else if(this.channelDrp == "Online" && this.promoTypeDrp == "Journey"
                    || this.channelDrp == "Online" && this.promoTypeDrp == "Personalised"){
            this.selectOnline = false;
            this.selectRegionEcom = true;
            this.selectRegionPOS = false;
            this.ecomProCode = true;
          }
        }
      });
   }

   this.getDiscountType = configData.systemConfig.configMap.DISCOUNT_TYPE;
   var discType = this.getDiscountType.sort((a, b) => a.order-b.order);
   this.getDiscountType = discType;
   if(this.getDiscountType) {
      this.getDiscountType.forEach((discountT) => {
        this.getDiscountTypeValues.push(discountT.value);

        if(this.promoData.discountType == discountT.code || this.promoData.discountType == discountT.value) {
          let ps = discountT.value;
          this.discountType = ps;
          if(this.discountType != "% Off" && this.discountType != "$ Off") {
            this.artiIds = true;
          } else {
            this.artiIds = false;
          }
        }
      });
      if(this.promoData.discountType == "% Off") {
        this.percentOff = false;
      } 
      if(this.promoData.discountType != "% Off") {
        this.percentOff = true;
      }
      if(this.promoTypeDrp == "Generic" && this.discountType == "$ Off" || this.promoTypeDrp == "Generic" && this.promoData.discountType == "$ Off") {
        this.minSpend = true;
        this.dollarOff = false;
        this.percentageOff = true;
      } else {
        this.minSpend = false;
        this.dollarOff = true;
        this.percentageOff = false;
        
      }
   }

   this.getAdvertisingChannel = configData.userConfig.configMap.ADVERTISING_CHANNEL;
   var advChan = this.getAdvertisingChannel.sort((a, b) => a.order-b.order);
   this.getAdvertisingChannel = advChan;
   if(this.getAdvertisingChannel) {
      this.getAdvertisingChannel.forEach((advertisingC) => {
        this.getAdvertisingChannelValues.push(advertisingC.value);
        if(this.promoData.advertisingChannel == advertisingC.code || this.promoData.advertisingChannel == advertisingC.value) {
          let ps = advertisingC.value;
          this.adChannelDrp = ps;
        }
      });
   }

   

   this.getExtendible = configData.userConfig.configMap.CONFIG;
   if(this.getExtendible) {
      this.getExtendible.forEach((extendibleD) => {
        if(extendibleD.code == "EXTENDABLEDAYS") {
          var totaldays = extendibleD.value;
          for(var i=0; i <= totaldays; i++ ){
          this.getExtendibleValues.push(i);
          }
          this.extendableDays = this.promoData.extendableDays;
        }
        if(extendibleD.code == "TOLERANCEDAYS") {
          var totaldays = extendibleD.value;
          for(var i=0; i <= totaldays; i++ ){
          this.getToleranceValues.push(i);
          }
          this.toleranceDays = this.promoData.toleranceDays;
        }

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
          this.financialyear = this.promoData.financialYear;
        }
        var financeDate = this.financialyear.toString().split("-");
        this.financeYearStartDate = new Date(parseInt(financeDate[0]), this.fyStartMonth, this.fyStartDate);
        this.financeYearEndDate = new Date(parseInt(financeDate[1]), this.fyEndMonth, this.fyEndDate);
        
      });
   }

   this.getCountry = configData.userConfig.sourceMarket;
   if(this.getCountry) {
      this.getCountry.forEach((country) => {
      this.getCountryValues.push(country);
        if(country.code == this.promoData.country || country.name == this.promoData.country) {
          let ps = country;
          this.countryDrp = ps;
          this.country = ps.code;
          country.brand.forEach((element:any) => {
            this.getBrandValues.push(element);
            if(element.code == this.promoData.brand || element.name == this.promoData.brand) {
              let pt = element;
              this.brandDrp = pt;
              this.brand = pt.code;
              const firstArray = element.states;
              const secondArray = element.states;
              var abc = [];
             this.getStatesValues = JSON.parse(JSON.stringify(firstArray));
             this.getStatesValuesL = JSON.parse(JSON.stringify(secondArray))

          if(this.promoData.salesLocation != undefined) {
            for(var i=0; i < this.promoData.salesLocation.length; i++) {
              if(this.promoData.salesLocation[i].checked == true) {
                if(this.getStatesValues.length == this.promoData.salesLocation.length) {
                  this.allStates = true;
                } else {
                  this.allStates = false;
                }
                this.getStatesValues.some((configStores:any) => {
                    if(this.promoData.salesLocation[i].code == configStores.code) {
                      configStores.checked = true;
                      configStores.stores.forEach((configEveryStore:any) => {
                         configEveryStore.checked = true;
                      });
                    }
                });
                
              }
              if(this.promoData.salesLocation[i].checked == false) {
                this.getStatesValues.some((configStores:any) => {
                    if(this.promoData.salesLocation[i].code == configStores.code) {
                      for(var j=0; j < this.promoData.salesLocation[i].stores.length; j++) {
                        if(this.promoData.salesLocation[i].stores[j].checked == true) {
                          configStores.stores.map(
                            (elem:any) =>{
                              this.promoData.salesLocation[i].stores.some((store:any) => {
                                  if(elem.id == store.id && store.checked == true) {
                                    elem.checked = true;
                                  }
                              });
                            });
                        } 
                      }

                    } 
                });
                
              }
            }
          }


            if(this.promoData.advertisingLocation != undefined) {
              for(var i=0; i < this.promoData.advertisingLocation.length; i++) {
                if(this.promoData.advertisingLocation[i].checked == true) {
                  if(this.getStatesValuesL.length == this.promoData.advertisingLocation.length) {
                    this.allStatesLoc = true;
                  } else {
                    this.allStatesLoc = false;
                  }
                  this.getStatesValuesL.some((configStores:any) => {
                      if(this.promoData.advertisingLocation[i].code == configStores.code) {
                        configStores.checked = true;
                        configStores.stores.forEach((configEveryStore:any) => {
                           configEveryStore.checked = true;
                        });
                      }
                  });
                  
                }
                if(this.promoData.advertisingLocation[i].checked == false) {
                  this.getStatesValuesL.some((configStores:any) => {
                      if(this.promoData.advertisingLocation[i].code == configStores.code) {
                        for(var j=0; j < this.promoData.advertisingLocation[i].stores.length; j++) {
                          if(this.promoData.advertisingLocation[i].stores[j].checked == true) {
                            configStores.stores.map(
                              (elem:any) =>{
                                this.promoData.advertisingLocation[i].stores.some((store:any) => {
                                    if(elem.id == store.id && store.checked == true) {
                                      elem.checked = true;
                                    }
                                });
                              });
                          } 
                        }
  
                      } 
                  });
                  
                }
              }
          }

          
              this.dataload = true;
            }
          });
        }
      });
   }
  this.spinner.hide();

}

home() {
  window.location.href = environment.azureurl;
}

onChangeFinanceYear(evt:any) {
   var financeDate = evt.value.split("-");
   this.financeYearStartDate = new Date(parseInt(financeDate[0]), this.fyStartMonth, this.fyStartDate);
   this.financeYearEndDate = new Date(parseInt(financeDate[1]), this.fyEndMonth, this.fyEndDate);
}

onChange(event: any) {
}

onChangeChannel(event: any) {
    if(this.channelDrp == "Instore") {
      this.selectOnline = false;
      this.selectRegionEcom = true;
      this.selectRegionPOS = true;
      this.ecomProCode = false;
      this.ecomPromoCode = undefined;
    } else if(this.channelDrp == "Online" && this.promoTypeDrp == "Generic"){
      this.selectOnline = true;
      this.selectRegionEcom = true;
      this.selectRegionPOS = false;
      this.ecomProCode = true;
      this.onlinePromoCode = this.promoData.promoCode;
    } else if(this.channelDrp == "Instore and Online" && this.promoTypeDrp == "Generic"){
      this.selectOnline = true;
      this.selectRegionEcom = true;
      this.selectRegionPOS = true;
      this.ecomProCode = true;
      this.onlinePromoCode = this.promoData.promoCode;
    } else if(this.channelDrp == "Instore and Online" && this.promoTypeDrp == "Journey"
              || this.channelDrp == "Instore and Online" && this.promoTypeDrp == "Personalised"){
      this.selectOnline = false;
      this.selectRegionEcom = true;
      this.selectRegionPOS = true;
      this.ecomProCode = true;
    } else if(this.channelDrp == "Online" && this.promoTypeDrp == "Journey"
       || this.channelDrp == "Online" && this.promoTypeDrp == "Personalised"){
      this.selectOnline = false;
      this.selectRegionEcom = true;
      this.selectRegionPOS = false;
      this.ecomProCode = true;
      this.posPromoCodeValue = undefined;
    }
}
onChangeCountry(event: any) {
    this.country = event.value.code;
    this.getBrandValues = [];
    this.getBrandValues = event.value.brand;
    this.getStatesValues = this.getBrandValues[0].states;
    this.getStatesValuesL = this.getBrandValues[0].states;
    this.getBrandValues.forEach((brand:any) => {
      if(brand.default == true) {
        this.brandDrp = brand;
      }
    });
}

readyToNotify(evt:any) {
  this.readyToNotifyPromo = evt.checked;
  if(this.readyToNotifyPromo == true) {
    this.statusDrp = "Ready to notify";
  } else {
    this.statusDrp = "Inactive";
  }
}

sendEmailNotification(evt:any) {
  this.emailNotification = evt.checked;
}

readyToActivateChk(evt:any) {
  this.readyToactivatePromo = evt.checked;
  if(this.readyToactivatePromo == true) {
    this.statusDrp = "Ready to activate";
    this.ifNotified = true;
    this.tolactive = true;
    this.extactive = true;
    this.redeem = true;
 } else if(this.readyToactivatePromo == false){
    this.ifNotified = false;
    this.statusDrp = "Ready to notify";
    this.tolactive = false;
    this.extactive = false;
    this.redeem = false;
 }
}

onDiscountType(event: any) {
  if(event.value != "% Off" && event.value != "$ Off") {
    this.artiIds = true;
  } else {
    this.artiIds = false;
  }
  if(event.value == "% Off") {
    this.percentOff = false;
  } else {
    this.percentOff = true;
  }
  if(this.promoTypeDrp == "Generic" && this.discountType == "% Off") {
    this.minSpend = true;
    this.dollarOff = false;
    this.percentageOff = true;
    this.minimumSpend = "Full Priced Item"
  }
  else if(this.promoTypeDrp == "Generic" && (event.value != "% Off" || event.value != "$ Off")) {
    this.minSpend = true;
    this.minimumSpend = "";
  } else {
    this.minSpend = false;
    this.dollarOff = true;
    this.percentageOff = false;
    this.minimumSpend = null;
  }
}

onChangeBrand(event: any) {
  this.getStatesValues = [];
  this.getStatesValuesL = [];
  this.brand = event.value.code;
  const firstArray = event.value.states;
  const secondArray = event.value.states;
  this.getStatesValues = JSON.parse(JSON.stringify(firstArray));
  this.getStatesValuesL = JSON.parse(JSON.stringify(secondArray));
  this.allStates = false;
}

onChangePromoStatus(evt:any) {
  this.statusDrp = evt.value
  if(evt.value == "Ready to activate") {
    this.ifNotified = true;
  }
}

onChangeAdChannel(event: any) {

}
onChangeRedeemedBy(event: any) {

}


onChangePromoType(event: any) {
  if(this.promoTypeDrp == "Generic") {
    this.redeemedBy = "Any Member";
    this.redeem = true;
    this.selectOnline = true;
  } else if(this.promoTypeDrp == "Journey") {
    this.redeemedBy = "Any Member";
    this.redeem = false;
    this.selectOnline = false;
  } else if(this.promoTypeDrp == "Personalised" || this.promoTypeDrp == "Public") {
    this.redeemedBy = "Anyone";
    this.redeem = false;
  } else {
    this.redeemedBy = "Anyone";
    this.redeem = true;
  }
}

public hasError = (controlName: string, errorName: string) => {
  if(controlName == "undefined") {
  return this.createPromotionDetails.controls[controlName].hasError(errorName);
  } else {
    return undefined
  }
}

onSendEmail(evt:any) {
  this.sendEmail = evt.checked;
}

selectAllStates(st:any, statesValues: any){
  if(st == true) {
    statesValues.forEach((element:any) => {
      element.isSelected = "allstatesandstores";
      element.checked = true;
      element.stores.forEach((store: any) => {
        store.checked = true;
  });
    this.selectallstatesFormArray = statesValues;
  });
} else if(st == false) {
  statesValues.forEach((element:any) => {
    element.isSelected = "allstatesandstores";
    element.checked = false;
    element.stores.forEach((store: any) => {
      store.checked = false;
});
  this.selectallstatesFormArray = statesValues;
  statesValues = [];
});
}

}
selectAllStatesL(st:any, statesValues: any){
if(st == true) {
  statesValues.forEach((element:any) => {
    element.isSelected = "allstatesandstores";
    element.checked = true;
    element.stores.forEach((store: any) => {
      store.checked = true;
});
  this.selectallstatesFormArrayL = statesValues;
});
} else if(st == false) {
statesValues.forEach((element:any) => {
  element.isSelected = "allstatesandstores";
  element.checked = false;
  element.stores.forEach((store: any) => {
    store.checked = false;
});
this.selectallstatesFormArrayL = statesValues;
statesValues = [];
});
}

}

clearFormArray = (formArray: FormArray) => {
while (formArray.length !== 0) {
  formArray.removeAt(0)
}
}

selectAllStores(st:any, states:any, stateValues:any){   
this.allStates = false;
stateValues.forEach((element:any) => {
  element.stores.forEach((store: any) => {
    if(states.name == element.name && st.checked == true){
    store.checked = true;
    element.isSelected = "statesandstores";
    const allEqual = stateValues.every( (v:any) => v.checked == true );
      if(allEqual == true){
        this.allStates = true;
      }
      else{
        this.allStates = false;
      }
    } else if(states.name == element.name && st.checked == false){
      store.checked = false;
      element.isSelected = "statesandstores";
    }
  });
});
this.selectallstatesFormArray = stateValues;
stateValues = [];
  
}

selectAllStoresL(st:any, states:any, stateValues: any){
this.allStatesLoc = false;
stateValues.forEach((element:any) => {
  element.stores.forEach((store: any) => {
    if(states.name == element.name && st.checked == true){
    store.checked = true;
    element.isSelected = "statesandstores";
    const allEqual = stateValues.every( (v:any) => v.checked == true );
      if(allEqual == true){
        this.allStatesLoc = true;
      }
      else{
        this.allStatesLoc = false;
      }
    } else if(states.name == element.name && st.checked == false){
      store.checked = false;
      element.isSelected = "statesandstores";
    }
  });
});
this.selectallstatesFormArrayL = stateValues;
stateValues = [];

}

selectStores($event:any, stores:any, stateValues:any){
stateValues.forEach((element:any) => {
  element.stores.forEach((store: any) => {
    if(stores.name == store.name && $event.checked == true){
    store.checked = true;
    element.isSelected = "onlystores";
    const allEqual = element.stores.every( (v:any) => v.checked == true );
      if(allEqual == true){
        element.checked = true;
      }
      else{
        element.checked = false;
      }
      const allStateEqual = stateValues.every( (v:any) => v.checked == true );
      if(allStateEqual == true){
        this.allStates = true;
        element.checked = true;
      }
      else{
        this.allStates = false;
        element.checked = false;
      }      
    } else if(stores.name == store.name && $event.checked == false){
      store.checked = false;
      element.checked = false;
      this.allStates = false;
      element.isSelected = "onlystores";
    }
  });
});

this.selectallstatesFormArray = stateValues;
stateValues = [];

}

selectStoresL($event:any, stores:any, stateValues:any){
stateValues.forEach((element:any) => {
element.stores.forEach((store: any) => {
  if(stores.name == store.name && $event.checked == true){
  store.checked = true;
  element.isSelected = "onlystores";
  const allEqual = element.stores.every( (v:any) => v.checked == true );
      if(allEqual == true){
        element.checked = true;
      }
      else{
        element.checked = false;
      }
      const allStateEqual = stateValues.every( (v:any) => v.checked == true );
      if(allStateEqual == true){
        this.allStatesLoc = true;
        element.checked = true;
      }
      else{
        this.allStatesLoc = false;
        element.checked = false;
      }      
  } else if(stores.name == store.name && $event.checked == false){
    store.checked = false;
    element.checked = false;
    this.allStatesLoc = false;
    element.isSelected = "onlystores";
  }
});
});

this.selectallstatesFormArrayL = stateValues;
stateValues = [];

}
convertDate(str:any) {
var date = new Date(str),
  mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  day = ("0" + date.getDate()).slice(-2);
return [date.getFullYear(), mnth, day].join("-");
}


updatePromotion() {
    this.updatedSuccess = false;
    this.activateSuccess = false;
    this.readytoactivateSuccess = false;
    let totalStatesAndStores:any = [];
    let storesAndStates: any = [];
    let totalStatesAndStoresS: any = [];
    let storesAndStatesS: any = [];
    if(this.enddate == undefined) {
      this.enddate = this.promoData.endDate;
    }
    if(this.startdate == undefined) {
      this.startdate = this.promoData.startDate;
    }

    if(this.selectallstatesFormArrayL.length != 0) {
    totalStatesAndStores = JSON.parse(JSON.stringify(this.selectallstatesFormArrayL));
    }
    if(this.selectallstatesFormArray.length) {
    totalStatesAndStoresS = JSON.parse(JSON.stringify(this.selectallstatesFormArray));
    }     
    
    totalStatesAndStoresS.forEach((states:any) => {
      var checkedStores:any = []
      states.stores.forEach((stores:any)=> {
      if(states.isSelected == "allstatesandstores" && stores.checked == true) {
         checkedStores.push(stores);
         states.stores = checkedStores;
      } 
      if(states.isSelected === "statesandstores" && stores.checked == true) {
         checkedStores.push(stores);
         states.stores = checkedStores;
      } 
      
      if(states.isSelected === "statesandstores" && stores.checked == false) {
       let index = states.stores.findIndex(
         (item:any) => item.checked == false
       )
       states.stores = states.stores.splice(index, 0);
      } 
      
      if(states.isSelected === "onlystores" && stores.checked == true) {   
         checkedStores.push(stores);
         var filteredStores = checkedStores.filter((obj:any) => obj.checked == true);
         states.stores = filteredStores;
       } 
    });
    storesAndStatesS.push(states);
});

var filteredStates = storesAndStatesS.filter((obj:any) => obj.checked == true ||
obj.isSelected == "onlystores");

filteredStates.forEach((alloca:any) => {
 if(alloca.hasOwnProperty('isSelected')) {
  this.totallocationsS.push(this.fb.group({"checked": alloca.checked,"code": alloca.code, "name": alloca.name, "stores": this.fb.array(alloca.stores)}));
}
});
filteredStates = [];



  totalStatesAndStores.forEach((states:any) => {
       var checkedStores:any = []
         states.stores.forEach((stores:any)=> {
         if(states.isSelected == "allstatesandstores" && stores.checked == true) {
            checkedStores.push(stores);
            states.stores = checkedStores;
         }
         
         if(states.isSelected === "statesandstores" && stores.checked == true) {
            checkedStores.push(stores);
            states.stores = checkedStores;
         } 
         
         if(states.isSelected === "statesandstores" && stores.checked == false) {
          let index = states.stores.findIndex(
            (item:any) => item.checked == false
          )
          states.stores = states.stores.splice(index, 0);
         } 
         
         if(states.isSelected === "onlystores" && stores.checked == true) {   
            checkedStores.push(stores);
            var filteredStoresA = checkedStores.filter((obj:any) => obj.checked == true);
                states.stores = filteredStoresA;   
          } 
       });
       storesAndStates.push(states);
  });
  var filteredStatesA = storesAndStates.filter((obj:any) => obj.checked == true ||
  obj.isSelected == "onlystores");

  filteredStatesA.forEach((alloca:any) => {
    if(alloca.hasOwnProperty('isSelected')) {
      this.totallocations.push(this.fb.group({"checked": alloca.checked,"code": alloca.code, "name": alloca.name, "stores": this.fb.array(alloca.stores)}));
    }
  });
    filteredStatesA = [];
    let finDate: any;
    if(this.startdate != this.promoData.startDate || this.enddate != undefined) {
      var arr1 = this.startdate.toString();
    var arr2 = this.convertDate(arr1);
    var  newStartDate = arr2;
    if(this.enddate.value instanceof Date || this.enddate) {
    var arr3 = this.enddate.toString();
    var arr4 = this.convertDate(arr3)
    var newEndDate = arr4;
    finDate = newEndDate;
    } else {
     finDate = null;
   }
    } else {
      newStartDate = this.promoData.startDate;
      finDate = this.promoData.endDate;
    }
    let promcode = "";
    let discount = "";
    let redeem = "";
    let sales = "";
    let advertising = "";
    this.getPromoType.forEach((promoT) => {
       if(promoT.value == this.promoTypeDrp) {
         promcode = promoT.code;
       }
    });
    this.getDiscountType.forEach((discountT) => {
      if(discountT.value == this.discountType) {
        discount = discountT.code;
      }
    });
    this.getRedeemedBy.forEach((redemBy) => {
      if(redemBy.value == this.redeemedBy) {
        redeem = redemBy.code;
      }
    });
    this.getSalesChannel.forEach((salesC) => {
      if(salesC.value == this.channelDrp) {
        sales = salesC.code;
      }
    });
    this.getAdvertisingChannel.forEach((advertisingC) => {
      if(advertisingC.value == this.adChannelDrp) {
        advertising = advertisingC.code;
      }
    });

    var ecom:any;
    var pos:any;

    if(newStartDate > finDate) {
      this.datemismatcherror = true;
    } else {
      this.datemismatcherror = false;
    }

    if(this.ecomPromoCode != undefined || this.ecomPromoCode != "") {
      ecom = this.ecomPromoCode;
    } else {
      ecom = undefined;
    }

    if(this.posPromoCodeValue != undefined || this.posPromoCodeValue != "") {
      pos = this.posPromoCodeValue;
    } else {
      pos = undefined;
    }

    if(this.promoTypeDrp == "Generic" && this.channelDrp == "Instore") {
      this.onlinePromoCode = ""
    } else {
      this.onlinePromoCode == this.promoData.onlinePromoCode;
    }
     
    if(this.statusDrp == "Ready to activate") {
      this.statusDrp = this.statusDrp.replaceAll(" ", "_");
    }
    if(this.statusDrp == "Ready to notify") {
      this.statusDrp = this.statusDrp.replaceAll(" ", "_");
    }
  
    if(!this.minimumSpend) {
        this.minimumSpend = undefined;
    }
    this.includedArticleIdValues = this.articleIds.split('\n');
    this.excludedArticleIdValues = this.excludeArticleIds.split('\n');
    this.includedArticleIdValues = this.includedArticleIdValues.filter((item:any) => item !== "");
    this.excludedArticleIdValues = this.excludedArticleIdValues.filter((item:any) => item !== "");
    if(this.percentOff == false && this.discountAmount > 100) {
      this.showDiscountAmountError = true;
    } else {
      this.showDiscountAmountError = false;
    }
    if(this.promoOverview != undefined && this.discountAmount != "" && this.showDiscountAmountError == false && this.toleranceMessage == false
       && this.receiptDescriptionValue != "" && this.couponDescriptionValue != "" && this.minimumSpend != ""
       && this.termsAndConditionsValue != "" && (newStartDate <= finDate || this.promoTypeDrp == "Journey" && finDate == null || this.promoTypeDrp == 'Generic' && finDate != null || this.promoTypeDrp == "Personalised" && finDate == null || this.promoTypeDrp == "Public" && finDate == null || this.promoTypeDrp == "Anonymous" && finDate == null) 
       && this.discountAmount > 0 && this.showDiscountAmountError == false && (this.channelDrp != 'Instore' && this.promoTypeDrp == 'Generic' && this.onlinePromoCode != undefined 
       || this.channelDrp == 'Instore' && this.promoTypeDrp == 'Generic' && this.onlinePromoCode == ""
       || this.promoTypeDrp == 'Journey' && this.onlinePromoCode == "" || this.promoTypeDrp == 'Personalised' && this.onlinePromoCode == "" || this.promoTypeDrp == "Public" && this.onlinePromoCode == "" || this.promoTypeDrp == "Anonymous" && this.onlinePromoCode == "")
       && (this.statusDrp == "Active" || this.statusDrp == "Inactive" || this.statusDrp == "READY_TO_NOTIFY" || this.statusDrp == "Ready_to_notify"
       || this.readyToactivatePromo == true && this.posPromoCodeValue != undefined && this.ecomPromoCode != undefined
       || this.statusDrp == "Ready_to_activate" && (this.promoTypeDrp == "Generic" || this.promoTypeDrp == "Journey" || this.promoTypeDrp == "Personalised") && (this.channelDrp == 'Instore' && this.posPromoCodeValue != undefined && this.ecomPromoCode == undefined)
       || this.statusDrp == "Ready_to_activate" && (this.promoTypeDrp == "Generic" || this.promoTypeDrp == "Journey" || this.promoTypeDrp == "Personalised") && (this.channelDrp == 'Online' && this.posPromoCodeValue == undefined && this.ecomPromoCode != undefined)
       || this.statusDrp == "Ready_to_activate" && (this.promoTypeDrp == "Generic" || this.promoTypeDrp == "Journey" || this.promoTypeDrp == "Personalised") && (this.channelDrp == 'Instore and Online' && this.posPromoCodeValue != undefined && this.ecomPromoCode != undefined)) 
        && (this.promoTypeDrp == 'Generic' && this.percentageOff == true && this.minimumSpend != undefined || this.promoTypeDrp == 'Generic' && this.percentageOff == false && this.minimumSpend !== undefined || this.promoTypeDrp != "Generic" && this.percentageOff == false )
       ) { 
      this.articleErrorMessage = false;
      this.articleExcludedMessage = false;
      this.spinner.show();
      this.updatePromotionForm.patchValue({
      requestType: "UPDATE",
      promotion: {
      promotionType: promcode,
      promotionId: this.promoData.promotionId,
      financialYear: this.financialyear,
      eventId: this.promoData.eventId,
      eventCode: this.promoData.eventCode,
      brand: this.brand,
      country: this.country,
      articleIds: this.includedArticleIdValues,
      excludeArticleIds: this.excludedArticleIdValues,
      //articleIds: null,
      //excludeArticleIds: null,
      discountType: discount,
      discountAmount: this.discountAmount,
      minimumSpend: this.minimumSpend,
      receiptDescription: this.receiptDescriptionValue,
      requireQrcode: true,
      qrCodeColour: "",
      promotionStatus: this.statusDrp.toUpperCase(),
      promotionOverview: this.promoOverview,
      redeemableBy: redeem,
      startDate: newStartDate.toString(),
      endDate: finDate,
      salesChannel: sales,
      advertisingChannel: advertising,
      toleranceDays: this.toleranceDays,
      extendableDays: this.extendableDays,
      promoCode: this.onlinePromoCode,
      couponDescription: this.couponDescriptionValue,
      termsAndConditions: this.termsAndConditionsValue,
      posPromotionId: pos,
      ecomPromotionId: ecom,
      salesLocation: this.totallocationsS.value,
      advertisingLocation: this.totallocations.value,
      sendEmail: this.emailNotification,
      notified: this.readyToactivatePromo,
      emailNotification: this.emailNotification,
      userName: this.userName
      },
    });
  this.promotionService.updatePromotion(this.updatePromotionForm.value).subscribe((data:any) => 
     { 
        if(data.hasOwnProperty("promotion") == false) {
          this.postpromoerror = true;
          this.spinner.hide();
         this.postpromoerrormessage = data.error[0].message;
         
        } else if(data.hasOwnProperty("promotion") == true) {
          
        sessionStorage.setItem('updatedData', JSON.stringify(data.promotion));
          let promid = data.promotion.promotionId;
          if(data.promotion.promotionStatus == "READY_TO_ACTIVATE") {
            this.ifNotified = true;
            this.activateBtn = true;
            this.readyToA = true;
            this.activeChk = false;
       //     this.statusDrp = "Ready to activate";
            this.activatePromo = false;
            this.promoData.promotionStatus = data.promotion.promotionStatus;
            this.activated = true;
            this.readytoactivateSuccess = true;
            this.emailnotify = false;
            this.statusDrp = "Ready to activate";
            this.artDisable = true;
            this.tolactive = true;
            this.extactive = true;
            this.redeem = true;
          }
          if(data.promotion.promotionStatus == "ACTIVE" ) {
            this.ifActive = true;
            this.ifNotified = true
            this.activateBtn = true;
            this.activeChk = true;
            this.readyToA = true;
            this.activatePromo= true;
            this.readyToactivatePromo = true;
            this.updateDisabled = true;
            this.finalactivation = true;
            this.emailnotify = false;
            this.statusDrp = "Active";
            this.notificationChk = true;
            this.emailNotification = true;
            this.setActiveStatus = true;
            if(data.promotion.hasOwnProperty('qrCodeImage')){
              this.downQrCodeImage = true;
              this.qrCodeImageOnUpdate = data.promotion.qrCodeImage;
            }
            this.displayQrcode();
            this.artDisable = true;
            this.tolactive = true;
            this.extactive = true;
            if(this.promoData.eventId != undefined) {
              this.router.navigate(["/updateevent/"], {
                queryParams: {
                promData:true,
                eventId:this.promoData.eventId
                }});
            } else {
              this.router.navigate(["/promotionupdate"]);
              this.resendemail = true;
            }
          }

          if(data.promotion.promotionStatus == "READY_TO_NOTIFY") {
            this.statusDrp = "Ready to notify";
            this.activeChk = true;
            this.notify = true;
            this.readyToNotifyPromo = true;
            this.readyToA = false;
            this.notified = true;
            this.emailnotify = true;
            this.notificationChk = false;
            this.artDisable = true;
          } 
          
          if(data.promotion.promotionStatus == "INACTIVE") {
            this.statusDrp = "Inactive";
            this.activeChk = true;
            this.notify = false;
            this.readyToNotifyPromo = false;
            this.readyToA = true;
            this.notified = false;
            this.updatedSuccess = true;
            this.emailnotify = false;
          } 
          
         this.spinner.hide();
        
        }
    },
     Error => {
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
savePromotion(){
  this.router.navigate(['/confirmpromotion']);
}

displayQrcode(){
  if(this.promoData.hasOwnProperty("qrCodeImage") || this.downQrCodeImage){
    (document.getElementById('download') as HTMLElement).style.visibility = "visible";
    this.qrCodeImage = this.promoData.qrCodeImage;
    var qrImage = document.getElementById('photo') as HTMLImageElement;
    if(this.qrCodeImage!== null && this.qrCodeImage!== undefined ){
      qrImage.src = 'data:image/png;base64,' + this.qrCodeImage;
    }
    else{
      qrImage.src = 'data:image/png;base64,' + this.qrCodeImageOnUpdate;
    }
     
    if(this.qrCodeImage!== null && this.qrCodeImage!== undefined ){
      var downImage = 'data:image/png;base64,' + this.qrCodeImage;
    }
    else{
      var downImage = 'data:image/png;base64,' + this.qrCodeImageOnUpdate;
    }
    
    var a = document.getElementById("link1") as HTMLImageElement;
    a.setAttribute("href",downImage);
    
  }
}

/*function to check number of pasted lines in list of included articles */
checkArticle() {
  let textAreaValue = this.articleIds.split('\n');
  textAreaValue = textAreaValue.filter((item:any) => item !== "");
  if(textAreaValue.length > this.maxNumLines) {
    this.articleIds = textAreaValue.slice(0,this.maxNumLines).join('\n');
    this.showMessage();
  }
  else {
    this.articleErrorMessage = false;
    this.articleExcludedMessage = false;
  }
  this.lineCount = this.articleIds.split('\n').length;
}

/*function to check number of pasted lines in list of excluded articles */
checkExcludedArticle() {
  let textAreaValueExcluded = this.excludeArticleIds.split('\n');
  textAreaValueExcluded = textAreaValueExcluded.filter((item:any) => item !== "");
  if(textAreaValueExcluded.length > this.maxNumLines) {
    this.excludeArticleIds = textAreaValueExcluded.slice(0,this.maxNumLines).join('\n');
    this.showMessage();
  }
  else {
    this.articleErrorMessage = false;
    this.articleExcludedMessage = false;
  }
  this.lineCountExcluded = this.excludeArticleIds.split('\n').length;
}

/*function to show error message if number of lines pasted is greater than the limit*/
showMessage() {
  this.articleErrorMessage = true;
  this.articleExcludedMessage = true;
}

onTolerance(evt:any) {
  if(this.extendableDays != "0" && evt.value >= this.extendableDays) {
    this.toleranceMessage = true;
  } else {
    this.toleranceMessage = false;
  }
}

onExtend(evt:any) {
  if(evt.value == "0" && this.toleranceDays > evt.value) {
    this.toleranceMessage = false;
  } else {
    this.toleranceMessage = true;
  }
  if(evt.value != 0 && this.toleranceDays >= evt.value) {
    this.toleranceMessage = true;
  } else {
    this.toleranceMessage = false;
  }
 }

}
