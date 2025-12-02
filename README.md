# Role Based Portal

A complete ERPNext custom app that implements a multi-login system with three user roles: Business Users, Influencers, and Common Users. Each user type has their own custom dashboard with automatic redirection after login.

## Features

- **Three User Roles**: Business User, Influencer, Common User
- **Custom Dashboards**: Unique layouts, charts, and widgets for each role
- **Automatic Redirection**: Users are redirected to their role-specific dashboard after login
- **Work Updates DocType**: Custom DocType for tracking user work with role-based permissions
- **Restricted Access**: Role-based access control for pages and modules
- **Personalized Content**: Dashboards show user name, ID, and their work updates

## Installation

### Prerequisites
- ERPNext v15 or later
- Frappe Framework

### Step-by-Step Installation

1. **Navigate to your Frappe bench directory**
   ```bash
   cd /path/to/your/frappe-bench
   ```

2. **Copy the app to apps directory**
   ```bash
   cp -r /path/to/role_based_portal ./apps/
   ```

3. **Install the app**
   ```bash
   bench install-app role_based_portal
   ```

4. **Add to site**
   ```bash
   bench --site your-site-name install-app role_based_portal
   ```

5. **Restart bench**
   ```bash
   bench restart
   ```

## Setup Instructions

### 1. Create Test Users

After installation, create test users for each role:

1. Go to **User** doctype
2. Create three users:
   - `business@test.com` (Business User)
   - `influencer@test.com` (Influencer) 
   - `common@test.com` (Common User)

### 2. Assign Roles

For each user created:

1. Open the user document
2. In the **Roles** section, add the appropriate role:
   - Business User role for business@test.com
   - Influencer role for influencer@test.com
   - Common User role for common@test.com
3. Save the user

### 3. Test Login Redirection

1. **Logout** from Administrator account
2. **Login** with each test user
3. Verify automatic redirection:
   - Business users → `/app/business-dashboard`
   - Influencers → `/app/influencer-dashboard`
   - Common users → `/app/common-dashboard`

### 4. Test Dashboard Features

For each user type:

1. **Create Work Updates**:
   - Click "New Work Update" button on dashboard
   - Fill in title and description
   - Save the document

2. **Verify Permissions**:
   - Users can only see their own work updates
   - Role is automatically set based on user's assigned role

3. **Test Dashboard Content**:
   - Verify personalized greeting with user name and ID
   - Check statistics display
   - Confirm recent updates list shows user's data only

### 5. Verify Access Control

1. **Test Page Access**:
   - Try accessing other role dashboards (should be denied)
   - Verify navigation menu shows appropriate items

2. **Test DocType Permissions**:
   - Users can create/edit only their own Work Updates
   - List view filters to show only user's records

## Usage

### Business Dashboard
- Professional layout with business-focused metrics
- Quick actions for work updates
- Statistics and recent updates display

### Influencer Dashboard  
- Creative design with gradient backgrounds
- Content creation focused interface
- Performance metrics and goals tracking

### Common Dashboard
- Simple, task-oriented interface
- Basic progress tracking
- User-friendly quick info section

### Work Updates DocType
- **Title**: Brief description of the work
- **Description**: Detailed work description
- **User**: Automatically set to current user
- **User Role**: Automatically computed from user's roles
- **Status**: Draft/In Progress/Completed
- **Creation Date**: Date of creation

## Customization

### Adding New Roles
1. Create new role in **Role** doctype
2. Add role to `role_redirects` in `auth.py`
3. Create new dashboard page
4. Update permissions in `install.py`

### Modifying Dashboards
- Edit JavaScript files in respective page directories
- Customize HTML layout and styling
- Add new widgets or charts as needed

### Extending Work Updates
- Add new fields to Work Update DocType
- Update dashboard queries to include new fields
- Modify permissions as required

## File Structure

```
role_based_portal/
├── role_based_portal/
│   ├── config/
│   │   └── role_based_portal.py
│   ├── doctype/
│   │   └── work_update/
│   ├── page/
│   │   ├── business_dashboard/
│   │   ├── influencer_dashboard/
│   │   └── common_dashboard/
│   ├── public/
│   │   ├── js/
│   │   └── css/
│   ├── auth.py
│   └── install.py
├── hooks.py
└── README.md
```

## Troubleshooting

### Login Redirection Not Working
- Check if roles are properly assigned to users
- Verify `on_login` hook is configured in hooks.py
- Restart bench after any changes

### Dashboard Access Denied
- Ensure user has the correct role assigned
- Check page permissions in respective JSON files
- Verify role names match exactly

### Work Updates Not Showing
- Check user permissions on Work Update DocType
- Verify `if_owner` permission is set
- Ensure user field is properly set

## Support

For issues and questions:
1. Check ERPNext documentation
2. Review Frappe Framework guides
3. Check console for JavaScript errors
4. Verify server logs for Python errors

## License

MIT License