// Copyright (c) 2025, Juel Batteries PTY(LTD) and contributors
// For license information, please see license.txt

// Client script settings : -
// Doctype = Purchase Order
// Apply to = Form
// Status = Enabled
//
// 1. Add option for user to make use of barcode
// 2. Adds functionality to update REQUIRED BY field
//
frappe.ui.form.on('Purchase Order', {
	refresh(frm) {
        if (!frm.doc.__islocal && frm.doc.docstatus === 0) {        // if doc saved but not submitted
            
            frm.add_custom_button('Get Barcode', function() {       // add button
                frm.set_value('custom_po_barcode', frm.doc.name);   // set barcode field
                frm.refresh_field('custom_po_barcode');
            }).css("background-color", "#00bfff").css("color", "#ffffff");
        }
        if (frm.doc.docstatus == 0) {                               // if doc not submitted
        frm.add_custom_button('Update -Required-by-date-', () => {  // add button
            frappe.prompt([                                         // prompt user for info
                {
                    label: 'Desired Date',
                    fieldname: 'desired_date',
                    fieldtype: 'Date',
                    options: 'Item',
                    reqd: 1
                }
            ], function(values) {
                
                frm.set_value("schedule_date", values.desired_date);    // set schedule_date field
                debugger;
                frm.doc.items.forEach(row => {                          // set each row in table
                    debugger;

                    frappe.model.set_value(
                        row.doctype,
                        row.name,
                        "schedule_date",
                        values.desired_date
                    );
                });
                frm.refresh_field('items');

            });
        });
        
	}
	}
});