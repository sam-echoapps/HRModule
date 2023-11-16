define(['ojs/ojcore',"knockout","jquery","appController", "ojs/ojarraydataprovider", "ojs/ojfilepickerutils",
    "ojs/ojinputtext", "ojs/ojformlayout", "ojs/ojvalidationgroup", "ojs/ojselectsingle","ojs/ojdatetimepicker",
     "ojs/ojfilepicker", "ojs/ojpopup", "ojs/ojprogress-circle", "ojs/ojdialog","ojs/ojtable","ojs/ojavatar"], 
    function (oj,ko,$, app, ArrayDataProvider, FilePickerUtils) {

        class staffList {
            constructor(args) {
                var self = this;

                self.router = args.parentRouter;
                let BaseURL = sessionStorage.getItem("BaseURL")

                self.tabData = [
                    { id: "active", label: "Active Staff" },
                    { id: "inactive", label: "Inactive Staff" },
                ];
                self.selectedTab = ko.observable("active");  
                self.status = ko.observable('');
                self.designationFilter = ko.observable('');
                self.search = ko.observable('');

                self.connected = function () {
                    if (sessionStorage.getItem("userName") == null) {
                        self.router.go({path : 'signin'});
                    }
                    else {
                        app.onAppSuccess();
                        //self.getStaff('Active');
                        self.getDesignation();
                    }
                }

                self.DesignationDet = ko.observableArray([]);
                self.getDesignation = ()=>{
                    document.getElementById('loaderView').style.display='block';
                    self.StaffDet([]);
                    $.ajax({
                        url: BaseURL+"/HRModuleGetDesignation",
                        type: 'GET',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        error: function (xhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        },
                        success: function (data) {
                            if(data[0].length !=0){ 
                                for (var i = 0; i < data[0].length; i++) {
                                    self.DesignationDet.push({'value': data[0][i][0],'label': data[0][i][1]  });
                                }
                                self.DesignationDet.unshift({ value: '0', label: 'All' });
                            }
                        }
                    })
                }
                self.designationList = new ArrayDataProvider(this.DesignationDet, { keyAttributes: "value"});

                
                self.StaffDet = ko.observableArray([]);
                self.getStaff = (status)=>{
                    $('#loaderView').css('display', 'block');
                    self.status(status)
                    self.StaffDet([]);
                    $.ajax({
                        url: BaseURL+"/HRModuleGetStaffList",
                        type: 'POST',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        data: JSON.stringify({
                            status : status
                        }),
                        error: function (xhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        },
                        success: function (data) {
                            document.getElementById('loaderView').style.display='none';
                            document.getElementById('contentView').style.display='block';
                            document.getElementById('actionView').style.display='block';
                            document.getElementById('tableView').style.display='block';
                            console.log(data)
                            if(data[0].length !=0){ 
                                for (var i = 0; i < data[0].length; i++) {
                                    self.StaffDet.push({'id': data[0][i][0],  'employee_id':  "EMP"+data[0][i][0] , 'name': data[0][i][1] + " " + data[0][i][2], 'phone': data[0][i][3] + " " + data[0][i][4], 'email': data[0][i][5], 'qualification': data[0][i][6], 'designation_id': data[0][i][7], 'address': data[0][i][8], 'profile_photo': data[0][i][9], 'designation': data[0][i][10], 'status': data[0][i][11], 'photo' : 'data:image/jpeg;base64,'+data[1][i] });
                                }
                            }
                        }
                    })
                }

                self.selectedTabAction = ko.computed(() => { 
                    self.designationFilter('') 
                    self.search('') 
                    self.getStaff(self.selectedTab())
                });

                self.goToAddStaff = ()=>{
                    self.router.go({path:'addStaff'})
                }
                self.goToEditStaff = (event,data)=>{
                    var clickedStaffId = data.item.data.id
                    sessionStorage.setItem("staffId", clickedStaffId);
                    self.router.go({path:'editStaff'})
                }

                self.inactiveStaff = (event,data)=>{
                    var clickedStaffId = data.item.data.id
                    sessionStorage.setItem("staffId", clickedStaffId);
                    let popup = document.getElementById("popup1");
                    popup.open();
                    
                    $.ajax({
                        url: BaseURL+"/HRModuleInactiveStaff",
                        type: 'POST',
                        data: JSON.stringify({
                            staffId : sessionStorage.getItem("staffId")
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

                self.messageClose = ()=>{
                    location.reload();
                }

                self.activateStaff = (event,data)=>{
                    var clickedStaffId = data.item.data.id
                    sessionStorage.setItem("staffId", clickedStaffId);
                    console.log(clickedStaffId)
                    let popup = document.getElementById("popup1");
                    popup.open();
                    
                    $.ajax({
                        url: BaseURL+"/HRModuleActiveStaff",
                        type: 'POST',
                        data: JSON.stringify({
                            staffId : sessionStorage.getItem("staffId")
                        }),
                        dataType: 'json',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        error: function (xhr, textStatus, errorThrown) {
                            console.log(textStatus);
                        },
                        success: function (data) {
                            console.log(data)
                            let popup = document.getElementById("popup1");
                            popup.close();
                            let popup1 = document.getElementById("popup3");
                            popup1.open();
                        }
                    })
                }

                self.filterDesignation = function (event,data) {
                    self.search('') 
                    // if(self.designationFilter() == ''){
                    //     self.designationFilter('0')
                    // }
                    if (self.designationFilter() != '' ) {
                        document.getElementById('loaderView').style.display='block';
                        document.getElementById('contentView').style.display='none';
                        document.getElementById('actionView').style.display='none';
                        document.getElementById('tableView').style.display='none';
                        self.StaffDet([]);
                        $.ajax({
                            url: BaseURL  + "/HRModuleGetDesignationFilterList",
                            type: 'POST',
                            data: JSON.stringify({
                                designationId : self.designationFilter(),
                                status : self.status()
                            }),
                            dataType: 'json',
                            timeout: sessionStorage.getItem("timeInetrval"),
                            context: self,
                            error: function (xhr, textStatus, errorThrown) {
                                if(textStatus == 'timeout' || textStatus == 'error'){
                                    document.querySelector('#TimeoutSup').open();
                                }
                            },
                            success: function (data) {
                                document.getElementById('loaderView').style.display='none';
                                document.getElementById('contentView').style.display='block';
                                document.getElementById('actionView').style.display='block';
                                document.getElementById('tableView').style.display='block';
                                console.log(data)
                                if(data[0].length !=0){ 
                                    for (var i = 0; i < data[0].length; i++) {
                                        self.StaffDet.push({'id': data[0][i][0],  'employee_id':  "EMP"+data[0][i][0] , 'name': data[0][i][1] + " " + data[0][i][2], 'phone': data[0][i][3] + " " + data[0][i][4], 'email': data[0][i][5], 'qualification': data[0][i][6], 'designation_id': data[0][i][7], 'address': data[0][i][8], 'profile_photo': data[0][i][9], 'designation': data[0][i][10], 'status': data[0][i][11], 'photo' : 'data:image/jpeg;base64,'+data[1][i] });
                                    }
                                }
                        }
                        })
                    }
                       
                    }

                    self.handleValueChanged = (event,data) => {
                        self.designationFilter('')
                       console.log(event.detail.value);
                       var value = event.detail.value;
                       document.getElementById('loaderView').style.display='block';
                       self.StaffDet([]);
                       $.ajax({
                        url: BaseURL  + "/HRModuleGetStaffSearchList",
                        type: 'POST',
                        data: JSON.stringify({
                            value : value,
                            status : self.status()
                        }),
                        dataType: 'json',
                        timeout: sessionStorage.getItem("timeInetrval"),
                        context: self,
                        error: function (xhr, textStatus, errorThrown) {
                            if(textStatus == 'timeout' || textStatus == 'error'){
                                document.querySelector('#TimeoutSup').open();
                            }
                        },
                        success: function (data) {
                            document.getElementById('loaderView').style.display='none';
                            document.getElementById('contentView').style.display='block';
                            document.getElementById('actionView').style.display='block';
                            document.getElementById('tableView').style.display='block';
                            console.log(data)
                            if(data[0].length !=0){ 
                                for (var i = 0; i < data[0].length; i++) {
                                    self.StaffDet.push({'id': data[0][i][0],  'employee_id':  "EMP"+data[0][i][0] , 'name': data[0][i][1] + " " + data[0][i][2], 'phone': data[0][i][3] + " " + data[0][i][4], 'email': data[0][i][5], 'qualification': data[0][i][6], 'designation_id': data[0][i][7], 'address': data[0][i][8], 'profile_photo': data[0][i][9], 'designation': data[0][i][10], 'status': data[0][i][11], 'photo' : 'data:image/jpeg;base64,'+data[1][i] });
                                }
                            }
                    }
                    })       
                    };
                self.staffList = new ArrayDataProvider(this.StaffDet, { keyAttributes: "id"});

                
            }
        }
        return  staffList;
    }
);