# User Stories — Giftlinks

## Overview

Giftlinks is a platform that allows users to discover the application, create an account, sign in, view gift link details, and manage their profile.

This document defines the user stories, acceptance criteria, details, and assumptions for the currently implemented features.

## User Stories

### US-001: Access the Landing Page

**As a** visitor,
**I want** to access the landing page,
**So that** I can understand what Giftlinks is and what it offers.

#### Details and Assumptions

* The landing page is publicly accessible.
* Visitors do not need an account to view the landing page.
* The page provides navigation to the available authentication pages.
* The interface should adapt to supported screen sizes.

#### Acceptance Criteria

**Scenario 1: Access the landing page**

* Given I am an unauthenticated visitor
* When I navigate to the Giftlinks landing page
* Then the landing page is displayed successfully

**Scenario 2: Navigate to authentication pages**

* Given I am viewing the landing page
* When I select an available authentication link
* Then I am directed to the corresponding registration or login page

**Scenario 3: Responsive layout**

* Given I access the landing page on a supported screen size
* When the page is displayed
* Then the content and navigation remain usable and properly arranged

### US-002: Register an Account

**As a** new user,
**I want** to create an account,
**So that** I can access the features available to registered users.

#### Details and Assumptions

* Registration is available to users who do not already have an account.
* The user must provide the information required by the registration form.
* The system is responsible for validating registration data.
* Successful registration follows the application's configured authentication flow.
* Registration must provide appropriate feedback for success and failure.

#### Acceptance Criteria

**Scenario 1: Access the registration page**

* Given I am a visitor
* When I navigate to the registration page
* Then the registration form is displayed

**Scenario 2: Register with valid information**

* Given I am on the registration page
* When I submit valid registration information
* Then the system processes the registration and displays the appropriate success feedback

**Scenario 3: Submit invalid information**

* Given I am on the registration page
* When I submit missing or invalid registration information
* Then the system rejects the invalid submission and displays appropriate validation feedback

**Scenario 4: Handle registration failure**

* Given I have submitted registration information
* When the registration request fails
* Then the application displays an appropriate error message

### US-003: Log In

**As a** registered user,
**I want** to log in to my account,
**So that** I can access protected areas of Giftlinks.

#### Details and Assumptions

* Users must have a registered account to authenticate.
* Authentication is performed using the credentials required by the application.
* Successful authentication follows the application's configured session or token flow.
* Protected resources must enforce authentication and authorization rules.

#### Acceptance Criteria

**Scenario 1: Access the login page**

* Given I am a visitor
* When I navigate to the login page
* Then the login form is displayed

**Scenario 2: Log in with valid credentials**

* Given I have a registered account
* When I submit valid login credentials
* Then the system authenticates me and provides the configured success response

**Scenario 3: Log in with invalid credentials**

* Given I am on the login page
* When I submit invalid credentials
* Then the system rejects the authentication attempt and displays an appropriate error message

**Scenario 4: Access a protected page**

* Given I am successfully authenticated
* When I navigate to a protected page
* Then the application allows access according to the user's permissions

**Scenario 5: Reject unauthenticated access**

* Given I am not authenticated
* When I attempt to access a protected resource
* Then the application prevents unauthorized access

### US-004: View Gift Link Details

**As a** user,
**I want** to view the details of a gift link,
**So that** I can understand the information associated with it.

#### Details and Assumptions

* Gift link details are retrieved from the application's backend.
* Each gift link is identified by the identifier used by the application.
* The details page displays the information available for the selected gift link.
* The application must handle unavailable resources and failed requests gracefully.
* Access restrictions, if any, must follow the application's authorization rules.

#### Acceptance Criteria

**Scenario 1: View an existing gift link**

* Given a gift link exists
* When I navigate to its details page
* Then the application displays the available information for that gift link

**Scenario 2: Handle an unavailable gift link**

* Given a gift link does not exist or is unavailable
* When I attempt to view its details
* Then the application displays an appropriate error or unavailable-resource message

**Scenario 3: Handle loading state**

* Given the application is retrieving gift link details
* When the request is still in progress
* Then the page provides appropriate loading feedback

**Scenario 4: Handle a failed request**

* Given the application cannot retrieve the gift link details
* When the request fails
* Then the page displays an appropriate error message without breaking the user experience

### US-005: View My Profile

**As an** authenticated user,
**I want** to access my profile,
**So that** I can view my account information.

#### Details and Assumptions

* The profile page is intended for authenticated users.
* The profile information is retrieved through the application's configured backend endpoint.
* Users may only access account information permitted by the application's authorization rules.
* Loading and error states should be handled appropriately.

#### Acceptance Criteria

**Scenario 1: View my profile**

* Given I am authenticated
* When I navigate to my profile page
* Then the application displays the account information available to me

**Scenario 2: Prevent unauthenticated access**

* Given I am not authenticated
* When I attempt to access my profile
* Then the application prevents access or redirects me to the login page according to its authentication flow

**Scenario 3: Handle profile loading**

* Given the application is retrieving my profile information
* When the request is still in progress
* Then the page provides appropriate loading feedback

**Scenario 4: Handle profile retrieval failure**

* Given the application cannot retrieve my profile information
* When the request fails
* Then the page displays an appropriate error message

## Non-Functional Requirements

### Security

* Given a resource requires authentication
* When an unauthenticated user attempts to access it
* Then the system prevents unauthorized access

### Usability

* Given a user interacts with the application
* When the user navigates between available pages
* Then navigation and interaction patterns remain clear and consistent

### Responsiveness

* Given the application is accessed on a supported screen size
* When a page is rendered
* Then the interface adapts to the available screen space

### Reliability

* Given an API request fails
* When the application receives the failure
* Then the interface handles the error gracefully

### Validation

* Given a user submits registration or login information
* When the submitted data violates the applicable validation rules
* Then the system provides appropriate feedback

## Definition of Done

A user story is considered complete when:

* [ ] The functionality meets its acceptance criteria.
* [ ] Input validation and error handling are implemented where applicable.
* [ ] Authentication and authorization rules are respected.
* [ ] Relevant tests pass.
* [ ] The interface is verified on supported screen sizes.
* [ ] The documentation is updated where necessary.

## Scope

This document covers the following Giftlinks features:

* Landing page
* User registration
* User login
* Gift link details
* User profile

Future features should be documented separately when they become part of the product scope.