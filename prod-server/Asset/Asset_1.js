// Copyright (c) 2025, Juel Batteries PTY(LTD) and contributors
// For license information, please see license.txt

// Client script settings : -
// Doctype = Asset
// Apply to = Form
// Status = Enabled
//
// 1. Prompts user with reminder to select CALCULATE DEPRECIATION
// 
frappe.ui.form.on('Asset', {
	refresh(frm) {
		// your code here
	},
	before_save: function(frm) {                            // use before_save form-trigger
	    frappe.msgprint({                                   // reminder message
        title: __('Reminder'),
        indicator: 'green',
        message: __('Please remember to set the CALCULATE DEPRECIATION tickbox ( if required )')
        });
	}
});