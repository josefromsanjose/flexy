# Flexy Web Components Library

## Overview

Flexy is a lightweight library for building flexible and responsive web layouts using Web Components. It provides a set of components designed for creating complex layouts with ease, focusing on utilizing the power of Flexbox.

## Features of MVP Version

- **Flexy Container (`fxy-container`)**: A component that acts as a flex container. It allows for easy arrangement of child elements using Flexbox.
- **Flexy Item (`fxy-item`)**: A component that serves as a flex item within a Flexy Container, providing additional control over individual item layout.
- **Simple and Intuitive API**: Offers an intuitive API for setting Flexbox properties, making it simple to create and manage layouts.
- **Customizable**: Components can be easily styled with standard CSS to fit the design requirements.
- 
## Features of MVP Version
Working on it

## Usage

After installation, you can incorporate Flexy components into your web application. Below are some examples to demonstrate the usage:

### Basic Flex Container

Create a simple flex container with horizontal layout:

```
<fxy-container>
  <fxy-item>Item 1</fxy-item>
  <fxy-item>Item 2</fxy-item>
</fxy-container>
```

This will align `Item 1` and `Item 2` side by side in a row.

### Flex Container with Custom Direction

Change the direction of items in the flex container:

```
  <fxy-container fxy-direction="column">
      <fxy-item>Item 1</fxy-item>
      <fxy-item>Item 2</fxy-item>
  </fxy-container>
```
In this example, the items will be stacked vertically.

### Applying Flex Wrap

Enable wrapping of items within the flex container:

```
  <fxy-container fxy-wrap="wrap">
    <fxy-item>Item 1</fxy-item>
    <fxy-item>Item 2</fxy-item>
    <fxy-item>Item 3</fxy-item>
    <!-- More items -->
  </fxy-container>
```
This allows the items to wrap onto multiple lines, depending on container size.

### Nested Flex Containers

Flexy containers can be nested for complex layouts:
```
  <fxy-container>
      <fxy-item>
          <fxy-container fxy-direction="column">
          <fxy-item>Nested Item 1</fxy-item>
          <fxy-item>Nested Item 2</fxy-item>
          </fxy-container>
      </fxy-item>
      <fxy-item>Item 2</fxy-item>
  </fxy-container>
```

This creates a nested flexbox layout within a flex item.

This section provides clear and practical examples of how to use the Flexy library components in various scenarios, demonstrating the flexibility and capabilities of the library.
