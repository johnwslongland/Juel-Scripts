// Copyright (c) 2025, Juel Batteries PTY(LTD) and contributors
// For license information, please see license.txt

// Client script settings : -
// Doctype = Project
// Apply to = List
// Status = Enabled
//
// 1. View POs related to Project
// 2. View Tasks related to Project
// 3. View Tasks Gant chart
//
frappe.listview_settings['Project'] = {
    add_fields: ["status", "priority", "is_active", "percent_complete", "expected_end_date", "project_name"],

    onload: function (listview,doc) {                                               // onload trigger
        listview.page.add_inner_button(__('View POs'), function () {                // Add button
            let selected_item = listview.get_checked_items();                       // get user selection
            if (selected_item.length == 1) {
                frappe.set_route('List', 'Purchase Order', 'Kanban', 'Pur Ord 1', { // set route to view POs
                    'project': selected_item[0].name                                // criteria for Kanban
                });                
            } else {
                frappe.show_alert({
                    message: "Please select only one Project.",
                    indicator: "orange"
                });
            }            
            
        }, 'View Actions');                                                         // Combined dropdown label for all buttons
        $('button:contains("View Actions")').removeClass('btn-default').addClass('btn-info');
        listview.page.add_inner_button(__('View Tsks'), function () {
            let selected_item = listview.get_checked_items();
            if (selected_item.length >= 1) {
                frappe.set_route('List', 'Task', 'Kanban', 'Task 1', {              // Set route to view Tasks Kanban
                    'project': selected_item[0].name
                });                
            } else {
                frappe.show_alert({
                    message: "Please select only one Project.",
                    indicator: "orange"
                });
            }  
        }, 'View Actions');
        $('button:contains("View Actions")').removeClass('btn-default').addClass('btn-info');
        listview.page.add_inner_button(__('Tsks Gant'), function () {
            let selected_item = listview.get_checked_items();
            if (selected_item.length == 1) {
                frappe.set_route('List', 'Task', 'Gantt',  {                        // Set route to view tasks Gant
                    'project': selected_item[0].name,
                    'order_by': 'subject'
                });                
            } else {
                frappe.show_alert({
                    message: "Please select only one Project.",
                    indicator: "orange"
                });
            }  
        }, 'View Actions');
        $('button:contains("View Actions")').removeClass('btn-default').addClass('btn-info');        
    },

    get_indicator: function (doc) {                                                 // Maintain default indicator settings
        if (doc.status == "Open" && doc.percent_complete) {
            return [__("{0}%", [cint(doc.percent_complete)]), "orange", "pecent_complete,>,0|status,=,Open"];
        } else {
            return [__(doc.status), frappe.utils.guess_colour(doc.status), "status,=," + doc.status];
        }
    }

};