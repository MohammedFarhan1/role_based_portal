import frappe
from frappe.model.document import Document

class WorkUpdate(Document):
    def before_save(self):
        """Set user role before saving"""
        if self.user:
            user_roles = frappe.get_roles(self.user)
            role_priority = ['Business User', 'Influencer', 'Common User']
            
            for role in role_priority:
                if role in user_roles:
                    self.user_role = role
                    break
    
    def validate(self):
        """Validate that user can only create their own work updates"""
        if self.user != frappe.session.user and frappe.session.user != "Administrator":
            frappe.throw("You can only create work updates for yourself")