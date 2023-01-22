# Notification Class

On this page:
- Routes
- Public Notification methods


<br><br>


## Routes
format: /route -> method

### GET routes
- /notifications/new/:id -> `get_new_notifications()`
- /notifications/old/:id -> `get_old_notifications()`

### POST routes
- N/A

### PUT routes
- /notifications/add -> `add_new_notification`
- /notifications/clear_new -> `clear_new_notifications`

### DELETE routes
- N/A




<br><br>

## Public Methods

<br>

### `get_new()`
Gets a users new notifications
- Arguments:
    - number id (user_id)
- Request inputs: none
- Returns: 
    - JSON new_notifications

<br>

### `get_old()`
Gets users old notifications
- Arguments: 
    - number id (user_id)
- Request inputs: none
- Returns: 
    - JSON old_notifications

<br>

### `create()`
Adds a notification to user's new_notifications table
- Arguments: 
    - number recieving_user_id
    - string notification_message
    - string notification_url
    - string notification_type
- Request inputs: none
- Returns: 
    - JSON new_notifications

<br>

### `clear_new()`
Moves users new notifications to old notifications
- Arguments: none
- Put Request inputs: 
    - string user_id
- Returns: 
    - JSON old_notifications