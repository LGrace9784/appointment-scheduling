Online Appointment Scheduling System

Project Overview

The Online Appointment Scheduling System is a proposed software made to allow users to make appointments while providing the staff with the ability to manage appointments and scheduling information.
The project emphasizes secure software development practices like data protection and authorization practices inside this program
This repository contains the project proposal, system analysis, security requirements, project backlog, and supporting documentation created for Milestone 1.

Project Goals

Provide clients with an easy way to request and manage appointments.
Allow selected staff to manage appointment schedules.
Protect client information through appropriate security measures.
Apply secure software development principles throughout the project lifecycle.
Design a system that is maintainable longterm.
Added an admin feature that allows special control

Documentation

The docs folder contains the project's milestone report, system context diagram, and supporting screenshots.

The Milestone 1 report covers:
Project proposal and secure development rationale
Stakeholder and system context analysis
Asset, trust boundary, and abuse case analysis
Security requirements and risk traceability
Societal and global security considerations
Project backlog and security implications

Security Considerations

Security is a serious consideration in the proposed system. Important areas include:

Secure user authentication
Role-based access control
Protection of client information
Input validation
Secure communication
Appropriate handling of appointment data
Protection against unauthorized access

All example data is purely artificial. No real data will be used in this program during the development stages

Project Status

Current Phase: Application Development

The project proposal, security analysis, and core application features have been started. Development is still in progress, with additional testing, administration, documentation, and deployment work remaining.

## Project Backlog

### Completed

| ID    | Feature / Task                                                   | Status   | Notes                                                                           |
| ----- | ---------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------- |
| US-01 | Create project proposal and system overview                      | Complete | Added to the README and milestone documentation                                 |
| US-02 | Identify stakeholders, trust boundaries, assets, and abuse cases | Complete | Covered in the project documentation                                            |
| US-03 | Document security requirements and system architecture           | Complete | Context diagram, component diagram, and security documentation added            |
| US-04 | Create the React frontend structure                              | Complete | React and Vite application with routed pages                                    |
| US-05 | Create the FastAPI backend structure                             | Complete | API application, database models, routes, and health endpoint                   |
| US-06 | Allow users to register and log in                               | Complete | Registration and login routes use hashed passwords and JWT authentication       |
| US-07 | Protect authenticated routes                                     | Complete | JWT authentication and protected frontend routes implemented                    |
| US-08 | Implement role-based access control                              | Complete | Regular users and administrators have separate permissions                      |
| US-09 | Schedule an appointment                                          | Complete | Authenticated users can submit appointment requests                             |
| US-10 | View appointments                                                | Complete | Users can view their own appointments; administrators can view all appointments |
| US-11 | Reschedule an appointment                                        | Complete | Appointment date updates are supported with future-date validation              |
| US-12 | Cancel an appointment                                            | Complete | Cancelled appointments can no longer be updated                                 |
| US-13 | Prevent duplicate appointment times                              | Complete | Appointment updates check for an occupied time                                  |
| US-14 | Add basic input validation                                       | Complete | Frontend fields and backend Pydantic validation added                           |
| US-15 | Add login rate limiting                                          | Complete | Login attempts are limited to five attempts per minute                          |
| US-16 | Add general error handling                                       | Complete | API and frontend error responses include user-friendly messages                 |
| US-17 | Connect the frontend and backend                                 | Complete | API service functions use the configured backend base URL                       |

### In Progress

| ID    | Feature / Task                             | Priority | Notes                                                                                   |
| ----- | ------------------------------------------ | -------- | --------------------------------------------------------------------------------------- |
| US-18 | Build a functional administrator dashboard | High     | The route and access control exist, but appointment and user management controls remain |
| US-19 | Improve automated test coverage            | High     | Add backend and frontend tests for authentication and appointment workflows             |
| US-20 | Complete setup and run documentation       | Medium   | Add clear environment, database, backend, and frontend setup instructions               |

### Needs to Be Done

| ID    | Feature / Task                                        | Priority | Acceptance Criteria                                                                                 |
| ----- | ----------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| US-21 | Add appointment confirmation and status notifications | Medium   | Users receive clear feedback when an appointment is scheduled, rescheduled, or cancelled            |
| US-22 | Implement service availability and staff scheduling   | High     | Available services and staff time slots are configurable and cannot be double-booked                |
| US-23 | Add administrator appointment management              | High     | Administrators can view, reschedule, cancel, and update the status of appointments                  |
| US-24 | Add administrator user management                     | Medium   | Administrators can view users and manage permitted roles                                            |
| US-25 | Add account security enhancements                     | High     | Include password reset, stronger password rules, and account lockout or monitoring                  |
| US-26 | Improve appointment search and filtering              | Medium   | Users and administrators can filter appointments by date, status, service, or customer              |
| US-27 | Add automated API tests                               | High     | Test registration, login, authorization, scheduling, rescheduling, cancellation, and validation     |
| US-28 | Add frontend component tests                          | Medium   | Test protected routes, forms, user actions, and error states                                        |
| US-29 | Perform a security review                             | High     | Validate authentication, authorization, input handling, CORS, secrets, logging, and data protection |
| US-30 | Improve database configuration                        | Medium   | Support environment-specific database settings and migration-based schema management                |
| US-31 | Add deployment configuration                          | Medium   | Provide production configuration for the frontend, backend, and environment variables               |
| US-32 | Add monitoring and application logging                | Medium   | Capture actionable application, authentication, and error events without exposing sensitive data    |
| US-33 | Conduct final usability and accessibility review      | Medium   | Review keyboard use, labels, contrast, responsive layouts, and common user workflows                |
| US-34 | Prepare final project delivery materials              | Medium   | Update screenshots, documentation, demo instructions, and deployment evidence                       |

Engineer:
Logan Grace
