# ShopTest Pro 🧪

A production-grade Playwright test automation framework for an e-commerce web application, built with JavaScript and the Page Object Model design pattern. Features CI/CD integration via GitHub Actions and an AI-powered failure reporter that explains test failures in plain English.

---

## 🚀 Features

- **Page Object Model (POM)** — maintainable, scalable test architecture
- **End-to-End test coverage** — authentication, product listing, cart, and full checkout flow
- **Cross-browser testing** — Chromium, Firefox, and Mobile (Pixel 5)
- **CI/CD pipeline** — automated test runs on every push via GitHub Actions
- **AI-powered failure reporter** — failed tests generate plain-English summaries using the Gemini API
- **HTML test reports** — uploaded as downloadable artifacts after every CI run
- **Screenshot & video capture** — automatically saved on test failure

---

## 🛠 Tech Stack

| Tool                                 | Purpose                         |
| ------------------------------------ | ------------------------------- |
| [Playwright](https://playwright.dev) | Test automation framework       |
| JavaScript (ES Modules)              | Programming language            |
| Page Object Model                    | Test architecture pattern       |
| GitHub Actions                       | CI/CD pipeline                  |
| Gemini API                           | AI-powered failure analysis     |
| dotenv                               | Environment variable management |

---

## 📁 Project Structure

shoptest-pro/
├── .github/
│ └── workflows/
│ └── playwright.yml # CI/CD pipeline — runs on every push
├── fixtures/
│ └── auth.fixture.js # Reusable login fixture for authenticated tests
├── pages/
│ ├── LoginPage.js # Login page — locators and actions
│ ├── InventoryPage.js # Product listing page — locators and actions
│ ├── CartPage.js # Cart page — locators and actions
│ └── CheckoutPage.js # Checkout flow — locators and actions
├── tests/
│ ├── auth.spec.js # Authentication test suite (6 tests)
│ ├── products.spec.js # Product listing and sorting tests (6 tests)
│ └── checkout.spec.js # End-to-end checkout flow tests (4 tests)
├── utils/
│ └── aiReporter.js # Custom Playwright reporter with AI failure analysis
├── .env.example # Example environment variables
├── playwright.config.js # Playwright configuration
└── README.md

---

## 🧪 Test Coverage

### Authentication (`auth.spec.js`)

- ✅ Valid user can log in
- ✅ Wrong password shows an error
- ✅ Locked user cannot log in
- ✅ Username field is empty shows validation error
- ✅ Password field is empty shows validation error
- ✅ Both fields empty shows validation error

### Product Listing (`products.spec.js`)

- ✅ Displays exactly 6 products on page load
- ✅ Default product order on page load
- ✅ Sort by name A to Z
- ✅ Sort by name Z to A
- ✅ Sort by price low to high
- ✅ Sort by price high to low

### Checkout (`checkout.spec.js`)

- ✅ Full checkout flow with valid information
- ✅ First name empty shows validation error
- ✅ Last name empty shows validation error
- ✅ Postal code empty shows validation error

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- A [Google AI Studio](https://aistudio.google.com) API key (free)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/maeeshamaliha22/shoptest-pro.git
cd shoptest-pro
```

**2. Install dependencies**

```bash
npm install
```

**3. Install Playwright browsers**

```bash
npx playwright install
```

**4. Set up environment variables**

Create a `.env` file in the project root:
GEMINI_API_KEY=your_api_key_here

### Running Tests

**Run all tests:**

```bash
npx playwright test
```

**Run a specific test file:**

```bash
npx playwright test tests/auth.spec.js
```

**Run with the Playwright UI:**

```bash
npx playwright test --ui
```

**Run in a specific browser:**

```bash
npx playwright test --project=chromium
```

**View the HTML report:**

```bash
npx playwright show-report
```

---

## 🤖 AI Failure Reporter

When tests fail, the custom AI reporter automatically sends failure details to the Gemini API and generates a plain-English summary — making it easy for non-technical stakeholders to understand what broke and what to investigate.

**Example output:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 AI FAILURE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The login test failed because the application did not redirect
to the inventory page after entering valid credentials. This
suggests the login button may not be functioning correctly or
the redirect logic has broken. Recommend checking the
authentication flow immediately.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## 🔄 CI/CD Pipeline

Tests run automatically via GitHub Actions on:

- Every push to `main` or `master`
- Every pull request targeting `main` or `master`
- Every day at 8:00 AM UTC (scheduled run)

After each run, the HTML test report and AI failure report are uploaded as downloadable artifacts and retained for 30 days.

---

## 📄 Environment Variables

Create a `.env` file in the project root with the following:
GEMINI_API_KEY=your_gemini_api_key_here

> ⚠️ Never commit your `.env` file. It is already excluded via `.gitignore`.

---

## 👩‍💻 Author

Built by **Maeesha** as a QA automation portfolio project.

- 🔗 [GitHub](https://github.com/maeeshamaliha22)
