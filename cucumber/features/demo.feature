Feature: Playwright homepage

  Scenario: Homepage has title
    Given I am on the Playwright homepage
    Then the title should contain "Playwright"

  Scenario: Click Get Started link
    Given I am on the Playwright homepage
    When I click the "Get started" link
    Then I should see the "Installation" heading