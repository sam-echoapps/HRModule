define([ 'ojs/ojoffcanvas' , 'knockout', 'ojs/ojmodule-element-utils', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 
         'ojs/ojcorerouter', 'ojs/ojmodulerouter-adapter', 'ojs/ojknockoutrouteradapter', 'ojs/ojurlparamadapter', 
         'ojs/ojarraydataprovider', 'ojs/ojarraytreedataprovider','ojs/ojknockouttemplateutils', 'ojs/ojmodule-element','ojs/ojmodule-element-utils','ojs/ojknockout' ,'ojs/ojbutton',
         'ojs/ojdialog','ojs/ojselectsingle'],
  function( OffcanvasUtils , ko , moduleUtils, ResponsiveUtils, ResponsiveKnockoutUtils, CoreRouter, ModuleRouterAdapter,
    KnockoutRouterAdapter, UrlParamAdapter, ArrayDataProvider, ArrayTreeDataProvider,KnockoutTemplateUtils  ) {
     function ControllerViewModel() {
        var self = this;

      self.KnockoutTemplateUtils = KnockoutTemplateUtils;
      self.CancelBehaviorOpt = ko.observable('icon');
      self.footerLinks = ko.observableArray([]);
      self.onepDepType = ko.observable();
        
        self.drawer = {
          displayMode: 'push',
          selector: '#drawer',
          content: '#main'
        };
  

        self.toggleDrawer = function () {
          return OffcanvasUtils.toggle(self.drawer);
        };
      
        self.username = ko.observable();
        self.userrole = ko.observable();

        self.manner = ko.observable('polite');
        self.message = ko.observable();
        document.getElementById('globalBody').addEventListener('announce', announcementHandler, false);

        function announcementHandler(event) {
          setTimeout(function() {
            self.message(event.detail.message);
            self.manner(event.detail.manner);
          }, 200);
        };

      // Media queries for repsonsive layouts
      var smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      self.count = ko.observable(3);
      this.selectedItem = ko.observable('dashboardAdmin');

      if(sessionStorage.getItem('userRole')=='staff'){
        var navData = [
          { path:"" ,redirect : 'signin'},
          { path: 'signin', detail : {label: 'SignIn',iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'} },
          { path: 'dashboardStaff', detail : {label: 'Dashboard',iconClass: 'oj-navigationlist-item-icon fa fa-home'} },
/*        { path: 'staffProfile', detail : {label: 'My Profile',iconClass: 'oj-navigationlist-item-icon fa fa-home'} },
 */       { path: 'myProfile', detail : {label: 'My Profile',iconClass: 'oj-navigationlist-item-icon fa fa-home'} },
          { path: 'companyHoliday', detail : {label: 'Company Holiday',iconClass: 'oj-navigationlist-item-icon fa fa-home'} },
          { path: 'myGoals', detail : {label: 'My Goals',iconClass: 'oj-navigationlist-item-icon fa fa-home'} },
          { path: 'myLeave', detail : {label :'My Leave',iconClass: 'oj-navigationlist-item-icon fa fa-id-card'} },
       ];  
      }
      else{
        var navData = [
          { path: 'dashboardStaff', detail : {label: 'Dashboard',iconClass: 'oj-navigationlist-item-icon fa fa-home'} },
          { path:"" ,redirect : 'signin'},
          { path: 'signin', detail : {label: 'SignIn',iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'} },
          { path: 'dashboardAdmin', detail : {label: 'Dashboard',iconClass: 'oj-navigationlist-item-icon fa fa-home'} },
          { path: 'addStaff', detail : {label: 'Add Staff',iconClass: 'oj-navigationlist-item-icon fa fa-id-card'} },
          { path: 'Staff', detail : {label: 'Add Staff',iconClass: 'oj-navigationlist-item-icon fa fa-id-card'} },
          { path: 'addDepartment', detail : {label: 'Add Department',iconClass: 'oj-navigationlist-item-icon fa fa-id-card'} },
          { path: 'addDesignation', detail : {label: 'Add Designation',iconClass: 'oj-navigationlist-item-icon fa fa-id-card'} },
          { path: 'staffList', detail : {label: 'View Staff',iconClass: 'oj-navigationlist-item-icon fa fa-id-card'} },
          { path: 'editStaff', detail : {label: 'Edit Staff',iconClass: 'oj-navigationlist-item-icon fa fa-id-card'} },
          { path: 'myProfile', detail : {label :'My Profile',iconClass: 'oj-navigationlist-item-icon fa fa-id-card'} },
          { path: 'addCompany', detail : {label :'Add Company',iconClass: 'oj-navigationlist-item-icon fa fa-id-card'} },
          { path: 'addHoliday', detail : {label :'Add Holiday',iconClass: 'oj-navigationlist-item-icon fa fa-id-card'} },
          { path: 'myLeaveAdmin', detail : {label :'My Leave',iconClass: 'oj-navigationlist-item-icon fa fa-id-card'} },
          { path: 'leaveSettings', detail : {label :'Leave Settings',iconClass: 'oj-navigationlist-item-icon fa fa-id-card'} },
          { path: 'myProfileAdmin', detail : {label :'My Profile',iconClass: 'oj-navigationlist-item-icon fa fa-id-card'} },
          { path: 'myGoalsAdmin', detail : {label: 'My Goals',iconClass: 'oj-navigationlist-item-icon fa fa-list-check'} },
          { path: 'employeeGoalsList', detail : {label: 'Employee Goals',iconClass: 'oj-navigationlist-item-icon fa fa-list-check'} },
          { path: 'employeeGoals', detail : {label: 'Employee Goals',iconClass: 'oj-navigationlist-item-icon fa fa-list-check'} },
          { path: 'employeeLeaveList', detail : {label: 'Employee Leave',iconClass: 'oj-navigationlist-item-icon fa fa-list-check'} },
          { path: 'employeeLeaves', detail : {label: 'Employee Leave',iconClass: 'oj-navigationlist-item-icon fa fa-list-check'} },
          { path: 'employeeLeaveCalendar', detail : {label: 'Employee Leave Calendar',iconClass: 'oj-navigationlist-item-icon fa fa-list-check'} },
        ];
      }

      if (sessionStorage.getItem("userRole") == "staff") {
        self.navMenu = [
          {"name": "Dashboard","id": "dashboardStaff","icons": "fa-solid fa fa-home", "path":"dashboardStaff"},
/*           {"name": "Staff Profile","id": "staffProfile","icons": "fa-solid fa fa-home", "path":"staffProfile"},
 */          {"name": "My Profile","id": "myProfile","icons": "fa-solid fa fa-home", "path":"myProfile"},
             {"name": "Company Holiday","id": "companyHoliday","icons": "fa-solid fa fa-calendar-alt", "path":"companyHoliday"},
             {"name": "My Goals","id": "myGoals","icons": "fa-solid fa fa-list-check", "path":"myGoals"},
             {"name": "My Leaves","id": "myLeave","icons": "fa-solid fa fa-person-walking-arrow-right", "path":"myLeave"},
        ]       
      }else {
        self.navMenu = [
          {"name": "Dashboard","id": "dashboardAdmin","icons": "fa-solid fa fa-home", "path":"dashboardAdmin"},
          {"name": "Employees", "id": "staff", "icons": "fa-solid fa fa-id-card", 
            "children": [
              {"name": "View Employees","id": "staffList","icons": "fa-solid fa fa-users", "path":"staffList"},
              {"name": "Add Employee","id": "addStaff","icons": "fa-solid fa fa-user", "path":"addStaff"},
/*               {"name": "Add Staff","id": "addStaff","icons": "fa-solid fa fa-id-card", "path":"Staff"},
 */            ]
          },
          {"name": "Goals", "id": "goals", "icons": "fa-solid fa fa-list-check", 
            "children": [
              {"name": "My Goals","id": "myGoalsAdmin","icons": "fa-solid fa fa-list-check", "path":"myGoalsAdmin"},
              {"name": "Employee Goals","id": "employeeGoalsList","icons": "fa-solid fa fa-list-check", "path":"employeeGoalsList"},
           ]
          },
          {"name": "Leaves", "id": "leaves", "icons": "fa-solid fa fa-person-walking-arrow-right", 
            "children": [
              {"name": "My Leave","id": "myLeaveAdmin","icons": "fa-solid fa fa-person-walking-arrow-right", "path":"myLeaveAdmin"},
              {"name": "Employee Leaves","id": "employeeLeaveList","icons": "fa-solid fa fa-person-walking-arrow-right", "path":"employeeLeaveList"},
           ]
          },
          {"name": "Company Holiday","id": "addHoliday","icons": "fa-solid fa fa-calendar-alt", "path":"addHoliday"},
          {"name": "Settings", "id": "settings", "icons": "fa-solid fa fa-cogs", 
            "children": [
              {"name": "Company Settings","id": "addCompany","icons": "fa-solid fa fa-building", "path":"addCompany"},
              {"name": "Leave Settings","id": "leaveSettings","icons": "fa-solid fa fa-person-walking-arrow-right", "path":"leaveSettings"},
             /*  {"name": "Add Department","id": "addDepartment","icons": "fa-solid fa fa-user-tie", "path":"addDepartment"},
              {"name": "Add Designation","id": "addDesignation","icons": "fa-solid fa fa-user-graduate", "path":"addDesignation"},
              {"name": "Add Holiday","id": "addHoliday","icons": "fa-solid fa fa-calendar-alt", "path":"addHoliday"},  */
            ]
          },
        ]
      }
      self.dataProvider = new ArrayTreeDataProvider(self.navMenu, {
        keyAttributes: 'id'
      });
      self.goToPage = (e)=>{
        if(e.currentTarget.id!=""){
          router.go({path : e.currentTarget.id});
        }
      }
      // Router setup

      let router = new CoreRouter(navData, {
        urlAdapter: new UrlParamAdapter()
      });
      router.sync();

      self.moduleAdapter = new ModuleRouterAdapter(router);

      self.selection = new KnockoutRouterAdapter(router);

     /*  if(sessionStorage.getItem('userRole')=='staff'){
        self.navDataProvider = new ArrayDataProvider(navData.slice(4), {keyAttributes: "path"});  
      }
      else if(sessionStorage.getItem('userRole')=='Accounts'){
        self.navDataProvider = new ArrayDataProvider(navData.slice(3), {keyAttributes: "path"});  
      }else if(sessionStorage.getItem('userRole')=='Manager'){
        self.navDataProvider = new ArrayDataProvider(navData.slice(4), {keyAttributes: "path"});  
      }
      else{
        self.navDataProvider = new ArrayDataProvider(navData.slice(17), {keyAttributes: "path"});
      } */
      
      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable();


// User Info used in Global Navigation area


      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }


     
       self.footerLinksDP = new ArrayDataProvider(self.footerLinks,{keyAttributes: 'name'});

     self.SignIn = ko.observable('N');

     self.goToSignIn = function() {
      router.go({path : 'signin'});
      self.SignIn('N');
      location.reload()
    };
  
    ControllerViewModel.prototype.signIn = function() {
      if (!self.localFlow) {
        self.goToSignIn();
        return;
      }
    }

    

    ControllerViewModel.prototype.onAppSuccess = function() {
      self.username(sessionStorage.getItem("userName"));
      self.userrole(sessionStorage.getItem("userRole"));
      self.SignIn('Y');
    };

    ControllerViewModel.prototype.onLoginSuccess = function() {
      if(sessionStorage.getItem("userRole")=="staff"){
        
        router.go({path : 'dashboardStaff'});

      }
      else{
        router.go({path : 'dashboardAdmin'});
      }
      // self.SignIn('Y');
    };

    self.selectedMenuItem = ko.observable('');
  
    self.menuItemAction = function (event,vm) {
      self.selectedMenuItem(event.target.value);
        //User menu Options
      if (self.selectedMenuItem() == 'out')
      {
        console.log(self.selectedMenuItem())
        self.username('');

        sessionStorage.clear();
      event.preventDefault();
      self.goToSignIn();
      }else if (self.selectedMenuItem() == 'myProfile'){
        router.go({path : 'myProfile'});
      }else if (self.selectedMenuItem() == 'myProfileAdmin'){
        router.go({path : 'myProfileAdmin'});
      }
      else if (self.selectedMenuItem() == 'help'){
        document.querySelector('#helpDialog').open();
      }
    }


  }

     return new ControllerViewModel();
  }
);
