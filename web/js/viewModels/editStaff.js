define(['ojs/ojcore',"knockout","jquery","appController", "ojs/ojarraydataprovider", "ojs/ojfilepickerutils",
    "ojs/ojinputtext", "ojs/ojformlayout", "ojs/ojvalidationgroup", "ojs/ojselectsingle","ojs/ojdatetimepicker",
     "ojs/ojfilepicker", "ojs/ojpopup", "ojs/ojprogress-circle", "ojs/ojdialog",,"ojs/ojselectcombobox","ojs/ojavatar"], 
    function (oj,ko,$, app, ArrayDataProvider, FilePickerUtils) {

        class editStaff {
            constructor(args) {
                var self = this;

                self.router = args.parentRouter;
                let BaseURL = sessionStorage.getItem("BaseURL")
                
                self.firstName = ko.observable();
                self.lastName = ko.observable();
                self.phone = ko.observable();
                self.email = ko.observable();
                self.qualification = ko.observable();
                self.qualificationList = ko.observableArray([]);
                self.qualificationList.push(
                    {"label":"Doctorate/Ph.D.","value":"Doctorate/Ph.D."},
                    {"label":"Master's Degree","value":"Master's Degree"},
                    {"label":"Bachelor's Degree","value":"Bachelor's Degree"},
                    {"label":"High School Diploma","value":"High School Diploma"},
                    {"label":"Other","value":"Other"}
                );
                self.qualificationList = new ArrayDataProvider(self.qualificationList, {
                    keyAttributes: 'value'
                });                
                self.designation = ko.observable();
                self.profilePhoto = ko.observable('');
                self.profilePhotoShow = ko.observable('');
                self.fileContent = ko.observable('');
                self.phoneError = ko.observable('');
                self.emailError = ko.observable('');
                self.address = ko.observable('');
                self.typeError = ko.observable('');
                self.file = ko.observable('');
                self.secondaryText = ko.observable('Please Upload(Optional)')
                self.username = ko.observable();
                self.password = ko.observable();
                self.countryCode = ko.observable();
                self.countryCodes = ko.observableArray([]);
                self.countryCodes.push(
                    {"label":"Afghanistan(+93)","value":"+93"},
                    {"label":"Albania(+355)","value":"+355"},
                    {"label":"Algeria(+213)","value":"+213"},
                    {"label":"American Samoa(+1684)","value":"+1684"},
                    {"label":"Andorra(+376)","value":"+376"},
                    {"label":"Angola(+244)","value":"+244"},
                    {"label":"Anguilla(+1264)","value":"+1264"},
                    {"label":"Antarctica(+672)","value":"+672"},
                    {"label":"Antigua and Barbuda(+1268)","value":"+1268"},
                    {"label":"Argentina(+54)","value":"+54"},
                    {"label":"Armenia(+374)","value":"+374"},
                    {"label":"Aruba(+297)","value":"+297"},
                    {"label":"Australia(+61)","value":"+61"},
                    {"label":"Austria(+43)","value":"+43"},
                    {"label":"Azerbaijan(+994)","value":"+994"},
                    {"label":"Bahamas(+1242)","value":"+1242"},
                    {"label":"Bahrain(+973)","value":"+973"},
                    {"label":"Bangladesh(+880)","value":"+880"},
                    {"label":"Barbados(+1246)","value":"+1246"},
                    {"label":"Belarus(+375)","value":"+375"},
                    {"label":"Belgium(+32)","value":"+32"},
                    {"label":"Belize(+501)","value":"+501"},
                    {"label":"Benin(+229)","value":"+229"},
                    {"label":"Bermuda(+1441)","value":"+1441"},
                    {"label":"Bhutan(+975)","value":"+975"},
                    {"label":"Bolivia(+591)","value":"+591"},
                    {"label":"Bosnia and Herzegovina(+387)","value":"+387"},
                    {"label":"Botswana(+267)","value":"+267"},
                    {"label":"Brazil(+55)","value":"+55"},
                    {"label":"British Indian Ocean Territory(+246)","value":"+246"},
                    {"label":"British Virgin Islands(+1284)","value":"+1284"},
                    {"label":"Brunei(+673)","value":"+673"},
                    {"label":"Bulgaria(+359)","value":"+359"},
                    {"label":"Burkina Faso(+226)","value":"+226"},
                    {"label":"Burundi(+257)","value":"+257"},
                    {"label":"Cambodia(+855)","value":"+855"},
                    {"label":"Cameroon(+237)","value":"+237"},
                    {"label":"Canada(+1)","value":"+1"},
                    {"label":"Cape Verde(+238)","value":"+238"},
                    {"label":"Cayman Islands(+1345)","value":"+1345"},
                    {"label":"Central African Republic(+236)","value":"+236"},
                    {"label":"Chad(+235)","value":"+235"},
                    {"label":"Chile(+56)","value":"+56"},
                    {"label":"China(+86)","value":"+86"},
                    {"label":"Christmas Island(+61)","value":"+61"},
                    {"label":"Cocos Islands(+61)","value":"+61"},
                    {"label":"Colombia(+57)","value":"+57"},
                    {"label":"Comoros(+269)","value":"+269"},
                    {"label":"Cook Islands(+682)","value":"+682"},
                    {"label":"Costa Rica(+506)","value":"+506"},
                    {"label":"Croatia(+385)","value":"+385"},
                    {"label":"Cuba(+53)","value":"+53"},
                    {"label":"Curacao(+599)","value":"+599"},
                    {"label":"Cyprus(+357)","value":"+357"},
                    {"label":"Czech Republic(+420)","value":"+420"},
                    {"label":"Democratic Republic of the Congo(+243)","value":"+243"},
                    {"label":"Denmark(+45)","value":"+45"},
                    {"label":"Djibouti(+253)","value":"+253"},
                    {"label":"Dominica(+1767)","value":"+1767"},
                    {"label":"Dominican Republic(+1809)","value":"+1809"},
                    {"label":"East Timor(+670)","value":"+670"},
                    {"label":"Ecuador(+593)","value":"+593"},
                    {"label":"Egypt(+20)","value":"+20"},
                    {"label":"El Salvador(+503)","value":"+503"},
                    {"label":"Equatorial Guinea(+240)","value":"+240"},
                    {"label":"Eritrea(+291)","value":"+291"},
                    {"label":"Estonia(+372)","value":"+372"},
                    {"label":"Ethiopia(+251)","value":"+251"},
                    {"label":"Falkland Islands(+500)","value":"+500"},
                    {"label":"Faroe Islands(+298)","value":"+298"},
                    {"label":"Fiji(+679)","value":"+679"},
                    {"label":"Finland(+358)","value":"+358"},
                    {"label":"France(+33)","value":"+33"},
                    {"label":"French Polynesia(+689)","value":"+689"},
                    {"label":"Gabon(+241)","value":"+241"},
                    {"label":"Gambia(+220)","value":"+220"},
                    {"label":"Georgia(+995)","value":"+995"},
                    {"label":"Germany(+49)","value":"+49"},
                    {"label":"Ghana(+233)","value":"+233"},
                    {"label":"Gibraltar(+350)","value":"+350"},
                    {"label":"Greece(+30)","value":"+30"},
                    {"label":"Greenland(+299)","value":"+299"},
                    {"label":"Grenada(+1473)","value":"+1473"},
                    {"label":"Guam(+1671)","value":"+1671"},
                    {"label":"Guatemala(+502)","value":"+502"},
                    {"label":"Guernsey(+441481)","value":"+441481"},
                    {"label":"Guinea(+224)","value":"+224"},
                    {"label":"Guinea-Bissau(+245)","value":"+245"},
                    {"label":"Guyana(+592)","value":"+592"},
                    {"label":"Haiti(+509)","value":"+509"},
                    {"label":"Honduras(+504)","value":"+504"},
                    {"label":"Hong Kong(+852)","value":"+852"},
                    {"label":"Hungary(+36)","value":"+36"},
                    {"label":"Iceland(+354)","value":"+354"},
                    {"label":"India(+91)","value":"+91"},
                    {"label":"Indonesia(+62)","value":"+62"},
                    {"label":"Iran(+98)","value":"+98"},
                    {"label":"Iraq(+964)","value":"+964"},
                    {"label":"Ireland(+353)","value":"+353"},
                    {"label":"Isle of Man(+441624)","value":"+441624"},
                    {"label":"Israel(+972)","value":"+972"},
                    {"label":"Italy(+39)","value":"+39"},
                    {"label":"Ivory Coast(+225)","value":"+225"},
                    {"label":"Jamaica(+1876)","value":"+1876"},
                    {"label":"Japan(+81)","value":"+81"},
                    {"label":"Jersey(+441534)","value":"+441534"},
                    {"label":"Jordan(+962)","value":"+962"},
                    {"label":"Kazakhstan(+7)","value":"+7"},
                    {"label":"Kenya(+254)","value":"+254"},
                    {"label":"Kiribati(+686)","value":"+686"},
                    {"label":"Kosovo(+383)","value":"+383"},
                    {"label":"Kuwait(+965)","value":"+965"},
                    {"label":"Kyrgyzstan(+996)","value":"+996"},
                    {"label":"Laos(+856)","value":"+856"},
                    {"label":"Latvia(+371)","value":"+371"},
                    {"label":"Lebanon(+961)","value":"+961"},
                    {"label":"Lesotho(+266)","value":"+266"},
                    {"label":"Liberia(+231)","value":"+231"},
                    {"label":"Libya(+218)","value":"+218"},
                    {"label":"Liechtenstein(+423)","value":"+423"},
                    {"label":"Lithuania(+370)","value":"+370"},
                    {"label":"Luxembourg(+352)","value":"+352"},
                    {"label":"Macao(+853)","value":"+853"},
                    {"label":"Macedonia(+389)","value":"+389"},
                    {"label":"Madagascar(+261)","value":"+261"},
                    {"label":"Malawi(+265)","value":"+265"},
                    {"label":"Malaysia(+60)","value":"+60"},
                    {"label":"Maldives(+960)","value":"+960"},
                    {"label":"Mali(+223)","value":"+223"},
                    {"label":"Malta(+356)","value":"+356"},
                    {"label":"Marshall Islands(+692)","value":"+692"},
                    {"label":"Mauritania(+222)","value":"+222"},
                    {"label":"Mauritius(+230)","value":"+230"},
                    {"label":"Mayotte(+262)","value":"+262"},
                    {"label":"Mexico(+52)","value":"+52"},
                    {"label":"Micronesia(+691)","value":"+691"},
                    {"label":"Moldova(+373)","value":"+373"},
                    {"label":"Monaco(+377)","value":"+377"},
                    {"label":"Mongolia(+976)","value":"+976"},
                    {"label":"Montenegro(+382)","value":"+382"},
                    {"label":"Montserrat(+1664)","value":"+1664"},
                    {"label":"Morocco(+212)","value":"+212"},
                    {"label":"Mozambique(+258)","value":"+258"},
                    {"label":"Myanmar(+95)","value":"+95"},
                    {"label":"Namibia(+264)","value":"+264"},
                    {"label":"Nauru(+674)","value":"+674"},
                    {"label":"Nepal(+977)","value":"+977"},
                    {"label":"Netherlands(+31)","value":"+31"},
                    {"label":"Netherlands Antilles(+599)","value":"+599"},
                    {"label":"New Caledonia(+687)","value":"+687"},
                    {"label":"New Zealand(+64)","value":"+64"},
                    {"label":"Nicaragua(+505)","value":"+505"},
                    {"label":"Niger(+227)","value":"+227"},
                    {"label":"Nigeria(+234)","value":"+234"},
                    {"label":"Niue(+683)","value":"+683"},
                    {"label":"North Korea(+850)","value":"+850"},
                    {"label":"Northern Mariana Islands(+1670)","value":"+1670"},
                    {"label":"Norway(+47)","value":"+47"},
                    {"label":"Oman(+968)","value":"+968"},
                    {"label":"Pakistan(+92)","value":"+92"},
                    {"label":"Palau(+680)","value":"+680"},
                    {"label":"Palestine(+970)","value":"+970"},
                    {"label":"Panama(+507)","value":"+507"},
                    {"label":"Papua New Guinea(+675)","value":"+675"},
                    {"label":"Paraguay(+595)","value":"+595"},
                    {"label":"Peru(+51)","value":"+51"},
                    {"label":"Philippines(+63)","value":"+63"},
                    {"label":"Pitcairn(+64)","value":"+64"},
                    {"label":"Poland(+48)","value":"+48"},
                    {"label":"Portugal(+351)","value":"+351"},
                    {"label":"Puerto Rico(+1787)","value":"+1787"},
                    {"label":"Qatar(+974)","value":"+974"},
                    {"label":"Republic of the Congo(+242)","value":"+242"},
                    {"label":"Reunion(+262)","value":"+262"},
                    {"label":"Romania(+40)","value":"+40"},
                    {"label":"Russia(+7)","value":"+7"},
                    {"label":"Rwanda(+250)","value":"+250"},
                    {"label":"Saint Barthelemy(+590)","value":"+590"},
                    {"label":"Saint Helena(+290)","value":"+290"},
                    {"label":"Saint Kitts and Nevis(+1869)","value":"+1869"},
                    {"label":"Saint Lucia(+1758)","value":"+1758"},
                    {"label":"Saint Martin(+590)","value":"+590"},
                    {"label":"Saint Pierre and Miquelon(+508)","value":"+508"},
                    {"label":"Saint Vincent and the Grenadines(+1784)","value":"+1784"},
                    {"label":"Samoa(+685)","value":"+685"},
                    {"label":"San Marino(+378)","value":"+378"},
                    {"label":"Sao Tome and Principe(+239)","value":"+239"},
                    {"label":"Saudi Arabia(+966)","value":"+966"},
                    {"label":"Senegal(+221)","value":"+221"},
                    {"label":"Serbia(+381)","value":"+381"},
                    {"label":"Seychelles(+248)","value":"+248"},
                    {"label":"Sierra Leone(+232)","value":"+232"},
                    {"label":"Singapore(+65)","value":"+65"},
                    {"label":"Sint Maarten(+1721)","value":"+1721"},
                    {"label":"Slovakia(+421)","value":"+421"},
                    {"label":"Slovenia(+386)","value":"+386"},
                    {"label":"Solomon Islands(+677)","value":"+677"},
                    {"label":"Somalia(+252)","value":"+252"},
                    {"label":"South Africa(+27)","value":"+27"},
                    {"label":"South Korea(+82)","value":"+82"},
                    {"label":"South Sudan(+211)","value":"+211"},
                    {"label":"Spain(+34)","value":"+34"},
                    {"label":"Sri Lanka(+94)","value":"+94"},
                    {"label":"Sudan(+249)","value":"+249"},
                    {"label":"Suriname(+597)","value":"+597"},
                    {"label":"Svalbard and Jan Mayen(+47)","value":"+47"},
                    {"label":"Swaziland(+268)","value":"+268"},
                    {"label":"Sweden(+46)","value":"+46"},
                    {"label":"Switzerland(+41)","value":"+41"},
                    {"label":"Syria(+963)","value":"+963"},
                    {"label":"Taiwan(+886)","value":"+886"},
                    {"label":"Tajikistan(+992)","value":"+992"},
                    {"label":"Tanzania(+255)","value":"+255"},
                    {"label":"Thailand(+66)","value":"+66"},
                    {"label":"Togo(+228)","value":"+228"},
                    {"label":"Tokelau(+690)","value":"+690"},
                    {"label":"Tonga(+676)","value":"+676"},
                    {"label":"Trinidad and Tobago(+1868)","value":"+1868"},
                    {"label":"Tunisia(+216)","value":"+216"},
                    {"label":"Turkey(+90)","value":"+90"},
                    {"label":"Turkmenistan(+993)","value":"+993"},
                    {"label":"Turks and Caicos Islands(+1649)","value":"+1649"},
                    {"label":"Tuvalu(+688)","value":"+688"},
                    {"label":"U.S. Virgin Islands(+1340)","value":"+1340"},
                    {"label":"Uganda(+256)","value":"+256"},
                    {"label":"Ukraine(+380)","value":"+380"},
                    {"label":"United Arab Emirates(+971)","value":"+971"},
                    {"label":"United Kingdom(+44)","value":"+44"},
                    {"label":"United States(+1)","value":"+1"},
                    {"label":"Uruguay(+598)","value":"+598"},
                    {"label":"Uzbekistan(+998)","value":"+998"},
                    {"label":"Vanuatu(+678)","value":"+678"},
                    {"label":"Vatican(+379)","value":"+379"},
                    {"label":"Venezuela(+58)","value":"+58"},
                    {"label":"Vietnam(+84)","value":"+84"},
                    {"label":"Wallis and Futuna(+681)","value":"+681"},
                    {"label":"Western Sahara(+212)","value":"+212"},
                    {"label":"Yemen(+967)","value":"+967"},
                    {"label":"Zambia(+260)","value":"+260"},
                    {"label":"Zimbabwe(+263)","value":"+263"}
                );
                self.countryCodes = new ArrayDataProvider(self.countryCodes, {
                    keyAttributes: 'value'
                });
                self.joining_date = ko.observable('');
                self.department = ko.observable();
                self.emergency_contact_person = ko.observable('');
                self.emergency_contact_relation = ko.observable('');
                self.relationList = ko.observableArray([]);
                self.relationList.push(
                    {"label":"Spouse","value":"Spouse"},
                    {"label":"Parent","value":"Parent"},
                    {"label":"Child","value":"Child"},
                    {"label":"Sibling","value":"Sibling"},
                    {"label":"Relative","value":"Relative"},
                    {"label":"Friend","value":"Friend"},
                    {"label":"Partner","value":"Partner"},
                    {"label":"Co-worker","value":"Co-worker"},
                    {"label":"Neighbor","value":"Neighbor"},
                    {"label":"Other","value":"Other"}
                );
                self.relationList = new ArrayDataProvider(self.relationList, {
                    keyAttributes: 'value'
                });  
                self.emergencyCountryCode = ko.observable('');
                self.emergencyPhone = ko.observable('');
                self.emergencyEmail = ko.observable('');
                self.emergencyCountryCode = ko.observable('');
                self.emergencyPhoneError = ko.observable('');
                self.emergencyEmailError = ko.observable('');
                self.tabData = [
                    { id: "basic", label: "Basic Information" },
                    { id: "password", label: "Update Password" },
                ];
                self.selectedTab = ko.observable("basic");  
                self.nationality = ko.observable();
                self.nationList = ko.observableArray([]);
                self.nationList.push(
                    {"label":"Afghanistan","value":"+93"},
                    {"label":"Albania","value":"+355"},
                    {"label":"Algeria","value":"+213"},
                    {"label":"American Samoa","value":"+1684"},
                    {"label":"Andorra","value":"+376"},
                    {"label":"Angola","value":"+244"},
                    {"label":"Anguilla","value":"+1264"},
                    {"label":"Antarctica","value":"+672"},
                    {"label":"Antigua and Barbuda","value":"+1268"},
                    {"label":"Argentina(+54)","value":"+54"},
                    {"label":"Armenia","value":"+374"},
                    {"label":"Aruba","value":"+297"},
                    {"label":"Australia","value":"+61"},
                    {"label":"Austria","value":"+43"},
                    {"label":"Azerbaijan","value":"+994"},
                    {"label":"Bahamas","value":"+1242"},
                    {"label":"Bahrain","value":"+973"},
                    {"label":"Bangladesh","value":"+880"},
                    {"label":"Barbados","value":"+1246"},
                    {"label":"Belarus","value":"+375"},
                    {"label":"Belgium","value":"+32"},
                    {"label":"Belize","value":"+501"},
                    {"label":"Benin","value":"+229"},
                    {"label":"Bermuda","value":"+1441"},
                    {"label":"Bhutan","value":"+975"},
                    {"label":"Bolivia","value":"+591"},
                    {"label":"Bosnia and Herzegovina","value":"+387"},
                    {"label":"Botswana","value":"+267"},
                    {"label":"Brazil","value":"+55"},
                    {"label":"British Indian Ocean Territory","value":"+246"},
                    {"label":"British Virgin Islands","value":"+1284"},
                    {"label":"Brunei","value":"+673"},
                    {"label":"Bulgaria","value":"+359"},
                    {"label":"Burkina Faso","value":"+226"},
                    {"label":"Burundi","value":"+257"},
                    {"label":"Cambodia","value":"+855"},
                    {"label":"Cameroon","value":"+237"},
                    {"label":"Canada","value":"+1"},
                    {"label":"Cape Verde","value":"+238"},
                    {"label":"Cayman Islands","value":"+1345"},
                    {"label":"Central African Republic","value":"+236"},
                    {"label":"Chad","value":"+235"},
                    {"label":"Chile","value":"+56"},
                    {"label":"China","value":"+86"},
                    {"label":"Christmas Island","value":"+61"},
                    {"label":"Cocos Islands","value":"+61"},
                    {"label":"Colombia","value":"+57"},
                    {"label":"Comoros","value":"+269"},
                    {"label":"Cook Islands","value":"+682"},
                    {"label":"Costa Rica","value":"+506"},
                    {"label":"Croatia","value":"+385"},
                    {"label":"Cuba","value":"+53"},
                    {"label":"Curacao","value":"+599"},
                    {"label":"Cyprus","value":"+357"},
                    {"label":"Czech Republic","value":"+420"},
                    {"label":"Democratic Republic of the Congo","value":"+243"},
                    {"label":"Denmark","value":"+45"},
                    {"label":"Djibouti","value":"+253"},
                    {"label":"Dominica","value":"+1767"},
                    {"label":"Dominican Republic","value":"+1809"},
                    {"label":"East Timor","value":"+670"},
                    {"label":"Ecuador","value":"+593"},
                    {"label":"Egypt","value":"+20"},
                    {"label":"El Salvador","value":"+503"},
                    {"label":"Equatorial Guinea","value":"+240"},
                    {"label":"Eritrea","value":"+291"},
                    {"label":"Estonia","value":"+372"},
                    {"label":"Ethiopia","value":"+251"},
                    {"label":"Falkland Islands","value":"+500"},
                    {"label":"Faroe Islands","value":"+298"},
                    {"label":"Fiji","value":"+679"},
                    {"label":"Finland","value":"+358"},
                    {"label":"France","value":"+33"},
                    {"label":"French Polynesia","value":"+689"},
                    {"label":"Gabon","value":"+241"},
                    {"label":"Gambia","value":"+220"},
                    {"label":"Georgia","value":"+995"},
                    {"label":"Germany","value":"+49"},
                    {"label":"Ghana","value":"+233"},
                    {"label":"Gibraltar","value":"+350"},
                    {"label":"Greece","value":"+30"},
                    {"label":"Greenland","value":"+299"},
                    {"label":"Grenada","value":"+1473"},
                    {"label":"Guam","value":"+1671"},
                    {"label":"Guatemala","value":"+502"},
                    {"label":"Guernsey","value":"+441481"},
                    {"label":"Guinea","value":"+224"},
                    {"label":"Guinea-Bissau","value":"+245"},
                    {"label":"Guyana","value":"+592"},
                    {"label":"Haiti","value":"+509"},
                    {"label":"Honduras","value":"+504"},
                    {"label":"Hong Kong","value":"+852"},
                    {"label":"Hungary","value":"+36"},
                    {"label":"Iceland","value":"+354"},
                    {"label":"India","value":"+91"},
                    {"label":"Indonesia","value":"+62"},
                    {"label":"Iran","value":"+98"},
                    {"label":"Iraq","value":"+964"},
                    {"label":"Ireland","value":"+353"},
                    {"label":"Isle of Man","value":"+441624"},
                    {"label":"Israel","value":"+972"},
                    {"label":"Italy","value":"+39"},
                    {"label":"Ivory Coast","value":"+225"},
                    {"label":"Jamaica","value":"+1876"},
                    {"label":"Japan","value":"+81"},
                    {"label":"Jersey","value":"+441534"},
                    {"label":"Jordan","value":"+962"},
                    {"label":"Kazakhstan","value":"+7"},
                    {"label":"Kenya","value":"+254"},
                    {"label":"Kiribati","value":"+686"},
                    {"label":"Kosovo","value":"+383"},
                    {"label":"Kuwait","value":"+965"},
                    {"label":"Kyrgyzstan","value":"+996"},
                    {"label":"Laos","value":"+856"},
                    {"label":"Latvia","value":"+371"},
                    {"label":"Lebanon","value":"+961"},
                    {"label":"Lesotho","value":"+266"},
                    {"label":"Liberia","value":"+231"},
                    {"label":"Libya","value":"+218"},
                    {"label":"Liechtenstein","value":"+423"},
                    {"label":"Lithuania","value":"+370"},
                    {"label":"Luxembourg","value":"+352"},
                    {"label":"Macao","value":"+853"},
                    {"label":"Macedonia","value":"+389"},
                    {"label":"Madagascar","value":"+261"},
                    {"label":"Malawi","value":"+265"},
                    {"label":"Malaysia","value":"+60"},
                    {"label":"Maldives","value":"+960"},
                    {"label":"Mali","value":"+223"},
                    {"label":"Malta","value":"+356"},
                    {"label":"Marshall Islands","value":"+692"},
                    {"label":"Mauritania","value":"+222"},
                    {"label":"Mauritius","value":"+230"},
                    {"label":"Mayotte","value":"+262"},
                    {"label":"Mexico","value":"+52"},
                    {"label":"Micronesia","value":"+691"},
                    {"label":"Moldova","value":"+373"},
                    {"label":"Monaco","value":"+377"},
                    {"label":"Mongolia","value":"+976"},
                    {"label":"Montenegro","value":"+382"},
                    {"label":"Montserrat","value":"+1664"},
                    {"label":"Morocco","value":"+212"},
                    {"label":"Mozambique","value":"+258"},
                    {"label":"Myanmar","value":"+95"},
                    {"label":"Namibia","value":"+264"},
                    {"label":"Nauru","value":"+674"},
                    {"label":"Nepal","value":"+977"},
                    {"label":"Netherlands","value":"+31"},
                    {"label":"Netherlands Antilles","value":"+599"},
                    {"label":"New Caledonia","value":"+687"},
                    {"label":"New Zealand","value":"+64"},
                    {"label":"Nicaragua","value":"+505"},
                    {"label":"Niger","value":"+227"},
                    {"label":"Nigeria","value":"+234"},
                    {"label":"Niue","value":"+683"},
                    {"label":"North Korea","value":"+850"},
                    {"label":"Northern Mariana Islands","value":"+1670"},
                    {"label":"Norway","value":"+47"},
                    {"label":"Oman","value":"+968"},
                    {"label":"Pakistan","value":"+92"},
                    {"label":"Palau","value":"+680"},
                    {"label":"Palestine","value":"+970"},
                    {"label":"Panama","value":"+507"},
                    {"label":"Papua New Guinea","value":"+675"},
                    {"label":"Paraguay","value":"+595"},
                    {"label":"Peru","value":"+51"},
                    {"label":"Philippines","value":"+63"},
                    {"label":"Pitcairn","value":"+64"},
                    {"label":"Poland","value":"+48"},
                    {"label":"Portugal","value":"+351"},
                    {"label":"Puerto Rico","value":"+1787"},
                    {"label":"Qatar","value":"+974"},
                    {"label":"Republic of the Congo","value":"+242"},
                    {"label":"Reunion","value":"+262"},
                    {"label":"Romania","value":"+40"},
                    {"label":"Russia","value":"+7"},
                    {"label":"Rwanda","value":"+250"},
                    {"label":"Saint Barthelemy","value":"+590"},
                    {"label":"Saint Helena","value":"+290"},
                    {"label":"Saint Kitts and Nevis","value":"+1869"},
                    {"label":"Saint Lucia","value":"+1758"},
                    {"label":"Saint Martin","value":"+590"},
                    {"label":"Saint Pierre and Miquelon","value":"+508"},
                    {"label":"Saint Vincent and the Grenadines","value":"+1784"},
                    {"label":"Samoa","value":"+685"},
                    {"label":"San Marino","value":"+378"},
                    {"label":"Sao Tome and Principe","value":"+239"},
                    {"label":"Saudi Arabia","value":"+966"},
                    {"label":"Senegal","value":"+221"},
                    {"label":"Serbia","value":"+381"},
                    {"label":"Seychelles","value":"+248"},
                    {"label":"Sierra Leone","value":"+232"},
                    {"label":"Singapore","value":"+65"},
                    {"label":"Sint Maarten","value":"+1721"},
                    {"label":"Slovakia","value":"+421"},
                    {"label":"Slovenia","value":"+386"},
                    {"label":"Solomon Islands","value":"+677"},
                    {"label":"Somalia","value":"+252"},
                    {"label":"South Africa","value":"+27"},
                    {"label":"South Korea","value":"+82"},
                    {"label":"South Sudan","value":"+211"},
                    {"label":"Spain","value":"+34"},
                    {"label":"Sri Lanka","value":"+94"},
                    {"label":"Sudan","value":"+249"},
                    {"label":"Suriname","value":"+597"},
                    {"label":"Svalbard and Jan Mayen","value":"+47"},
                    {"label":"Swaziland","value":"+268"},
                    {"label":"Sweden","value":"+46"},
                    {"label":"Switzerland","value":"+41"},
                    {"label":"Syria","value":"+963"},
                    {"label":"Taiwan","value":"+886"},
                    {"label":"Tajikistan","value":"+992"},
                    {"label":"Tanzania","value":"+255"},
                    {"label":"Thailand","value":"+66"},
                    {"label":"Togo","value":"+228"},
                    {"label":"Tokelau","value":"+690"},
                    {"label":"Tonga","value":"+676"},
                    {"label":"Trinidad and Tobago","value":"+1868"},
                    {"label":"Tunisia","value":"+216"},
                    {"label":"Turkey","value":"+90"},
                    {"label":"Turkmenistan","value":"+993"},
                    {"label":"Turks and Caicos Islands","value":"+1649"},
                    {"label":"Tuvalu","value":"+688"},
                    {"label":"U.S. Virgin Islands","value":"+1340"},
                    {"label":"Uganda","value":"+256"},
                    {"label":"Ukraine","value":"+380"},
                    {"label":"United Arab Emirates","value":"+971"},
                    {"label":"United Kingdom","value":"+44"},
                    {"label":"United States","value":"+1"},
                    {"label":"Uruguay","value":"+598"},
                    {"label":"Uzbekistan","value":"+998"},
                    {"label":"Vanuatu","value":"+678"},
                    {"label":"Vatican","value":"+379"},
                    {"label":"Venezuela","value":"+58"},
                    {"label":"Vietnam","value":"+84"},
                    {"label":"Wallis and Futuna","value":"+681"},
                    {"label":"Western Sahara","value":"+212"},
                    {"label":"Yemen","value":"+967"},
                    {"label":"Zambia","value":"+260"},
                    {"label":"Zimbabwe","value":"+263"}
                );
                self.nationList = new ArrayDataProvider(self.nationList, {
                    keyAttributes: 'value'
                });
              

                self.StaffDet = ko.observableArray([]);
                self.DepartmentDet = ko.observableArray([]);
                self.DesignationDet = ko.observableArray([]);
                self.getStaff = ()=>{
                    document.getElementById('loaderView').style.display='block';
                    $.ajax({
                        url: BaseURL+"/HRModuleGetStaff",
                        type: 'POST',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        data: JSON.stringify({
                            staffId : sessionStorage.getItem("staffId")
                        }),
                        error: function (xhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        },
                        success: function (data) {
                            document.getElementById('loaderView').style.display='none';
                            document.getElementById('contentView').style.display='block';
                            var result = JSON.parse(data[0]);
                            console.log(result)
                            self.firstName(result[0][1])
                            self.lastName(result[0][2])
                            self.countryCode(result[0][3])
                            self.phone(result[0][4])
                            self.email(result[0][5])
                            self.qualification(result[0][6])
                            self.designation(result[0][7])
                            self.address(result[0][8])
                            self.secondaryText(result[0][9])
                            self.profilePhoto(result[0][9])
                            self.joining_date(result[0][11])
                            self.department(result[0][12])
                            self.emergency_contact_person(result[0][13])
                            self.emergency_contact_relation(result[0][14])
                            self.emergencyCountryCode(result[0][15])
                            self.emergencyPhone(result[0][16])
                            self.emergencyEmail(result[0][17])
                            self.nationality(result[0][18])
                            if(data[2] != ''){
                                self.profilePhotoShow('data:image/jpeg;base64,'+data[2]);
                                self.fileContent(self.profilePhotoShow())
                            } 
                            // if(data[1].length !=0){ 
                            //     for (var i = 0; i < data[1].length; i++) {
                            //         self.DesignationDet.push({'value': data[1][i][0],'label': data[1][i][1]  });
                            //     }
                            // }
                            self.username(data[3])
                            self.password(data[4])
                            console.log(data[5])
                            if(data[5].length !=0){ 
                                for (var i = 0; i < data[5].length; i++) {
                                    self.DepartmentDet.push({'value': data[5][i][0],'label': data[5][i][1]  });
                                }
                            }
                        }
                    })
                }
                self.staffList = new ArrayDataProvider(this.StaffDet, { keyAttributes: "id"});
                //self.designationList = new ArrayDataProvider(self.DesignationDet, { keyAttributes: "value"});
                self.departmentList = new ArrayDataProvider(self.DepartmentDet, { keyAttributes: "value"});

                self.phoneValidator = (event)=>{
                    var phone = event.detail.value
                    if (phone > 31 && (phone < 48 || phone > 57) && phone.length==10){
                        self.phoneError('')
                    }else{
                        self.phoneError("Invalid phone number.");
                    }
                }

                self.emailPatternValidator = (event)=>{
                    var email = event.detail.value
                    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if(email.match(mailformat))
                    {
                        self.emailError('')
                    }
                    else
                    {
                        self.emailError("Invalid email address.");
                    }   
                }

                self.emergencyPhoneValidator = (event)=>{
                    var phone = event.detail.value
                    if(phone != null){
                    if (phone > 31 && (phone < 48 || phone > 57) && phone.length==10){
                        self.emergencyPhoneError('')
                    }else{
                        self.emergencyPhoneError("Invalid phone number.");
                    }
                }
                }

                self.emergencyEmailPatternValidator = (event)=>{
                    var email = event.detail.value
                    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if(email != null){
                    if(email.match(mailformat))
                    {
                        self.emergencyEmailError('')
                    }
                    else
                    {
                        self.emergencyEmailError("Invalid email address.");
                    }   
                }
                }
                
                self.formSubmit = ()=>{
                    const formValid = self._checkValidationGroup("formValidation"); 
                    if (formValid) {
                        if(self.emailError()=='' && self.phoneError()=='' && self.typeError()==''){
                            let popup = document.getElementById("popup1");
                            popup.open();
                            const reader = new FileReader();
                            if(self.file() !=''){
                            reader.readAsDataURL(self.file());
                            reader.onload = ()=>{
                            const fileContent = reader.result;
                            $.ajax({
                                url: BaseURL+"/HRModuleUpdateStaff",
                                type: 'POST',
                                data: JSON.stringify({
                                    staffId : sessionStorage.getItem("staffId"),
                                    firstName : self.firstName(),
                                    lastName : self.lastName(),
                                    countryCode : self.countryCode(),
                                    phone : self.phone(),
                                    email : self.email(),
                                    qualification : self.qualification(),
                                    designation : self.designation(),
                                    address : self.address(),
                                    profile_photo : self.profilePhoto(),
                                    file : fileContent,
                                    joining_date : self.joining_date(),
                                    department : self.department(),
                                    emergency_contact_person : self.emergency_contact_person(),
                                    emergency_contact_relation : self.emergency_contact_relation(),
                                    emergency_country_code : self.emergencyCountryCode(),
                                    emergency_phone : self.emergencyPhone(),
                                    emergency_email : self.emergencyEmail(),
                                    nationality : self.nationality()
                                }),
                                dataType: 'json',
                                timeout: sessionStorage.getItem("timeInetrval"),
                                context: self,
                                error: function (xhr, textStatus, errorThrown) {
                                    console.log(textStatus);
                                },
                                success: function (data) {
                                    let popup = document.getElementById("popup1");
                                    popup.close();
                                    let popup1 = document.getElementById("popup2");
                                    popup1.open();
                                }
                            })
                        }
                        }else{
                            $.ajax({
                                url: BaseURL+"/HRModuleUpdateStaff",
                                type: 'POST',
                                data: JSON.stringify({
                                    staffId : sessionStorage.getItem("staffId"),
                                    firstName : self.firstName(),
                                    lastName : self.lastName(),
                                    countryCode : self.countryCode(),
                                    phone : self.phone(),
                                    email : self.email(),
                                    qualification : self.qualification(),
                                    designation : self.designation(),
                                    address : self.address(),
                                    profile_photo : self.profilePhoto(),
                                    file : self.fileContent(),
                                    joining_date : self.joining_date(),
                                    department : self.department(),
                                    emergency_contact_person : self.emergency_contact_person(),
                                    emergency_contact_relation : self.emergency_contact_relation(),
                                    emergency_country_code : self.emergencyCountryCode(),
                                    emergency_phone : self.emergencyPhone(),
                                    emergency_email : self.emergencyEmail(),
                                    nationality : self.nationality()
                                }),
                                dataType: 'json',
                                timeout: sessionStorage.getItem("timeInetrval"),
                                context: self,
                                error: function (xhr, textStatus, errorThrown) {
                                    console.log(textStatus);
                                },
                                success: function (data) {
                                    let popup = document.getElementById("popup1");
                                    popup.close();
                                    let popup1 = document.getElementById("popup2");
                                    popup1.open();
                                }
                            })
                        }
                    }
                    }
                }

                self.messageClose = ()=>{
                    location.reload();
                }

                self.openSuccess = ()=>{
                    let popup1 = document.getElementById("popup2");
                    popup1.open();
                }
              
                self._checkValidationGroup = (value) => {
                    const tracker = document.getElementById(value);
                    if (tracker.valid === "valid") {
                        return true;
                    }
                    else {
                        tracker.showMessages();
                        tracker.focusOn("@firstInvalidShown");
                        return false;
                    }
                };
                
                self.connected = function () {
                    if (sessionStorage.getItem("userName") == null) {
                        self.router.go({path : 'signin'});
                    }
                    else {
                        app.onAppSuccess();
                        self.getStaff();
                    }
                }

                self.uploadProfilePhoto = function (event) {
                    var file = event.detail.files[0];
                    const result = event.detail.files;
                    const files = result[0];
                    var fileName= files.name;
                    self.profilePhoto(fileName)
                    //console.log(files)
                    self.file(files)
                    self.secondaryText(fileName)
                    var fileFormat =files.name.split(".");
                    var checkFormat =fileFormat[1];
                    if(checkFormat == 'png' || checkFormat =="jpeg" || checkFormat =="jpg"){
                    self.typeError('')
                }
                else{
                    self.typeError('The image must be a file of type: jpeg, png, jpg')
                }
              }

              self.sendCredentials = ()=>{
                const formValid = self._checkValidationGroup("formValidation"); 
                if (formValid) {
                        let popup = document.getElementById("popup1");
                        popup.open();
                        
                        $.ajax({
                            url: BaseURL+"/HRModuleStaffCredentialSend",
                            type: 'POST',
                            data: JSON.stringify({
                                staffId : sessionStorage.getItem("staffId"),
                                username : self.username(),
                                password : self.password(),
                            }),
                            dataType: 'json',
                            timeout: sessionStorage.getItem("timeInetrval"),
                            context: self,
                            error: function (xhr, textStatus, errorThrown) {
                                console.log(textStatus);
                            },
                            success: function (data) {
                                let popup = document.getElementById("popup1");
                                popup.close();
                                let popup1 = document.getElementById("popupMail");
                                popup1.open();
                            }
                        })
                    }
                }

                self.selectedTabAction = ko.computed(() => { 
                    if(self.selectedTab() == 'basic'){
                        $("#basic-info").show();
                        $("#update-password").hide();
                    }else if(self.selectedTab() == 'password'){
                        $("#basic-info").hide();
                        $("#update-password").show();
                    }
                });

                self.getDesignationList = ()=>{
                    self.DesignationDet([]);
                    if(self.department() !=undefined){
                    $.ajax({
                        url: BaseURL+"/HRModuleGetDesignationList",
                        type: 'POST',
                        data: JSON.stringify({
                            departmentId : self.department(),
                        }),
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        error: function (xhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        },
                        success: function (data) {
                            console.log(data)
                            if(data[0].length !=0){ 
                                for (var i = 0; i < data[0].length; i++) {
                                    self.DesignationDet.push({'value': data[0][i][0],'label': data[0][i][1]  });
                                }
                            }else{
                                self.designation('')
                            }
                        }
                    })
                }
                }
                self.designationList = new ArrayDataProvider(this.DesignationDet, { keyAttributes: "value"});

            }
        }
        return  editStaff;
    }
);