frappe.pages['common-dashboard'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Common Dashboard',
        single_column: true
    });
    
    if (!frappe.user_roles.includes('Common User') && frappe.session.user !== 'Administrator') {
        frappe.msgprint('Access Denied');
        frappe.set_route('');
        return;
    }
    
    page.main.html(`
        <div class="row">
            <div class="col-md-12">
                <div class="page-card" style="background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%); color: white;">
                    <div class="page-card-head">
                        <h3>👋 Hello ${frappe.session.user_fullname || frappe.session.user}</h3>
                        <p>User ID: ${frappe.session.user} | Role: Common User</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="page-card">
                    <div class="page-card-head"><h4>📋 My Tasks</h4></div>
                    <div class="page-card-body">
                        <button class="btn btn-primary btn-sm" onclick="frappe.new_doc('Work Update')">Add New Task</button>
                        <button class="btn btn-outline-primary btn-sm" onclick="frappe.set_route('List', 'Work Update')">View All Tasks</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="page-card">
                    <div class="page-card-head"><h4>📈 Progress</h4></div>
                    <div class="page-card-body" id="common-stats">Loading...</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="page-card">
                    <div class="page-card-head"><h4>📝 Recent Work Updates</h4></div>
                    <div class="page-card-body" id="recent-tasks">Loading...</div>
                </div>
            </div>
        </div>
    `);
    
    frappe.call({
        method: 'frappe.client.get_count',
        args: {doctype: 'Work Update', filters: {user: frappe.session.user}},
        callback: function(r) {
            $('#common-stats').html(`<h4 class="text-info">${r.message || 0}</h4><small>Total Tasks</small>`);
        }
    });
    
    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'Work Update',
            filters: {user: frappe.session.user},
            fields: ['name', 'title', 'status', 'creation'],
            limit: 5,
            order_by: 'creation desc'
        },
        callback: function(r) {
            if (r.message && r.message.length > 0) {
                let html = '<div class="list-group">';
                r.message.forEach(function(update) {
                    html += `<div class="list-group-item"><h6>✅ ${update.title}</h6><span class="badge badge-${update.status === 'Completed' ? 'success' : 'warning'}">${update.status}</span></div>`;
                });
                html += '</div>';
                $('#recent-tasks').html(html);
            } else {
                $('#recent-tasks').html('<p>No tasks found. <a href="#" onclick="frappe.new_doc(\'Work Update\')">Create first task</a></p>');
            }
        }
    });
};