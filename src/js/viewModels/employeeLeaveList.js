define(['ojs/ojcore',"knockout","jquery","appController", "ojs/ojarraydataprovider", "ojs/ojfilepickerutils",
    "ojs/ojinputtext", "ojs/ojformlayout", "ojs/ojvalidationgroup", "ojs/ojselectsingle","ojs/ojdatetimepicker",
     "ojs/ojfilepicker", "ojs/ojpopup", "ojs/ojprogress-circle", "ojs/ojdialog","ojs/ojtable"], 
    function (oj,ko,$, app, ArrayDataProvider, FilePickerUtils) {

        class EmployeeLeavesList {
            constructor(args) {
                var self = this;

                self.router = args.parentRouter;
                let BaseURL = sessionStorage.getItem("BaseURL")
                
                self.LeaveDet = ko.observableArray([]); 
                self.CancelBehaviorOpt = ko.observable('icon'); 
                self.yearFilter = ko.observable('');
                self.LeaveYearDet = ko.observableArray([]);
                self.connected = function () {
                    if (sessionStorage.getItem("userName") == null) {
                        self.router.go({path : 'signin'});
                    }
                    else {
                        app.onAppSuccess();
                        getLeaves();
                    }
                }

                function getLeaves(){
                    self.LeaveDet([]);
                    document.getElementById('loaderView').style.display='block';
                    $.ajax({
                        url: BaseURL+"/HRModuleGetEmployeeLeaveList",
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
                            console.log(data)
                            document.getElementById('loaderView').style.display='none';
                            document.getElementById('actionView').style.display='block';
                            if(data[0].length !=0){ 
                                for (var i = 0; i < data[0].length; i++) {
                                    self.LeaveDet.push({'no': i+1,'id': data[0][i][0],'emp_id': "EMP"+data[0][i][0],'name': data[0][i][1] +" "+ data[0][i][2],'leave_count': data[0][i][3]  });
                                }
                            }
                            if(data[1].length !=0){ 
                                for (var i = 0; i < data[1].length; i++) {
                                    self.LeaveYearDet.push({"label":data[1][i][0],"value":data[1][i][0]});
                                }
                                self.LeaveYearDet.unshift({ value: 'All', label: 'All' });
                            }
                        }
                    })
                }

                self.yearList = new ArrayDataProvider(this.LeaveYearDet, { keyAttributes: "value"});

               
                self.messageClose = ()=>{
                    location.reload();
                }
              
                

                self.viewGoal = (event,data)=>{
                    var clickedStaffId = data.item.data.id
                    console.log(clickedStaffId)
                    sessionStorage.setItem("staffId", clickedStaffId);
                    self.router.go({path:'employeeLeaves'})
                }

               
                self.filterYear = function (event,data) {
                    if(self.yearFilter() == ''){
                        const currentYear = new Date().getFullYear();
                        console.log(currentYear);
                        self.yearFilter(currentYear)
                    }
                    if (self.yearFilter() != '' ) {
                        document.getElementById('loaderView').style.display='block';
                        self.LeaveDet([]);
                        $.ajax({
                            url: BaseURL  + "/HRModuleGetEmployeeLeaveList",
                            type: 'POST',
                            data: JSON.stringify({
                                staffId : sessionStorage.getItem("staffId"),
                                year : self.yearFilter()
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
                                document.getElementById('actionView').style.display='block';
                                console.log(data)
                                if(data[0].length !=0){ 
                                    for (var i = 0; i < data[0].length; i++) {
                                        self.LeaveDet.push({'no': i+1,'id': data[0][i][0],'emp_id': "EMP"+data[0][i][0],'name': data[0][i][1] +" "+ data[0][i][2],'leave_count': data[0][i][3]  });
                                    }
                                }
                        }
                        })
                    }
                       
                    }
                    self.dataProvider = new ArrayDataProvider(this.LeaveDet, { keyAttributes: "id"});

                   

            }
        }
        return  EmployeeLeavesList;
    }
);