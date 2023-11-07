define(['ojs/ojcore',"knockout","jquery","appController", "ojs/ojarraydataprovider", "ojs/ojfilepickerutils",
    "ojs/ojinputtext", "ojs/ojformlayout", "ojs/ojvalidationgroup", "ojs/ojselectsingle","ojs/ojdatetimepicker",
     "ojs/ojfilepicker", "ojs/ojpopup", "ojs/ojprogress-circle", "ojs/ojdialog","ojs/ojtable"], 
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

                self.connected = function () {
                    if (sessionStorage.getItem("userName") == null) {
                        self.router.go({path : 'signin'});
                    }
                    else {
                        app.onAppSuccess();
                        //self.getStaff('Active');
                    }
                }

                
                self.StaffDet = ko.observableArray([]);
                self.getStaff = (status)=>{
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
                            console.log(data)
                            if(data[0].length !=0){ 
                                for (var i = 0; i < data[0].length; i++) {
                                    self.StaffDet.push({'id': data[0][i][0],  'employee_id':  "EMP"+data[0][i][0] , 'name': data[0][i][1] + " " + data[0][i][2], 'phone': data[0][i][3] + " " + data[0][i][4], 'email': data[0][i][5], 'qualification': data[0][i][6], 'designation_id': data[0][i][7], 'address': data[0][i][8], 'profile_photo': data[0][i][9], 'designation': data[0][i][10], 'status': data[0][i][11] });
                                }
                            }
                        }
                    })
                }
                self.staffList = new ArrayDataProvider(this.StaffDet, { keyAttributes: "id"});

                self.selectedTabAction = ko.computed(() => {   
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

                
            }
        }
        return  staffList;
    }
);