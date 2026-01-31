/**
 * Lab 2: CSS Fundamentals - Visible Test Suite
 * CSC4035 Web Programming and Technologies
 *
 * These tests run on every push via GitHub Actions.
 * Additional hidden tests will run after the deadline.
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

test('Should define --primary-color variable', () => {
    assertTrue(cssContent.includes('--primary-color'), 'Missing --primary-color variable');
});

test('Should define --accent-color variable', () => {
    assertTrue(cssContent.includes('--accent-color'), 'Missing --accent-color variable');
});

test('Should define --background-color variable', () => {
    assertTrue(cssContent.includes('--background-color'), 'Missing --background-color variable');
});

test('Should use var() to apply custom properties', () => {
    assertTrue(cssContent.includes('var(--'), 'CSS variables should be used with var()');
});

// ============================================
// Task 2: Universal & Base Styles (10 points)
// ============================================
console.log('\n--- Task 2: Universal & Base Styles (10 points) ---');

test('Should have universal selector reset', () => {
    assertTrue(cssNoComments.includes('* {'), 'Missing universal selector (*)');
});

test('Should set box-sizing', () => {
    assertTrue(cssContent.includes('box-sizing'), 'Missing box-sizing property');
});

test('Should style body element', () => {
    assertTrue(cssNoComments.includes('body {'), 'Missing body selector');
});

test('Should set font-family on body', () => {
    assertTrue(cssContent.includes('font-family'), 'Missing font-family property');
});

// ============================================
// Task 3: Typography Styles (10 points)
// ============================================
console.log('\n--- Task 3: Typography Styles (10 points) ---');

test('Should style h1 element', () => {
    assertTrue(cssNoComments.includes('h1 {') || cssNoComments.includes('h1{'), 'Missing h1 selector');
});

test('Should style h2 element', () => {
    assertTrue(cssNoComments.includes('h2 {') || cssNoComments.includes('h2{'), 'Missing h2 selector');
});

test('Should use rem or em units for font-size', () => {
    assertTrue(cssContent.includes('rem') || cssContent.includes('em'), 'Should use relative units (rem/em)');
});

// ============================================
// Task 4: Link Styles with Pseudo-classes (10 points)
// ============================================
console.log('\n--- Task 4: Link Styles & Pseudo-classes (10 points) ---');

test('Should style links', () => {
    assertTrue(cssNoComments.includes('a {') || cssNoComments.includes('a{'), 'Missing a selector');
});

test('Should have hover pseudo-class for links', () => {
    assertTrue(cssContent.includes('a:hover') || cssContent.includes('.nav-link:hover') || cssContent.includes('.btn:hover'), 'Missing hover state for links');
});

test('Should have focus pseudo-class for accessibility', () => {
    assertTrue(cssContent.includes(':focus'), 'Missing focus state for accessibility');
});

// ============================================
// Task 5: Class Selectors (15 points)
// ============================================
console.log('\n--- Task 5: Class Selectors (15 points) ---');

test('Should have .highlight class', () => {
    assertTrue(cssContent.includes('.highlight'), 'Missing .highlight class');
});

test('Should have .btn class', () => {
    assertTrue(cssContent.includes('.btn'), 'Missing .btn class');
});

test('.btn should have padding', () => {
    // Check if padding is defined somewhere after .btn
    const btnMatch = cssContent.match(/\.btn\s*\{[^}]*\}/);
    if (btnMatch) {
        assertTrue(btnMatch[0].includes('padding'), '.btn should have padding property');
    } else {
        assertTrue(false, '.btn class not properly defined');
    }
});

// ============================================
// Task 6: ID Selectors (10 points)
// ============================================
console.log('\n--- Task 6: ID Selectors (10 points) ---');

test('Should style #about section', () => {
    assertTrue(cssContent.includes('#about'), 'Missing #about selector');
});

test('Should style #contact section', () => {
    assertTrue(cssContent.includes('#contact'), 'Missing #contact selector');
});

// ============================================
// Task 7: Attribute Selectors (5 points)
// ============================================
console.log('\n--- Task 7: Attribute Selectors (5 points) ---');

test('Should use attribute selector for required fields', () => {
    assertTrue(cssContent.includes('[required]'), 'Missing [required] attribute selector');
});

// ============================================
// Task 8: Descendant Combinators (10 points)
// ============================================
console.log('\n--- Task 8: Descendant Combinators (10 points) ---');

test('Should style nav ul', () => {
    assertTrue(cssContent.includes('nav ul') || cssContent.includes('nav ul li'), 'Missing descendant combinator for nav');
});

test('Should remove list-style from navigation', () => {
    assertTrue(cssContent.includes('list-style'), 'Missing list-style property');
});

// ============================================
// Task 9: Pseudo-classes for Lists (5 points)
// ============================================
console.log('\n--- Task 9: Pseudo-classes for Lists (5 points) ---');

test('Should use :first-child pseudo-class', () => {
    assertTrue(cssContent.includes(':first-child'), 'Missing :first-child pseudo-class');
});

// ============================================
// Task 10: Box Model - Project Cards (5 points)
// ============================================
console.log('\n--- Task 10: Box Model (5 points) ---');

test('Should have .project-card class', () => {
    assertTrue(cssContent.includes('.project-card'), 'Missing .project-card class');
});

test('Should use padding property', () => {
    assertTrue(cssContent.includes('padding'), 'Missing padding property');
});

test('Should use margin property', () => {
    assertTrue(cssContent.includes('margin'), 'Missing margin property');
});

// ============================================
// Task 11: Form Styling (5 points)
// ============================================
console.log('\n--- Task 11: Form Styling (5 points) ---');

test('Should style form elements', () => {
    assertTrue(
        cssContent.includes('form ') || cssContent.includes('form{') ||
        cssContent.includes('.form-group') || cssContent.includes('form input'),
        'Missing form styling'
    );
});

test('Should style form inputs', () => {
    assertTrue(
        cssContent.includes('input') || cssContent.includes('textarea') || cssContent.includes('select'),
        'Missing input/textarea/select styling'
    );
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
console.log('Additional hidden tests will run after the deadline.\n');

if (failed > 0) {
    process.exit(1);
}
