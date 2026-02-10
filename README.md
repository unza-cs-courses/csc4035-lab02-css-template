# Lab 2: CSS Fundamentals and Selectors

**Course:** CSC4035 Web Programming and Technologies
**Estimated Time:** 1.5-2 hours
**Weight:** 1% of final grade

---

## Purpose

This lab builds upon your HTML portfolio by introducing CSS styling. You will learn to select HTML elements using various CSS selectors, apply visual styling, and understand the cascade and specificity. By the end, your portfolio will have professional visual design.

---

## Learning Outcomes

By completing this lab, you will be able to:

1. Link external stylesheets to HTML documents correctly
2. Apply CSS selectors (element, class, ID, attribute, combinators) to target specific elements
3. Use CSS properties for typography, colors, spacing, and borders
4. Understand and apply the CSS box model (margin, border, padding, content)
5. Define and use CSS custom properties (variables) for consistent styling

---

## Your Assignment

Check `ASSIGNMENT.md` for your personalized assignment theme (generated after you accept the assignment).

---

## Prerequisites

1. **Completed Lab 1:** Your `index.html` file from Lab 1 (or use the provided template)
2. **Browser:** Chrome with DevTools
3. **Text Editor:** VS Code with Live Server extension

---

## Tasks

### Task 1: Link Stylesheet (5 minutes)

1. Open `index.html` and add a `<link>` element in the `<head>` to connect `styles.css`
2. Verify the connection by adding a test rule and checking in the browser

### Task 2: CSS Custom Properties (10 minutes)

Define your color scheme in the `:root` selector:

```css
:root {
    --primary-color: /* dark color for headings */;
    --secondary-color: /* medium color */;
    --accent-color: /* bright color for links/buttons */;
    --text-color: /* main text color */;
    --background-color: /* page background */;
    --card-background: /* card background */;
}
```

### Task 3: Base Styles and Typography (15 minutes)

1. Add a CSS reset using the universal selector (`*`)
2. Style the body with font-family, font-size, line-height, and colors
3. Style headings (h1, h2, h3) with appropriate sizes and colors
4. Style paragraphs with margin-bottom

### Task 4: Selector Practice (25 minutes)

Apply styles using different selector types:

1. **Class selectors:** Create `.highlight` and `.btn` classes
2. **ID selectors:** Style `#about` and `#contact` sections
3. **Attribute selector:** Style `[required]` inputs
4. **Descendant combinator:** Style `nav ul li` for horizontal navigation
5. **Pseudo-classes:** Style `:hover`, `:focus`, `:first-child`

### Task 5: Box Model Application (20 minutes)

1. Create a `.project-card` class with padding, margin, border, and border-radius
2. Apply the class to project articles in your HTML
3. Style the form with appropriate spacing
4. Use Chrome DevTools to inspect the box model

### Task 6: Take Screenshot (5 minutes)

1. Open Chrome DevTools (F12)
2. Select a project card element
3. Take a screenshot of the box model diagram
4. Save as `boxmodel-screenshot.png`

### Task 7: Specificity Challenge (10 minutes)

Complete the specificity challenge section at the bottom of `styles.css`:

1. Calculate the specificity of each selector
2. Predict which color will apply
3. Uncomment the rules and verify your prediction

---

## Required Deliverables

| File | Description |
|------|-------------|
| `index.html` | Updated HTML with classes applied |
| `styles.css` | Complete stylesheet with all required styles |
| `boxmodel-screenshot.png` | DevTools screenshot showing box model |

---

## Grading

Your grade is calculated from:
- **Visible Tests (40%):** Run automatically on every push
- **Hidden Tests (30%):** Run after the deadline
- **Code Quality (20%):** Manual review
- **Plagiarism Check:** High similarity may result in penalties

Check your visible test results in the "Actions" tab of your repository.

---

## Submission

1. Complete all tasks
2. Ensure all classes are applied in HTML
3. Commit your changes: `git add . && git commit -m "Complete Lab 2"`
4. Push to GitHub: `git push`
5. Verify tests pass in the Actions tab

---

## Marking Checklist

Before submitting, verify:

- [ ] Stylesheet linked correctly in HTML
- [ ] CSS variables defined in `:root` (5 minimum)
- [ ] CSS variables used throughout stylesheet (5+ usages)
- [ ] Class selectors created and used (3+)
- [ ] ID selectors used for sections
- [ ] Attribute selector used for required inputs
- [ ] Descendant combinator used for navigation
- [ ] Pseudo-classes used (hover, focus, first-child)
- [ ] Box model properties applied (padding, margin, border)
- [ ] project-card class applied to articles
- [ ] highlight class applied to an element
- [ ] Box model screenshot included
- [ ] Specificity challenge completed

---

## Academic Integrity

- **Allowed:** CSS property references from MDN, W3Schools, CSS-Tricks
- **Allowed:** Using browser-generated CSS as reference
- **NOT Allowed:** Copying CSS from templates or frameworks
- **NOT Allowed:** Using AI to generate solutions

All submissions are checked with plagiarism detection tools.

---

## Resources

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Specificity Calculator](https://specificity.keegan.st/)
- [Chrome DevTools Guide](https://developer.chrome.com/docs/devtools/)
- [CSS Variables (Custom Properties)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
