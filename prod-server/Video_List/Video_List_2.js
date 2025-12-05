// Copyright (c) 2025, Juel Batteries PTY(LTD) and contributors
// For license information, please see license.txt

// Client script settings : -
// Doctype = Video List
// Apply to = List
// Status = Enabled
//
// 1. Adds category clasification to doctype
//
frappe.listview_settings['Video'] = {
    add_fields: ['name'],
    
    formatters: {                                           // format indicator for each doc - rounded borders
        custom_video_category(val) {
            let color = "";
            
            if (val === "Doc-type") {                       // color differentiation based on video clasificaation
                color = "orange";
            } else if (val === "Module") {
                color = "green";
            } else if (val === "Process") {
                color = "blue";
            } else if (val === "General"){
                color = "grey";
            }
            
            return `<span style="font-weight: bold; color: black; background-color: ${color}; border-radius: 15px; padding: 5px 10px; display: inline-block;">${val}</span>`;
        }
    }
};