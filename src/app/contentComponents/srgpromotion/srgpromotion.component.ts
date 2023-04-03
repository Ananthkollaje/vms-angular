import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray, ValidatorFn, ControlContainer, FormGroupDirective } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import {ThemePalette} from '@angular/material/core';
import { RouterModule, Router, NavigationExtras, Event } from '@angular/router';
import { first, Observable } from 'rxjs';
import { PromotionsService } from '../../services/promotions.service';
import { GetconfigService } from '../../services/getconfig.service'
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { NgxSpinnerService } from 'ngx-spinner';
import { stat } from 'fs';


@Component({
  selector: 'app-srgpromotion',
  templateUrl: './srgpromotion.component.html',
  styleUrls: ['./srgpromotion.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
  viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class SrgpromotionComponent implements OnInit {
  adlevelcountry: any;
  adlevelstate: boolean = false;
  adlevelstore: boolean = false;
  articleErrorMessage: boolean = false;
  articleExcludedMessage: boolean = false;
  showDiscountAmountError: boolean = false;
  isToleranceOrExtendableDaysFromEvent: boolean = false;;
   
  constructor(private promotionService: PromotionsService, 
    private router: Router, private getConfig: GetconfigService, private fb: FormBuilder,
    private spinner: NgxSpinnerService) {
     //this.minDate.setDate(this.minDate.getDate() + 1);
   }

  selectedDrp: string = 'srg';
  @Input() countryDrp: string = "";
  articleDrp: string = 'article001';
  @Input() statusDrp: string = "active";
  @Input() channelDrp: string = "";
  @Input() brandDrp: string = "Select brand";
  channelDrpValues: any[] = ["Instore", "Online", "Instore and Online"];
  @Input() adChannelDrp: string = "";
  @Input() promoTypeDrp: string = "";
  @Output() promoTypeDrpChange = new EventEmitter<any>();
  enforceDrp: string = "anyone";
  @Input() redeemedBy: string = "";
  brandDrpValues: any[] = ["Select Brand/Country", "Spotlight-AU", "Spotlight-NZ", "Spotlight-MY", "Spotlight-SG", "Anaconda-AU", "Mountain Design-AU", "Harris Scarfe-AU"]
  adChannelDrpValues: any[] = ["SMS", "Email", "Direct Mail", "Instore", "Letter Box", "Instore Flyer", "Press Ad", "Magazine", "Social", "Website", "Affiliates", "3rd Party" ]
  promotionLevel: any[] = ["Store", "State", "Country"];
  adLevel: any[] = ["Store", "State", "Country"];
  promoLevelDrp: any;
  adLevelDrp: any;
  newPromo: boolean = false;
  @Input() startdate = new FormControl(new Date());
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
  abc: any[] = [];
  storeShow: boolean = false;
  stateChecked: any;
  stateunChecked: any;
  promolevelstate: boolean = false;
  promolevelstore: boolean = false
  count: string = "Australia";
  panelOpenState = false;
  panelOpenState1 = false;
  
  promoLevelStore: any = "";
  adLocationStore: any = "";
  
  createPromotionForm: FormGroup = new FormGroup({});
  createPromotionDetails: FormGroup = new FormGroup({});
  promolevelcountry: string = "";
  promolevelcountries: boolean = false;
  adlevelcountries: boolean = false;
  promoOverview: any;
  onlinePromoCode:any;
  articleIdValue: string = "";
  discountType: string = "";
  discountTypeValue: any[] = ['Dollar Off', 'Percentage Off'];
  discountAmount: any;
  discountPercent: any;
  minimumSpend:any = null;
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
  eventId: string = "";
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
  @Input() createNewHeader: string = "Create New Promotion";
  @Input() fromEventPromoType: string = "";
  @Input() countryFromEvent: string = "";
  @Input() eventIdFromEvent: string = "";
  @Input() brandFromEvent: string = '';
  @Input() eventFinancialY:any;

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
  sendEmail: boolean = false;
  vmsUUID: string = "";
  createdSuccessfully: boolean = false;
  datemismatcherror: boolean = false;
  artiIds: boolean = false;

  @Input() addPromo: boolean = true;

  @Output() promotionAdded = new EventEmitter<{postCreatePromoFromEvt: boolean, postCreatePromoObj: any}>();
  @Output() promotionCanceled = new EventEmitter<boolean>();
  statusflow: boolean = true;
  minSpend:boolean = false;
  dollarOff: boolean = false;
  percentageOff: boolean = true;
  articleIds: string = "";
  excludeArticleIds: string = "";
  includedArticleIdValues:any[] = [];
  excludedArticleIdValues:any[] = [];
  maxLines: number = 9999;
  lineCount: number = 0;
  lineCountExcluded: number = 0;
  toleranceMessage: boolean = false;

  promotionAdd() {
     this.promotionAdded.emit();
  }

  ngOnChanges(changes: { [property: string]: SimpleChange}) {
   
 }

 
  ngOnInit(): void {
    var sd:any;
    var ed:any;
    if(this.fromEvent == true) { 
      sd = this.eventStartDateFromEvent;
      ed = this.eventEndDateFromEvent;
    } else {
      sd = this.startdate.value.toString();
      ed = this.enddate.value.toString();
    }
    this.spinner.show();
    this.todayDate = new Date();
    this.getConfig.getConfigData().then((confData) => {
      this.getDefaultValues(confData);
    });
    var promotion = {
      promotionType: new FormControl(this.promoTypeDrp, [Validators.required]),
    };
    if(this.fromEvent == true) {
      this.promoTypeDrp = this.fromEventPromoType;
      this.eventId = this.eventIdFromEvent
      this.eventCode = this.eventCodeFromEvent;
      this.eventName = this.eventNameFromEvent;
      this.startdate = this.eventStartDateFromEvent;
      this.enddate = this.eventEndDateFromEvent;
      this.financialyear = this.eventFinancialY;
      this.toleranceDays = this.eventToleranceFromEvent;
      this.ifFromEvent = true;
    } 
   
    this.createPromotionForm = new FormGroup({
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
        promotionOverview: new FormControl(this.promoOverview, [Validators.required, Validators.pattern("[a-zA-Z0-9 ]{1,200}$")]),
        redeemableBy: new FormControl(this.redeemedBy, [Validators.required]),
        startDate: new FormControl(sd, [Validators.required]),
        endDate: new FormControl(ed),
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
        sendEmail: new FormControl(this.sendEmail),
        userName: new FormControl(""),
      }),     
    });
  
   this.statesDrp = this.changedStates[0];
   this.ecompromoid = "";
   this.promoLevelDrp = this.promotionLevel[2];
   this.adLevelDrp = this.adLevel[2];
     
   if(this.ecompromoid == "") {
    this.statusDrp = this.getPromoStatusValues[0];
   } else {
    this.statusDrp = this.getPromoStatusValues[1];
   }

   if(this.promoTypeDrp == "Personalised") {
     this.redeem = false; 
   }

   if(this.stateChecked == true) {
     this.storeShow = true;
   }

   this.stateChecked = -1;
   this.stateunChecked = -1;
   if(this.brandDrp == "Spotlight-AU") {
     this.promolevelcountry = "Australia";
     this.adlevelcountry = "Australia";
     this.promolevelcountries = true;
     this.adlevelcountries = true;
   }

  }

  minDateChange() {
    this.minDate = new Date(this.startdate.value.getTime() + 86400000);
  }

  onChangeFinanceYear(evt:any) {
    this.financialyear = evt.value;
    var financeDate = evt.value.split("-");
    this.financeYearStartDate = new Date(parseInt(financeDate[0]), this.fyStartMonth, this.fyStartDate);
    this.financeYearEndDate = new Date(parseInt(financeDate[1]), this.fyEndMonth, this.fyEndDate);
  }

  getDefaultValues(configData:any) {
    this.getPromoType = configData.systemConfig.configMap.PROMOTION_TYPE;
    var promType = this.getPromoType.sort((a, b) => a.order-b.order);
    this.getPromoType = promType;
    if(this.getPromoType) {
      this.getPromoType.forEach((promoT) => {
         this.getPromoTypeValue.push(promoT.value);
         if(promoT.default == true && this.fromEvent == false) {
          let pt = promoT.value;
          this.promoTypeDrp = promoT.value;
         } else if(promoT.default == true && this.fromEvent == false) {
           this.promoTypeDrp = this.fromEventPromoType;
         }
      });
     }
     this.getPromoStatus = configData.systemConfig.configMap.PROMOTION_STATUS;
     var promStatus = this.getPromoStatus.sort((a, b) => a.order-b.order);
     this.getPromoStatus = promStatus;
     if(this.getPromoStatus) {
        this.getPromoStatus.forEach((promoS) => {
          this.getPromoStatusValues.push(promoS.value);
          if(promoS.default == true) {
            let ps = promoS.value;
            this.statusDrp = ps;
          } 
        });
     }
     this.getRedeemedBy = configData.systemConfig.configMap.REDEEMABLE_BY;
     var redBy = this.getRedeemedBy.sort((a, b) => a.order-b.order);
     this.getRedeemedBy = redBy;
     if(redBy) {
        redBy.forEach((redemBy) => {
          this.getRedeemedByValues.push(redemBy.value);
          if(redemBy.default == true && this.fromEvent == false) {
            let ps = redemBy.value;
            this.redeemedBy = ps;
          } else if (this.fromEvent == true && this.fromEventPromoType == "Generic") {
              this.redeemedBy = "Any Member";
              this.redeem = true;
          } else if (this.fromEvent == true && this.fromEventPromoType == "Journey") {
            this.redeemedBy = "Any Member";
            this.redeem = false;
          } else if (this.fromEvent == true && this.fromEventPromoType == "Personalised") {
            this.redeemedBy = "Anyone";
            this.redeem = false;
          }
          
        });
     }

     this.getSalesChannel = configData.systemConfig.configMap.SALES_CHANNEL;
     var salChan = this.getSalesChannel.sort((a, b) => a.order-b.order);
     this.getSalesChannel = salChan;
      if(this.getSalesChannel) {
        this.getSalesChannel.forEach((salesC) => {
          this.getSalesChannelValues.push(salesC.value);
          if(salesC.default == true) {
            let ps = salesC.value;
            this.channelDrp = ps;
            if(this.channelDrp == "Instore") {
              this.selectOnline = false;
              this.selectRegionEcom = true;
              this.selectRegionPOS = true;
              this.ecomProCode = false;
            } 

            if(this.channelDrp == "Online" && this.promoTypeDrp == "Generic"
              || this.fromEventPromoType == "Generic" && this.channelDrp == "Online"){
              this.selectOnline = true;
              this.selectRegionEcom = true;
              this.selectRegionPOS = false;
              this.ecomProCode = true;
            }
           if(this.channelDrp == "Instore and Online" && this.promoTypeDrp == "Generic"
           || this.fromEventPromoType == "Generic" && this.channelDrp == "Instore and Online"){
              this.selectOnline = true;
              this.selectRegionEcom = true;
              this.selectRegionPOS = true;
              this.ecomProCode = true;
            }
            if(this.channelDrp == "Instore and Online" && this.promoTypeDrp == "Journey"
             ||this.channelDrp == "Instore and Online" && this.promoTypeDrp == "Personalised"
             ||this.channelDrp == "Instore and Online" && this.fromEventPromoType == "Journey"
             ||this.channelDrp == "Instore and Online" && this.fromEventPromoType == "Personalised"){
              this.selectOnline = false;
              this.selectRegionEcom = true;
              this.selectRegionPOS = true;
              this.ecomProCode = true;
            } else if(this.channelDrp == "Online" && this.promoTypeDrp == "Journey"
                     || this.channelDrp == "Online" && this.promoTypeDrp == "Personalised"
                     || this.channelDrp == "Online" && this.fromEventPromoType == "Journey"
                     || this.channelDrp == "Online" && this.fromEventPromoType == "Personalised"){
              this.selectOnline = false;
              this.selectRegionEcom = true;
              this.selectRegionPOS = false;
              this.ecomProCode = false;
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
          if(discountT.default == true) {
            let ps = discountT.value;
            this.discountType = ps;
          }
          if(discountT.value == "% Off") {
            this.percentOff = true;
          } else {
            this.percentOff = false;
          }
          if(this.promoTypeDrp == "Generic" && discountT.value == "% Off" || 
          this.fromEventPromoType == "Generic" && discountT.value == "% Off") { 
            this.minimumSpend = "Full Priced Item";
            this.minSpend = true;
          } 
        });
       
     }

     if(this.promoTypeDrp == "Generic" && this.discountType == "% Off"
       || this.fromEventPromoType == "Generic" && this.discountType == "% Off") {
      this.minSpend = true;
      this.dollarOff = false;
      this.percentageOff = true;
    } else if(this.promoTypeDrp == "Generic" && this.discountType == "$ Off"
    || this.fromEventPromoType == "Generic" && this.discountType == "$ Off") {
      this.minSpend = false;
      this.dollarOff = true;
      this.percentageOff = false;
    } else {
      this.minSpend = false;
      this.dollarOff = true;
      this.percentageOff = false;
      this.minimumSpend = null;
    }

     this.getAdvertisingChannel = configData.userConfig.configMap.ADVERTISING_CHANNEL;
     var advChan = this.getAdvertisingChannel.sort((a, b) => a.order-b.order);
     this.getAdvertisingChannel = advChan;
     if(advChan) {
      advChan.forEach((advertisingC) => {
          this.getAdvertisingChannelValues.push(advertisingC.value);
          if(advertisingC.default == true) {
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
            this.extendableDays = this.getExtendibleValues[0];
          }
          if(extendibleD.code == "TOLERANCEDAYS") {
            var totaldays = extendibleD.value;
            for(var i=0; i <= totaldays; i++ ){
            this.getToleranceValues.push(i);
            }
            if(this.fromEvent == false) {
              this.toleranceDays = this.getToleranceValues[0];
            }
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
              this.financialyearValues1.push((aYearFromNow + i)+"-"+(aYearFromNow + i+1));
             // this.financialyearValues1.push(aYearFromNow + i);
            }
            if(this.fromEvent == true) {
              this.financialyear = this.eventFinancialY;
            } else {
            this.financialyear = this.financialyearValues1[0];
            }
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
          if(country.default == true && this.fromEvent == false) {
            let ps = country;
            this.countryDrp = ps;
            this.country = ps.code;
            country.brand.forEach((element:any) => {
              this.getBrandValues.push(element);
              if(element.default == true && this.fromEvent == false) {
                let pt = element;
                this.brandDrp = pt;
                this.brand = pt.code;
                const firstArray = element.states;
                const secondArray = element.states;
                this.getStatesValues = JSON.parse(JSON.stringify(firstArray));
                this.getStatesValuesL = JSON.parse(JSON.stringify(secondArray));
                this.allStates = false;
              }
            });
          }
          if(this.fromEvent == true) {
            if(country.name == this.countryFromEvent) {
              this.countryDrp = country;
              this.country = country.code;
              country.brand.forEach((element:any) => {
                this.getBrandValues.push(element);
                if(element.name == this.brandFromEvent) {
                  this.brandDrp = element;
                  this.brand = element.code;
                  const firstArray = element.states;
                  const secondArray = element.states;
                  this.getStatesValues = JSON.parse(JSON.stringify(firstArray));
                  this.getStatesValuesL = JSON.parse(JSON.stringify(secondArray));
                  this.allStates = false;
                }
              });
          }
        }
        });
     }
    this.spinner.hide();
  }
 
  onChangePromoStatus(evt:any) {
    this.statusDrp = evt.value
  }

  onChangeChannel(event: any) {
      if(this.channelDrp == "Instore") {
        this.selectOnline = false;
        this.selectRegionEcom = true;
        this.selectRegionPOS = true;
        this.ecomProCode = false;
        this.ecomPromoCode = undefined;
      } else if(this.channelDrp == "Instore" && this.promoTypeDrp == "Generic"){
        this.selectOnline = false;
        this.selectRegionEcom = true;
        this.selectRegionPOS = true;
        this.ecomProCode = false;
        this.ecomPromoCode = undefined;
        this.onlinePromoCode = "";
      }
      else if(this.channelDrp == "Online" && this.promoTypeDrp == "Generic"){
        this.selectOnline = true;
        this.selectRegionEcom = true;
        this.selectRegionPOS = false;
        this.ecomProCode = true;
      } else if(this.channelDrp == "Instore and Online" && this.promoTypeDrp == "Generic"){
        this.selectOnline = true;
        this.selectRegionEcom = true;
        this.selectRegionPOS = true;
        this.ecomProCode = true;
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
          this.brand = brand.code;
        }
     });
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
    if(this.promoTypeDrp == "Generic" && event.value == "% Off") {
      this.minSpend = true;
      this.dollarOff = false;
      this.percentageOff = true;
      this.minimumSpend = "Full Priced Item"
    }
    else if(this.promoTypeDrp == "Generic" && event.value == "$ Off") {
      this.minSpend = true;
      this.dollarOff = true;
      this.percentageOff = false;
      this.minimumSpend = "";
    }
    else if(this.promoTypeDrp == "Generic") {
      this.minSpend = true;
      this.minimumSpend = "";
    } else {
      this.minSpend = false;
      this.dollarOff = true;
      this.percentageOff = false;
      this.minimumSpend = null;
    }
  }

  onSendEmail(evt:any) {
    this.sendEmail = evt.checked;
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

  onChangeAdChannel(event: any) {

  }
  onChangeRedeemedBy(event: any) {

  }
  
  onChangePromoType(event: any) {
    if(this.promoTypeDrp == "Generic" && this.discountType == "% Off") {
      this.minSpend = true;
      this.dollarOff = false;
      this.percentageOff = true;
      this.minimumSpend = "Full Priced Item";
    } else if(this.promoTypeDrp == "Generic" && this.discountType == "$ Off") {
      this.minSpend = true;
      this.dollarOff = true;
      this.percentageOff = false;
      this.minimumSpend = null;
    } else {
      this.minSpend = false;
      this.dollarOff = true;
      this.percentageOff = false;
      this.minimumSpend = null;
    }
    if(this.promoTypeDrp == "Generic") {
      this.redeemedBy = "Any Member";
      this.redeem = true;
      this.selectOnline = true;
    } else if(this.promoTypeDrp == "Journey") {
      this.redeemedBy = "Any Member";
      this.redeem = false;
      this.selectOnline = false;
    } else if(this.promoTypeDrp == "Personalised" || this.promoTypeDrp == "Public" || this.promoTypeDrp == "Anonymous") {
      this.redeemedBy = "Anyone";
      this.redeem = false;
      this.selectOnline = false;
    } else {
      this.redeemedBy = "Anyone";
      this.redeem = false;
    }
    if(this.promoTypeDrp !== "Personalised" && this.promoTypeDrp !== "Public" && this.promoTypeDrp !== "Anonymous" && this.promoTypeDrp !== "Generic" && this.promoTypeDrp !== "Journey" ) {
      this.selectOnline = false;
    }
  }

  onChangePromoLevel(event:any) {
 
    if(this.promoLevelDrp == "Store") {
        this.promolevelstate = true;
        this.promolevelstore = true;
        this.promolevelcountries = true;

    } else if(this.promoLevelDrp == "State"){
        this.promolevelstate = true;
        this.promolevelstore = false;
        this.promolevelcountries = true;
    } else if(this.promoLevelDrp == "Country") {
      this.promolevelstate = false;
      this.promolevelstore = false;
      this.promolevelcountries = true;
    } else {
      this.promolevelstate = false;
      this.promolevelstore = false;
      this.promolevelcountries = false;
    }
  }

  onChangeadLevel(event:any) {

    if(this.adLevelDrp == "Store") {
        this.adlevelstate = true;
        this.adlevelstore = true;
        this.adlevelcountries = true;

    } else if(this.adLevelDrp == "State"){
        this.adlevelstate = true;
        this.adlevelstore = false;
        this.adlevelcountries = true;
    } else if(this.adLevelDrp == "Country") {
      this.adlevelstate = false;
      this.adlevelstore = false;
      this.adlevelcountries = true;
    } else {
      this.adlevelstate = false;
      this.adlevelstore = false;
      this.adlevelcountries = false;
    }
  }
  public hasError = (controlName: string, errorName: string) => {
    if(controlName == "undefined") {
    return this.createPromotionDetails.controls[controlName].hasError(errorName);
    } else {
      return undefined
    }
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
    } 
    if(stores.name == store.name && $event.checked == false){
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
        } 
        if(stores.name == store.name && $event.checked == false){
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

  convertDate(str:any) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
  }
  
  createPromotion() {
      let totalStatesAndStores:any = [];
      let storesAndStates: any = [];
      let totalStatesAndStoresS: any = [];
      let storesAndStatesS: any = [];
      this.clearFormArray(this.totallocationsS);
      this.clearFormArray(this.totallocations);
    
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
            // states.checked = false;
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
      var arr1:any;
      let newStartDate:any;
      if(this.fromEvent == true) {
        newStartDate = this.startdate;
        if(this.enddate instanceof Date) {
          let arr1 = this.enddate.toString();
          let arr2 = this.convertDate(arr1);
          var newEndDate = arr2;
          finDate = newEndDate;
        }
        else {
          finDate = this.enddate;
        }
        if(this.startdate instanceof Date) {
          let arr1 = this.startdate;
          let arr2 = this.convertDate(arr1);
          var newStartDateS = arr2;
          newStartDate = newStartDateS;
        }
        else {
         // finDate = this.enddate;
          let arr1 = this.enddate;
          let arr2 = this.convertDate(arr1);
          var newEndDateS = arr2;
          finDate = newEndDateS;
        }
      } else {
        arr1 = this.startdate.value.toString();
        var arr2 = this.convertDate(arr1);
        newStartDate = arr2;
        if(this.enddate.value instanceof Date) {    
          var arr3 = this.enddate.value.toString();
          var arr4 = this.convertDate(arr3)
          var newEndDate = arr4;
          finDate = newEndDate;
          } else {
           finDate = null;
         }
      }
      if(newStartDate > finDate) {
        this.datemismatcherror = true;
      } else {
        this.datemismatcherror = false;
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

      if(this.ecomPromoCode != undefined) {
        ecom = this.ecomPromoCode;
      } else {
        ecom = null;
      }

      if(this.posPromoCodeValue != undefined) {
        pos = this.posPromoCodeValue;
      } else {
        pos = null;
      }

      this.includedArticleIdValues = this.articleIds.split('\n');
      this.excludedArticleIdValues = this.excludeArticleIds.split('\n');
      this.includedArticleIdValues = this.includedArticleIdValues.filter((item:any) => item !== "");
      this.excludedArticleIdValues = this.excludedArticleIdValues.filter((item:any) => item !== "");
      var eventId;
      var eventCode;
      var eventName;
      if(this.fromEvent == true) {
        eventId = this.eventId;
        eventCode = this.eventCode.toUpperCase();
        eventName = this.eventName;
      } else {
        eventId = null;
        eventCode = null;
        eventName = null;
      }
      if(this.percentOff == false && this.discountAmount > 100) {
        this.showDiscountAmountError = true;
      } else {
        this.showDiscountAmountError = false;
      }
      if(this.promoTypeDrp == 'Generic' && this.channelDrp == 'Instore') {
        this.onlinePromoCode = "";
      }
      // this.includedArticleIdValues.length > 0 && this.excludedArticleIdValues.length > 0  &&
      if(this.promoOverview != undefined && this.discountAmount != "" && this.showDiscountAmountError == false && this.toleranceMessage == false
         && this.receiptDescriptionValue != "" && this.couponDescriptionValue != "" && this.minimumSpend != ""
         && this.termsAndConditionsValue != "" && (newStartDate <= finDate || this.promoTypeDrp == "Journey" && finDate == null || this.promoTypeDrp == 'Generic' && finDate != null || this.promoTypeDrp == "Personalised" && finDate == null || this.promoTypeDrp == "Public" && finDate == null || this.promoTypeDrp == "Anonymous" && finDate == null) 
         && this.discountAmount > 0 && this.showDiscountAmountError == false && (this.channelDrp != 'Instore' && this.promoTypeDrp == 'Generic' && this.onlinePromoCode != undefined
         || this.channelDrp == 'Instore' && this.promoTypeDrp == 'Generic' && this.onlinePromoCode == undefined
         || this.channelDrp != 'Instore' && this.promoTypeDrp == 'Generic' && this.onlinePromoCode != ""
         || this.channelDrp == 'Instore' && this.promoTypeDrp == 'Generic' && this.onlinePromoCode == ""
         || this.promoTypeDrp == 'Journey' && this.onlinePromoCode == undefined || this.promoTypeDrp == 'Personalised' && this.onlinePromoCode == undefined || this.promoTypeDrp == 'Public' && this.onlinePromoCode == undefined || this.promoTypeDrp == 'Anonymous' && this.onlinePromoCode == undefined 
         || this.promoTypeDrp == 'Journey' && this.onlinePromoCode == "" || this.promoTypeDrp == 'Personalised' && this.onlinePromoCode == "" || this.promoTypeDrp == 'Public' && this.onlinePromoCode == "" || this.promoTypeDrp == 'Anonymous' && this.onlinePromoCode == ""
         || this.promoTypeDrp == 'Journey' && this.onlinePromoCode == null || this.promoTypeDrp == 'Personalised' && this.onlinePromoCode == null || this.promoTypeDrp == 'Public' && this.onlinePromoCode == null || this.promoTypeDrp == 'Anonymous' && this.onlinePromoCode == null)
         && (this.promoTypeDrp == 'Generic' && this.percentageOff == true && this.minimumSpend != undefined || this.promoTypeDrp == 'Generic' && this.percentageOff == false && this.minimumSpend !== undefined || this.promoTypeDrp != "Generic" && this.percentageOff == false ))
        { 
        this.articleErrorMessage = false;
        this.articleExcludedMessage = false;
        this.spinner.show();
        this.createPromotionForm.patchValue({
        requestType: "CREATE",
        promotion: {
        promotionType: promcode,
        promotionId: '',
        financialYear: this.financialyear,
        eventId: eventId,
        eventCode: eventCode,
        brand: this.brand,
        country: this.country,
        articleIds: this.includedArticleIdValues,
       // articleIds: null,
        excludeArticleIds: this.excludedArticleIdValues,
       // excludeArticleIds: null,
        discountType: discount,
        discountAmount: this.discountAmount,
        minimumSpend: this.minimumSpend,
        receiptDescription: this.receiptDescriptionValue,
        requireQrcode: true,
        qrCodeColour: "",
        // promotionStatus: this.statusDrp.toUpperCase(),
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
       // termsAndConditions: null,
        posPromotionId: pos,
        ecomPromotionId: ecom,
        salesLocation: this.totallocationsS.value,
        advertisingLocation: this.totallocations.value,
        sendEmail: this.sendEmail,
        userName: "admin"
        },
      });
    this.promotionService.postCreatePromotion(this.createPromotionForm.value).subscribe((data:any) => 
       { 
          if(data.hasOwnProperty("promotion") == false) {
            this.postpromoerror = true;
            this.spinner.hide();
           this.postpromoerrormessage = data.error[0].message;
           
          } else if(data.hasOwnProperty("promotion") == true) {
           
            sessionStorage.setItem('updatedData', JSON.stringify(data.promotion));
            let promid = data.promotion.promotionId;
            this.spinner.hide();
           if(this.fromEvent == true) {
             this.createdSuccessfully = true;
             var obj = {postCreatePromoFromEvt: true, postCreatePromoObj: JSON.stringify(data.promotion)};
             sessionStorage.setItem('promoCreatedFromEvt',JSON.stringify(obj));
             this.promotionAdded.emit({postCreatePromoFromEvt: true, postCreatePromoObj: JSON.stringify(data.promotion)});
           } else {
             this.router.navigate(["/promotionupdate"]);
           }
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

  checkArticle() {
      let textAreaValue = this.articleIds.split('\n');
      textAreaValue = textAreaValue.filter((item:any) => item !== "");
      if(textAreaValue.length > this.maxLines) {
        this.articleIds = textAreaValue.slice(0,this.maxLines).join('\n');
        this.showMessage();
      }
      else {
        this.articleErrorMessage = false;
        this.articleExcludedMessage = false;
      }
      this.lineCount = this.articleIds.split('\n').length;
  }

  checkExcludedArticle() {
      let textAreaValueExcluded = this.excludeArticleIds.split('\n');
      textAreaValueExcluded = textAreaValueExcluded.filter((item:any) => item !== "");
      if(textAreaValueExcluded.length > this.maxLines) {
        this.excludeArticleIds = textAreaValueExcluded.slice(0,this.maxLines).join('\n');
        this.showMessage();
      }
      else {
        this.articleErrorMessage = false;
        this.articleExcludedMessage = false;
      }
      this.lineCountExcluded = this.excludeArticleIds.split('\n').length;
  }

  showMessage() {
     this.articleErrorMessage = true;
     this.articleExcludedMessage = true;
  }

  cancelPromo() {
    this.promotionCanceled.emit(false);
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





