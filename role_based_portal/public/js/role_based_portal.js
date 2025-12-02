$(document).ready(function() {
    if (!$('#role-portal-styles').length) {
        $('head').append(`
            <style id="role-portal-styles">
                .page-card {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    margin-bottom: 20px;
                    overflow: hidden;
                }
                .page-card-head {
                    padding: 15px 20px;
                    border-bottom: 1px solid #f0f0f0;
                    background: #fafafa;
                }
                .page-card-head h3, .page-card-head h4 {
                    margin: 0;
                    color: #333;
                }
                .page-card-body {
                    padding: 20px;
                }
                .page-card .btn {
                    margin-right: 10px;
                    margin-bottom: 5px;
                }
            </style>
        `);
    }
});