frappe.pages['influencer-dashboard'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Influencer Dashboard',
        single_column: true
    });
    
    if (!frappe.user_roles.includes('Influencer') && frappe.session.user !== 'Administrator') {
        frappe.msgprint('Access Denied');
        frappe.set_route('');
        return;
    }
    
    page.main.html(`
        <div class="row">
            <div class="col-md-12">
                <div class="page-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                    <div class="page-card-head">
                        <h3>🌟 Welcome ${frappe.session.user_fullname || frappe.session.user}</h3>
                        <p>User ID: ${frappe.session.user} | Role: Influencer</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="page-card">
                    <div class="page-card-head"><h4>📈 Content Creation</h4></div>
                    <div class="page-card-body">
                        <button class="btn btn-success btn-sm" onclick="frappe.new_doc('Work Update')">New Content Update</button>
                        <button class="btn btn-info btn-sm" onclick="frappe.set_route('List', 'Work Update')">View Content Library</button>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="page-card">
                    <div class="page-card-head"><h4>📊 Performance</h4></div>
                    <div class="page-card-body" id="influencer-stats">Loading...</div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="page-card">
                    <div class="page-card-head"><h4>🎯 Goals</h4></div>
                    <div class="page-card-body">
                        <div class="progress mb-2"><div class="progress-bar bg-success" style="width: 75%"></div></div>
                        <small>Monthly Content: 75%</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="page-card">
                    <div class="page-card-head"><h4>📝 Recent Content Updates</h4></div>
                    <div class="page-card-body" id="recent-content">Loading...</div>
                </div>
            </div>
        </div>
    `);
    
    frappe.call({
        method: 'frappe.client.get_count',
        args: {doctype: 'Work Update', filters: {user: frappe.session.user}},
        callback: function(r) {
            $('#influencer-stats').html(`<h3 class="text-primary">${r.message || 0}</h3><p>Content Pieces</p>`);
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
                    html += `<div class="list-group-item"><h6>📄 ${update.title}</h6><span class="badge badge-${update.status === 'Completed' ? 'success' : 'warning'}">${update.status}</span></div>`;
                });
                html += '</div>';
                $('#recent-content').html(html);
            } else {
                $('#recent-content').html('<p>No content found. <a href="#" onclick="frappe.new_doc(\'Work Update\')">Create first content</a></p>');
            }
        }
    });
};