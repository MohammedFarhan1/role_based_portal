from frappe import _

def get_data():
    return [
        {
            "label": _("Role Based Portal"),
            "items": [
                {
                    "type": "doctype",
                    "name": "Work Update",
                    "label": _("Work Update"),
                    "description": _("Manage work updates")
                }
            ]
        },
        {
            "label": _("Dashboards"),
            "items": [
                {
                    "type": "page",
                    "name": "business-dashboard",
                    "label": _("Business Dashboard"),
                    "description": _("Business user dashboard")
                },
                {
                    "type": "page", 
                    "name": "influencer-dashboard",
                    "label": _("Influencer Dashboard"),
                    "description": _("Influencer dashboard")
                },
                {
                    "type": "page",
                    "name": "common-dashboard", 
                    "label": _("Common Dashboard"),
                    "description": _("Common user dashboard")
                }
            ]
        }
    ]