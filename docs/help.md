###Create
* Create an Incident, Problem, or Change Request:
    * `incident create [short description] [category]`
        * **short description:** sentence describing the incident
        * **category:** Inquiry / Help, Software, Hardware, Network, or Database
    * `problem create [short description]`
        * **short description:** sentence describing the problem
    * `cr create [short description] [category]`
        * **short description:** sentence describing the change request
        * **category:** Hardware, Software, Business Service, System Software, Applications Software, Network, Telecom, Documentation, Other, or Cloud Management

###View
* View the status of an Incident, Problem, or Change Request by internal ID:
    * `incident status sys_id`
    * `problem status sys_id`
    * `cr status sys_id`
* View the Incidents, Problems, or Change Requests that are assigned to you:
    * `incident assigned`
    * `problem assigned`
    * `cr assigned`

###Update
* Assign yourself to an Incident, Problem, or Change Request:
    * `incident assign sys_id`
    * `problem assign sys_id`
    * `cr assign sys_id`
* Add yourself to the watchlist of an Incident, Problem, or Change Request:
    * `incident watch sys_id`
    * `problem watch sys_id`
    * `cr watch sys_id`
* Remove yourself from the watchlist of an Incident, Problem, or Change Request:
    * `incident remove watch sys_id`
    * `problem remove watch sys_id`
    * `cr remove watch sys_id`