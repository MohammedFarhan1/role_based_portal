import frappe

def on_login(login_manager):
    """Redirect users to their role-specific dashboard after login"""
    user = frappe.session.user
    
    if user == "Administrator":
        return
    
    # Get user roles
    user_roles = frappe.get_roles(user)
    
    # Define role-based redirections
    role_redirects = {
        'Business User': '/app/business-dashboard',
        'Influencer': '/app/influencer-dashboard', 
        'Common User': '/app/common-dashboard'
    }
    
    # Check user role and redirect
    for role, redirect_url in role_redirects.items():
        if role in user_roles:
            frappe.local.response["type"] = "redirect"
            frappe.local.response["location"] = redirect_url
            break