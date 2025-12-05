// Copyright (c) 2025, Juel Batteries PTY(LTD) and contributors
// For license information, please see license.txt

// Client script settings : -
// Doctype = Payment Entry
// Apply to = Form
// Status = Enabled
//
// 1. Bypasses the standard user prompt when fetching outstanding Invoices / orders
// 2. Still calls exsiting functions in backend-code of server
//
frappe.ui.form.on("Payment Entry", {
    refresh: function(frm) {

        frm.add_custom_button(__('Fetch Outstanding Invoices'), function() {
            frappe.flags.allocate_payment_amount = true; 
            let filters = {                                                             // set filters with criteria requried by backend-functions
                party_type: frm.doc.party_type,
                party: frm.doc.party,  
                company: frm.doc.company,
                from_date: "",  
                to_date: ""
            };
            
            frm.events.validate_filters_data(frm, filters);                             // Call the existing functions
            frm.events.get_outstanding_documents(frm, filters, true, false);
        }, __("Actions")); 
        frm.add_custom_button(__('Fetch Outstanding Orders'), function() {
            frappe.flags.allocate_payment_amount = true;  
            let filters = {                                                             // set filters with criteria requried by backend-functions
                party_type: frm.doc.party_type,
                party: frm.doc.party,  
                company: frm.doc.company,
                from_date: "",  
                to_date: ""
            };
            
            frm.events.validate_filters_data(frm, filters);                             // Call the existing functions
            frm.events.get_outstanding_documents(frm, filters, false, true);
       }, __("Actions"));  // Groups the button under "Actions"            
    }
});