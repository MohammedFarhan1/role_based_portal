import frappe

def after_install():
    """Create roles and set permissions after app installation"""
    create_custom_roles()
    set_role_permissions()

def create_custom_roles():
    """Create the three custom roles"""
    roles = [
        {'role_name': 'Business User', 'desk_access': 1},
        {'role_name': 'Influencer', 'desk_access': 1},
        {'role_name': 'Common User', 'desk_access': 1}
    ]
    
    for role_data in roles:
        if not frappe.db.exists('Role', role_data['role_name']):
            role = frappe.get_doc({
                'doctype': 'Role',
                'role_name': role_data['role_name'],
                'desk_access': role_data['desk_access']
            })
            role.insert(ignore_permissions=True)
            frappe.db.commit()

def set_role_permissions():
    """Set permissions for custom roles"""
    work_update_permissions = [
        {'role': 'Business User', 'read': 1, 'write': 1, 'create': 1, 'delete': 1},
        {'role': 'Influencer', 'read': 1, 'write': 1, 'create': 1, 'delete': 1},
        {'role': 'Common User', 'read': 1, 'write': 1, 'create': 1, 'delete': 1}
    ]
    
    for perm in work_update_permissions:
        if not frappe.db.exists('Custom DocPerm', {
            'parent': 'Work Update',
            'role': perm['role']
        }):
            frappe.get_doc({
                'doctype': 'Custom DocPerm',
                'parent': 'Work Update',
                'parenttype': 'DocType',
                'parentfield': 'permissions',
                'role': perm['role'],
                'read': perm['read'],
                'write': perm['write'],
                'create': perm['create'],
                'delete': perm['delete'],
                'if_owner': 1
            }).insert(ignore_permissions=True)
    
    frappe.db.commit()