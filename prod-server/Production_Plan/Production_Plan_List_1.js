// Copyright (c) 2025, Juel Batteries PTY(LTD) and contributors
// For license information, please see license.txt

// Client script settings : -
// Doctype = Production Plan
// Apply to = List
// Status = Enabled
//
// 1. Creates a button on each row in listview - routes to WO Kanban view
//
frappe.listview_settings['Production Plan'] = {

    button: {                                                       // define button on each row
        show: function (doc) {
            return true;                                            // condition when to display button
        },
        get_label: function () {
            return 'View WOs';                                      // visible label of button
        },
        get_description: function (doc) {
            return __('View WOs for this PP');                      // mouse-over text
        },
        action: function (doc) {                                    // action when button is clicked
            frappe.set_route('List', 'Work Order', 'Kanban', 'Work Order 1', {
                'production_plan': doc.name                         // criteria for Kanban display
            });
        }
    },

};