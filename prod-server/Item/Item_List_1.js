// Copyright (c) 2025, Juel Batteries PTY(LTD) and contributors
// For license information, please see license.txt

// Client script settings : -
// Doctype = Item
// Apply to = List
// Status = Enabled
//
// 1. Show BOMs for selected Item
//
frappe.listview_settings['Item'] = {

    button: {                                           // add button on each row
        show: function (doc) {                          // When button is visible
            return true;
        },
        get_label: function () {                        // Label for button
            return 'BOMs';
        },
        get_description: function (doc) {               // mouse-over for button
            return __('Show BOMs for this item');
        },
        action: function (doc) {                        // action to execute when button is clicked
            frappe.set_route('List', 'BOM', 'List', {   // criteria for BOM list view
                'item_code': doc.name
            });
        }
    },

};