/**
 * Lab 2: CSS Fundamentals - Visible Test Suite
 * CSC4035 Web Programming and Technologies
 *
 * Run these tests locally with: npm test
 * Additional hidden tests will be used for final grading after the deadline.
 *
 * DO NOT MODIFY THIS FILE
 * Run with: npm test
 */

const fs = require('fs');
const path = require('path');

// Test counter
let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`  PASS: ${name}`);
        passed++;
    } catch (e) {
        console.log(`  FAIL: ${name}`);
        console.log(`        Error: ${e.message}`);
        failed++;
    }
}

function assertTrue(value, message = '') {
    if (value !== true) {
        throw new Error(`Expected true. ${message}`);
    }
}

function assertGreaterOrEqual(actual, expected, message = '') {
    if (actual < expected) {
        throw new Error(`Expected at least ${expected}, got ${actual}. ${message}`);
    }
}

// Read CSS file
const cssPath = path.join(__dirname, '../../styles.css');
const htmlPath = path.join(__dirname, '../../index.html');

let cssContent = '';
let htmlContent = '';

try {
    cssContent = fs.readFileSync(cssPath, 'utf8');
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
} catch (e) {
    console.error('ERROR: Cannot read required files');
    console.log('FINAL SCORE: 0 / 100');
    process.exit(1);
}

// Remove comments from CSS for more accurate testing
const cssNoComments = cssContent.replace(/\/\*[\s\S]*?\*\//g, '');

console.log('\n==========================================');
console.log('Lab 2: CSS Fundamentals');
console.log('Visible Test Suite');
console.log('==========================================\n');

// ============================================
// Task 1: CSS Custom Properties (15 points)
// ============================================
console.log('--- Task 1: CSS Custom Properties (15 points) ---');

test('CSS should use custom properties (variables)', () => {
    assertTrue(cssContent.includes(':root'), 'Missing :root selector');
});

test('Should define --primary-color variable with actual value', () => {
    const rootMatch = cssNoComments.match(/:root\s*\{([^}]+)\}/);
    assertTrue(rootMatch !== null, 'Missing :root selector');
    assertTrue(/--primary-color\s*:\s*[^;]+;/.test(rootMatch[1]), 'Missing --primary-color variable with value');
});

test('Should define --accent-color variable with actual value', () => {
    const rootMatch = cssNoComments.match(/:root\s*\{([^}]+)\}/);
    assertTrue(rootMatch !== null, 'Missing :root selector');
    assertTrue(/--accent-color\s*:\s*[^;]+;/.test(rootMatch[1]), 'Missing --accent-color variable with value');
});

test('Should define --background-color variable with actual value', () => {
    const rootMatch = cssNoComments.match(/:root\s*\{([^}]+)\}/);
    assertTrue(rootMatch !== null, 'Missing :root selector');
    assertTrue(/--background-color\s*:\s*[^;]+;/.test(rootMatch[1]), 'Missing --background-color variable with value');
});

test('Should actually USE var() in at least 3 different rules', () => {
    const varUsages = (cssNoComments.match(/var\(--[\w-]+\)/g) || []).length;
    assertGreaterOrEqual(varUsages, 3, `Should use var() at least 3 times, found ${varUsages}`);
});

// ============================================
// Task 2: Universal & Base Styles (10 points)
// ============================================
console.log('\n--- Task 2: Universal & Base Styles (10 points) ---');

test('Should have universal selector with box-sizing', () => {
    const universalMatch = cssNoComments.match(/\*\s*\{([^}]+)\}/);
    assertTrue(universalMatch !== null && universalMatch[1].includes('box-sizing'), 'Missing universal selector with box-sizing property');
});

test('Should set box-sizing to border-box', () => {
    assertTrue(/box-sizing\s*:\s*border-box/i.test(cssNoComments), 'box-sizing should be set to border-box');
});

test('Should style body with font-family AND font-size', () => {
    const bodyMatch = cssNoComments.match(/body\s*\{([^}]+)\}/);
    assertTrue(bodyMatch !== null, 'Missing body selector');
    assertTrue(/font-family/.test(bodyMatch[1]) && /font-size/.test(bodyMatch[1]), 'Body should have both font-family and font-size');
});

test('Body should use CSS variable for color', () => {
    const bodyMatch = cssNoComments.match(/body\s*\{([^}]+)\}/);
    assertTrue(bodyMatch !== null && /var\(--[^)]+\)/.test(bodyMatch[1]), 'Body should use CSS variable for text color');
});

// ============================================
// Task 3: Typography Styles (10 points)
// ============================================
console.log('\n--- Task 3: Typography Styles (10 points) ---');

test('h1 should have font-size with rem units', () => {
    const h1Match = cssNoComments.match(/h1\s*\{([^}]+)\}/);
    assertTrue(h1Match !== null && /font-size\s*:\s*[\d.]+rem/.test(h1Match[1]), 'h1 should have font-size in rem units');
});

test('h2 should have font-size with rem units', () => {
    const h2Match = cssNoComments.match(/h2\s*\{([^}]+)\}/);
    assertTrue(h2Match !== null && /font-size\s*:\s*[\d.]+rem/.test(h2Match[1]), 'h2 should have font-size in rem units');
});

test('Headings should use color CSS variables (not just defined)', () => {
    const h1Match = cssNoComments.match(/h1\s*\{([^}]+)\}/);
    assertTrue(h1Match !== null && /color\s*:\s*var\(--/.test(h1Match[1]), 'h1 should use color variable');
});

// ============================================
// Task 4: Link Styles with Pseudo-classes (10 points)
// ============================================
console.log('\n--- Task 4: Link Styles & Pseudo-classes (10 points) ---');

test('Link selector should have color property', () => {
    const aMatch = cssNoComments.match(/^a\s*\{([^}]+)\}/m);
    assertTrue(aMatch !== null && /color/.test(aMatch[1]), 'a selector should have color property');
});

test('a:hover should have actual style (not empty)', () => {
    const hoverMatch = cssNoComments.match(/a:hover\s*\{([^}]+)\}/);
    assertTrue(hoverMatch !== null && hoverMatch[1].trim().length > 0, 'a:hover should have actual CSS properties');
});

test('Should have :focus with actual styling', () => {
    const focusMatch = cssNoComments.match(/:focus\s*\{([^}]+)\}/);
    assertTrue(focusMatch !== null && focusMatch[1].trim().length > 0, ':focus should have actual CSS properties');
});

// ============================================
// Task 5: Class Selectors (15 points)
// ============================================
console.log('\n--- Task 5: Class Selectors (15 points) ---');

test('.highlight should have background-color', () => {
    const highlightMatch = cssNoComments.match(/\.highlight\s*\{([^}]+)\}/);
    assertTrue(highlightMatch !== null && /background-color|background/.test(highlightMatch[1]), '.highlight should have background-color');
});

test('.btn should have multiple box-model properties', () => {
    const btnMatch = cssNoComments.match(/\.btn\s*\{([^}]+)\}/);
    assertTrue(btnMatch !== null, '.btn class not found');
    const hasStyle = /padding/.test(btnMatch[1]) && /display/.test(btnMatch[1]);
    assertTrue(hasStyle, '.btn should have both padding and display properties');
});

test('.btn:hover should exist and have different styling', () => {
    const btnHoverMatch = cssNoComments.match(/\.btn:hover\s*\{([^}]+)\}/);
    assertTrue(btnHoverMatch !== null && btnHoverMatch[1].trim().length > 0, '.btn:hover should have actual CSS properties');
});

// ============================================
// Task 6: ID Selectors (10 points)
// ============================================
console.log('\n--- Task 6: ID Selectors (10 points) ---');

test('#about should have background-color property', () => {
    const aboutMatch = cssNoComments.match(/#about\s*\{([^}]+)\}/);
    assertTrue(aboutMatch !== null && /background|color/.test(aboutMatch[1]), '#about should have background or color property');
});

test('#contact should have background-color property', () => {
    const contactMatch = cssNoComments.match(/#contact\s*\{([^}]+)\}/);
    assertTrue(contactMatch !== null && /background|color/.test(contactMatch[1]), '#contact should have background or color property');
});

// ============================================
// Task 7: Attribute Selectors (5 points)
// ============================================
console.log('\n--- Task 7: Attribute Selectors (5 points) ---');

test('Should use [required] attribute selector with styling', () => {
    const requiredMatch = cssNoComments.match(/\[required\]\s*\{([^}]+)\}/);
    assertTrue(requiredMatch !== null && requiredMatch[1].trim().length > 0, '[required] attribute selector should have CSS properties');
});

// ============================================
// Task 8: Descendant Combinators (10 points)
// ============================================
console.log('\n--- Task 8: Descendant Combinators (10 points) ---');

test('nav ul should have list-style: none', () => {
    const navMatch = cssNoComments.match(/nav\s+ul\s*\{([^}]+)\}/);
    assertTrue(navMatch !== null && /list-style\s*:\s*none/.test(navMatch[1]), 'nav ul should have list-style: none');
});

test('nav ul li should have display property', () => {
    const navLiMatch = cssNoComments.match(/nav\s+ul\s+li\s*\{([^}]+)\}/);
    assertTrue(navLiMatch !== null && /display/.test(navLiMatch[1]), 'nav ul li should have display property');
});

// ============================================
// Task 9: Pseudo-classes for Lists (5 points)
// ============================================
console.log('\n--- Task 9: Pseudo-classes for Lists (5 points) ---');

test('Should use :first-child with actual styling', () => {
    const firstChildMatch = cssNoComments.match(/:first-child\s*\{([^}]+)\}/);
    assertTrue(firstChildMatch !== null && firstChildMatch[1].trim().length > 0, ':first-child should have CSS properties');
});

// ============================================
// Task 10: Box Model - Project Cards (5 points)
// ============================================
console.log('\n--- Task 10: Box Model (5 points) ---');

test('.project-card should have padding AND margin', () => {
    const cardMatch = cssNoComments.match(/\.project-card\s*\{([^}]+)\}/);
    assertTrue(cardMatch !== null && /padding/.test(cardMatch[1]) && /margin/.test(cardMatch[1]),
        '.project-card should have both padding and margin properties');
});

test('.project-card should have border or box-shadow', () => {
    const cardMatch = cssNoComments.match(/\.project-card\s*\{([^}]+)\}/);
    assertTrue(cardMatch !== null && (/border|box-shadow/.test(cardMatch[1])),
        '.project-card should have border or box-shadow for depth');
});

// ============================================
// Task 11: Form Styling (5 points)
// ============================================
console.log('\n--- Task 11: Form Styling (5 points) ---');

test('Form inputs should have width and padding', () => {
    const inputMatch = cssNoComments.match(/form\s+input[^{]*\{([^}]+)\}|input\s*\{([^}]+)\}/);
    assertTrue(inputMatch !== null && /width|padding/.test(inputMatch[1] || inputMatch[2] || ''),
        'Form inputs should have width or padding');
});

test('Form labels should have display: block', () => {
    const labelMatch = cssNoComments.match(/form\s+label\s*\{([^}]+)\}|label\s*\{([^}]+)\}/);
    assertTrue(labelMatch !== null && /display\s*:\s*block/.test(labelMatch[1] || labelMatch[2] || ''),
        'Form labels should have display: block');
});

// ============================================
// HTML Structure Verification
// ============================================
console.log('\n--- HTML Structure Verification ---');

test('CSS should be linked in HTML', () => {
    assertTrue(
        htmlContent.includes('href="styles.css"') ||
        htmlContent.includes("href='styles.css'") ||
        htmlContent.includes('href="./styles.css"'),
        'CSS file should be linked in HTML'
    );
});

// Summary
console.log('\n==========================================');
console.log(`Results: ${passed} passed, ${failed} failed`);
const score = Math.round((passed / (passed + failed)) * 100);
console.log(`Score: ${score}%`);
console.log('==========================================\n');

console.log('Note: This is your visible test score (40% of final grade).');
console.log('Make sure all tests pass before pushing to GitHub.\n');

if (failed > 0) {
    process.exit(1);
}
