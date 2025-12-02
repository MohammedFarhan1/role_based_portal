frappe.pages['business-dashboard'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Business Dashboard',
        single_column: true
    });
    
    if (!frappe.user_roles.includes('Business User') && frappe.session.user !== 'Administrator') {
        frappe.msgprint('Access Denied');
        frappe.set_route('');
        return;
    }
    
    page.main.html(`
        <div class="row">
            <div class="col-md-12">
                <div class="page-card">
                    <div class="page-card-head">
                        <h3>Welcome ${frappe.session.user_fullname || frappe.session.user}</h3>
                        <p>User ID: ${frappe.session.user} | Role: Business User</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="page-card">
                    <div class="page-card-head"><h4>Quick Actions</h4></div>
                    <div class="page-card-body">
                        <button class="btn btn-primary btn-sm" onclick="frappe.new_doc('Work Update')">New Work Update</button>
                        <button class="btn btn-default btn-sm" onclick="frappe.set_route('List', 'Work Update')">View All Updates</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="page-card">
                    <div class="page-card-head"><h4>Statistics</h4></div>
                    <div class="page-card-body" id="business-stats">Loading...</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="page-card">
                    <div class="page-card-head"><h4>Recent Work Updates</h4></div>
                    <div class="page-card-body" id="recent-updates">Loading...</div>
                </div>
            </div>
        </div>
    `);
    
    frappe.call({
        method: 'frappe.client.get_count',
        args: {doctype: 'Work Update', filters: {user: frappe.session.user}},
        callback: function(r) {
            $('#business-stats').html(`<h3>${r.message || 0}</h3><p>Total Updates</p>`);
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
                    html += `<div class="list-group-item"><h6>${update.title}</h6><span class="badge badge-${update.status === 'Completed' ? 'success' : 'warning'}">${update.status}</span></div>`;
                });
                html += '</div>';
                $('#recent-updates').html(html);
            } else {
                $('#recent-updates').html('<p>No updates found. <a href="#" onclick="frappe.new_doc(\'Work Update\')">Create first update</a></p>');
            }
        }
    });
};