import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigurationsService } from 'src/app/services/configurations.service';
import { GetconfigService } from 'src/app/services/getconfig.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss']
})
export class SystemConfigComponent implements OnInit {
  disableButton: boolean = true;
  newArr: any[] = [];

  constructor(private sysConfiguraion: ConfigurationsService, private spinner: NgxSpinnerService,
    private router: Router, private getConfig: GetconfigService, private fb: FormBuilder ) { }

  promoType: string = "";
  promoTypeDrp: string = "";
  getPromoTypeValue:any[] = ["Type 1 - Personalised", "Type 2 - Generic", "Type 3 - Journey", "Type 4 - Public", "Type 5 - Anonymous"];
  eventTypeDrp: string = "";
  getEventTypeValue:any[] = ["Type 1 - Personalised", "Type 2 - Generic", "Type 3 - Journey", "Type 4 - Public", "Type 5 - Anonymous"];
  statusDrp: string = "";
  getPromoStatusValues:any[] = ["Inactive", "Active", "Ready to Activate"];
  redeemedBy: string = "";
  getRedeemedByValues:any[] = ["Anyone", "Any Member", "Receiving Member"];
  channelDrp: string = "";
  getSalesChannelValues:any[] = ["Instore", "Online", "Instore and Online"];
  discountType: string = "";
  getDiscountTypeValues:any[] = ["% Off", "$ Off"];
  qrcodecolor: string = "";
  getQRCodeColorValues:any[] = ["Black", "Blue", "Red", "Orange", "Grey", "Green"];
  fileUpload: string = "";
  selectedFiles:File | null = null;
  fileName: string = "";
  fieldSelect: string = "";
  getFieldValues:any[] = ["Promotion Type", "Promotion Event Type", "Promotion Status", "Redeemable By", "Sales Channel", "Discount Type", "QR Code Colour", "States", "Stores"];
  fieldValue:any = null;
  fieldCode:any = null;
  fieldOrder:any;
  fieldCustomCode: string = "";
  fieldType: string = "";
  getFieldTypeValues:any[] = ["System Config"];
  getDefaultValues: any[] = ["False", "True"];
  default: string = "";
  brandDrp: string = "";
  getBrandValues:any[] = [];
  countryDrp: string = "";
  getCountryValues:any[] = [];
  getStateValues: any[] = [];
  statesDrp: string = "";
  getStatesValues: any[] = [];
  storesDrp: string = "";
  getStoresValues: any[] = [];
  countryValue: string = "";
  brandValue: string = "";
  stateValue: string = "";
  storeNameValue: string = "";
  storeCodeValue: string = "";
  countryCodeValue: string = "";
  brandCodeValue: string = "";
  defaultCountry: string = "";
  storeChecked: string = "";
  filteredFieldValues:any[] = [];
  displayedColumns: string[] = [];
  onlyStores:boolean = false;
  searchFieldData: string = "Promotion Type"
  requestType: string = "PROMOTION_TYPE";
  systemConfiguration: FormGroup = new FormGroup({});
  codeDefault: boolean = false;
  addedSuccess: boolean = false;
  updateSuccess: boolean = false;
  deleteSuccess: boolean = false;
  tableshow: boolean = false;
  statesSelect: boolean = false;
  storesSelect: boolean = false;
  otherThanStores: boolean = true;
  countryCode:string = "";
  countryCodeValues:any = [];
  countryDefault:any;
  brandDefault:any;
  brandCode: string = "";
  statesCode: string = "";
  storesPresent: boolean = false;
  disableAdd: boolean = false;
  disableResetBtn: boolean = true;
  errorM: string = "";
  errorFound: boolean = false;
  configData:any;
  ptPresent:boolean = false;
  ptcodePresent: boolean = false;
  ptorderPresent: boolean = false;
  addDisabled:boolean = false;
  updateDisabled:boolean = true;
  deleteDisabled:boolean = true;
  forSearch: boolean = true;
  promoTypeArr: any[] = [];
  promoStatusArr: any[] = [];
  redeemableByArr: any[] = [];
  salesChannelArr: any[] = [];
  discountTypeArr: any[] = [];
  qrCodeColorArr: any[] = [];

  ngOnInit(): void {
    this.promoTypeDrp = this.getPromoTypeValue[0];
    this.eventTypeDrp = this.getEventTypeValue[0];
    this.statusDrp = this.getPromoStatusValues[0];
    this.redeemedBy = this.getRedeemedByValues[0];
    this.channelDrp = this.getSalesChannelValues[0];
    this.discountType = this.getDiscountTypeValues[0];
    this.qrcodecolor = this.getQRCodeColorValues[0];
    this.fieldSelect = this.getFieldValues[0];
    this.fieldType = this.getFieldTypeValues[0];
    this.default = this.getDefaultValues[0];
    this.brandDrp = this.getBrandValues[0];
    this.countryDrp = this.getCountryValues[0];
    this.defaultCountry = this.getDefaultValues[0];
    this.storeChecked = this.getDefaultValues[0];
    this.systemConfiguration = new FormGroup({
      requestType: new FormControl(""),
      config: new FormGroup({
        fieldType: new FormControl(this.fieldSelect),
        value: new FormControl(this.fieldValue),
        code: new FormControl(this.fieldCode),
        order: new FormControl(this.fieldOrder),
        default: new FormControl(this.default),
        configType: new FormControl(""),
      })
    });
    this.displayedColumns = [];
    this.displayedColumns = [ 
      'fieldType', 
      'value',
      'code',
      'order',
      'default',
    ];
   
    if(this.selectedFiles != null) {
      this.fileName = this.selectedFiles.name;
    }
    if(this.fieldSelect == "States" || this.fieldSelect == "Stores") {
      this.onlyStores = true;
      this.otherThanStores = false;
    } else {
      this.onlyStores = false;
      this.otherThanStores = true;
    }

   var search = {
      requestType: "SEARCH",
    }

    this.sysConfiguraion.searchSourceSysConfig(search).subscribe((data:any) => 
    { 
      if(data) {
      data.sourceMarkets.forEach((sm:any)=> {
         this.getCountryValues.push(sm.name);
         this.countryDrp = this.getCountryValues[0];
         if(this.countryDrp == sm.name) {
          sm.brand.forEach((brd:any) => {
              this.getBrandValues.push(brd.name);
              this.brandDrp = this.getBrandValues[0];
              if(brd.name == this.brandDrp) {
                this.brandCode = brd.code;
                brd.states.forEach((sts:any) => {
                   this.getStatesValues.push(sts.name);
                   this.onlyStores = true;
                   this.statesDrp = this.getStatesValues[0];
                   if(sts.name == this.statesDrp) {
                    this.statesCode = sts.code;
                   }
                });
              }
          });
         }
      });
      
      this.tableshow = false;
      this.spinner.hide();
      }
  },
    (Error:any) => {
      if(Error.error) {
        this.spinner.hide();
      }
    });
    var search1 = {
      requestType: "SEARCH",
      config: {
      fieldType: this.requestType,
      value: this.fieldValue,
      code: this.fieldCode,
      order: this.fieldOrder,
      default: this.default,
      configType: "SYSTEM"
      }
    }
    this.sysConfiguraion.searchConfig(search1).subscribe(data => {
      this.configData = data;
      if(this.configData) {
        this.setConfigValues(this.configData);
      }
  });
  }


  /* function to set all configuration values */ 
  setConfigValues(value:any) {
    value.configs.forEach((item:any) => {
      if(this.requestType == 'PROMOTION_TYPE') {
        this.promoTypeArr.push(item);
      }
      else if(this.requestType == 'PROMOTION_STATUS') {
        this.promoStatusArr.push(item);
      }
      else if(this.requestType == 'REDEEMABLE_BY') {
        this.redeemableByArr.push(item);
      }
      else if(this.requestType == 'SALES_CHANNEL') {
        this.salesChannelArr.push(item);
      }
      else if(this.requestType == 'DISCOUNT_TYPE') {
        this.discountTypeArr.push(item);
      }
      else if(this.requestType == 'QR_CODE_COLOUR') {
        this.qrCodeColorArr.push(item);
      }
    })
    this.disableTrueValues();
  }
  /* function to disable true values if already one true value is present in list */
  disableTrueValues() {
    if(this.fieldSelect == 'Promotion Type') {
      this.promoTypeArr = this.promoTypeArr.filter((item:any) => item.default == true);
      if(this.promoTypeArr.length == 1) {
        this.disableButton = true;
      }
      else {
        this.disableButton = false;
      }
    }
    else if(this.fieldSelect == 'Promotion Status') {
      this.promoStatusArr = this.promoStatusArr.filter((item:any) => item.default == true);   
      if(this.promoStatusArr.length == 1) {
        this.disableButton = true;
      }
      else {
        this.disableButton = false;
      }
    }
    else if(this.fieldSelect == 'Redeemable By') {
      this.redeemableByArr = this.redeemableByArr.filter((item:any) => item.default == true); 
      if(this.redeemableByArr.length == 1) {
        this.disableButton = true;
      }
      else {
        this.disableButton = false;
      }
    }
    else if(this.fieldSelect == 'Sales Channel') {
      this.salesChannelArr = this.salesChannelArr.filter((item:any) => item.default == true);
      if(this.salesChannelArr.length == 1) {
        this.disableButton = true;
      }
      else {
        this.disableButton = false;
      }
    }
    else if(this.fieldSelect == 'Discount Type') {
      this.discountTypeArr = this.discountTypeArr.filter((item:any) => item.default == true);
      if(this.discountTypeArr.length == 1) {
        this.disableButton = true;
      }
      else {
        this.disableButton = false;
      }
    }
    else if(this.fieldSelect == 'QR Code Colour') {
      this.qrCodeColorArr = this.qrCodeColorArr.filter((item:any) => item.default == true);
      if(this.qrCodeColorArr.length == 1) {
        this.disableButton = true;
      }
      else {
        this.disableButton = false;
      }
    }
  }

  onChangePromoType(evt:any) {
    this.promoTypeDrp = evt.value;
  }

  onChangeEventType(evt: any) {
    this.eventTypeDrp = evt.value;
  }

  onChangePromoStatus(evt:any) {
    this.statusDrp = evt.value;
  }

  onChangeRedeemedBy(evt:any) {
    this.redeemedBy = evt.value;
  }

  onChangeChannel(evt:any) {
    this.channelDrp = evt.value
  }

  onDiscountType(evt:any) {
    this.discountType = evt.value;
  }

  onQRCodeColor(evt:any) {
    this.qrcodecolor = evt.value;
  }

  openInput() {

  }
  fileChange(evt:any) {
  }

  onChangeBrand(evt:any) {
    this.brandDrp = evt.value;
    this.getStatesValues = [];
   // this.getCountryValues = [];
   // this.getBrandValues = [];
    var search = {
      requestType: "SEARCH",
    }
    this.sysConfiguraion.searchSourceSysConfig(search).subscribe((data:any) => 
    { 
      if(data) {
      data.sourceMarkets.forEach((sm:any)=> {
         if(this.countryDrp == sm.name) {
          this.countryCode = sm.code;
          this.defaultCountry = sm.default;
          sm.brand.forEach((brd:any) => {
              if(brd.name == this.brandDrp) {
                this.brandCode = brd.code;
                this.brandDefault = brd.default;
                brd.states.forEach((sts:any) => {
                   this.getStatesValues.push(sts.name);
                   this.statesDrp = this.getStatesValues[0];
                   if(sts.name == this.statesDrp) {
                    this.statesCode = sts.code;
                  }
                });
              }
          });
         }
      });
      
      this.tableshow = true;
      this.spinner.hide();
      }
  },
    (Error:any) => {
      if(Error.error) {
        this.spinner.hide();
      }
    });
  }

  onChangeCountry(evt:any) {
    this.getStatesValues = [];
    this.countryDrp = "";
    this.countryDrp = evt.value;
    this.getCountryValues = [];
    this.getBrandValues = [];
    var search = {
      requestType: "SEARCH",
    }
    this.sysConfiguraion.searchSourceSysConfig(search).subscribe((data:any) => 
    { 
      if(data) {
      data.sourceMarkets.forEach((sm:any)=> {
         this.getCountryValues.push(sm.name);
         if(this.countryDrp == sm.name) {
          this.countryCode = sm.code;
          this.defaultCountry = sm.default;
          sm.brand.forEach((brd:any) => {
              this.getBrandValues.push(brd.name);
              this.brandDrp = this.getBrandValues[0];
              if(brd.name == this.brandDrp && this.fieldSelect == "Stores") {
                this.brandCode = brd.code;
                this.countryCode = sm.code;
                this.brandDefault = brd.default;
                brd.states.forEach((sts:any) => {
                   this.getStatesValues.push(sts.name);
                   this.statesDrp = this.getStatesValues[0];
                   if(sts.name == this.statesDrp) {
                     this.statesCode = sts.code;
                   }
                });
              }
          });
         }
      });
      
      this.tableshow = true;
      this.spinner.hide();
      }
  },
    (Error:any) => {
      if(Error.error) {
        this.spinner.hide();
      }
    });
  }

  onChangeStates(evt:any) {
    this.statesDrp = evt.value;
    var search = {
      requestType: "SEARCH",
    }
    this.sysConfiguraion.searchSourceSysConfig(search).subscribe((data:any) => 
    { 
      if(data) {
      data.sourceMarkets.forEach((sm:any)=> {
         if(this.countryDrp == sm.name) {
          this.countryCode = sm.code;
          this.defaultCountry = sm.default;
          sm.brand.forEach((brd:any) => {
              if(brd.name == this.brandDrp) {
                this.brandCode = brd.code;
                this.brandDefault = brd.default;
                brd.states.forEach((sts:any) => {
                   this.getStatesValues.push(sts.name);
                 //  this.statesDrp = this.getStatesValues[0];
                   if(sts.name == this.statesDrp) {
                    this.statesCode = sts.code;
                  }
                });
              }
          });
         }
      });
      
      this.tableshow = true;
      this.spinner.hide();
      }
  },
    (Error:any) => {
      if(Error.error) {
        this.spinner.hide();
      }
    });
  }

  onChangeStores(evt:any) {
    this.storesDrp = evt.value;
  }

  selectFile(event:any) {
    this.selectedFiles = event.target.files[0].name
}
onFieldSelect(evt:any) {
  this.fieldSelect = evt.value;
  this.addDisabled = false;
  this.updateDisabled = true;
  this.deleteDisabled = true;
  this.forSearch = false;
  this.fieldOrder = '';
  this.fieldValue = '';
  this.default = "False";
  this.codeDefault = false;
  this.fieldCode = "";
  this.ptPresent = false;
  this.ptcodePresent = false;
  this.ptorderPresent = false;
  if(this.fieldSelect == "Promotion Type") {
     this.searchFieldData = "Promotion Type";
     this.requestType = "PROMOTION_TYPE";
     this.tableshow = false;
     this.displayedColumns = [];
     this.displayedColumns = [ 
       'fieldType', 
       'value',
       'code',
       'order',
       'default',
     ];
     this.statesSelect = false;
     this.storesSelect = false;
     this.ptPresent = false;
     this.ptcodePresent = false;
     this.ptorderPresent = false;
     this.promoTypeArr = this.promoTypeArr.filter((item:any) => item.default == true);
     if(this.promoTypeArr.length == 1) {
      this.disableButton = true;
     }
     else {
      this.disableButton = false;
     }
  }
  if(this.fieldSelect == "Promotion Event Type") {
    this.searchFieldData = "Promotion Event Type";
    this.requestType = "PROMOTION_EVENT_TYPE";
    this.tableshow = false;
    this.displayedColumns = [];
    this.displayedColumns = [ 
      'fieldType', 
      'value',
      'code',
      'order',
      'default',
    ];
    this.statesSelect = false;
    this.storesSelect = false;
    this.ptPresent = false;
    this.ptcodePresent = false;
    this.ptorderPresent = false;
  }
  if(this.fieldSelect == "Promotion Status") {
    this.searchFieldData = "Promotion Status";
    this.requestType = "PROMOTION_STATUS";
    this.tableshow = false;
    this.displayedColumns = [];
    this.displayedColumns = [ 
      'fieldType', 
      'value',
      'code',
      'order',
      'default',
    ];
    this.statesSelect = false;
    this.storesSelect = false;
    this.ptPresent = false;
    this.ptcodePresent = false;
    this.ptorderPresent = false;
    this.promoStatusArr = this.promoStatusArr.filter((item:any) => item.default == true);
    if(this.promoStatusArr.length == 1) {
      this.disableButton = true;
     }
     else {
      this.disableButton = false;
    }
  }
  if(this.fieldSelect == "Redeemable By") {
    this.searchFieldData = "Redeemable By";
    this.requestType = "REDEEMABLE_BY";
    this.tableshow = false;
    this.displayedColumns = [];
    this.displayedColumns = [ 
      'fieldType', 
      'value',
      'code',
      'order',
      'default',
    ];
    this.statesSelect = false;
    this.storesSelect = false;
    this.ptPresent = false;
    this.ptcodePresent = false;
    this.ptorderPresent = false;
    this.redeemableByArr = this.redeemableByArr.filter((item:any) => item.default == true);
    if(this.redeemableByArr.length == 1) {
      this.disableButton = true;
     }
     else {
      this.disableButton = false;
    }
  }
  if(this.fieldSelect == "Sales Channel") {
    this.searchFieldData = "Sales Channel";
    this.requestType = "SALES_CHANNEL";
    this.tableshow = false;
    this.displayedColumns = [];
    this.displayedColumns = [ 
      'fieldType', 
      'value',
      'code',
      'order',
      'default',
    ];
    this.statesSelect = false;
    this.storesSelect = false;
    this.ptPresent = false;
    this.ptcodePresent = false;
    this.ptorderPresent = false;
    this.salesChannelArr = this.salesChannelArr.filter((item:any) => item.default == true);
    if(this.salesChannelArr.length == 1) {
      this.disableButton = true;
     }
     else {
      this.disableButton = false;
    }
  }
  if(this.fieldSelect == "Discount Type") {
    this.searchFieldData = "Discount Type";
    this.requestType = "DISCOUNT_TYPE";
    this.tableshow = false;
    this.displayedColumns = [];
    this.displayedColumns = [ 
      'fieldType', 
      'value',
      'code',
      'order',
      'default',
    ];
    this.statesSelect = false;
    this.storesSelect = false;
    this.ptPresent = false;
    this.ptcodePresent = false;
    this.ptorderPresent = false;
    this.discountTypeArr = this.discountTypeArr.filter((item:any) => item.default == true);
    if(this.discountTypeArr.length == 1) {
      this.disableButton = true;
     }
     else {
      this.disableButton = false;
    }
  }
  if(this.fieldSelect == "QR Code Colour") {
    this.searchFieldData = "QR Code Colour";
    this.requestType = "QR_CODE_COLOUR";
    this.tableshow = false;
    this.displayedColumns = [];
    this.displayedColumns = [ 
      'fieldType', 
      'value',
      'code',
      'order',
      'default',
    ];
    this.statesSelect = false;
    this.storesSelect = false;
    this.ptPresent = false;
    this.ptcodePresent = false;
    this.ptorderPresent = false;
    this.qrCodeColorArr = this.qrCodeColorArr.filter((item:any) => item.default == true);
    if(this.qrCodeColorArr.length == 1) {
      this.disableButton = true;
    }
    else {
      this.disableButton = false;
    }
  }
  var search1 = {
    requestType: "SEARCH",
    config: {
    fieldType: this.requestType,
    value: this.fieldValue,
    code: this.fieldCode,
    order: this.fieldOrder,
    default: this.default,
    configType: "SYSTEM"
    }
  }
  this.sysConfiguraion.searchConfig(search1).subscribe(data => {
    this.configData = data;
});
  if(this.fieldSelect == "States") {
    this.searchFieldData = "States";
    this.requestType = "STATE";
    this.tableshow = false;
    this.statesSelect = true;
    this.displayedColumns = [];
    this.displayedColumns = [ 
      'code',
      'name'
    ];
    this.ptPresent = false;
    this.ptcodePresent = false;
    this.ptorderPresent = false;
    var search = {
      requestType: "SEARCH",
    }
    this.spinner.show();
    this.sysConfiguraion.searchSourceSysConfig(search).subscribe((data:any) => 
    { 
      
      if(data) {
      data.sourceMarkets.forEach((country:any) => {
          if(country != null) {
          this.getCountryValues.push(country.name);
          this.countryCodeValues.push(country.code);
          this.countryDrp = this.getCountryValues[0];
          this.countryCode = this.countryCodeValues[0];
          this.countryDefault = country.default;

          }
      });
      this.spinner.hide();
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
  if(this.fieldSelect == "Stores") {
    this.searchFieldData = "Stores";
    this.requestType = "STORE";
    this.tableshow = false;
    this.statesSelect = true;
    this.storesSelect = true;
    this.ptPresent = false;
    this.ptcodePresent = false;
    this.ptorderPresent = false;
    this.displayedColumns = [];
    this.displayedColumns = [ 
      'id',
      'name'
    ];
    var search = {
      requestType: "SEARCH",
    }
    this.spinner.show();
    this.sysConfiguraion.searchSourceSysConfig(search).subscribe((data:any) => 
    { 
      
      if(data) {
      data.sourceMarkets.forEach((country:any) => {
          if(country != null) {
          this.getCountryValues.push(country.name);
          this.countryCodeValues.push(country.code);
          this.countryDrp = this.getCountryValues[0];
          this.countryCode = this.countryCodeValues[0];
          this.countryDefault = country.default;

          }
      });
      this.spinner.hide();
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

home() {
  window.location.href = environment.azureurl;
}

onFieldTypeSelect(evt:any) {
  this.fieldType = evt.value;
}

onChangeDefault(evt:any) {
  this.default = evt.value;
}

onChangeDefaultCountry(evt:any) {
  this.defaultCountry = evt.value;
}

onChangeStore(evt:any) {
  this.storeChecked = evt.value;
}

searchField(row:any) {
  this.addDisabled = true;
  this.updateDisabled = false;
  this.deleteDisabled = false;
  if(this.fieldSelect != "Stores" && this.fieldSelect != "States") {
  this.fieldValue = row.value;
  this.fieldCode = row.code;
  this.newArr = this.filteredFieldValues[0].filter((item:any) => item.default == true );
  if(this.newArr.length == 1) {
    this.disableButton = true;
  }
  else {
    this.disableButton = false;
  }
  } else if(this.fieldSelect == "Stores"){
    this.fieldValue = row.name;
    this.fieldCode = row.id;
  } else {
    this.fieldValue = row.name;
    this.fieldCode = row.code;
  }
  this.fieldOrder = row.order;
  if(row.default == true) {
    this.default = "True";
  }
  else {
    this.default = "False";
  }
  this.codeDefault = true;
  this.disableAdd = true;
  this.disableResetBtn = false;
}

reloadConfigs(search:any) {
  this.sysConfiguraion.searchConfig(search).subscribe((data:any) => 
  { 
     if(data) {
     this.filteredFieldValues.push(data.configs);
     this.spinner.hide();
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
searchConfig() {
  this.spinner.show();
  this.addedSuccess = false;
  this.updateSuccess = false;
  this.deleteSuccess = false;
  this.errorFound = false;
  this.ptcodePresent = false;
  this.ptorderPresent = false;
  this.ptPresent = false;
  this.codeDefault = false;
  this.forSearch = false;
  if(this.fieldSelect == "States" || this.fieldSelect == "Stores") {
    this.onlyStores = true;
    this.otherThanStores = false;
  } else {
    this.onlyStores = false;
    this.otherThanStores = true;
  }
  var search:any;
    if(this.fieldSelect != "States" && this.fieldSelect != "Stores") {
    search = {
      requestType: "SEARCH",
      config: {
      fieldType: this.requestType,
      value: this.fieldValue,
      code: this.fieldCode,
      order: this.fieldOrder,
      default: this.default,
      configType: "SYSTEM"
      }
    }
    this.sysConfiguraion.searchConfig(search).subscribe((data:any) => 
    { 
      this.filteredFieldValues = [];
      if(data) {
      this.filteredFieldValues.push(data.configs)
      this.tableshow = true;
      this.spinner.hide();
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
  if(this.fieldSelect == "Stores") {
    if(this.fieldCode == "") {
        search = {
          requestType: "SEARCH",
        }
     } else {
          search = {
            requestType: "SEARCH",
            sourceMarket: {
            code: this.fieldCode,
            default: this.default
            }
          }
     }
     this.sysConfiguraion.searchSourceSysConfig(search).subscribe((data:any) => 
     { 
       this.filteredFieldValues = [];
       if(data) {
       data.sourceMarkets.forEach((sm:any)=> {
          if(this.countryDrp == sm.name) {
             sm.brand.forEach((brd:any) => {
               if(brd.name == this.brandDrp) {
                  brd.states.forEach((stor:any) => {
                    if(stor.name == this.statesDrp) {
                      this.filteredFieldValues.push(stor.stores);
                    }
                  });
               }
             })
          }
       });
       this.tableshow = true;
       this.spinner.hide();
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
    if(this.fieldSelect == "States") {
      if(this.fieldCode == "") {
          search = {
            requestType: "SEARCH",
          }
       } else {
            search = {
              requestType: "SEARCH",
              sourceMarket: {
              code: this.fieldCode,
              default: this.default
              }
            }
       }
       this.sysConfiguraion.searchSourceSysConfig(search).subscribe((data:any) => 
       { 
         this.filteredFieldValues = [];
         if(data) {
         data.sourceMarkets.forEach((sm:any)=> {
            if(this.countryDrp == sm.name) {
               sm.brand.forEach((brd:any) => {
                 if(brd.name == this.brandDrp) {
                  this.filteredFieldValues.push(brd.states);
                 }
               })
            }
         });
         this.tableshow = true;
         this.spinner.hide();
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

addSysConfig() {
  var search1 = {
    requestType: "SEARCH",
    config: {
    fieldType: null,
    value: null,
    code: null,
    order: null,
    default: null,
    configType: "SYSTEM"
    }
  }
  this.sysConfiguraion.searchConfig(search1).subscribe(data => {
    this.configData = [];
    this.configData = data;
  });
 
  this.tableshow = false;
  this.updateSuccess = false;
  this.deleteSuccess = false;
  this.addedSuccess = false;
  this.errorFound = false;
  this.forSearch = true;
  var con:any = [];
  var code: any = [];
  var order: any = [];
  
  if(this.fieldSelect == "Promotion Type") {
  this.configData.configs.forEach((pt:any) => {
    con.push(pt.value);
    code.push(pt.code);
    order.push(pt.order);
  });
  } 
  if(this.fieldSelect == "Promotion Event Type") {
    this.configData.configs.forEach((pt:any) => {
      con.push(pt.value);
      code.push(pt.code);
      order.push(pt.order);
    });
  }
  if(this.fieldSelect == "Promotion Status") {
    this.configData.configs.forEach((pt:any) => {
      con.push(pt.value);
      code.push(pt.code);
      order.push(pt.order);
    });
  }
  if(this.fieldSelect == "Redeemable By") {
    this.configData.configs.forEach((pt:any) => {
      con.push(pt.value);
      code.push(pt.code);
      order.push(pt.order);
    });
  }
  if(this.fieldSelect == "Sales Channel") {
    this.configData.configs.forEach((pt:any) => {
      con.push(pt.value);
      code.push(pt.code);
      order.push(pt.order);
    });
  }
  if(this.fieldSelect == "Discount Type") {
    this.configData.configs.forEach((pt:any) => {
      con.push(pt.value);
      code.push(pt.code);
      order.push(pt.order);
    });
  }
  if(this.fieldSelect == "QR Code Colour") {
    this.configData.configs.forEach((pt:any) => {
      con = [];
      code = [];
      order = [];
      con.push(pt.value);
      code.push(pt.code);
      order.push(pt.order);
    });
  }
  for(var i=0; i < con.length; i++) {
    if(this.fieldValue == con[i]) {
      this.ptPresent = true;
      return
    } else {
      this.ptPresent = false;
    }
  } 
  if(this.ptPresent == false) {
  for(var i=0; i < code.length; i++) {
    if(this.fieldCode == code[i]) {
      this.ptcodePresent = true;
      return
    }
    if(this.fieldCode != code[i]) {
      this.ptcodePresent = false;
    }
  } 
 } 

 if(this.ptcodePresent == false && this.fieldCode != undefined) {
  for(var i=0; i < order.length; i++) {
    if(this.fieldOrder == order[i]) {
      this.ptorderPresent = true;
      return
    }
    if(this.fieldOrder != order[i]) {
      this.ptorderPresent = false;
    }
  } 
 } 

 if(this.fieldValue == undefined || this.fieldValue == "" || this.fieldValue == null) {
  this.ptPresent = true;
 } else if(this.fieldCode == undefined || this.fieldCode == "" || this.fieldCode == null) {
  this.ptcodePresent = true;
 } else if(this.fieldOrder == undefined || this.fieldOrder == "" || this.fieldOrder == null) {
  this.ptorderPresent = true;
 }
  
 if((this.fieldValue != null && this.fieldCode != null && this.fieldOrder != null) && (this.ptPresent == false && this.ptcodePresent == false && this.ptorderPresent == false)) {
    this.spinner.show();
  if(this.fieldSelect != "States" && this.fieldSelect != "Stores") {
  this.systemConfiguration.patchValue({
        requestType: "ADD",
        config: {
        fieldType: this.requestType,
        value: this.fieldValue,
        code: this.fieldCode,
        order: this.fieldOrder,
        default: this.default,
        configType: "SYSTEM"
    },
  });
  this.sysConfiguraion.addSysConfig(this.systemConfiguration.value).subscribe((data:any) => 
  { 
    if(data) {
      this.addedSuccess = true;
      this.spinner.hide();
      this.fieldValue = "";
      this.fieldCode = "";
      this.fieldOrder = "";
      this.getDefaultValues.forEach((df:any) => {
        if(df == false) {
          this.default = df;
        }
      });
      this.codeDefault = false;
      this.disableAdd = false;
    }
 },
  (Error:any) => {
    if(Error.error) {
      this.errorM = Error.error[0].message;
      this.errorFound = true;
      this.spinner.hide();
    } else {
     this.spinner.hide();
    };
   
  });
 }
 if(this.fieldSelect == "States") {
  this.systemConfiguration = new FormGroup({
    requestType: new FormControl(),
    configType: new FormControl(""),
    sourceMarket: new FormGroup(
      {
      name: new FormControl(this.countryDrp),
      code: new FormControl(this.countryCode),
      default: new FormControl(this.defaultCountry),
      brand: this.fb.array([
        new FormGroup({
          name: new FormControl(this.brandDrp),
          code: new FormControl(this.brandCode),
          subscriberType: new FormControl(null),
          qrcodeColour: new FormControl(null),
          states: new FormArray([
            new FormGroup({
              code: new FormControl(this.fieldCode),
              name: new FormControl(this.fieldValue)
            })
          ])
        })
      ])
    })
  });
  var states = [
    {
      code: this.fieldCode,
      name: this.fieldValue
    }
  ];
  var brands = [ {
      name: this.brandDrp,
      code: this.brandCode,
      default: this.brandDefault,
      states: states,
      subscriberTye: null,
      qrcodeColour: null,
  }]
  this.systemConfiguration.patchValue({
    requestType: "CREATE",
    configType: this.requestType,
    sourceMarket: {
    name: this.countryDrp,
    code: this.countryCode,
    default: this.countryDefault,
    brand: [
             {
                name: this.brandDrp,
                code: this.brandCode,
                default: this.brandDefault,
                states: states,
                subscriberTye: null,
                qrcodeColour: null,               
               }
            ]
    },
});
this.sysConfiguraion.createSourceSysConfig(this.systemConfiguration.value).subscribe((data:any) => 
{ 
if(data) {
  this.addedSuccess = true;
  this.spinner.hide();
  this.fieldValue = "";
  this.fieldCode = "";
  this.fieldOrder = "";
  this.getDefaultValues.forEach((df:any) => {
    if(df == false) {
      this.default = df;
    }
  });
  this.codeDefault = false;
}
},
(Error:any) => {
if(Error.error) {
  this.errorM = Error.error[0].message;
  this.errorFound = true;
  this.spinner.hide();
} else {
 this.spinner.hide();
};

});
 }
 if(this.fieldSelect == "Stores") {
  this.systemConfiguration = new FormGroup({
    requestType: new FormControl(),
    configType: new FormControl(""),
    sourceMarket: new FormGroup(
      {
      name: new FormControl(this.countryDrp),
      code: new FormControl(this.countryCode),
      default: new FormControl(this.defaultCountry),
      brand: this.fb.array([
        new FormGroup({
          name: new FormControl(this.brandDrp),
          code: new FormControl(this.brandCode),
          subscriberType: new FormControl(null),
          qrcodeColour: new FormControl(null),
          states: new FormArray([
            new FormGroup({
              code: new FormControl(this.statesCode),
              name: new FormControl(this.statesDrp),
              stores: new FormArray([
                new FormGroup({
                  id: new FormControl(this.fieldCode),
                  name: new FormControl(this.fieldValue)
                })
              ])
            })
          ])
        })
      ])
    })
  });
  var stores = [{
    id: this.fieldCode,
    name: this.fieldValue
  }]
  this.systemConfiguration.patchValue({
    requestType: "CREATE",
    configType: this.requestType,
    sourceMarket: {
    name: this.countryDrp,
    code: this.countryCode,
    default: this.countryDefault,
    brand: [
             {
                name: this.brandDrp,
                code: this.brandCode,
                default: this.brandDefault,
                states: [
                  {
                    code: this.statesCode,
                    name: this.statesDrp,
                    stores: stores
                  }
                ],
                subscriberTye: null,
                qrcodeColour: null,               
               }
            ]
    },
});
this.sysConfiguraion.createSourceSysConfig(this.systemConfiguration.value).subscribe((data:any) => 
{ 
      if(data) {
        this.addedSuccess = true;
        this.spinner.hide();
        this.fieldValue = "";
        this.fieldCode = "";
        this.fieldOrder = "";
        this.getDefaultValues.forEach((df:any) => {
          if(df == false) {
            this.default = df;
          }
        });
        this.codeDefault = false;
      }
      },
      (Error:any) => {
      if(Error.error) {
        this.spinner.hide();
        this.errorM = Error.error[0].message;
        this.errorFound = true;
      } else {
      this.spinner.hide();
      };

  });
 }
}
}

deleteSysConfig() {
  this.spinner.show();
  this.tableshow = false;
  this.updateSuccess = false;
  this.deleteSuccess = false;
  this.addedSuccess = false;
  this.errorFound = false;
  this.forSearch = true;
  if(this.fieldSelect != "States" && this.fieldSelect != "Stores"){
  this.systemConfiguration.patchValue({
        requestType: "DELETE",
        config: {
        fieldType: this.requestType,
        value: this.fieldValue,
        code: this.fieldCode,
        order: this.fieldOrder,
        default: this.default,
        configType: "SYSTEM"
    },
  });
  this.sysConfiguraion.deleteConfig(this.systemConfiguration.value).subscribe((data:any) => 
  { 
    if(data) {
      this.deleteSuccess = true;
      this.spinner.hide();
      this.fieldValue = "";
      this.fieldCode = "";
      this.fieldOrder = "";
      this.deleteDisabled = true;
      this.getDefaultValues.forEach((df:any) => {
        if(df == false) {
          this.default = df;
        }
      });
      this.codeDefault = false;
      this.disableAdd = false;
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
  if(this.fieldSelect == "Stores") {
    this.systemConfiguration = new FormGroup({
      requestType: new FormControl(),
      configType: new FormControl(""),
      sourceMarket: new FormGroup(
        {
        name: new FormControl(this.countryDrp),
        code: new FormControl(this.countryCode),
        default: new FormControl(this.defaultCountry),
        brand: this.fb.array([
          new FormGroup({
            name: new FormControl(this.brandDrp),
            code: new FormControl(this.brandCode),
            subscriberType: new FormControl(null),
            qrcodeColour: new FormControl(null),
            states: new FormArray([
              new FormGroup({
                code: new FormControl(this.statesCode),
                name: new FormControl(this.statesDrp),
                stores: new FormArray([
                  new FormGroup({
                    id: new FormControl(this.fieldCode),
                    name: new FormControl(this.fieldValue)
                  })
                ])
              })
            ])
          })
        ])
      })
    });
    var stores = [{
      id: this.fieldCode,
      name: this.fieldValue
    }]
    this.systemConfiguration.patchValue({
      requestType: "DELETE",
      configType: this.requestType,
      sourceMarket: {
      name: this.countryDrp,
      code: this.countryCode,
      default: this.countryDefault,
      brand: [
               {
                  name: this.brandDrp,
                  code: this.brandCode,
                  default: this.brandDefault,
                  states: [
                    {
                      code: this.statesCode,
                      name: this.statesDrp,
                      stores: stores
                    }
                  ],
                  subscriberTye: null,
                  qrcodeColour: null,               
                 }
              ]
      },
  });
  this.sysConfiguraion.deleteSourceSysConfig(this.systemConfiguration.value).subscribe((data:any) => 
  { 
  if(data) {
    this.deleteSuccess = true;
    this.spinner.hide();
    this.fieldValue = "";
    this.fieldCode = "";
    this.fieldOrder = "";
    this.getDefaultValues.forEach((df:any) => {
      if(df == false) {
        this.default = df;
      }
    });
    this.codeDefault = false;
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
   if(this.fieldSelect == "States") {
    this.systemConfiguration = new FormGroup({
      requestType: new FormControl(),
      configType: new FormControl(""),
      sourceMarket: new FormGroup(
        {
        name: new FormControl(this.countryDrp),
        code: new FormControl(this.countryCode),
        default: new FormControl(this.defaultCountry),
        brand: this.fb.array([
          new FormGroup({
            name: new FormControl(this.brandDrp),
            code: new FormControl(this.brandCode),
            subscriberType: new FormControl(null),
            qrcodeColour: new FormControl(null),
            states: new FormArray([
              new FormGroup({
                code: new FormControl(this.fieldCode),
                name: new FormControl(this.fieldValue)
              })
            ])
          })
        ])
      })
    });
    var states = [
      {
        code: this.fieldCode,
        name: this.fieldValue
      }
    ];
    var brands = [ {
        name: this.brandDrp,
        code: this.brandCode,
        default: this.brandDefault,
        states: states,
        subscriberTye: null,
        qrcodeColour: null,
    }]
    this.systemConfiguration.patchValue({
      requestType: "DELETE",
      configType: this.requestType,
      sourceMarket: {
      name: this.countryDrp,
      code: this.countryCode,
      default: this.countryDefault,
      brand: [
               {
                  name: this.brandDrp,
                  code: this.brandCode,
                  default: this.brandDefault,
                  states: states,
                  subscriberTye: null,
                  qrcodeColour: null,               
                 }
              ]
      },
  });
  this.sysConfiguraion.deleteSourceSysConfig(this.systemConfiguration.value).subscribe((data:any) => 
  { 
  if(data) {
    this.deleteSuccess = true;
    this.spinner.hide();
    this.fieldValue = "";
    this.fieldCode = "";
    this.fieldOrder = "";
    this.getDefaultValues.forEach((df:any) => {
      if(df == false) {
        this.default = df;
      }
    });
    this.codeDefault = false;
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

updateSysConfig() {
   this.tableshow = false;
  this.updateSuccess = false;
  this.deleteSuccess = false;
  this.addedSuccess = false;
  this.errorFound = false;
  this.forSearch = true;
  var con:any = [];
  var code: any = [];
  var order: any = [];
  if(this.fieldSelect == "Promotion Type") {
  this.configData.configs.forEach((pt:any) => {
    con.push(pt.value);
    code.push(pt.code);
    order.push(pt.order);
  });
  } 

  if(this.fieldSelect == "Promotion Event Type") {
    this.configData.configs.forEach((pt:any) => {
      con.push(pt.value);
      code.push(pt.code);
      order.push(pt.order);
    });
  }
  if(this.fieldSelect == "Promotion Status") {
    this.configData.configs.forEach((pt:any) => {
      con.push(pt.value);
      code.push(pt.code);
      order.push(pt.order);
    });
  }
  if(this.fieldSelect == "Redeemable By") {
    this.configData.configs.forEach((pt:any) => {
      con.push(pt.value);
      code.push(pt.code);
      order.push(pt.order);
    });
  }
  if(this.fieldSelect == "Sales Channel") {
    this.configData.configs.forEach((pt:any) => {
      con.push(pt.value);
      code.push(pt.code);
      order.push(pt.order);
    });
  }
  if(this.fieldSelect == "Discount Type") {
    this.configData.configs.forEach((pt:any) => {
      con.push(pt.value);
      code.push(pt.code);
      order.push(pt.order);
    });
  }
  if(this.fieldSelect == "QR Code Colour") {
    this.configData.configs.forEach((pt:any) => {
      con.push(pt.value);
      code.push(pt.code);
      order.push(pt.order);
    });
  }


 if(this.ptcodePresent == false && this.fieldCode != undefined) {
  for(var i=0; i < order.length; i++) {
    if(this.fieldOrder == order[i]) {
      this.ptorderPresent = true;
      return
    }
    if(this.fieldOrder != order[i]) {
      this.ptorderPresent = false;
    }
  } 
 }

 if((this.fieldValue != null && this.fieldCode != null && this.fieldOrder != null) && (this.ptPresent == false && this.ptcodePresent == false && this.ptorderPresent == false)) {
  if(this.fieldSelect != "States" && this.fieldSelect != "Stores") {
    this.spinner.show();
  this.systemConfiguration.patchValue({
        requestType: "UPDATE",
        config: {
        fieldType: this.requestType,
        value: this.fieldValue,
        code: this.fieldCode,
        order: this.fieldOrder,
        default: this.default,
        configType: "SYSTEM"
    },
  });
  this.sysConfiguraion.updateSysConfig(this.systemConfiguration.value).subscribe((data:any) => 
  { 
     if(data) {
      this.updateSuccess = true;
      this.spinner.hide();
      this.updateDisabled = true;
      this.getDefaultValues.forEach((df:any) => {
        if(df == false) {
          this.default = df;
        }
      });
      this.codeDefault = false;
     }
 },
  (Error:any) => {
    if(Error.error) {
      this.spinner.hide();
    } 
   
  });
  }
  if(this.fieldSelect == "Stores") {
    this.systemConfiguration = new FormGroup({
      requestType: new FormControl(),
      configType: new FormControl(""),
      sourceMarket: new FormGroup(
        {
        name: new FormControl(this.countryDrp),
        code: new FormControl(this.countryCode),
        default: new FormControl(this.defaultCountry),
        brand: this.fb.array([
          new FormGroup({
            name: new FormControl(this.brandDrp),
            code: new FormControl(this.brandCode),
            subscriberType: new FormControl(null),
            qrcodeColour: new FormControl(null),
            states: new FormArray([
              new FormGroup({
                code: new FormControl(this.statesCode),
                name: new FormControl(this.statesDrp),
                stores: new FormArray([
                  new FormGroup({
                    id: new FormControl(this.fieldCode),
                    name: new FormControl(this.fieldValue)
                  })
                ])
              })
            ])
          })
        ])
      })
    });
    var stores = [{
      id: this.fieldCode,
      name: this.fieldValue
    }]
    this.systemConfiguration.patchValue({
      requestType: "UPDATE",
      configType: this.requestType,
      sourceMarket: {
      name: this.countryDrp,
      code: this.countryCode,
      default: this.countryDefault,
      brand: [
               {
                  name: this.brandDrp,
                  code: this.brandCode,
                  default: this.brandDefault,
                  states: [
                    {
                      code: this.statesCode,
                      name: this.statesDrp,
                      stores: stores
                    }
                  ],
                  subscriberTye: null,
                  qrcodeColour: null,               
                 }
              ]
      },
  });
  this.sysConfiguraion.updateSourceSysConfig(this.systemConfiguration.value).subscribe((data:any) => 
  { 
  if(data) {
    this.updateSuccess = true;
    this.spinner.hide();
    this.fieldValue = "";
    this.fieldCode = "";
    this.fieldOrder = "";
    this.getDefaultValues.forEach((df:any) => {
      if(df == false) {
        this.default = df;
      }
    });
    this.codeDefault = false;
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
   if(this.fieldSelect == "States") {
    this.systemConfiguration = new FormGroup({
      requestType: new FormControl(),
      configType: new FormControl(""),
      sourceMarket: new FormGroup(
        {
        name: new FormControl(this.countryDrp),
        code: new FormControl(this.countryCode),
        default: new FormControl(this.defaultCountry),
        brand: this.fb.array([
          new FormGroup({
            name: new FormControl(this.brandDrp),
            code: new FormControl(this.brandCode),
            subscriberType: new FormControl(null),
            qrcodeColour: new FormControl(null),
            states: new FormArray([
              new FormGroup({
                code: new FormControl(this.fieldCode),
                name: new FormControl(this.fieldValue)
              })
            ])
          })
        ])
      })
    });
    var states = [
      {
        code: this.fieldCode,
        name: this.fieldValue
      }
    ];
    var brands = [ {
        name: this.brandDrp,
        code: this.brandCode,
        default: this.brandDefault,
        states: states,
        subscriberTye: null,
        qrcodeColour: null,
    }]
    this.systemConfiguration.patchValue({
      requestType: "UPDATE",
      configType: this.requestType,
      sourceMarket: {
      name: this.countryDrp,
      code: this.countryCode,
      default: this.countryDefault,
      brand: [
               {
                  name: this.brandDrp,
                  code: this.brandCode,
                  default: this.brandDefault,
                  states: states,
                  subscriberTye: null,
                  qrcodeColour: null,               
                 }
              ]
      },
  });
  this.sysConfiguraion.updateSourceSysConfig(this.systemConfiguration.value).subscribe((data:any) => 
  { 
  if(data) {
    this.updateSuccess = true;
    this.spinner.hide();
    this.fieldValue = "";
    this.fieldCode = "";
    this.fieldOrder = "";
    this.getDefaultValues.forEach((df:any) => {
      if(df == false) {
        this.default = df;
      }
    });
    this.codeDefault = false;
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
}

resetSystemConfig() {
  this.disableTrueValues();
  this.addDisabled = false;
  this.updateDisabled = true;
  this.deleteDisabled = true;
  this.fieldOrder = '';
  this.fieldValue = '';
  this.default = "False";
  this.codeDefault = false;
  this.fieldCode = '';
  this.filteredFieldValues[0] = [];
  this.tableshow = false;
  this.disableAdd = false;
  this.disableResetBtn = true;
  this.addedSuccess = false;
  this.updateSuccess = false;
  this.deleteSuccess = false;
  this.errorFound = false;
  this.ptPresent = false;
  this.ptcodePresent = false;
  this.ptorderPresent = false;
}

}
