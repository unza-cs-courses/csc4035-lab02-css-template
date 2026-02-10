#!/bin/bash
# Lab 2 Visible Tests - Auto-Grading Script
# CSC4035 Web Programming and Technologies
# These tests run on every push via GitHub Actions

echo "=========================================="
echo "Lab 2: CSS Fundamentals - Visible Tests"
echo "=========================================="

SCORE=0
MAX_SCORE=100

# Check if required files exist
if [ ! -f "index.html" ]; then
    echo "FAIL: index.html not found"
    echo "FINAL SCORE: 0 / $MAX_SCORE"
    exit 1
fi

if [ ! -f "styles.css" ]; then
    echo "FAIL: styles.css not found"
    echo "FINAL SCORE: 0 / $MAX_SCORE"
    exit 1
fi

echo ""
echo "=== CSS Custom Properties (15 points) ==="

# Check for CSS custom properties (variables)
if grep -q '\-\-primary-color' styles.css; then
    echo "PASS: --primary-color variable defined (+3)"
    SCORE=$((SCORE + 3))
else
    echo "FAIL: --primary-color variable not found"
fi

if grep -q '\-\-secondary-color' styles.css; then
    echo "PASS: --secondary-color variable defined (+3)"
    SCORE=$((SCORE + 3))
else
    echo "FAIL: --secondary-color variable not found"
fi

if grep -q '\-\-accent-color' styles.css; then
    echo "PASS: --accent-color variable defined (+3)"
    SCORE=$((SCORE + 3))
else
    echo "FAIL: --accent-color variable not found"
fi

if grep -q '\-\-text-color' styles.css; then
    echo "PASS: --text-color variable defined (+3)"
    SCORE=$((SCORE + 3))
else
    echo "FAIL: --text-color variable not found"
fi

if grep -q '\-\-background-color' styles.css; then
    echo "PASS: --background-color variable defined (+3)"
    SCORE=$((SCORE + 3))
else
    echo "FAIL: --background-color variable not found"
fi

# Check if variables are actually used
VAR_USAGE=$(grep -c 'var(--' styles.css)
if [ "$VAR_USAGE" -ge 5 ]; then
    echo "PASS: CSS variables used ($VAR_USAGE usages found)"
else
    echo "INFO: CSS variables defined but only $VAR_USAGE usages found (recommend 5+)"
fi

echo ""
echo "=== Selector Types (25 points) ==="

# Check for class selectors
CLASS_COUNT=$(grep -c '\.[a-zA-Z]' styles.css | head -1)
if [ "$CLASS_COUNT" -ge 3 ]; then
    echo "PASS: Class selectors present ($CLASS_COUNT found) (+5)"
    SCORE=$((SCORE + 5))
else
    echo "FAIL: Need at least 3 class selectors (found $CLASS_COUNT)"
fi

# Check for ID selectors
if grep -q '#about' styles.css && grep -q '#contact' styles.css; then
    echo "PASS: ID selectors for sections present (+5)"
    SCORE=$((SCORE + 5))
else
    echo "FAIL: ID selectors for #about and #contact not found"
fi

# Check for attribute selector
if grep -q '\[required\]' styles.css; then
    echo "PASS: Attribute selector [required] present (+5)"
    SCORE=$((SCORE + 5))
else
    echo "FAIL: Attribute selector for required fields not found"
fi

# Check for descendant combinator
if grep -q 'nav.*ul' styles.css || grep -q 'nav ul' styles.css; then
    echo "PASS: Descendant combinator (nav ul) present (+5)"
    SCORE=$((SCORE + 5))
else
    echo "FAIL: Descendant combinator for navigation not found"
fi

# Check for pseudo-classes
PSEUDO_COUNT=0
if grep -q ':hover' styles.css; then
    PSEUDO_COUNT=$((PSEUDO_COUNT + 1))
fi
if grep -q ':focus' styles.css; then
    PSEUDO_COUNT=$((PSEUDO_COUNT + 1))
fi
if grep -q ':first-child' styles.css; then
    PSEUDO_COUNT=$((PSEUDO_COUNT + 1))
fi
if grep -q ':last-child' styles.css; then
    PSEUDO_COUNT=$((PSEUDO_COUNT + 1))
fi

if [ "$PSEUDO_COUNT" -ge 2 ]; then
    echo "PASS: Pseudo-class selectors present ($PSEUDO_COUNT types found) (+5)"
    SCORE=$((SCORE + 5))
else
    echo "FAIL: Need at least 2 pseudo-class selectors (found $PSEUDO_COUNT)"
fi

echo ""
echo "=== Box Model Properties (20 points) ==="

# Check for padding
if grep -q 'padding' styles.css; then
    PADDING_COUNT=$(grep -c 'padding' styles.css)
    if [ "$PADDING_COUNT" -ge 3 ]; then
        echo "PASS: Padding property used ($PADDING_COUNT times) (+5)"
        SCORE=$((SCORE + 5))
    else
        echo "WARN: Padding used but only $PADDING_COUNT times (+3)"
        SCORE=$((SCORE + 3))
    fi
else
    echo "FAIL: Padding property not found"
fi

# Check for margin
if grep -q 'margin' styles.css; then
    MARGIN_COUNT=$(grep -c 'margin' styles.css)
    if [ "$MARGIN_COUNT" -ge 3 ]; then
        echo "PASS: Margin property used ($MARGIN_COUNT times) (+5)"
        SCORE=$((SCORE + 5))
    else
        echo "WARN: Margin used but only $MARGIN_COUNT times (+3)"
        SCORE=$((SCORE + 3))
    fi
else
    echo "FAIL: Margin property not found"
fi

# Check for border
if grep -q 'border' styles.css; then
    echo "PASS: Border property used (+5)"
    SCORE=$((SCORE + 5))
else
    echo "FAIL: Border property not found"
fi

# Check for border-radius
if grep -q 'border-radius' styles.css; then
    echo "PASS: Border-radius property used (+5)"
    SCORE=$((SCORE + 5))
else
    echo "FAIL: Border-radius property not found"
fi

echo ""
echo "=== Color and Typography (15 points) ==="

# Check for color properties
if grep -q 'color:' styles.css; then
    echo "PASS: Color property used (+3)"
    SCORE=$((SCORE + 3))
else
    echo "FAIL: Color property not found"
fi

# Check for background-color
if grep -q 'background-color' styles.css || grep -q 'background:' styles.css; then
    echo "PASS: Background color used (+3)"
    SCORE=$((SCORE + 3))
else
    echo "FAIL: Background color not found"
fi

# Check for font-family
if grep -q 'font-family' styles.css; then
    echo "PASS: Font-family property used (+3)"
    SCORE=$((SCORE + 3))
else
    echo "FAIL: Font-family property not found"
fi

# Check for font-size
if grep -q 'font-size' styles.css; then
    echo "PASS: Font-size property used (+3)"
    SCORE=$((SCORE + 3))
else
    echo "FAIL: Font-size property not found"
fi

# Check for line-height
if grep -q 'line-height' styles.css; then
    echo "PASS: Line-height property used (+3)"
    SCORE=$((SCORE + 3))
else
    echo "FAIL: Line-height property not found"
fi

echo ""
echo "=== Stylesheet Linked (10 points) ==="

# Check if stylesheet is linked in HTML
if grep -q 'rel="stylesheet"' index.html && grep -q 'styles.css' index.html; then
    echo "PASS: Stylesheet properly linked in HTML (+10)"
    SCORE=$((SCORE + 10))
else
    echo "FAIL: Stylesheet not properly linked in index.html"
fi

echo ""
echo "=== Required Classes Applied (10 points) ==="

# Check if classes are applied in HTML
if grep -q 'class="project-card"' index.html; then
    echo "PASS: project-card class applied to articles (+5)"
    SCORE=$((SCORE + 5))
else
    echo "FAIL: project-card class not applied to articles"
fi

if grep -q 'class="highlight"' index.html; then
    echo "PASS: highlight class applied (+5)"
    SCORE=$((SCORE + 5))
else
    echo "FAIL: highlight class not applied to any element"
fi

echo ""
echo "=== Required Files (5 points) ==="

# Check for box model screenshot
if [ -f "boxmodel-screenshot.png" ] || [ -f "boxmodel-screenshot.PNG" ] || [ -f "boxmodel-screenshot.jpg" ] || [ -f "boxmodel-screenshot.jpeg" ]; then
    echo "PASS: Box model screenshot present (+5)"
    SCORE=$((SCORE + 5))
else
    echo "FAIL: Box model screenshot missing (boxmodel-screenshot.png)"
fi

echo ""
echo "=========================================="
echo "FINAL SCORE: $SCORE / $MAX_SCORE"
echo "=========================================="

# Output grade
if [ $SCORE -ge 90 ]; then
    echo "Grade: A - Excellent work!"
elif [ $SCORE -ge 80 ]; then
    echo "Grade: B - Good job!"
elif [ $SCORE -ge 70 ]; then
    echo "Grade: C - Satisfactory"
elif [ $SCORE -ge 60 ]; then
    echo "Grade: D - Needs improvement"
else
    echo "Grade: F - Please review requirements"
fi

echo ""
echo "Note: This is your visible test score."
echo "Additional hidden tests will run after the deadline."

exit 0
