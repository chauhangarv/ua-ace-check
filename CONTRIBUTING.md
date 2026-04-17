# 🤝 Contributing to UA-ACE Check

Thank you for your interest in contributing to **UA-ACE Check** — a project focused on improving Universal Acceptance (UA) and digital inclusion.

We welcome contributions from developers, researchers, and anyone interested in accessibility and internet standards.

---

## 🚀 Getting Started

### 1. Fork the Repository
Click on the "Fork" button on GitHub.

### 2. Clone Your Fork
```bash
git clone https://github.com/your-username/ua-ace-check.git
cd ua-ace-check
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Project
```
npm run dev
```

### Project Structure
```bash
ua-ace-check/
│
├── src/            # Core application logic
├── components/     # UI components (React)
├── utils/          # Helper functions
├── checks/         # UA validation rules (important)
├── public/         # Static files
└── ...
```

## 🧩 Contributing Changes
### Adding or Updating UA Checks
* Navigate to the checks/ directory
* Create or modify a validation function
* Ensure:
    * Compliance with relevant RFCs (e.g., RFC 5321, RFC 6531)
    * Proper handling of Unicode and IDNs
    * Clear and consistent output
 
### Reporting Issues or Suggesting Features
* Use clear, descriptive titles
* Provide steps to reproduce (for bugs)
* Explain expected vs actual behavior
* Justify why a feature is useful

## 🔀 Submitting a Pull Request
### 1. Create a new branch:
``` bash git checkout -b feature/your-feature-name
```
### 2. Make your changes and commit:
``` bash git commit -m "Add: short description of changes"
```
### 3. Push to your fork:
``` bash git push origin feature/your-feature-name
```
### 4. Open a Pull Request on GitHub

###✅ Contribution Guidelines
* Write clean, readable, and maintainable code
* Follow the existing project structure and style
* Keep commits focused and meaningful
* Test your changes before submitting
* Avoid introducing breaking changes

### 📌 Areas You Can Contribute To
* Enhancing UA validation logic
* Adding edge-case handling for IDNs and EAI
* Improving performance
* UI/UX improvements
* Documentation and examples

## 🌍 Community

Please be respectful and inclusive in all interactions. Constructive collaboration is encouraged.
